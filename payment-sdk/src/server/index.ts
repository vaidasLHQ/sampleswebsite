// ============================================
// FrogDrip Payment SDK - Server Entry Point
// ============================================

export { StripeConnectServer } from './stripe-connect';
export type { StripeConnectConfig } from './stripe-connect';

// Re-export all types
export * from '../types';

/**
 * Create a FrogDrip Payment Gateway instance
 * 
 * @example
 * import { createPaymentGateway } from '@frogdrip/payment-sdk/server';
 * 
 * const gateway = createPaymentGateway({
 *   stripe: {
 *     secretKey: process.env.STRIPE_SECRET_KEY!,
 *     clientId: process.env.STRIPE_CLIENT_ID!,
 *     webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
 *     defaultPlatformFee: { type: 'fixed', fixedAmountCents: 50 }
 *   }
 * });
 * 
 * // Generate OAuth URL for seller to connect their Stripe
 * const authUrl = gateway.stripe.getOAuthUrl({
 *   redirectUri: 'https://yourapp.com/stripe/callback',
 *   email: 'seller@example.com'
 * });
 * 
 * // Create checkout session
 * const session = await gateway.stripe.createCheckoutSession({
 *   connectedAccountId: 'acct_xxx',
 *   customerEmail: 'customer@example.com',
 *   lineItems: [{ name: 'Product', amountCents: 1000, quantity: 1 }],
 *   successUrl: 'https://yourapp.com/success',
 *   cancelUrl: 'https://yourapp.com/cancel',
 *   orderId: 'order_123'
 * });
 */
import { StripeConnectServer, StripeConnectConfig } from './stripe-connect';

export interface PaymentGatewayConfig {
  stripe?: StripeConnectConfig;
  // Future providers:
  // paypal?: PayPalConfig;
  // crypto?: CryptoConfig;
}

export interface PaymentGateway {
  stripe: StripeConnectServer;
  // paypal: PayPalProvider;
  // crypto: CryptoProvider;
}

export function createPaymentGateway(config: PaymentGatewayConfig): PaymentGateway {
  if (!config.stripe) {
    throw new Error('Stripe configuration is required');
  }

  return {
    stripe: new StripeConnectServer(config.stripe),
  };
}

