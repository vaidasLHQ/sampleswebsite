# SampleVault Project - Quick Start Context

**Project Location:** `/Users/vaidasbalciunas/Desktop/Sample/website_solidstart`  
**Live URL:** https://website-solidstart.pages.dev  
**Last Updated:** December 19, 2024

---

## 🎯 Current State

### ✅ Fully Working Features

1. **V12 Homepage** - Main homepage with split layout (60% hero / 40% sample browser)
   - Dark industrial techno aesthetic (red #ff3232 accent)
   - Audio player with Howler.js
   - Background audio preloading for instant playback
   - Mobile responsive with hamburger menu
   - Sample browser with duration, NEW badges, favorites, tags, action buttons

2. **E-commerce System (DEPLOYED & WORKING)**
   - Shopping cart with localStorage persistence
   - Stripe Checkout integration (test mode)
   - Stripe webhook for order fulfillment
   - Supabase database (orders, order_items tables)
   - Supabase Storage (sample-previews: public, sample-full: private)
   - Email delivery via Resend
   - Download system with signed URLs

3. **User Authentication & Vault**
   - Login/Register pages (V12-themed)
   - Supabase Auth integration
   - Email confirmation disabled (for testing)
   - User vault showing purchased samples
   - Orders linked to user_id
   - Cart automatically clears after purchase
   - Purchased samples appear in vault immediately

4. **Database**
   - `orders` table with `user_id` column (links to auth.users)
   - `order_items` table
   - RLS policies enabled for secure access
   - Users can only see their own orders

---

## 🛠 Tech Stack

- **Frontend:** SolidJS + SolidStart + TypeScript
- **Audio:** Howler.js
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Payment:** Stripe (test mode)
- **Email:** Resend
- **Deployment:** Cloudflare Pages
- **Build Tool:** Vinxi

---

## 📁 Key Files & Structure

### Frontend Routes
- `src/routes/index.tsx` - V12 homepage (main landing page)
- `src/routes/v12.tsx` - V12 version (backup)
- `src/routes/v1.tsx` through `src/routes/v11.tsx` - A/B testing variants
- `src/routes/login.tsx` - Login page (V12-themed)
- `src/routes/register.tsx` - Registration page (V12-themed)
- `src/routes/vault.tsx` - User's purchased samples vault
- `src/routes/cart.tsx` - Shopping cart
- `src/routes/checkout/success.tsx` - Post-payment success page (clears cart, redirects to vault)

### Components
- `src/components/SampleRowV12.tsx` - Artlist-inspired sample row component
- `src/components/AudioPlayer.tsx` - Audio playback component
- `src/components/CategoryTabs.tsx` - Category filtering

### Data & Logic
- `src/data/samples.ts` - Sample data with duration, isNew, pricing
- `src/lib/cart.ts` - Cart state management (localStorage)
- `src/lib/demoPlayer.ts` - Global audio player with Howler.js
- `src/lib/supabase.ts` - Client-side Supabase client
- `src/lib/supabaseServer.ts` - Server-side Supabase client
- `src/lib/email.ts` - Resend email integration
- `src/lib/stripe.ts` - Stripe integration

### API Routes
- `src/routes/api/checkout.ts` - Creates Stripe checkout session, saves order with user_id
- `src/routes/api/stripe-webhook.ts` - Handles Stripe payment completion
- `src/routes/api/downloads.ts` - Generates signed download URLs

### Styling
- `src/app.css` - All styles (V12 theme, mobile responsive, vault, auth pages)

### Database Migrations
- `supabase/migrations/20251219000000_add_user_id_to_orders.sql` - Adds user_id to orders table
- RLS policies applied via Supabase dashboard (users can view own orders)

---

## 🔑 Configuration

### Environment Variables (Cloudflare Pages)
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_URL` - Supabase project URL
- `STRIPE_SECRET_KEY` - Stripe secret key (test mode)
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key (test mode)
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `RESEND_API_KEY` - Resend API key
- `EMAIL_FROM` - Email sender address

### Supabase Configuration
- **Project URL:** https://qborzulfzciqhjyfxcjz.supabase.co
- **Tables:** `orders`, `order_items`
- **Storage Buckets:** `sample-previews` (public), `sample-full` (private)
- **Auth:** Email confirmation disabled (for testing)
- **SMTP:** Resend configured (sandbox: onboarding@resend.dev)

### Resend Configuration
- **API Key:** Created for Supabase SMTP
- **Domain:** Not verified yet (using sandbox)
- **Note:** Before going live, verify domain and update Supabase SMTP sender email

---

## 🧪 Test Credentials

### Demo Account
- **Email:** `demo@samplevault.com`
- **Password:** `Demo2024!`

### Stripe Test Card
- **Card Number:** `4242 4242 4242 4242`
- **Expiry:** Any future date (e.g., `12/34`)
- **CVC:** Any 3 digits (e.g., `123`)

---

## 🚀 Commands

```bash
# Development
cd /Users/vaidasbalciunas/Desktop/Sample/website_solidstart
npm run dev

# Build & Deploy
npm run build && npx wrangler pages deploy dist --commit-dirty=true
```

---

## 📋 Recent Changes (December 19, 2024)

1. ✅ **V12 Homepage** - Made main homepage, mobile responsive
2. ✅ **User Authentication** - Login/Register pages with V12 theme
3. ✅ **User Vault** - Displays purchased samples with download functionality
4. ✅ **Database Migration** - Added `user_id` column to orders table
5. ✅ **RLS Policies** - Users can only access their own orders
6. ✅ **Cart Clearing** - Cart automatically clears after successful payment
7. ✅ **Vault Integration** - Purchased samples appear in vault immediately
8. ✅ **Email Configuration** - Resend SMTP configured (sandbox mode)
9. ✅ **Email Confirmation** - Disabled for testing (can be re-enabled later)

---

## ⚠️ Important Notes

### Before Going Live
1. **Verify Resend Domain** - Add and verify domain at https://resend.com/domains
2. **Update Supabase SMTP** - Change sender email from `onboarding@resend.dev` to verified domain email (e.g., `noreply@lithuaniahq.com`) at https://supabase.com/dashboard/project/qborzulfzciqhjyfxcjz/auth/smtp
3. **Enable Email Confirmation** - Re-enable email confirmation in Supabase Auth settings
4. **Switch to Stripe Live Keys** - Update environment variables with live Stripe keys
5. **Upload Real Audio Files** - Replace test MP3s with actual sample files

### Current Limitations
- Email confirmation disabled (users can register without verification)
- Using Resend sandbox email (only sends to account owner)
- Stripe test mode (not processing real payments)
- Test audio files (18 MP3s for testing)

---

## 🎨 Design System

### Colors
- **Primary Accent:** `#ff3232` (red)
- **Background:** Dark industrial theme
- **Text:** White/light gray with opacity variations

### Typography
- Modern, bold headings
- Clean, readable body text

### Layout
- Split layout on homepage (hero left, samples right)
- Mobile-first responsive design
- Hamburger menu for mobile navigation

---

## 📊 Database Schema

### `orders` table
- `id` (uuid, primary key)
- `email` (text)
- `user_id` (uuid, references auth.users, nullable)
- `status` (text: 'pending' | 'paid')
- `stripe_session_id` (text)
- `download_token` (text)
- `email_sent_at` (timestamp)
- `email_error` (text)
- `created_at` (timestamp)

### `order_items` table
- `id` (uuid, primary key)
- `order_id` (uuid, references orders)
- `sample_id` (integer)
- `quantity` (integer)
- `price_cents` (integer)
- `created_at` (timestamp)

---

## 🔍 How It Works

### Purchase Flow
1. User adds samples to cart (stored in localStorage)
2. User clicks "Pay with Stripe" → creates Stripe checkout session
3. Order created in database with `user_id` (if logged in)
4. User completes payment on Stripe
5. Stripe webhook marks order as 'paid'
6. Success page clears cart and redirects to vault
7. Vault fetches user's orders and displays purchased samples
8. User can download full-quality files via signed URLs

### Vault Access
- Fetches orders where `user_id` matches current user OR `email` matches
- Displays unique purchased samples (deduplicates by sample_id)
- Shows purchase date, BPM, key, artwork
- Download button generates signed URL from Supabase Storage

---

## 🐛 Known Issues / Future Improvements

- None currently blocking - all core features working
- Could add: Favorites/Wishlist, Order History, Account Settings, Forgot Password flow

---

## 📞 Support Info

- **Project Owner:** vaidas@lithuaniahq.com
- **Resend Account:** vaidas@lithuaniahq.com
- **Supabase Project:** qborzulfzciqhjyfxcjz

---

**Ready to continue development!** 🚀
