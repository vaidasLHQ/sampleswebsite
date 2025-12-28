// ============================================
// FrogDrip Payment SDK - Main Entry Point
// ============================================

/**
 * FrogDrip Payment SDK
 * 
 * A unified payment SDK for integrating Stripe Connect payments
 * across multiple applications with a single gateway.
 * 
 * @example
 * // Server-side (Node.js)
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
 * @example
 * // Client-side (Widget)
 * <script 
 *   src="https://sdk.frogdrip.com/widget.js"
 *   data-api-endpoint="https://api.frogdrip.com"
 *   data-account-id="acct_xxx"
 *   data-theme="dark"
 * ></script>
 * 
 * <script>
 *   FrogDripPayments.checkout({
 *     items: [{ name: 'Sample Pack', price: 9.99 }],
 *     onSuccess: (data) => console.log('Paid!', data)
 *   });
 * </script>
 */

// Export all types
export * from './types';

// Client-side utilities
export { FrogDripClient, type FrogDripClientConfig } from './client';

