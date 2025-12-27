"use client";

import { useUserRole } from "@/hooks/use-user-role";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Eye, 
  PlusCircle,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  MapPin,
  Shield,
  BarChart3,
  Sparkles,
  Clock,
  MessageSquare,
  CheckCircle2,
  Star,
  Activity,
  Target,
  Wallet,
  Award
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDashboardStats, getRecentActivity } from "@/actions/dashboard";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardStats {
  totalProperties: number;
  userProperties: number;
  notifications: number;
  profileViews: number;
  leads: number;
  commissionEarned: number;
  conversionRate: number;
  avgPricePerSqft: number;
}

interface RecentActivity {
  id: string;
  action: string;
  property: string;
  time: string;
  type: string;
  icon: string;
}

export default function DashboardPage() {
  const userRole = useUserRole();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const [statsResult, activitiesResult] = await Promise.all([
          getDashboardStats(),
          getRecentActivity(5)
        ]);

        if (statsResult.success) {
          setStats(statsResult.data);
        }

        if (activitiesResult.success) {
          setActivities(activitiesResult.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    const lakhs = amount / 100000;
    const crores = amount / 10000000;
    if (crores >= 1) {
      return `₹${crores.toFixed(1)}Cr`;
    }
    return `₹${lakhs.toFixed(1)}L`;
  };

  const getStatsConfig = () => {
    if (!stats) return [];

    const baseStats = [
      {
        title: "Total Properties",
        value: userRole === "PUBLIC" ? stats.totalProperties.toString() : stats.userProperties.toString(),
        change: "+12%", // This should be calculated from historical data
        trend: "up" as const,
        icon: Building2,
        description: userRole === "PUBLIC" ? "Available in Kolkata" : userRole === "BROKER" ? "Your portfolio" : "Your listings",
        roles: ["PUBLIC", "OWNER", "BROKER"],
        color: "spectron-teal",
      }
    ];

    if (userRole === "BROKER") {
      baseStats.push(
        {
          title: "Active Leads",
          value: stats.leads.toString(),
          change: "+8 this week",
          trend: "up" as const,
          icon: Target,
          description: "Potential clients",
          roles: ["BROKER"],
          color: "spectron-crimson",
        },
        {
          title: "Commission Earned",
          value: formatCurrency(stats.commissionEarned),
          change: "+18% vs last month",
          trend: "up" as const,
          icon: Wallet,
          description: "This month",
          roles: ["BROKER"],
          color: "spectron-gold",
        }
      );
    } else {
      baseStats.push({
        title: "Notifications",
        value: stats.notifications.toString(),
        change: "+2 new",
        trend: "up" as const,
        icon: Bell,
        description: "Property updates",
        roles: ["OWNER", "BROKER", "PUBLIC"],
        color: "spectron-crimson",
      });

      if (userRole === "OWNER" || userRole === "BROKER") {
        baseStats.push({
          title: "Profile Views",
          value: "1,429", // This should come from analytics
          change: "+8%",
          trend: "up" as const,
          icon: Eye,
          description: "Last 30 days",
          roles: ["OWNER", "BROKER"],
          color: "spectron-gold",
        });
      }
    }

    baseStats.push({
      title: "Avg. Price/sqft",
      value: `₹${stats.avgPricePerSqft.toLocaleString()}`,
      change: "-2%",
      trend: "down" as const,
      icon: TrendingUp,
      description: "Kolkata average",
      roles: ["PUBLIC", "OWNER", "BROKER"],
      color: "primary",
    });

    return baseStats.filter(stat => stat.roles.includes(userRole));
  };

  const quickActions = [
    {
      title: "Browse Properties",
      description: "Explore verified listings across Kolkata",
      href: "/dashboard/properties",
      icon: Building2,
      color: "from-spectron-teal to-primary",
      roles: ["PUBLIC", "OWNER", "BROKER"],
    },
    {
      title: userRole === "BROKER" ? "Lead Management" : "Map Explorer",
      description: userRole === "BROKER" ? "Track and convert property inquiries" : "Find properties by location with interactive map",
      href: userRole === "BROKER" ? "/dashboard/leads" : "/dashboard/map",
      icon: userRole === "BROKER" ? Target : MapPin,
      color: userRole === "BROKER" ? "from-spectron-crimson to-destructive" : "from-spectron-gold to-accent",
      roles: ["PUBLIC", "OWNER", "BROKER"],
      badge: userRole === "BROKER" && stats ? `${stats.leads} active` : undefined,
    },
    {
      title: userRole === "BROKER" ? "Client Portal" : "Market Analytics",
      description: userRole === "BROKER" ? "Manage your client relationships" : "View Kolkata real estate trends and insights",
      href: userRole === "BROKER" ? "/dashboard/clients" : "/dashboard/market",
      icon: userRole === "BROKER" ? Users : BarChart3,
      color: userRole === "BROKER" ? "from-purple-500 to-purple-700" : "from-spectron-crimson to-destructive",
      roles: ["PUBLIC", "OWNER", "BROKER"],
    },
    {
      title: "Property Validation",
      description: "Help verify nearby properties anonymously",
      href: "/dashboard/validation",
      icon: Shield,
      color: "from-primary to-spectron-teal",
      roles: ["PUBLIC", "OWNER", "BROKER"],
    },
    {
      title: userRole === "OWNER" || userRole === "BROKER" ? "Property Analytics" : "Anonymous Opinions",
      description: userRole === "OWNER" || userRole === "BROKER" ? "Track your property performance" : "View community feedback on properties",
      href: userRole === "OWNER" || userRole === "BROKER" ? "/dashboard/analytics" : "/dashboard/opinions",
      icon: userRole === "OWNER" || userRole === "BROKER" ? BarChart3 : MessageSquare,
      color: "from-accent to-spectron-gold",
      roles: ["PUBLIC", "OWNER", "BROKER"],
    },
    {
      title: userRole === "BROKER" ? "Billing & Payments" : "Saved Properties",
      description: userRole === "BROKER" ? "Manage your payments and billing" : "Your favorite and saved properties",
      href: userRole === "BROKER" ? "/dashboard/billing" : "/dashboard/saved",
      icon: userRole === "BROKER" ? Wallet : Star,
      color: "from-muted-foreground to-primary",
      roles: userRole === "BROKER" ? ["BROKER"] : ["PUBLIC", "OWNER"],
    },
  ];

  const filteredActions = quickActions.filter((action) => action.roles.includes(userRole));

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Building2,
      Target,
      Users,
      CheckCircle2,
      Wallet,
      Shield,
      Bell,
      MessageSquare
    };
    return icons[iconName] || Activity;
  };

  if (loading) {
    return (
      <div className="space-y-8 p-1">
        {/* Loading Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Skeleton className="h-12 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Loading Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="spectron-card">
              <CardContent className="p-6">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Loading Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="spectron-card">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const statsConfig = getStatsConfig();

  return (
    <div className="space-y-8 p-1">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-spectron-gold to-spectron-teal opacity-20 blur-sm" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-spectron-gold to-spectron-teal shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-spectron-gold via-spectron-teal to-spectron-crimson bg-clip-text text-transparent">
                Spectron Dashboard
              </h1>
              <Badge className="mt-1 border-spectron-teal/30 bg-spectron-teal/10 text-spectron-teal">
                <Sparkles className="mr-1 h-3 w-3" />
                {userRole === "ADMIN" ? "Administrator" : 
                 userRole === "BROKER" ? "Broker Panel" : 
                 userRole === "OWNER" ? "Property Owner" : "Public User"}
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground">
            Welcome back! Here's your Kolkata property insights and activity overview.
          </p>
        </div>
        
        {(userRole === "OWNER" || userRole === "BROKER") && (
          <Button asChild className="gap-2 bg-gradient-to-r from-spectron-gold to-spectron-teal hover:from-spectron-gold/90 hover:to-spectron-teal/90 shadow-lg">
            <Link href="/dashboard/properties/new">
              <PlusCircle className="h-4 w-4" />
              Add Property
            </Link>
          </Button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsConfig.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";
          
          return (
            <Card key={stat.title} className="spectron-card hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-full p-2 bg-${stat.color}/10`}>
                  <Icon className={`h-5 w-5 text-${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      isPositive
                        ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
                        : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
                    }
                  >
                    {isPositive ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-5 w-5 text-spectron-gold" />
          <h2 className="text-2xl font-bold">Quick Actions</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredActions.map((action) => {
            const Icon = action.icon;
            
            return (
              <Card key={action.title} className="group spectron-card hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <Link href={action.href}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-xl p-3 bg-gradient-to-br ${action.color} shadow-lg group-hover:shadow-xl transition-shadow`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-spectron-teal transition-colors">
                          {action.title}
                        </CardTitle>
                        {action.badge && (
                          <Badge variant="secondary" className="mt-1 bg-spectron-teal/10 text-spectron-teal">
                            {action.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {action.description}
                    </CardDescription>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {(userRole === "OWNER" || userRole === "BROKER" || userRole === "ADMIN") && activities.length > 0 && (
        <Card className="spectron-card">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-spectron-crimson" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
            <CardDescription>Your latest property interactions and {userRole === "BROKER" ? "business" : "community"} feedback</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {activities.map((activity) => {
                const Icon = getIconComponent(activity.icon);
                return (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className={`rounded-full p-2 ${
                      activity.type === 'created' ? 'bg-green-500/10' :
                      activity.type === 'updated' ? 'bg-spectron-gold/10' :
                      activity.type === 'inquiry' ? 'bg-spectron-crimson/10' :
                      'bg-spectron-teal/10'
                    }`}>
                      <Icon className={`h-4 w-4 ${
                        activity.type === 'created' ? 'text-green-600' :
                        activity.type === 'updated' ? 'text-spectron-gold' :
                        activity.type === 'inquiry' ? 'text-spectron-crimson' :
                        'text-spectron-teal'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.property}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {activity.type}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t border-border/50">
              <Button variant="outline" className="w-full gap-2 hover:bg-spectron-teal/10 hover:text-spectron-teal hover:border-spectron-teal">
                <Activity className="h-4 w-4" />
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Welcome Message for Public Users */}
      {userRole === "PUBLIC" && (
        <Card className="spectron-card border-spectron-gold/30 bg-gradient-to-r from-spectron-gold/5 to-spectron-teal/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-spectron-gold/10 p-3">
                <Star className="h-6 w-6 text-spectron-gold" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Welcome to Spectron!</h3>
                <p className="text-muted-foreground mb-4">
                  Discover verified properties across Kolkata with our transparent, community-driven platform. 
                  Get anonymous neighborhood insights and help verify property information.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/dashboard/properties">
                    <Button size="sm" className="gap-2 bg-gradient-to-r from-spectron-gold to-spectron-teal">
                      <Building2 className="h-4 w-4" />
                      Browse Properties
                    </Button>
                  </Link>
                  <Link href="/dashboard/validation">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Shield className="h-4 w-4" />
                      Help Validate
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}