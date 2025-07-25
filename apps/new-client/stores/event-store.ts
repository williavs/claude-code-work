'use client'

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { HookEvent, FilterState } from '@/lib/types'
import { MAX_EVENTS_TO_DISPLAY } from '@/lib/constants'

interface EventStore {
  // State
  events: HookEvent[]
  filters: FilterState
  isConnected: boolean
  
  // Actions
  addEvent: (event: HookEvent) => void
  setEvents: (events: HookEvent[]) => void
  setFilters: (filters: FilterState) => void
  setConnected: (connected: boolean) => void
  
  // Computed
  getFilteredEvents: () => HookEvent[]
}

export const useEventStore = create<EventStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    events: [],
    filters: {
      sourceApp: '',
      sessionId: '',
      eventType: ''
    },
    isConnected: false,
    
    // Actions
    addEvent: (event) => set((state) => ({
      events: [...state.events, event].slice(-MAX_EVENTS_TO_DISPLAY)
    })),
    
    setEvents: (events) => set({ events }),
    
    setFilters: (filters) => set({ filters }),
    
    setConnected: (connected) => set({ isConnected: connected }),
    
    // Computed getter
    getFilteredEvents: () => {
      const { events, filters } = get()
      
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
    }
  }))
)