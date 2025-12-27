# 🏘️ Kolkata Realty Dashboard

A production-ready, role-based dashboard system for a real estate platform focused on Kolkata properties. Built with Next.js App Router, TypeScript, and shadcn/ui.

## ✨ Features

### 🎨 UI/UX
- **Kolkata-inspired color palette** - Warm terracotta accents with soft off-white backgrounds
- **Fully responsive** - Desktop sidebar, tablet collapsible, mobile drawer
- **Dark mode support** - Seamless theme switching
- **Clean animations** - Subtle, professional transitions
- **shadcn/ui components** - Modern, accessible, customizable

### 🔐 Role-Based Access Control

Three user roles with tailored experiences:

#### PUBLIC (Buyers/Visitors)
- Dashboard overview
- Browse properties
- Map explorer
- Market snapshot
- Saved properties (favorites)
- Price trends analytics
- Profile & settings

#### OWNER (Property Owners)
- All PUBLIC features
- Add new property
- My listings management
- Leads & inquiries
- Community reviews
- Verification status
- Notifications

#### BROKER (Real Estate Brokers)
- All OWNER features
- Listing performance analytics
- Advanced analytics dashboard
- Wallet & billing
- Premium features

---

## 📁 Project Structure

\`\`\`
src/
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx              # Main dashboard layout
│   │   ├── page.tsx                # Dashboard home
│   │   ├── properties/
│   │   │   ├── page.tsx            # Browse properties
│   │   │   ├── new/page.tsx        # Add new property
│   │   │   └── my/page.tsx         # My listings
│   │   ├── map/page.tsx            # Map explorer
│   │   ├── market/page.tsx         # Market snapshot
│   │   ├── leads/page.tsx          # Leads management
│   │   ├── billing/page.tsx        # Billing (BROKER)
│   │   ├── favorites/page.tsx      # Saved properties
│   │   ├── reviews/page.tsx        # Community reviews
│   │   ├── verification/page.tsx   # Verification status
│   │   ├── analytics/
│   │   │   ├── listings/page.tsx   # Listing performance
│   │   │   └── prices/page.tsx     # Price trends
│   │   ├── notifications/page.tsx  # Notifications
│   │   ├── profile/page.tsx        # User profile
│   │   └── settings/page.tsx       # Settings
│   └── globals.css                 # Global styles with Kolkata theme
│
├── components/
│   ├── dashboard/
│   │   ├── sidebar/
│   │   │   ├── dashboard-sidebar.tsx      # Desktop sidebar
│   │   │   ├── mobile-sidebar.tsx         # Mobile drawer
│   │   │   └── sidebar-provider.tsx       # Sidebar state
│   │   └── header/
│   │       ├── dashboard-header.tsx       # Top header
│   │       ├── user-menu.tsx              # User dropdown
│   │       └── notifications-dropdown.tsx # Notifications
│   └── ui/                         # shadcn/ui components
│
├── types/
│   └── dashboardSidebarLinks.tsx   # Sidebar configuration
│
└── hooks/
    └── use-user-role.ts            # Role management hook
\`\`\`

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm

### Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

---

## 🎨 Design System

### Color Palette (Kolkata-Inspired)

**Light Mode:**
- Background: Soft off-white (\`oklch(0.99 0.005 85)\`)
- Primary: Warm terracotta (\`oklch(0.62 0.19 35)\`)
- Accent: Soft orange tones
- Muted: Subtle warm grays

**Dark Mode:**
- Background: Deep charcoal with warm undertones
- Primary: Lighter terracotta
- Enhanced contrast while maintaining warmth

### Typography

- **Headings:** Gradient text (orange-600 → orange-400)
- **Body:** Clean, readable sans-serif
- **Monospace:** For code/data display

---

## 🧭 Navigation System

### Sidebar Structure

The sidebar is dynamically generated from [dashboardSidebarLinks.tsx](src/types/dashboardSidebarLinks.tsx) and filtered by user role.

**Sections:**
1. **Overview** - Dashboard, Market Snapshot
2. **Properties** - Browse, Add, My Listings, Map
3. **Leads & Engagement** - Leads, Reviews, Favorites
4. **Insights & Analytics** - Listing Performance, Price Trends
5. **Payments & Trust** - Billing, Verification
6. **Account** - Notifications, Profile, Settings

### Role Filtering

\`\`\`typescript
import { getSidebarLinksByRole } from "@/types/dashboardSidebarLinks";

const userRole = useUserRole(); // "PUBLIC" | "OWNER" | "BROKER"
const sections = getSidebarLinksByRole(userRole);
\`\`\`

---

## 📱 Responsive Behavior

| Screen Size | Behavior |
|-------------|----------|
| **Desktop (lg+)** | Fixed sidebar, collapsible |
| **Tablet (md-lg)** | Collapsible sidebar |
| **Mobile (<md)** | Drawer overlay |

---

## 🔧 Key Components

### Dashboard Sidebar
- Auto-filters links by role
- Active route highlighting
- Collapse/expand animation
- Badge support for notifications

### Dashboard Header
- Search bar
- Notifications dropdown
- User menu with role badge
- Mobile menu toggle

### Page Templates
All pages follow consistent structure:
- Page header with title
- Action buttons (role-aware)
- Stats cards
- Main content area
- Responsive grid layout

---

## 🎯 Role-Based Features

### Access Control Pattern

\`\`\`typescript
"use client";

import { useUserRole } from "@/hooks/use-user-role";

export default function MyPage() {
  const userRole = useUserRole();

  // Check access
  if (userRole !== "OWNER" && userRole !== "BROKER") {
    return <AccessDenied />;
  }

  return <PageContent />;
}
\`\`\`

### Conditional Rendering

\`\`\`typescript
{(userRole === "OWNER" || userRole === "BROKER") && (
  <Button>Add Property</Button>
)}
\`\`\`

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Library:** shadcn/ui
- **Icons:** lucide-react
- **Authentication:** NextAuth.js (Google OAuth)
- **Database:** Prisma + PostgreSQL

---

## 📊 Analytics & Insights

### For Brokers
- **Listing Performance:** Views, clicks, CTR by property
- **Lead Analytics:** Conversion rates, response times
- **Market Insights:** Area-wise price trends

### For All Users
- **Price Trends:** Historical data & forecasts
- **Market Snapshot:** City-level statistics
- **Area Analysis:** Location-based pricing

---

## 🎨 Customization

### Modify Sidebar Links

Edit [src/types/dashboardSidebarLinks.tsx](src/types/dashboardSidebarLinks.tsx):

\`\`\`typescript
export const dashboardSidebarLinks: SidebarSection[] = [
  {
    label: "Your Section",
    links: [
      {
        title: "Your Page",
        href: "/dashboard/your-page",
        icon: <YourIcon />,
        roles: ["PUBLIC", "OWNER", "BROKER"],
      },
    ],
  },
];
\`\`\`

### Update Theme Colors

Edit [src/app/globals.css](src/app/globals.css):

\`\`\`css
:root {
  --primary: oklch(0.62 0.19 35); /* Your color */
}
\`\`\`

---

## 🚀 Deployment

### Build for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

### Environment Variables

\`\`\`env
NEXTAUTH_URL=your-domain
NEXTAUTH_SECRET=your-secret
GOOGLE_CLIENT_ID=your-google-id
GOOGLE_CLIENT_SECRET=your-google-secret
DATABASE_URL=your-database-url
\`\`\`

---

## 📝 Best Practices

### Component Organization
- Server Components by default
- Client Components only when needed ("use client")
- Consistent file naming

### Type Safety
- Full TypeScript coverage
- Proper type definitions
- No \`any\` types

### Performance
- Image optimization
- Code splitting
- Lazy loading where appropriate

---

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

---

## 📄 License

MIT License - feel free to use for your projects!

---

## 🎉 Credits

Built with ❤️ for the Kolkata real estate community.

**Design Inspiration:** Traditional Kolkata architecture and the Hooghly River's warm hues.

---

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Contact: support@kolkatarealty.com

---

**Happy Building! 🏗️**
