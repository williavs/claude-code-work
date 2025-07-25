'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useChartData } from '@/hooks/use-chart-data';
import type { TimeRange } from '@/lib/types';

export default function LivePulseChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('1m');
  const { dataPoints } = useChartData(timeRange);

  const chartConfig = {
    chart: {
      label: "Events",
      color: "hsl(var(--chart-1))",
    },
  };

  const formatXAxisTick = (value: string) => {
    const date = new Date(value);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="h-full w-full flex flex-col">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 sm:pb-4">
        <CardTitle className="text-base sm:text-lg">Live Activity</CardTitle>
        <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3 h-8 sm:h-9">
            <TabsTrigger value="1m" className="text-xs sm:text-sm px-2 sm:px-3">1m</TabsTrigger>
            <TabsTrigger value="3m" className="text-xs sm:text-sm px-2 sm:px-3">3m</TabsTrigger>
            <TabsTrigger value="5m" className="text-xs sm:text-sm px-2 sm:px-3">5m</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="flex-1 p-2 sm:p-4 pt-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={dataPoints}
              margin={{ top: 5, right: 5, left: 5, bottom: 30 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 8 }}
                tickFormatter={formatXAxisTick}
                stroke="hsl(var(--muted-foreground))"
                angle={-35}
                textAnchor="end"
                height={25}
                interval="preserveStartEnd"
                tickMargin={2}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                stroke="hsl(var(--muted-foreground))"
                width={40}
              />
              <ChartTooltip 
                content={
                  <ChartTooltipContent 
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        second: '2-digit',
                      });
                    }}
                  />
                } 
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="hsl(var(--chart-1))"
                fill="url(#colorGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}