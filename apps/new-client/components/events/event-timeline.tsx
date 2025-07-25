'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { useEventStore } from '@/stores/event-store'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { EVENT_TYPE_LABELS } from '@/lib/constants'
import { useEventColors } from '@/hooks/use-event-colors'
import { useEventEmojis } from '@/hooks/use-event-emojis'
import { cn } from '@/lib/utils'
import type { HookEvent } from '@/lib/types'

interface EventItemProps {
  event: HookEvent
  isLast: boolean
}

function EventItem({ event, isLast }: EventItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { getColorForSession, getHexColorForApp } = useEventColors()
  const { getEmojiForEventType } = useEventEmojis()
  
  const sessionColor = getColorForSession(event.session_id)
  const appColor = getHexColorForApp(event.source_app)
  const emoji = getEmojiForEventType(event.hook_event_type)
  const eventLabel = EVENT_TYPE_LABELS[event.hook_event_type as keyof typeof EVENT_TYPE_LABELS] || event.hook_event_type

  // Extract tool info from payload
  const toolInfo = event.payload?.tool_name || 
    (event.hook_event_type === 'UserPromptSubmit' && event.payload?.prompt ? 'Prompt' : null)
  
  const toolDetail = event.payload?.tool_input?.command || 
    event.payload?.tool_input?.file_path || 
    event.payload?.prompt?.substring(0, 100)

  return (
    <div 
      className={cn(
        "group relative flex gap-2 sm:gap-3 pb-3 sm:pb-4",
        !isLast && "border-l sm:border-l-2 ml-2 sm:ml-4"
      )}
      style={{
        borderLeftColor: !isLast ? sessionColor : undefined
      }}
    >
      {/* Timeline dot */}
      <div 
        className="absolute -left-1.5 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-background"
        style={{ backgroundColor: sessionColor }}
      />
      
      {/* Event content */}
      <div className="flex-1 ml-4 sm:ml-6 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
          <div className="flex-1 space-y-1">
            {/* Header row */}
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
              <Badge 
                variant="outline" 
                className="text-[10px] sm:text-xs px-1.5 sm:px-2.5 h-5 sm:h-6"
                style={{ 
                  borderColor: appColor,
                  backgroundColor: appColor + '20' // 20% opacity
                }}
              >
                {event.source_app}
              </Badge>
              <span className="text-xs sm:text-sm font-medium">
                {emoji} {eventLabel}
              </span>
              {toolInfo && (
                <span className="text-[10px] sm:text-xs text-muted-foreground">
                  {toolInfo}
                </span>
              )}
            </div>
            
            {/* Tool detail */}
            {toolDetail && (
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                {toolDetail}
              </p>
            )}
            
            {/* Summary */}
            {event.summary && (
              <div className="flex items-start gap-1 sm:gap-1.5 mt-1">
                <span className="text-[10px] sm:text-xs">📝</span>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{event.summary}</p>
              </div>
            )}
          </div>
          
          {/* Timestamp and expand button */}
          <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-0">
            <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
              {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="h-5 w-5 sm:h-6 sm:w-6 p-0"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              ) : (
                <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Expanded payload */}
        {isExpanded && (
          <div className="mt-2">
            <pre className="text-[10px] sm:text-xs bg-muted/30 p-3 rounded overflow-x-auto max-h-64 overflow-y-auto font-mono">
{JSON.stringify(event.payload, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default function EventTimeline() {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [stickToBottom, setStickToBottom] = useState(true)
  
  // Get events and filters from store
  const events = useEventStore((state) => state.events)
  const filters = useEventStore((state) => state.filters)
  
  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Filter by source app
      if (filters.sourceApp && event.source_app !== filters.sourceApp) {
        return false
      }
      
      // Filter by session ID
      if (filters.sessionId && event.session_id !== filters.sessionId) {
        return false
      }
      
      // Filter by event type
      if (filters.eventType && event.hook_event_type !== filters.eventType) {
        return false
      }
      
      return true
    })
  }, [events, filters])
  
  // Auto-scroll to bottom when new events arrive
  useEffect(() => {
    if (stickToBottom && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [filteredEvents, stickToBottom])

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <div className="px-3 py-2 border-b">
        <h2 className="text-base font-medium">Agent Event Stream</h2>
      </div>
      
      {/* Scrollable Event List */}
      <div 
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto px-3 py-3"
        onScroll={(e) => {
          const target = e.target as HTMLDivElement
          const isAtBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 50
          setStickToBottom(isAtBottom)
        }}
      >
        {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No events yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Events will appear here as agents perform actions
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              {filteredEvents.map((event, index) => (
                <EventItem 
                  key={`${event.id}-${event.timestamp}`} 
                  event={event}
                  isLast={index === filteredEvents.length - 1}
                />
              ))}
            </div>
          )}
      </div>
      
      {/* Stick to bottom indicator */}
      {!stickToBottom && filteredEvents.length > 0 && (
        <Button
          size="sm"
          variant="secondary"
          className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 shadow-lg text-xs sm:text-sm"
          onClick={() => setStickToBottom(true)}
        >
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" />
          New events
        </Button>
      )}
    </div>
  )
}