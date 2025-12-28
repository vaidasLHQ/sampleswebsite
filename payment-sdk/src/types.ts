// ============================================
// FrogDrip Payment SDK - Type Definitions
// ============================================

/**
 * Payment provider types supported by the SDK
 */
export type PaymentProvider = 'stripe' | 'paypal' | 'crypto';

/**
 * Stripe Connect account types
 */
export type StripeConnectType = 'standard' | 'express' | 'custom';

/**
 * Platform configuration for initializing the SDK
 */
export interface PlatformConfig {
  /** Your FrogDrip Platform ID */
  platformId: string;
  /** API endpoint for FrogDrip Payment Gateway */
  apiEndpoint?: string;
  /** Stripe publishable key (for client-side) */
  stripePublishableKey?: string;
  /** Environment: test or live */
  environment: 'test' | 'live';
}

/**
 * Connected account information stored in your database
 */
export interface ConnectedAccount {
  /** Provider-specific account ID (e.g., acct_xxx for Stripe) */
  accountId: string;
  /** Payment provider */
  provider: PaymentProvider;
  /** Account status */
  status: 'pending' | 'active' | 'disabled' | 'rejected';
  /** When the account was connected */
  connectedAt: Date;
  /** Account details from provider */
  details?: {
    businessName?: string;
    email?: string;
    country?: string;
    capabilities?: string[];
  };
}

/**
 * Line item for checkout
 */
export interface LineItem {
  /** Product/item name */
  name: string;
  /** Description (optional) */
  description?: string;
  /** Unit price in cents (e.g., 1000 = $10.00) */
  amountCents: number;
  /** Currency (default: usd) */
  currency?: string;
  /** Quantity */
  quantity: number;
  /** Product image URL (optional) */
  imageUrl?: string;
  /** Metadata */
  metadata?: Record<string, string>;
}

/**
 * Platform fee configuration
 */
export interface PlatformFee {
  /** Fee type */
  type: 'fixed' | 'percentage' | 'fixed_plus_percentage';
  /** Fixed amount in cents (for 'fixed' or 'fixed_plus_percentage') */
  fixedAmountCents?: number;
  /** Percentage as decimal (e.g., 0.005 = 0.5%) */
  percentage?: number;
}

/**
 * Checkout session creation options
 */
export interface CreateCheckoutOptions {
  /** Connected account to receive payment */
  connectedAccountId: string;
  /** Customer email */
  customerEmail: string;
  /** Line items to charge */
  lineItems: LineItem[];
  /** URL to redirect after successful payment */
  successUrl: string;
  /** URL to redirect if customer cancels */
  cancelUrl: string;
  /** Your internal order/reference ID */
  orderId: string;
  /** Platform fee to collect */
  platformFee?: PlatformFee;
  /** Metadata to attach to the session */
  metadata?: Record<string, string>;
  /** Payment methods to allow */
  allowedPaymentMethods?: PaymentProvider[];
}

/**
 * Checkout session response
 */
export interface CheckoutSession {
  /** Session ID */
  id: string;
  /** Provider-specific session ID */
  providerSessionId: string;
  /** Provider used for this session */
  provider: PaymentProvider;
  /** Checkout URL to redirect customer */
  url: string;
  /** Session status */
  status: 'pending' | 'complete' | 'expired';
  /** Total amount in cents */
  amountTotal: number;
  /** Platform fee amount in cents */
  platformFeeAmount: number;
  /** Seller receives (after fees) */
  sellerReceives: number;
  /** When session expires */
  expiresAt: Date;
}

/**
 * OAuth authorization URL options
 */
export interface OAuthOptions {
  /** Where to redirect after OAuth completes */
  redirectUri: string;
  /** State parameter for CSRF protection */
  state?: string;
  /** Pre-fill user email in Stripe onboarding */
  email?: string;
  /** Stripe Connect account type */
  connectType?: StripeConnectType;
}

/**
 * OAuth callback result
 */
export interface OAuthCallbackResult {
  /** Success or failure */
  success: boolean;
  /** Connected account ID if successful */
  accountId?: string;
  /** Error message if failed */
  error?: string;
  /** State parameter for verification */
  state?: string;
}

/**
 * Webhook event from payment provider
 */
export interface WebhookEvent {
  /** Event ID */
  id: string;
  /** Event type (e.g., 'checkout.session.completed') */
  type: string;
  /** Provider */
  provider: PaymentProvider;
  /** Event data */
  data: Record<string, unknown>;
  /** When event was created */
  createdAt: Date;
}

/**
 * Payment status for tracking
 */
export interface PaymentStatus {
  /** Your order ID */
  orderId: string;
  /** Checkout session ID */
  sessionId: string;
  /** Current status */
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';
  /** Amount charged (cents) */
  amountCharged: number;
  /** Platform fee collected (cents) */
  platformFeeCollected: number;
  /** Seller payout amount (cents) */
  sellerPayout: number;
  /** Provider-specific payment ID */
  providerPaymentId?: string;
  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Refund request options
 */
export interface RefundOptions {
  /** Payment/charge ID to refund */
  paymentId: string;
  /** Amount to refund in cents (null = full refund) */
  amountCents?: number;
  /** Reason for refund */
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer' | 'other';
  /** Additional notes */
  notes?: string;
  /** Whether to refund platform fee as well */
  refundPlatformFee?: boolean;
}

/**
 * Refund result
 */
export interface RefundResult {
  /** Refund ID */
  id: string;
  /** Refund status */
  status: 'pending' | 'succeeded' | 'failed';
  /** Amount refunded (cents) */
  amountRefunded: number;
  /** Platform fee refunded (cents) */
  platformFeeRefunded: number;
}

/**
 * Account payout/balance information
 */
export interface AccountBalance {
  /** Connected account ID */
  accountId: string;
  /** Available balance (cents) */
  available: number;
  /** Pending balance (cents) */
  pending: number;
  /** Currency */
  currency: string;
}

