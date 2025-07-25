'use client'

import { useState } from 'react'
import ActivityMetrics from '@/components/analytics/activity-metrics'
import LivePulseChart from '@/components/analytics/live-pulse-chart'
import EventTimeline from '@/components/events/event-timeline'
import EventFilters from '@/components/events/event-filters'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Filter } from 'lucide-react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex-none border-b bg-background">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Multi-Agent Observability</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Real-time monitoring of AI agent activities</p>
          </div>
          {/* Collapsible Filters */}
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 gap-2 text-xs sm:text-sm"
              >
                <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Filters</span>
                {isOpen ? (
                  <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 pt-4">
          {/* Filters content when expanded */}
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleContent className="pb-4">
              <EventFilters />
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Responsive panels - vertical split */}
        <PanelGroup direction="vertical" className={isOpen ? "h-[calc(100%-7rem)]" : "h-[calc(100%-1rem)]"}>
          {/* Top panel - Analytics */}
          <Panel defaultSize={40} minSize={10} maxSize={90}>
            <div className="container mx-auto px-4">
              <div className="flex flex-col space-y-4 h-full pb-2 overflow-y-auto">
                <section>
                  <h2 className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2">System Metrics</h2>
                  <ActivityMetrics compact />
                </section>
                <section className="flex-1 flex">
                  <LivePulseChart />
                </section>
              </div>
            </div>
          </Panel>

          {/* Resize handle - spans full width */}
          <PanelResizeHandle className="h-4 relative group">
            <div className="absolute inset-0 bg-accent/20 group-hover:bg-accent/40 transition-colors" />
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-foreground/20 group-hover:bg-foreground/40 transition-colors" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 rounded-full bg-foreground/30 group-hover:bg-foreground/50 transition-colors" />
          </PanelResizeHandle>

          {/* Bottom panel - Event stream */}
          <Panel defaultSize={60}>
            <div className="container mx-auto px-4 h-full">
              <div className="h-full pt-2 flex flex-col">
                <EventTimeline />
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </main>
    </div>
  )
}