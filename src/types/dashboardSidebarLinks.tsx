import { UserRole } from "@prisma/client";
import {
  LayoutDashboardIcon,
  Building2,
  PlusCircle,
  Users,
  Briefcase,
  TrendingUp,
  Map,
  Bookmark,
  Bell,
  MessageSquare,
  ShieldCheck,
  User,
  Settings,
  Wallet,
  FileText,
  BarChart3
} from "lucide-react";
import { JSX } from "react";

export type SidebarLink = {
  title: string;
  href: string;
  icon: JSX.Element;
  description?: string;
  badge?: string;
  variant?: "primary";
  roles: UserRole[];
};

export type SidebarSection = {
  label: string;
  links: SidebarLink[];
};

export const dashboardSidebarLinks: SidebarSection[] = [
  // -----------------------------
  // OVERVIEW
  // -----------------------------
  {
    label: "Overview",
    links: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboardIcon />,
        description: "Quick overview of activity and stats",
        roles: ["PUBLIC", "OWNER", "BROKER", "ADMIN"]
      },
      {
        title: "Market Snapshot",
        href: "/dashboard/market",
        icon: <TrendingUp />,
        description: "City-level property trends",
        roles: ["PUBLIC", "OWNER", "BROKER"]
      }
    ]
  },

  // -----------------------------
  // PROPERTIES
  // -----------------------------
  {
    label: "Properties",
    links: [
      {
        title: "Browse Properties",
        href: "/dashboard/properties",
        icon: <Building2 />,
        roles: ["PUBLIC", "OWNER", "BROKER"]
      },
      {
        title: "Add Property",
        href: "/dashboard/properties/new",
        icon: <PlusCircle />,
        variant: "primary",
        roles: ["OWNER", "BROKER"]
      },
      {
        title: "My Listings",
        href: "/dashboard/properties/my",
        icon: <FileText />,
        roles: ["OWNER", "BROKER"]
      },
      {
        title: "Map Explorer",
        href: "/dashboard/map",
        icon: <Map />,
        description: "Map-based property exploration",
        roles: ["PUBLIC", "OWNER", "BROKER"]
      }
    ]
  },

  // -----------------------------
  // LEADS & ENGAGEMENT
  // -----------------------------
  {
    label: "Leads & Engagement",
    links: [
      {
        title: "Leads & Inquiries",
        href: "/dashboard/leads",
        icon: <Users />,
        badge: "12",
        roles: ["OWNER", "BROKER"]
      },
      {
        title: "Community Reviews",
        href: "/dashboard/reviews",
        icon: <MessageSquare />,
        roles: ["OWNER", "BROKER"]
      },
      {
        title: "Saved Properties",
        href: "/dashboard/favorites",
        icon: <Bookmark />,
        roles: ["PUBLIC"]
      }
    ]
  },

  // -----------------------------
  // ANALYTICS (HACKATHON WOW)
  // -----------------------------
  {
    label: "Insights & Analytics",
    links: [
      {
        title: "Listing Performance",
        href: "/dashboard/analytics/listings",
        icon: <BarChart3 />,
        description: "Views, clicks & leads",
        roles: ["BROKER"]
      },
      {
        title: "Price Trends",
        href: "/dashboard/analytics/prices",
        icon: <TrendingUp />,
        roles: ["PUBLIC", "OWNER", "BROKER"]
      }
    ]
  },

  // -----------------------------
  // PAYMENTS & TRUST
  // -----------------------------
  {
    label: "Payments & Trust",
    links: [
      {
        title: "Wallet & Billing",
        href: "/dashboard/billing",
        icon: <Wallet />,
        roles: ["BROKER"]
      },
      {
        title: "Verification Status",
        href: "/dashboard/verification",
        icon: <ShieldCheck />,
        roles: ["OWNER", "BROKER"]
      }
    ]
  },

  // -----------------------------
  // NOTIFICATIONS & ACCOUNT
  // -----------------------------
  {
    label: "Account",
    links: [
      {
        title: "Notifications",
        href: "/dashboard/notifications",
        icon: <Bell />,
        roles: ["PUBLIC", "OWNER", "BROKER"]
      },
      {
        title: "Profile",
        href: "/dashboard/profile",
        icon: <User />,
        roles: ["PUBLIC", "OWNER", "BROKER"]
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: <Settings />,
        roles: ["PUBLIC", "OWNER", "BROKER"]
      }
    ]
  }
];

/**
 * Get sidebar links filtered by user role
 * Only shows links that the user has access to based on their role
 */
export function getSidebarLinksByRole(userRole: UserRole): SidebarSection[] {
  return dashboardSidebarLinks
    .map((section) => ({
      ...section,
      links: section.links.filter((link) => link.roles.includes(userRole)),
    }))
    .filter((section) => section.links.length > 0); // Remove empty sections
}
