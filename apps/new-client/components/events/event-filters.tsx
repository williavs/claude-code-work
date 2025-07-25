'use client'

import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEventStore } from '@/stores/event-store'
import { useEventFilters } from '@/hooks/use-event-filters'
import { EVENT_TYPE_LABELS } from '@/lib/constants'

export default function EventFilters() {
  const { filters, setFilters } = useEventStore()
  const { filterOptions, isLoading, error } = useEventFilters()

  const handleSourceAppChange = (value: string) => {
    setFilters({
      ...filters,
      sourceApp: value === 'all' ? '' : value
    })
  }

  const handleSessionIdChange = (value: string) => {
    setFilters({
      ...filters,
      sessionId: value === 'all' ? '' : value
    })
  }

  const handleEventTypeChange = (value: string) => {
    setFilters({
      ...filters,
      eventType: value === 'all' ? '' : value
    })
  }

  if (error) {
    return (
      <Card className="p-4">
        <p className="text-sm text-destructive">Failed to load filter options</p>
      </Card>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {/* Source App Filter */}
      <Select
        value={filters.sourceApp || 'all'}
        onValueChange={handleSourceAppChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full sm:w-[140px] md:w-[160px] h-8 sm:h-9 text-xs sm:text-sm">
          <SelectValue placeholder="All Apps" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Apps</SelectItem>
          {filterOptions?.source_apps.map((app) => (
            <SelectItem key={app} value={app}>
              {app}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Session ID Filter */}
      <Select
        value={filters.sessionId || 'all'}
        onValueChange={handleSessionIdChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full sm:w-[140px] md:w-[160px] h-8 sm:h-9 text-xs sm:text-sm">
          <SelectValue placeholder="All Sessions" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sessions</SelectItem>
          {filterOptions?.session_ids.map((sessionId) => (
            <SelectItem key={sessionId} value={sessionId}>
              {sessionId.slice(0, 8)}...
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Event Type Filter */}
      <Select
        value={filters.eventType || 'all'}
        onValueChange={handleEventTypeChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full sm:w-[140px] md:w-[160px] h-8 sm:h-9 text-xs sm:text-sm">
          <SelectValue placeholder="All Events" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Events</SelectItem>
          {filterOptions?.hook_event_types.map((eventType) => (
            <SelectItem key={eventType} value={eventType}>
              {EVENT_TYPE_LABELS[eventType as keyof typeof EVENT_TYPE_LABELS] || eventType}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}