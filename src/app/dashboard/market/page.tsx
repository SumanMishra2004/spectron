import { Suspense } from 'react';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { UrbanSprawlChart } from '@/components/urban-sprawl-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  MapPin,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Sparkles,
  Calendar,
  Target
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function MarketSnapshotPage() {
  // Mock market data
  const marketStats = {
    avgPrice: 4250000,
    priceChange: 8.5,
    totalListings: 1247,
    newListings: 89,
    avgDays: 32,
    hotAreas: 5
  };

  const areaData = [
    { name: 'Salt Lake', avgPrice: 5200000, change: 12.3, trend: 'up', properties: 156 },
    { name: 'New Town', avgPrice: 4800000, change: 18.7, trend: 'up', properties: 203 },
    { name: 'Park Street', avgPrice: 7500000, change: -2.1, trend: 'down', properties: 89 },
    { name: 'Ballygunge', avgPrice: 6200000, change: 6.8, trend: 'up', properties: 134 },
    { name: 'Howrah', avgPrice: 3100000, change: 0.5, trend: 'stable', properties: 178 },
    { name: 'Jadavpur', avgPrice: 4900000, change: 9.2, trend: 'up', properties: 112 }
  ];

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Market Snapshot</h1>
          <p className="text-muted-foreground">
            Real-time insights into Kolkata's property market
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="gap-1 bg-spectron-teal/10 text-spectron-teal">
            <Calendar className="h-3 w-3" />
            Live Data
          </Badge>
          <Link href="/analytics">
            <Button className="gap-2 bg-gradient-to-r from-spectron-gold to-spectron-teal">
              <BarChart3 className="h-4 w-4" />
              Full Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="spectron-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Price</p>
                <p className="text-3xl font-bold text-spectron-teal">
                  {formatPrice(marketStats.avgPrice)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    +{marketStats.priceChange}%
                  </span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className="rounded-full bg-spectron-teal/10 p-3">
                <TrendingUp className="h-6 w-6 text-spectron-teal" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="spectron-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Listings</p>
                <p className="text-3xl font-bold text-spectron-gold">
                  {marketStats.totalListings.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm font-medium text-spectron-gold">
                    +{marketStats.newListings}
                  </span>
                  <span className="text-xs text-muted-foreground">this week</span>
                </div>
              </div>
              <div className="rounded-full bg-spectron-gold/10 p-3">
                <Building2 className="h-6 w-6 text-spectron-gold" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="spectron-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Days on Market</p>
                <p className="text-3xl font-bold text-spectron-crimson">
                  {marketStats.avgDays}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowDownRight className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    -5 days
                  </span>
                  <span className="text-xs text-muted-foreground">faster sales</span>
                </div>
              </div>
              <div className="rounded-full bg-spectron-crimson/10 p-3">
                <Target className="h-6 w-6 text-spectron-crimson" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="spectron-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-spectron-teal" />
              Price Trends (Last 12 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={
              <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="mx-auto mb-2 h-8 w-8 text-spectron-teal animate-pulse" />
                  <p className="text-sm text-muted-foreground">Loading chart...</p>
                </div>
              </div>
            }>
              <ChartAreaInteractive />
            </Suspense>
          </CardContent>
        </Card>

        <Card className="spectron-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-spectron-gold" />
              Urban Growth Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={
              <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="mx-auto mb-2 h-8 w-8 text-spectron-gold animate-pulse" />
                  <p className="text-sm text-muted-foreground">Loading chart...</p>
                </div>
              </div>
            }>
              <UrbanSprawlChart data={[
                { year: 2020, urbanSqKm: 695.2, percentage: 46.9 },
                { year: 2021, urbanSqKm: 715.8, percentage: 48.3 },
                { year: 2022, urbanSqKm: 736.4, percentage: 49.7 },
                { year: 2023, urbanSqKm: 757.0, percentage: 51.1 },
                { year: 2024, urbanSqKm: 777.6, percentage: 52.5 }
              ]} />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      {/* Area-wise Market Data */}
      <Card className="spectron-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-spectron-crimson" />
            Area-wise Market Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {areaData.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-spectron-teal/10 p-2">
                    <Building2 className="h-5 w-5 text-spectron-teal" />
                  </div>
                  <div>
                    <p className="font-semibold">{area.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {area.properties} properties • Avg: {formatPrice(area.avgPrice)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`flex items-center gap-1 ${
                      area.trend === 'up' ? 'text-green-600' : 
                      area.trend === 'down' ? 'text-red-600' : 
                      'text-muted-foreground'
                    }`}>
                      {area.trend === 'up' && <ArrowUpRight className="h-4 w-4" />}
                      {area.trend === 'down' && <ArrowDownRight className="h-4 w-4" />}
                      {area.trend === 'stable' && <Minus className="h-4 w-4" />}
                      <span className="font-medium">
                        {area.change > 0 ? '+' : ''}{area.change}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">vs last month</p>
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className={`${
                      area.trend === 'up' ? 'border-green-200 bg-green-50 text-green-700' :
                      area.trend === 'down' ? 'border-red-200 bg-red-50 text-red-700' :
                      'border-gray-200 bg-gray-50 text-gray-700'
                    }`}
                  >
                    {area.trend === 'up' ? 'Hot' : area.trend === 'down' ? 'Cool' : 'Stable'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card className="spectron-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-spectron-gold" />
            Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-semibold text-spectron-teal">Current Trends</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-spectron-teal" />
                  IT corridor areas (Salt Lake, New Town) showing strong growth
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-spectron-gold" />
                  Metro connectivity driving property values up by 15-20%
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-spectron-crimson" />
                  Luxury segment in central areas facing slight correction
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  First-time buyers preferring ready-to-move properties
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-spectron-crimson">Investment Opportunities</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-600" />
                  New Town: High appreciation potential with infrastructure development
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Howrah: Emerging as affordable alternative with good connectivity
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-600" />
                  Jadavpur: Student housing and rental yield opportunities
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-600" />
                  Commercial spaces in IT hubs showing 12% annual returns
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}