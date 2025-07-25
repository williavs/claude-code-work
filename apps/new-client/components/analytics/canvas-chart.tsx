'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { useChartData } from '@/hooks/use-chart-data'
import type { TimeRange } from '@/lib/types'

export default function CanvasChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('1m')
  const { dataPoints, maxValue } = useChartData(timeRange)

  // Transform data for Recharts
  const chartData = dataPoints.map((point) => ({
    time: point.time,
    count: point.count,
  }))

  const config = {
    count: {
      label: 'Events',
      color: 'hsl(var(--chart-1))'
    }
  }

  return (
    <Card className="h-full w-full flex flex-col">
      <CardHeader className="pb-2 sm:pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <CardTitle className="text-base sm:text-lg">Live Event Stream</CardTitle>
          <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-3 h-8 sm:h-9">
              <TabsTrigger value="1m" className="text-xs sm:text-sm px-2 sm:px-3">1m</TabsTrigger>
              <TabsTrigger value="3m" className="text-xs sm:text-sm px-2 sm:px-3">3m</TabsTrigger>
              <TabsTrigger value="5m" className="text-xs sm:text-sm px-2 sm:px-3">5m</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-2 sm:p-6 pt-0">
        <ChartContainer config={config} className="h-full w-full min-h-[200px] sm:min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                domain={[0, maxValue || 'auto']}
                width={30}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                cursor={{ fill: 'hsl(var(--muted))' }}
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}