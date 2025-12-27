# Kolkata Homes - Real Estate Marketplace

A production-grade real estate marketplace for Kolkata, built with Next.js 14, featuring map-based property search, Google OAuth, and Stripe payments.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **UI**: shadcn/ui + Tailwind CSS
- **Auth**: Google OAuth via Supabase
- **Database**: PostgreSQL with PostGIS (via Supabase)
- **ORM**: Prisma
- **Maps**: Leaflet + OpenStreetMap (Free, no API key needed!)
- **Storage**: Supabase Storage
- **Payments**: Stripe
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A Stripe account (test mode)
- Git

## ⚙️ Configuration Steps

### 1. Install Dependencies

Already done! If you need to reinstall:
```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **Project Settings** → **API**
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

5. Enable Google OAuth:
   - Go to **Authentication** → **Providers**
   - Enable **Google**
   - Add your Google OAuth credentials (see step 3)

6. Enable PostGIS Extension:
   - Go to **Database** → **Extensions**
   - Search for "postgis" and enable it

7. Get Database URL:
   - Go to **Project Settings** → **Database**
   - Copy the **Connection string** (URI mode)
   - Use it for `DATABASE_URL`

8. Set up Storage:
   - Go to **Storage**
   - Create a new bucket named `property-images`
   - Make it **public**

### 3. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Add authorized redirect URIs:
   ```
   http://localhost:3000/auth/callback
   https://YOUR_SUPABASE_PROJECT.supabase.co/auth/v1/callback
   ```
6. Copy **Client ID** and **Client Secret**
7. Add them to Supabase (Authentication → Providers → Google)

### 4. Set Up Stripe

1. Go to [stripe.com](https://stripe.com) and create an account
2. Toggle to **Test Mode** (top right)
3. Go to **Developers** → **API Keys**
4. Copy:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`

5. Create a Product:
   - Go to **Products** → **Add Product**
   - Name: "Broker Subscription"
   - Price: Monthly (e.g., ₹999/month)
   - Copy the **Price ID** → `NEXT_PUBLIC_BROKER_SUBSCRIPTION_PRICE_ID`

6. Set up Webhook (for local testing later):
   ```bash
   npm install -g stripe-cli
   stripe login
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   Copy the webhook signing secret → `STRIPE_WEBHOOK_SECRET`

### 5. Configure Environment Variables

Update `.env.local` with your actual values:

```env
# Database (from Supabase Project Settings → Database)
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Supabase (from Supabase Project Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Stripe (from Stripe Dashboard → Developers → API Keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Broker Subscription Price (from Stripe Product)
NEXT_PUBLIC_BROKER_SUBSCRIPTION_PRICE_ID=price_xxxxx
```

### 6. Set Up Database

Run Prisma migrations:
```bash
npx prisma generate
npx prisma db push
```

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🗺️ Map Features

This project uses **Leaflet with OpenStreetMap** - completely free with no API keys or credit cards needed!

- Interactive map for property search
- Click-to-select location when posting properties
- Automatic marker clustering
- Property location markers with popups

## 📱 Key Features

### For Users
- Browse properties with map-based search
- Advanced filters (price, BHK, property type, furnishing)
- View property details with image gallery
- Contact property owners via lead form

### For Property Owners
- Google sign-in only (no passwords!)
- Post properties with images
- Select exact location on map
- Track anonymous feedback in dashboard

### For Brokers
- Monthly subscription via Stripe
- Unlimited property listings
- Verified badge
- Priority support

### For Admins
- Approve/reject listings
- Verify brokers
- Moderate content

## 🚀 Deployment to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add all environment variables from `.env.local`
5. Deploy!

For Stripe webhooks in production:
- Add production webhook endpoint: `https://your-domain.com/api/webhooks/stripe`
- Copy the webhook secret to production env vars

## 📂 Project Structure

```
├── src/
│   ├── app/                      # Next.js app router pages
│   │   ├── api/                  # API routes
│   │   ├── properties/           # Property pages
│   │   ├── dashboard/            # User dashboard
│   │   └── post-property/        # Post property form
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── navbar.tsx
│   │   ├── property-card.tsx
│   │   ├── property-filters.tsx
│   │   └── map.tsx               # Leaflet map component
│   ├── actions/                  # Server actions
│   ├── lib/                      # Utilities
│   ├── config/                   # Configuration
│   ├── types/                    # TypeScript types
│   └── hooks/                    # Custom hooks
├── prisma/
│   └── schema.prisma             # Database schema
└── public/                       # Static files
```

## 🎨 Design System

**Kolkata-Inspired Colors:**
- Warm terracotta accents
- Soft whites and creams
- Muted blues (Hooghly river)
- Earthy tones

**UI Principles:**
- Clean, minimal design
- Subtle animations
- Mobile-first responsive
- Accessibility-focused

## 🔒 Security

- Google OAuth only (no password management)
- Server-side authentication checks
- Protected API routes
- Stripe secure payments
- Image upload validation

## 📝 License

This project is for educational and commercial use.

## 🤝 Support

For issues or questions, please open a GitHub issue.

---

**Made with ❤️ for Kolkata**
