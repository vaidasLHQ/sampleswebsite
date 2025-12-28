// ============================================
// FrogDrip Payment SDK - Stripe Connect Server
// ============================================

import type {
  ConnectedAccount,
  OAuthOptions,
  OAuthCallbackResult,
  CreateCheckoutOptions,
  CheckoutSession,
  PlatformFee,
  RefundOptions,
  RefundResult,
  AccountBalance,
  WebhookEvent,
} from '../types';

/**
 * Server-side configuration for Stripe Connect
 */
export interface StripeConnectConfig {
  /** Your Stripe Secret Key */
  secretKey: string;
  /** Your Stripe Connect Client ID */
  clientId: string;
  /** Webhook signing secret */
  webhookSecret: string;
  /** Default platform fee (optional) */
  defaultPlatformFee?: PlatformFee;
}

/**
 * Stripe Connect Server SDK
 * 
 * This class handles all server-side Stripe Connect operations:
 * - OAuth flow for connecting seller accounts
 * - Creating checkout sessions with destination charges
 * - Handling webhooks
 * - Managing connected accounts
 */
export class StripeConnectServer {
  private secretKey: string;
  private clientId: string;
  private webhookSecret: string;
  private defaultPlatformFee?: PlatformFee;
  private apiBase = 'https://api.stripe.com/v1';
  private connectApiBase = 'https://connect.stripe.com';

  constructor(config: StripeConnectConfig) {
    this.secretKey = config.secretKey;
    this.clientId = config.clientId;
    this.webhookSecret = config.webhookSecret;
    this.defaultPlatformFee = config.defaultPlatformFee;
  }

  // ==========================================
  // OAuth Flow - Connect Seller Accounts
  // ==========================================

  /**
   * Generate OAuth authorization URL for connecting a Stripe account
   * 
   * @example
   * const authUrl = stripe.getOAuthUrl({
   *   redirectUri: 'https://yourapp.com/stripe/callback',
   *   email: 'seller@example.com',
   *   state: 'user_123'
   * });
   * // Redirect user to authUrl
   */
  getOAuthUrl(options: OAuthOptions): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      scope: 'read_write',
      redirect_uri: options.redirectUri,
    });

    if (options.state) {
      params.set('state', options.state);
    }

    if (options.email) {
      params.set('stripe_user[email]', options.email);
    }

    // For Standard accounts (recommended)
    if (options.connectType === 'express') {
      params.set('suggested_capabilities[]', 'transfers');
      params.set('suggested_capabilities[]', 'card_payments');
    }

    return `${this.connectApiBase}/oauth/authorize?${params.toString()}`;
  }

  /**
   * Handle OAuth callback and exchange code for connected account
   * 
   * @example
   * const result = await stripe.handleOAuthCallback(code, state);
   * if (result.success) {
   *   // Save result.accountId to your database
   * }
   */
  async handleOAuthCallback(
    code: string,
    state?: string
  ): Promise<OAuthCallbackResult> {
    try {
      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
      });

      const response = await fetch(`${this.connectApiBase}/oauth/token`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error: error.error_description || 'OAuth failed',
          state,
        };
      }

      const data = await response.json();
      
      return {
        success: true,
        accountId: data.stripe_user_id,
        state,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        state,
      };
    }
  }

  /**
   * Get connected account details from Stripe
   */
  async getConnectedAccount(accountId: string): Promise<ConnectedAccount | null> {
    try {
      const response = await fetch(`${this.apiBase}/accounts/${accountId}`, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      return {
        accountId: data.id,
        provider: 'stripe',
        status: data.charges_enabled ? 'active' : 'pending',
        connectedAt: new Date(data.created * 1000),
        details: {
          businessName: data.business_profile?.name || data.settings?.dashboard?.display_name,
          email: data.email,
          country: data.country,
          capabilities: Object.keys(data.capabilities || {}),
        },
      };
    } catch {
      return null;
    }
  }

  /**
   * Disconnect a connected account (revoke access)
   */
  async disconnectAccount(accountId: string): Promise<boolean> {
    try {
      const params = new URLSearchParams({
        client_id: this.clientId,
        stripe_user_id: accountId,
      });

      const response = await fetch(`${this.connectApiBase}/oauth/deauthorize`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      return response.ok;
    } catch {
      return false;
    }
  }

  // ==========================================
  // Checkout Sessions - Destination Charges
  // ==========================================

  /**
   * Calculate platform fee based on configuration
   */
  private calculatePlatformFee(totalAmountCents: number, fee?: PlatformFee): number {
    const feeConfig = fee || this.defaultPlatformFee;
    if (!feeConfig) return 0;

    switch (feeConfig.type) {
      case 'fixed':
        return feeConfig.fixedAmountCents || 0;
      case 'percentage':
        return Math.round(totalAmountCents * (feeConfig.percentage || 0));
      case 'fixed_plus_percentage':
        return (feeConfig.fixedAmountCents || 0) + 
               Math.round(totalAmountCents * (feeConfig.percentage || 0));
      default:
        return 0;
    }
  }

  /**
   * Create a checkout session with destination charge
   * 
   * Payment flows: Customer → Stripe → (fee to Platform) → Seller's Connected Account
   * 
   * @example
   * const session = await stripe.createCheckoutSession({
   *   connectedAccountId: 'acct_seller123',
   *   customerEmail: 'customer@example.com',
   *   lineItems: [{ name: 'Sample Pack', amountCents: 999, quantity: 1 }],
   *   successUrl: 'https://yourapp.com/success',
   *   cancelUrl: 'https://yourapp.com/cancel',
   *   orderId: 'order_123',
   *   platformFee: { type: 'fixed', fixedAmountCents: 50 }
   * });
   * // Redirect customer to session.url
   */
  async createCheckoutSession(options: CreateCheckoutOptions): Promise<CheckoutSession> {
    // Calculate totals
    const totalAmount = options.lineItems.reduce(
      (sum, item) => sum + item.amountCents * item.quantity,
      0
    );
    const platformFeeAmount = this.calculatePlatformFee(totalAmount, options.platformFee);
    const sellerReceives = totalAmount - platformFeeAmount;

    // Build request body
    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('success_url', options.successUrl);
    params.set('cancel_url', options.cancelUrl);
    params.set('customer_email', options.customerEmail);
    params.set('metadata[order_id]', options.orderId);
    params.set('metadata[platform]', 'frogdrip');

    // Destination charge - payment goes to connected account
    params.set('payment_intent_data[transfer_data][destination]', options.connectedAccountId);
    
    // Platform fee (collected by platform)
    if (platformFeeAmount > 0) {
      params.set('payment_intent_data[application_fee_amount]', String(platformFeeAmount));
    }

    // Add line items
    options.lineItems.forEach((item, idx) => {
      params.set(`line_items[${idx}][quantity]`, String(item.quantity));
      params.set(`line_items[${idx}][price_data][currency]`, item.currency || 'usd');
      params.set(`line_items[${idx}][price_data][unit_amount]`, String(item.amountCents));
      params.set(`line_items[${idx}][price_data][product_data][name]`, item.name);
      if (item.description) {
        params.set(`line_items[${idx}][price_data][product_data][description]`, item.description);
      }
      if (item.imageUrl) {
        params.set(`line_items[${idx}][price_data][product_data][images][0]`, item.imageUrl);
      }
    });

    // Add custom metadata
    if (options.metadata) {
      Object.entries(options.metadata).forEach(([key, value]) => {
        params.set(`metadata[${key}]`, value);
      });
    }

    const response = await fetch(`${this.apiBase}/checkout/sessions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Stripe error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();

    return {
      id: options.orderId,
      providerSessionId: data.id,
      provider: 'stripe',
      url: data.url,
      status: 'pending',
      amountTotal: totalAmount,
      platformFeeAmount,
      sellerReceives,
      expiresAt: new Date(data.expires_at * 1000),
    };
  }

  /**
   * Retrieve a checkout session by ID
   */
  async getCheckoutSession(sessionId: string): Promise<CheckoutSession | null> {
    try {
      const response = await fetch(`${this.apiBase}/checkout/sessions/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      });

      if (!response.ok) return null;

      const data = await response.json();
      const platformFee = data.payment_intent?.application_fee_amount || 0;

      return {
        id: data.metadata?.order_id || sessionId,
        providerSessionId: data.id,
        provider: 'stripe',
        url: data.url || '',
        status: data.payment_status === 'paid' ? 'complete' : 'pending',
        amountTotal: data.amount_total,
        platformFeeAmount: platformFee,
        sellerReceives: data.amount_total - platformFee,
        expiresAt: new Date(data.expires_at * 1000),
      };
    } catch {
      return null;
    }
  }

  // ==========================================
  // Webhooks
  // ==========================================

  /**
   * Verify and parse a webhook event
   * 
   * @example
   * app.post('/webhook', async (req, res) => {
   *   const event = await stripe.verifyWebhook(
   *     req.body, // raw body string
   *     req.headers['stripe-signature']
   *   );
   *   
   *   if (event.type === 'checkout.session.completed') {
   *     // Handle successful payment
   *   }
   * });
   */
  async verifyWebhook(
    payload: string,
    signatureHeader: string | null
  ): Promise<WebhookEvent | null> {
    if (!signatureHeader) return null;

    // Parse signature header
    const parts = signatureHeader.split(',').map((p) => p.trim());
    const tPart = parts.find((p) => p.startsWith('t='));
    const v1Part = parts.find((p) => p.startsWith('v1='));
    if (!tPart || !v1Part) return null;

    const timestamp = tPart.slice(2);
    const signature = v1Part.slice(3);
    const signedPayload = `${timestamp}.${payload}`;

    // Verify signature using Web Crypto API
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(this.webhookSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const sigBuf = await crypto.subtle.sign('HMAC', key, enc.encode(signedPayload));
    const expected = Array.from(new Uint8Array(sigBuf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    // Timing-safe comparison
    if (expected.length !== signature.length) return null;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) {
      diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
    }
    if (diff !== 0) return null;

    // Parse event
    const event = JSON.parse(payload);

    return {
      id: event.id,
      type: event.type,
      provider: 'stripe',
      data: event.data?.object || {},
      createdAt: new Date(event.created * 1000),
    };
  }

  // ==========================================
  // Refunds
  // ==========================================

  /**
   * Create a refund for a payment
   * 
   * @example
   * const refund = await stripe.createRefund({
   *   paymentId: 'pi_xxx',
   *   amountCents: 500, // Partial refund of $5
   *   reason: 'requested_by_customer',
   *   refundPlatformFee: true
   * });
   */
  async createRefund(options: RefundOptions): Promise<RefundResult> {
    const params = new URLSearchParams();
    params.set('payment_intent', options.paymentId);
    
    if (options.amountCents) {
      params.set('amount', String(options.amountCents));
    }
    
    if (options.reason && options.reason !== 'other') {
      params.set('reason', options.reason);
    }

    // Refund platform fee as well
    if (options.refundPlatformFee) {
      params.set('refund_application_fee', 'true');
    }

    const response = await fetch(`${this.apiBase}/refunds`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Refund error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      status: data.status === 'succeeded' ? 'succeeded' : 'pending',
      amountRefunded: data.amount,
      platformFeeRefunded: options.refundPlatformFee ? 
        Math.round(data.amount * 0.01) : 0, // Estimate
    };
  }

  // ==========================================
  // Account Balance
  // ==========================================

  /**
   * Get balance for a connected account
   */
  async getAccountBalance(accountId: string): Promise<AccountBalance> {
    const response = await fetch(`${this.apiBase}/balance`, {
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        'Stripe-Account': accountId,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch balance');
    }

    const data = await response.json();
    const available = data.available?.[0] || { amount: 0, currency: 'usd' };
    const pending = data.pending?.[0] || { amount: 0, currency: 'usd' };

    return {
      accountId,
      available: available.amount,
      pending: pending.amount,
      currency: available.currency,
    };
  }
}

