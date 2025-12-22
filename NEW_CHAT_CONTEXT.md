# TRNDFY Project Context - Continue From Here

## Project Overview
TRNDFY is a royalty-free sample pack e-commerce website built with SolidStart + TypeScript, Supabase (auth + database), Stripe (payments), and deployed to Cloudflare Pages.

**Live URL:** https://website-solidstart.pages.dev
**GitHub:** https://github.com/vaidasLHQ/sampleswebsite

## Business Info
- **Company:** UAB Coded
- **Contact:** vaidas@coded.ws
- **Refunds:** No refunds
- **Analytics:** Google Analytics enabled

## Recent Implementation (Dec 22, 2025)

### 1. Login-Only Purchase Flow ✅
- Only logged-in users can checkout (no guest purchases)
- Purchased samples saved to user's Vault
- No email download links sent - everything accessed via Vault
- Email sent only once during registration for verification

### 2. New Pages Created ✅
- `/browse` - Full-page sample browser with search, filters (category, key, BPM), and sorting
- `/terms` - Terms of Service
- `/privacy` - Privacy Policy (mentions Google Analytics)
- `/license` - Royalty-free license terms
- `/faq` - Accordion-style FAQ with categories
- `/contact` - Contact page with email display

### 3. Vault Enhancements ✅
- Tab navigation: "My Samples" and "Order History"
- Order history with PDF receipt generation (client-side)
- Invoice button next to each sample download
- Fixed audio playback with play/pause controls
- Changed "Download WAV" to "Download MP3"

### 4. UI Improvements ✅
- "Owned" badges on already-purchased samples
- "Add to Cart" disabled for owned items (links to Vault instead)
- **Neon Wire animation** on secondary buttons (CART, LOG IN) - red text, animated border trace
- **Plasma Core animation** on primary buttons (GET STARTED) - red text/frame, pulsing glow, orbiting particles

### 5. Navigation Updates ✅
- Added "Browse" link to main navigation
- Updated footer with all new pages (FAQ, License, Privacy, Terms, Contact)

## Key Files Modified
- `src/app.css` - All button animations (Neon Wire + Plasma Core)
- `src/app.tsx` - Navigation and footer links
- `src/routes/vault.tsx` - Order history, tabs, audio playback, invoice
- `src/routes/cart.tsx` - Login-required checkout
- `src/routes/browse.tsx` - NEW: Sample browser page
- `src/routes/index.tsx` - "Owned" badge integration
- `src/components/SampleRowV12.tsx` - "Owned" badge, disabled cart button
- `src/routes/api/checkout.ts` - Requires userId instead of email
- `src/routes/api/stripe-webhook.ts` - Removed email sending

## Button Animation CSS Reference

### Neon Wire (.btn-secondary) - CART, LOG IN
```css
@keyframes border-trace {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}
.btn-secondary {
  background: transparent;
  color: #ff3232;
  border: 2px solid transparent;
  background-image: linear-gradient(#000, #000), 
    linear-gradient(90deg, #ff3232, #ff6666, #ff3232);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  animation: border-trace 3s linear infinite;
}
```

### Plasma Core (.btn-primary) - GET STARTED
```css
@keyframes plasma-pulse { /* Pulsing glow effect */ }
@keyframes orbit { /* Particle 1 orbiting */ }
@keyframes orbit-reverse { /* Particle 2 reverse orbit */ }
.btn-primary {
  background: transparent;
  border: 2px solid #ff3232;
  color: #ff3232;
  animation: plasma-pulse 2s ease-in-out infinite;
}
.btn-primary::before, .btn-primary::after {
  /* Orbiting particles */
  animation: orbit 3s linear infinite;
}
```

## Supabase Tables
- `orders` - Order records with user_id, stripe_session_id, total_cents
- `order_items` - Sample items in each order
- `sample-previews` bucket - MP3 preview files
- `sample-full` bucket - Full WAV files (if available)

## Commands
```bash
cd /Users/vaidasbalciunas/Desktop/Sample/website_solidstart
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npx wrangler pages deploy dist --project-name=website-solidstart  # Deploy
```

## Pre-Launch Reminder [[memory:12409078]]
Before going live, verify a domain in Resend and update Supabase SMTP sender email from sandbox to production domain.

## What's Ready
✅ Sample browsing and playback
✅ Shopping cart with login requirement
✅ Stripe checkout integration
✅ Vault with purchased samples
✅ Order history and PDF receipts
✅ Legal pages (terms, privacy, license)
✅ FAQ and contact pages
✅ Animated buttons (Neon Wire + Plasma Core)
✅ "Owned" badges for purchased samples

## Potential Next Steps
- Add actual content to Terms and Privacy pages (currently placeholder)
- Implement subscription/membership model
- Add sample pack bundles
- Improve mobile responsiveness
- Add more payment methods
- Implement wishlist feature
- Add social sharing for samples
