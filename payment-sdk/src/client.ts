// ============================================
// FrogDrip Payment SDK - Client Library
// ============================================

import type { LineItem, CheckoutSession, PaymentProvider } from './types';

/**
 * Client configuration
 */
export interface FrogDripClientConfig {
  /** FrogDrip API endpoint */
  apiEndpoint: string;
  /** Your connected account ID */
  accountId: string;
  /** Stripe publishable key (for embedded checkout) */
  stripePublishableKey?: string;
}

/**
 * Checkout request options
 */
export interface CheckoutRequest {
  /** Line items */
  items: LineItem[];
  /** Customer email */
  customerEmail: string;
  /** Your order ID */
  orderId: string;
  /** Success redirect URL */
  successUrl: string;
  /** Cancel redirect URL */
  cancelUrl: string;
  /** Preferred payment methods */
  paymentMethods?: PaymentProvider[];
  /** Additional metadata */
  metadata?: Record<string, string>;
}

/**
 * FrogDrip Client SDK
 * 
 * Use this in your frontend apps (React, Vue, Solid, etc.)
 * 
 * @example
 * import { FrogDripClient } from '@frogdrip/payment-sdk';
 * 
 * const client = new FrogDripClient({
 *   apiEndpoint: 'https://api.frogdrip.com',
 *   accountId: 'acct_xxx'
 * });
 * 
 * // Create checkout and redirect
 * const session = await client.createCheckout({
 *   items: [{ name: 'Sample Pack', amountCents: 999, quantity: 1 }],
 *   customerEmail: 'customer@example.com',
 *   orderId: 'order_123',
 *   successUrl: window.location.origin + '/success',
 *   cancelUrl: window.location.origin + '/cancel'
 * });
 * 
 * // Redirect to checkout
 * window.location.href = session.url;
 */
export class FrogDripClient {
  private config: FrogDripClientConfig;

  constructor(config: FrogDripClientConfig) {
    this.config = config;
  }

  /**
   * Create a checkout session and get the URL to redirect to
   */
  async createCheckout(options: CheckoutRequest): Promise<CheckoutSession> {
    const response = await fetch(`${this.config.apiEndpoint}/checkout/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountId: this.config.accountId,
        lineItems: options.items,
        customerEmail: options.customerEmail,
        orderId: options.orderId,
        successUrl: options.successUrl,
        cancelUrl: options.cancelUrl,
        metadata: options.metadata,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || 'Failed to create checkout');
    }

    return response.json();
  }

  /**
   * Create checkout and immediately redirect
   */
  async redirectToCheckout(options: CheckoutRequest): Promise<void> {
    const session = await this.createCheckout(options);
    window.location.href = session.url;
  }

  /**
   * Get status of a checkout session
   */
  async getCheckoutStatus(sessionId: string): Promise<CheckoutSession> {
    const response = await fetch(
      `${this.config.apiEndpoint}/checkout/status/${sessionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get checkout status');
    }

    return response.json();
  }

  /**
   * Open checkout in a popup window (for seamless experience)
   */
  openCheckoutPopup(
    options: CheckoutRequest,
    callbacks?: {
      onSuccess?: (session: CheckoutSession) => void;
      onCancel?: () => void;
      onError?: (error: Error) => void;
    }
  ): void {
    const width = 500;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      '',
      'frogdrip-checkout',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );

    if (!popup) {
      callbacks?.onError?.(new Error('Popup blocked. Please allow popups for this site.'));
      return;
    }

    // Show loading state
    popup.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Checkout - Loading...</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0a0a0a;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .loader {
            text-align: center;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #333;
            border-top-color: #ff3232;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 16px;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        </style>
      </head>
      <body>
        <div class="loader">
          <div class="spinner"></div>
          <p>Preparing checkout...</p>
        </div>
      </body>
      </html>
    `);

    // Create session and redirect popup
    this.createCheckout(options)
      .then((session) => {
        popup.location.href = session.url;

        // Poll for completion
        const pollInterval = setInterval(() => {
          try {
            if (popup.closed) {
              clearInterval(pollInterval);
              // Check if payment completed
              this.getCheckoutStatus(session.providerSessionId)
                .then((status) => {
                  if (status.status === 'complete') {
                    callbacks?.onSuccess?.(status);
                  } else {
                    callbacks?.onCancel?.();
                  }
                })
                .catch(() => callbacks?.onCancel?.());
            }
          } catch {
            // Cross-origin access error - popup still open
          }
        }, 500);
      })
      .catch((error) => {
        popup.close();
        callbacks?.onError?.(error);
      });
  }
}

/**
 * Create a FrogDrip client instance
 */
export function createClient(config: FrogDripClientConfig): FrogDripClient {
  return new FrogDripClient(config);
}

