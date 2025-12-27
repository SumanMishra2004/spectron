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
  ArrowDownRight
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const userRole = useUserRole();

  const stats = [
    {
      title: "Total Properties",
      value: userRole === "PUBLIC" ? "1,234" : "42",
      change: "+12%",
      trend: "up",
      icon: Building2,
      description: userRole === "PUBLIC" ? "Available in Kolkata" : "Your listings",
      roles: ["PUBLIC", "OWNER", "BROKER"],
    },
    {
      title: "Active Leads",
      value: "28",
      change: "+23%",
      trend: "up",
      icon: Users,
      description: "This month",
      roles: ["OWNER", "BROKER"],
    },
    {
      title: "Profile Views",
      value: "1,429",
      change: "+8%",
      trend: "up",
      icon: Eye,
      description: "Last 30 days",
      roles: ["OWNER", "BROKER"],
    },
    {
      title: "Avg. Price/sqft",
      value: "₹5,240",
      change: "-2%",
      trend: "down",
      icon: TrendingUp,
      description: "Kolkata average",
      roles: ["PUBLIC", "OWNER", "BROKER"],
    },
  ];

  const filteredStats = stats.filter((stat) => stat.roles.includes(userRole));

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your properties.
          </p>
        </div>
        
        {(userRole === "OWNER" || userRole === "BROKER") && (
          <Button asChild className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500">
            <Link href="/dashboard/properties/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Property
            </Link>
          </Button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredStats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";
          
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="secondary"
                    className={
                      isPositive
                        ? "bg-green-500/10 text-green-700 dark:text-green-400"
                        : "bg-red-500/10 text-red-700 dark:text-red-400"
                    }
                  >
                    {isPositive ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {stat.change}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Browse Properties</CardTitle>
            <CardDescription>
              Explore latest listings in Kolkata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/properties">View All Properties</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Map Explorer</CardTitle>
            <CardDescription>
              Find properties by location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/map">Open Map View</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Market Trends</CardTitle>
            <CardDescription>
              View Kolkata real estate insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/market">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      {(userRole === "OWNER" || userRole === "BROKER") && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest property interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "New lead received",
                  property: "3BHK Apartment in Salt Lake",
                  time: "2 hours ago",
                },
                {
                  action: "Property view",
                  property: "2BHK Flat in Park Street",
                  time: "5 hours ago",
                },
                {
                  action: "Listing updated",
                  property: "4BHK House in Ballygunge",
                  time: "1 day ago",
                },
              ].map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.property}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
