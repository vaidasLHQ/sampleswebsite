# SampleVault / TRNDFY Project Context

**Last Updated:** December 29, 2025

## Quick Start (Copy/Paste to New Chat)

```
Continue working on my SampleVault/TRNDFY project. Here's the current state:

**Project Location:** /Users/vaidasbalciunas/Desktop/Sample/website_solidstart

**Live URL:** https://website-solidstart.pages.dev

**Tech Stack:**
- SolidStart (SSR framework)
- Cloudflare Pages (hosting)
- Supabase (auth + database)
- Stripe (payments - basic checkout, no Connect)

**Current Status:**
✅ Website deployed and working
✅ User authentication (login/register/forgot password)
✅ Sample packs browsing and cart
✅ Stripe checkout (basic - payments go to FrogDrip account)
✅ Download system with tokens
❌ Stripe Connect disabled (was causing issues in sandbox mode)
⚠️ Email delivery: Currently using Resend sandbox (only delivers to vaidas@lithuaniahq.com)

**Key Files:**
- `src/routes/api/checkout.ts` - Stripe checkout endpoint
- `src/routes/api/stripe-webhook.ts` - Webhook handler
- `src/lib/serverEnv.ts` - Server environment variables
- `src/lib/supabase.ts` - Supabase client

**Cloudflare Secrets Set:**
- SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_KEY
- STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY
- STRIPE_CONNECTED_ACCOUNT_ID (empty - Connect disabled)
- STRIPE_CLIENT_ID

**Stripe Account:** FrogDrip (UAB Coded) - Test mode

**Before Going Live Checklist:**
1. Verify domain in Resend (lithuaniahq.com)
2. Update Supabase SMTP sender email from sandbox
3. Complete Stripe business verification
4. Switch Stripe to Live mode
5. Update all Cloudflare secrets with live keys

Read PROJECT_CONTEXT.md for full details.
```

---

## Full Project Details

### Architecture

```
/Users/vaidasbalciunas/Desktop/Sample/
├── website_solidstart/          # Main SolidStart app
│   ├── src/
│   │   ├── routes/              # Pages and API routes
│   │   │   ├── api/             # Server endpoints
│   │   │   │   ├── checkout.ts  # Stripe checkout
│   │   │   │   └── stripe-webhook.ts
│   │   │   ├── cart.tsx         # Shopping cart
│   │   │   ├── browse.tsx       # Sample browsing
│   │   │   ├── login.tsx        # Auth pages
│   │   │   └── ...
│   │   ├── lib/                 # Shared utilities
│   │   │   ├── supabase.ts
│   │   │   ├── serverEnv.ts
│   │   │   └── stripe.ts
│   │   └── components/          # UI components
│   ├── dist/                    # Built output
│   └── wrangler.toml            # Cloudflare config
└── payment-sdk/                 # Reusable payment SDK (created but not deployed)
```

### Database (Supabase)

**Project URL:** https://supabase.com/dashboard/project/qborzulfzciqhjyfxcjz

**Tables:**
- `users` - User accounts
- `orders` - Purchase orders (includes `download_token`)
- `order_items` - Items in each order
- `samples` / `sample_packs` - Product catalog

### Stripe Configuration

**Dashboard:** https://dashboard.stripe.com (FrogDrip / UAB Coded account)

**Mode:** Sandbox/Test

**Connect Status:** Disabled (STRIPE_CONNECTED_ACCOUNT_ID is empty)
- Was set up but sandbox mode prevented completing verification
- Can re-enable later for multi-seller platform

**Test Card:** 4242 4242 4242 4242

### Deployment

**Cloudflare Pages Project:** website-solidstart

**Deploy Command:**
```bash
cd /Users/vaidasbalciunas/Desktop/Sample/website_solidstart
npm run build && npx wrangler pages deploy dist --project-name=website-solidstart
```

### Important Reminders

1. **Email Delivery (Resend):**
   - Currently sandbox mode - only delivers to vaidas@lithuaniahq.com
   - Verify domain at https://resend.com/domains
   - Update Supabase SMTP at https://supabase.com/dashboard/project/qborzulfzciqhjyfxcjz/auth/smtp

2. **Stripe Connect (Future):**
   - If you need multiple sellers, re-enable Connect in Live mode
   - Set `STRIPE_CONNECTED_ACCOUNT_ID` in Cloudflare
   - Complete business verification first

3. **Team Member:**
   - Colleague email: daumantas@trndfy.com (added to Supabase)

### Recent Changes (Dec 29, 2025)

1. Implemented Stripe Connect OAuth flow
2. Created payment-sdk package
3. Fixed download_token not-null constraint in checkout
4. Disabled Connect due to sandbox verification issues
5. Reverted to basic Stripe checkout

### Files Created/Modified

- `src/routes/api/checkout.ts` - Added download token generation
- `src/routes/connect/authorize.tsx` - Stripe Connect OAuth (can delete if not needed)
- `src/routes/connect/callback.tsx` - OAuth callback handler
- `payment-sdk/` - Reusable SDK (not published yet)

