import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Eye, TrendingUp, Users } from "lucide-react";

export default function ListingPerformancePage() {
  const properties = [
    {
      title: "3BHK Apartment in Salt Lake",
      views: 1240,
      clicks: 342,
      leads: 28,
      ctr: "27.5%",
      trend: "up",
    },
    {
      title: "2BHK Flat in Park Street",
      views: 890,
      clicks: 234,
      leads: 19,
      ctr: "26.3%",
      trend: "up",
    },
    {
      title: "4BHK House in Ballygunge",
      views: 654,
      clicks: 156,
      leads: 12,
      ctr: "23.9%",
      trend: "down",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          Listing Performance
        </h1>
        <p className="text-muted-foreground mt-1">
          Track views, clicks, and leads for your properties
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,784</div>
            <Badge variant="secondary" className="mt-2 bg-green-500/10 text-green-700">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12%
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">732</div>
            <Badge variant="secondary" className="mt-2 bg-green-500/10 text-green-700">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8%
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">59</div>
            <Badge variant="secondary" className="mt-2 bg-green-500/10 text-green-700">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15%
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg CTR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26.3%</div>
            <p className="text-xs text-muted-foreground mt-2">Click-through rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Property Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Property Analytics</CardTitle>
          <CardDescription>Performance breakdown by property</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {properties.map((property, idx) => (
              <div key={idx} className="space-y-3 border-b last:border-0 pb-6 last:pb-0">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium">{property.title}</h3>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Views</p>
                    <p className="text-2xl font-bold mt-1">{property.views}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Clicks</p>
                    <p className="text-2xl font-bold mt-1">{property.clicks}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Leads</p>
                    <p className="text-2xl font-bold mt-1">{property.leads}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">CTR</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-2xl font-bold">{property.ctr}</p>
                      <Badge
                        variant="secondary"
                        className={
                          property.trend === "up"
                            ? "bg-green-500/10 text-green-700"
                            : "bg-red-500/10 text-red-700"
                        }
                      >
                        {property.trend === "up" ? "↑" : "↓"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
