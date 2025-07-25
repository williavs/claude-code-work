'use client'

import { ColumnDef } from '@tanstack/react-table'
import { HookEvent } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { EVENT_TYPE_LABELS } from '@/lib/constants'

export const columns: ColumnDef<HookEvent>[] = [
  {
    accessorKey: 'source_app',
    header: 'App',
    cell: ({ row }) => {
      const app = row.getValue('source_app') as string
      return (
        <Badge variant="outline">
          {app || 'Unknown'}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'session_id',
    header: 'Session',
    cell: ({ row }) => {
      const sessionId = row.getValue('session_id') as string
      return sessionId ? sessionId.slice(0, 8) : '-'
    }
  },
  {
    accessorKey: 'hook_event_type',
    header: 'Event Type',
    cell: ({ row }) => {
      const eventType = row.getValue('hook_event_type') as string
      return EVENT_TYPE_LABELS[eventType as keyof typeof EVENT_TYPE_LABELS] || eventType || '-'
    }
  },
  {
    accessorKey: 'timestamp',
    header: 'Time',
    cell: ({ row }) => {
      const timestamp = row.getValue('timestamp') as string
      if (!timestamp) return '-'
      
      try {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
      } catch {
        return '-'
      }
    }
  },
  {
    accessorKey: 'summary',
    header: 'Summary',
    cell: ({ row }) => {
      const summary = row.getValue('summary') as string | undefined
      if (!summary) return '-'
      
      return summary.length > 100 
        ? summary.slice(0, 100) + '...'
        : summary
    }
  }
]