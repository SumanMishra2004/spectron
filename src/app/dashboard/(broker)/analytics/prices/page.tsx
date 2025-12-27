import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Home } from "lucide-react";

export default function PriceTrendsPage() {
  const trends = [
    {
      area: "Salt Lake",
      current: "₹5,800/sqft",
      previous: "₹5,500/sqft",
      change: "+5.4%",
      trend: "up",
      forecast: "₹6,100/sqft",
    },
    {
      area: "Park Street",
      current: "₹8,200/sqft",
      previous: "₹7,950/sqft",
      change: "+3.1%",
      trend: "up",
      forecast: "₹8,450/sqft",
    },
    {
      area: "Ballygunge",
      current: "₹7,500/sqft",
      previous: "₹7,600/sqft",
      change: "-1.3%",
      trend: "down",
      forecast: "₹7,450/sqft",
    },
    {
      area: "New Town",
      current: "₹4,200/sqft",
      previous: "₹3,870/sqft",
      change: "+8.5%",
      trend: "up",
      forecast: "₹4,550/sqft",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          Price Trends & Forecasts
        </h1>
        <p className="text-muted-foreground mt-1">
          Historical and predicted price trends across Kolkata
        </p>
      </div>

      {/* City Average */}
      <Card className="border-orange-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Kolkata City Average</CardTitle>
              <CardDescription>Current market price per sqft</CardDescription>
            </div>
            <Home className="h-8 w-8 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="text-4xl font-bold">₹5,240/sqft</div>
              <Badge className="mb-2 bg-green-500/10 text-green-700 border-green-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +4.2% from last quarter
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <p className="text-xs text-muted-foreground">Previous Quarter</p>
                <p className="text-lg font-semibold mt-1">₹5,030/sqft</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">6-Month Forecast</p>
                <p className="text-lg font-semibold mt-1">₹5,480/sqft</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">YoY Growth</p>
                <p className="text-lg font-semibold mt-1">+12.3%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Area-wise Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Area-wise Price Analysis</CardTitle>
          <CardDescription>
            Detailed breakdown of price trends by location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {trends.map((area) => (
              <div
                key={area.area}
                className="flex items-center justify-between border-b last:border-0 pb-6 last:pb-0"
              >
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{area.area}</h3>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Current</p>
                      <p className="text-sm font-bold">{area.current}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Previous</p>
                      <p className="text-sm">{area.previous}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Forecast (6mo)</p>
                      <p className="text-sm font-semibold text-orange-600">
                        {area.forecast}
                      </p>
                    </div>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    area.trend === "up"
                      ? "bg-green-500/10 text-green-700 border-green-500/20 px-4 py-2 text-base"
                      : "bg-red-500/10 text-red-700 border-red-500/20 px-4 py-2 text-base"
                  }
                >
                  {area.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 mr-2" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-2" />
                  )}
                  {area.change}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Insights */}
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10 border-orange-500/20">
        <CardHeader>
          <CardTitle>Investment Insights</CardTitle>
          <CardDescription>AI-powered recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">New Town shows strong growth potential</p>
                <p className="text-sm text-muted-foreground">
                  +8.5% quarterly growth suggests sustained demand
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Home className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-medium">Park Street remains premium</p>
                <p className="text-sm text-muted-foreground">
                  Stable high prices indicate established market
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
