# FrogDrip Payment SDK

A unified payment gateway SDK for integrating Stripe Connect across multiple applications.

## Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   TRNDFY App    │     │ TradeSeasonals  │     │  Future App X   │
│                 │     │                 │     │                 │
│  [Checkout] ────┼─────┼──► Payment SDK ◄┼─────┼──── [Checkout]  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │   FrogDrip Gateway  │
                    │  (Stripe Connect)   │
                    │                     │
                    │  • OAuth flow       │
                    │  • Checkout sessions│
                    │  • Platform fees    │
                    │  • Webhooks         │
                    └─────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │       Stripe        │
                    │   Connected Accounts│
                    └─────────────────────┘
```

## Features

- 🔗 **Stripe Connect** - Standard accounts (free, no extra fees)
- 💰 **Platform Fees** - Collect fees on each transaction
- 🔒 **OAuth Flow** - Secure seller onboarding
- 📱 **Embeddable Widget** - Drop-in checkout popup
- 🎨 **Customizable** - Theme, colors, branding
- 🔔 **Webhooks** - Payment event notifications

## Installation

```bash
npm install @frogdrip/payment-sdk
```

## Quick Start

### 1. Server Setup (Node.js)

```typescript
import { createPaymentGateway } from '@frogdrip/payment-sdk/server';

const gateway = createPaymentGateway({
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY!,
    clientId: process.env.STRIPE_CLIENT_ID!,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    defaultPlatformFee: { type: 'fixed', fixedAmountCents: 50 } // $0.50 per tx
  }
});
```

### 2. Seller Onboarding (OAuth)

```typescript
// Generate OAuth URL for seller to connect their Stripe account
app.get('/connect/stripe', (req, res) => {
  const authUrl = gateway.stripe.getOAuthUrl({
    redirectUri: 'https://yourapp.com/connect/callback',
    email: req.user.email,
    state: req.user.id
  });
  res.redirect(authUrl);
});

// Handle OAuth callback
app.get('/connect/callback', async (req, res) => {
  const result = await gateway.stripe.handleOAuthCallback(
    req.query.code as string,
    req.query.state as string
  );
  
  if (result.success) {
    // Save result.accountId to your database
    await db.users.update({
      where: { id: result.state },
      data: { stripeAccountId: result.accountId }
    });
    res.redirect('/dashboard?connected=true');
  } else {
    res.redirect('/dashboard?error=' + result.error);
  }
});
```

### 3. Create Checkout Session

```typescript
app.post('/api/checkout', async (req, res) => {
  const session = await gateway.stripe.createCheckoutSession({
    connectedAccountId: 'acct_seller123', // Seller's Stripe account
    customerEmail: 'customer@example.com',
    lineItems: [
      { name: 'Sample Pack', amountCents: 999, quantity: 1 }
    ],
    successUrl: 'https://yourapp.com/success',
    cancelUrl: 'https://yourapp.com/cancel',
    orderId: 'order_123',
    platformFee: { type: 'fixed', fixedAmountCents: 50 }
  });
  
  res.json({ url: session.url });
});
```

### 4. Handle Webhooks

```typescript
app.post('/webhooks/stripe', async (req, res) => {
  const event = await gateway.stripe.verifyWebhook(
    req.body, // raw body string
    req.headers['stripe-signature'] as string
  );
  
  if (!event) {
    return res.status(400).send('Invalid signature');
  }
  
  switch (event.type) {
    case 'checkout.session.completed':
      // Payment successful - fulfill order
      const orderId = event.data.metadata?.order_id;
      await fulfillOrder(orderId);
      break;
      
    case 'charge.refunded':
      // Handle refund
      break;
  }
  
  res.json({ received: true });
});
```

## Client-Side Usage

### Option A: Widget (Script Tag)

```html
<script 
  src="https://sdk.frogdrip.com/widget.js"
  data-api-endpoint="https://api.frogdrip.com"
  data-account-id="acct_xxx"
  data-theme="dark"
  data-brand-color="#ff3232"
></script>

<button onclick="openCheckout()">Buy Now</button>

<script>
function openCheckout() {
  FrogDripPayments.checkout({
    items: [
      { name: 'Sample Pack', price: 9.99, quantity: 1 }
    ],
    customerEmail: 'customer@example.com',
    orderId: 'order_123',
    onSuccess: (data) => {
      console.log('Payment successful!', data);
      window.location.href = '/thank-you';
    },
    onCancel: () => {
      console.log('Payment cancelled');
    },
    onError: (error) => {
      console.error('Payment error:', error);
    }
  });
}
</script>
```

### Option B: JavaScript SDK

```typescript
import { FrogDripClient } from '@frogdrip/payment-sdk';

const client = new FrogDripClient({
  apiEndpoint: 'https://api.frogdrip.com',
  accountId: 'acct_xxx'
});

// Create checkout and redirect
const session = await client.createCheckout({
  items: [{ name: 'Sample Pack', amountCents: 999, quantity: 1 }],
  customerEmail: 'customer@example.com',
  orderId: 'order_123',
  successUrl: window.location.origin + '/success',
  cancelUrl: window.location.origin + '/cancel'
});

window.location.href = session.url;

// Or use popup mode
client.openCheckoutPopup({
  items: [...],
  customerEmail: '...',
  orderId: '...',
  successUrl: '...',
  cancelUrl: '...'
}, {
  onSuccess: (session) => console.log('Paid!'),
  onCancel: () => console.log('Cancelled'),
  onError: (err) => console.error(err)
});
```

## Platform Fee Models

```typescript
// Fixed fee: $0.50 per transaction
{ type: 'fixed', fixedAmountCents: 50 }

// Percentage: 0.5% of transaction
{ type: 'percentage', percentage: 0.005 }

// Fixed + Percentage: $0.05 + 0.25%
{ 
  type: 'fixed_plus_percentage', 
  fixedAmountCents: 5, 
  percentage: 0.0025 
}
```

## Money Flow Example

```
Customer pays:           $10.00
Stripe fee (2.9%+$0.30): -$0.59
Platform fee:            -$0.50
Seller receives:         $8.91
```

## Environment Variables

```env
# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_CLIENT_ID=ca_xxx          # For Connect OAuth
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Platform
FROGDRIP_API_URL=https://api.frogdrip.com
```

## API Reference

### Server SDK

| Method | Description |
|--------|-------------|
| `getOAuthUrl(options)` | Generate OAuth URL for seller onboarding |
| `handleOAuthCallback(code, state)` | Exchange OAuth code for connected account |
| `getConnectedAccount(accountId)` | Get connected account details |
| `disconnectAccount(accountId)` | Revoke access to connected account |
| `createCheckoutSession(options)` | Create checkout with destination charge |
| `getCheckoutSession(sessionId)` | Retrieve checkout session status |
| `verifyWebhook(payload, signature)` | Verify and parse webhook event |
| `createRefund(options)` | Create a refund for a payment |
| `getAccountBalance(accountId)` | Get connected account balance |

### Client SDK

| Method | Description |
|--------|-------------|
| `createCheckout(options)` | Create checkout session and get URL |
| `redirectToCheckout(options)` | Create checkout and redirect immediately |
| `getCheckoutStatus(sessionId)` | Get checkout session status |
| `openCheckoutPopup(options, callbacks)` | Open checkout in popup window |

## Stripe Connect Account Types

| Type | Cost | Liability | Best For |
|------|------|-----------|----------|
| **Standard** | Free | User | FrogDrip ✅ |
| Express | $2/mo + 0.25% | Shared | White-label |
| Custom | $2/mo + 0.25% | Platform | Full control |

We use **Standard Connect** - it's free and users are responsible for their own compliance.

## License

MIT

