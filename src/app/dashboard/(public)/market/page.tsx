import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Home, Building2 } from "lucide-react";

export default function MarketPage() {
  const marketData = [
    {
      area: "Salt Lake",
      avgPrice: "₹5,800/sqft",
      change: "+5.2%",
      trend: "up",
      properties: 234,
    },
    {
      area: "Park Street",
      avgPrice: "₹8,200/sqft",
      change: "+3.1%",
      trend: "up",
      properties: 156,
    },
    {
      area: "Ballygunge",
      avgPrice: "₹7,500/sqft",
      change: "-1.2%",
      trend: "down",
      properties: 189,
    },
    {
      area: "New Town",
      avgPrice: "₹4,200/sqft",
      change: "+8.5%",
      trend: "up",
      properties: 421,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          Market Snapshot
        </h1>
        <p className="text-muted-foreground mt-1">
          Kolkata real estate market trends and insights
        </p>
      </div>

      {/* Market Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Market Price</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹5,240/sqft</div>
            <Badge variant="secondary" className="mt-2 bg-green-500/10 text-green-700">
              <TrendingUp className="h-3 w-3 mr-1" />
              +4.2%
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground mt-2">Across Kolkata</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hot Area</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">New Town</div>
            <p className="text-xs text-muted-foreground mt-2">+8.5% growth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Days on Market</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 days</div>
            <Badge variant="secondary" className="mt-2 bg-green-500/10 text-green-700">
              -5 days
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Area-wise Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Area-wise Market Analysis</CardTitle>
          <CardDescription>Price trends across popular Kolkata locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketData.map((area) => (
              <div
                key={area.area}
                className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{area.area}</p>
                  <p className="text-xs text-muted-foreground">
                    {area.properties} properties available
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-bold">{area.avgPrice}</p>
                    <Badge
                      variant="secondary"
                      className={
                        area.trend === "up"
                          ? "bg-green-500/10 text-green-700"
                          : "bg-red-500/10 text-red-700"
                      }
                    >
                      {area.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {area.change}
                    </Badge>
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
