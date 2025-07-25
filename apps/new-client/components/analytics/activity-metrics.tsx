'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEventStore } from '@/stores/event-store'
import { Activity, Users, Zap, TrendingUp } from 'lucide-react'
import { useMemo } from 'react'

interface ActivityMetricsProps {
  compact?: boolean
}

export default function ActivityMetrics({ compact = false }: ActivityMetricsProps) {
  const events = useEventStore((state) => state.events)

  const metrics = useMemo(() => {
    const now = Date.now()
    const oneMinuteAgo = now - 60 * 1000

    // Total Events
    const totalEvents = events.length

    // Active Sessions (unique session_ids)
    const uniqueSessions = new Set(events.map((e) => e.session_id)).size

    // Event Types (unique hook_event_types)
    const uniqueEventTypes = new Set(events.map((e) => e.hook_event_type)).size

    // Events per minute (last minute)
    const recentEvents = events.filter((e) => {
      const eventTime = new Date(e.timestamp).getTime()
      return eventTime >= oneMinuteAgo
    }).length
    const eventsPerMinute = recentEvents // Since we're looking at exactly 1 minute

    return {
      totalEvents,
      activeSessions: uniqueSessions,
      eventTypes: uniqueEventTypes,
      eventsPerMinute,
    }
  }, [events])

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`
    }
    return num.toString()
  }

  const cards = [
    {
      title: 'Total Events',
      value: formatNumber(metrics.totalEvents),
      icon: Activity,
    },
    {
      title: 'Active Sessions',
      value: formatNumber(metrics.activeSessions),
      icon: Users,
    },
    {
      title: 'Event Types',
      value: metrics.eventTypes.toString(),
      icon: Zap,
    },
    {
      title: 'Events/Min',
      value: metrics.eventsPerMinute.toString(),
      icon: TrendingUp,
    },
  ]

  if (compact) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className="p-2 sm:p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                    {card.title}
                  </p>
                  <p className="text-sm sm:text-lg font-semibold">
                    {card.value}
                  </p>
                </div>
                <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
              </div>
            </Card>
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}