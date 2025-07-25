'use client'

import { useWebSocket } from '@/hooks/use-websocket'
import { ReactNode, useEffect } from 'react'
import { useEventStore } from '@/stores/event-store'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface WebSocketProviderProps {
  children: ReactNode
}

export default function WebSocketProvider({ children }: WebSocketProviderProps) {
  const { error } = useWebSocket()

  return (
    <>
      {error && (
        <Alert variant="destructive" className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            WebSocket connection error: {error}
          </AlertDescription>
        </Alert>
      )}
      {children}
    </>
  )
}