'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface UrbanSprawlData {
  year: number;
  urbanSqKm: number;
  percentage: number;
}

interface UrbanSprawlChartProps {
  data: UrbanSprawlData[];
}

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-white p-3 shadow-lg">
        <p className="mb-2 font-semibold text-sm">{`Year: ${payload[0].payload.year}`}</p>
        <p className="mb-1 text-xs text-blue-600">
          {`Urban Area: ${payload[0].value.toFixed(2)} km²`}
        </p>
        <p className="text-xs text-emerald-600">
          {`Percentage: ${payload[1].value.toFixed(2)}%`}
        </p>
      </div>
    );
  }
  return null;
};

export function UrbanSprawlChart({ data }: UrbanSprawlChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Urban Development Analysis
          </CardTitle>
          <CardDescription>
            Urban sprawl data is being processed and will be available soon.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Calculate trend
  const firstValue = data[0]?.percentage || 0;
  const lastValue = data[data.length - 1]?.percentage || 0;
  const trend = lastValue - firstValue;
  const isTrendingUp = trend > 0;

  // Calculate average growth
  const avgGrowth = data.length > 1 
    ? ((lastValue - firstValue) / data.length).toFixed(2)
    : '0.00';

  // Find peak year
  const peakData = [...data].sort((a, b) => b.percentage - a.percentage)[0];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-emerald-50">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Activity className="h-6 w-6 text-blue-600" />
              Urban Development Analysis
            </CardTitle>
            <CardDescription className="mt-2">
              Historical urban sprawl data from {data[0]?.year} to {data[data.length - 1]?.year}
            </CardDescription>
          </div>
          <Badge 
            variant={isTrendingUp ? "default" : "secondary"}
            className="gap-1"
          >
            {isTrendingUp ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {isTrendingUp ? '+' : ''}{trend.toFixed(2)}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Stats Grid */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border bg-blue-50/50 p-4">
            <p className="mb-1 text-muted-foreground text-xs">Current Urban Area</p>
            <p className="font-bold text-2xl text-blue-600">
              {lastValue.toFixed(2)}%
            </p>
            <p className="text-muted-foreground text-xs">
              {data[data.length - 1]?.urbanSqKm.toFixed(2)} km²
            </p>
          </div>

          <div className="rounded-lg border bg-emerald-50/50 p-4">
            <p className="mb-1 text-muted-foreground text-xs">Avg. Growth/Year</p>
            <p className="font-bold text-2xl text-emerald-600">
              {avgGrowth}%
            </p>
            <p className="text-muted-foreground text-xs">
              {data.length} years tracked
            </p>
          </div>

          <div className="rounded-lg border bg-amber-50/50 p-4">
            <p className="mb-1 text-muted-foreground text-xs">Peak Year</p>
            <p className="font-bold text-2xl text-amber-600">
              {peakData?.year}
            </p>
            <p className="text-muted-foreground text-xs">
              {peakData?.percentage.toFixed(2)}% coverage
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUrbanArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorPercentage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="year" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                yAxisId="left"
                stroke="#3b82f6"
                style={{ fontSize: '12px' }}
                label={{ value: 'Area (km²)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#10b981"
                style={{ fontSize: '12px' }}
                label={{ value: 'Percentage (%)', angle: 90, position: 'insideRight', style: { fontSize: '12px' } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}
                iconType="line"
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="urbanSqKm"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorUrbanArea)"
                name="Urban Area (km²)"
                animationDuration={1500}
                animationBegin={0}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="percentage"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#colorPercentage)"
                name="Urban Coverage (%)"
                animationDuration={1500}
                animationBegin={300}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="mt-6 rounded-lg border bg-slate-50 p-4">
          <h4 className="mb-2 font-semibold text-sm">📊 Key Insights</h4>
          <ul className="space-y-1 text-muted-foreground text-sm">
            <li>
              • Urban development has {isTrendingUp ? 'increased' : 'decreased'} by{' '}
              <span className="font-semibold">{Math.abs(trend).toFixed(2)}%</span> over the tracked period
            </li>
            <li>
              • The area experienced peak urbanization in{' '}
              <span className="font-semibold">{peakData?.year}</span> with{' '}
              <span className="font-semibold">{peakData?.percentage.toFixed(2)}%</span> coverage
            </li>
            <li>
              • Current urban coverage stands at{' '}
              <span className="font-semibold">{lastValue.toFixed(2)}%</span> of the total area
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
