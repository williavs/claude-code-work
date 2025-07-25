# Next.js 15 Migration with shadcn Architecture

## Overview

This document outlines the scalable architecture for migrating the Vue.js client to Next.js 15 using the latest shadcn components and blocks system. The approach prioritizes scalability, maintainability, and modern best practices.

## Key Updates for 2025

### shadcn Evolution
- **No more `-ui` suffix**: The library is now simply "shadcn"
- **React 19 Support**: Full compatibility with Next.js 15 and React 19
- **Tailwind v4**: Native integration with the new @theme directive
- **Blocks System**: Pre-built, customizable layouts for rapid development
- **Sidebar Component**: Official sidebar system (October 2024 release)
- **Monorepo Support**: Enhanced CLI for complex project structures

## Architecture Overview

```
apps/
├── new-client/                    # Next.js 15 App
│   ├── app/
│   │   ├── layout.tsx            # Root layout with sidebar
│   │   ├── page.tsx              # Dashboard home
│   │   ├── events/
│   │   │   ├── page.tsx          # Events dashboard
│   │   │   └── [id]/page.tsx    # Event details
│   │   ├── analytics/
│   │   │   └── page.tsx          # Analytics with charts
│   │   └── settings/
│   │       ├── page.tsx          # Settings
│   │       └── themes/page.tsx   # Theme management
│   ├── components/
│   │   ├── ui/                   # shadcn components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── data-table.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── ...
│   │   ├── blocks/               # Custom blocks
│   │   │   ├── event-timeline.tsx
│   │   │   ├── live-pulse-chart.tsx
│   │   │   └── filter-panel.tsx
│   │   └── providers/
│   │       ├── theme-provider.tsx
│   │       └── websocket-provider.tsx
│   ├── hooks/
│   │   ├── use-websocket.ts
│   │   ├── use-chart-data.ts
│   │   └── use-event-filters.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── chart-config.ts
│   └── stores/
│       └── event-store.ts
```

## Installation & Setup

### 1. Initialize Next.js 15 with shadcn

```bash
# Create Next.js app with our specific requirements
npx create-next-app@latest new-client \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --eslint

# Navigate to the project
cd new-client

# Initialize shadcn (handles Tailwind v4 and React 19 setup)
npx shadcn@latest init

# When prompted:
# - Style: New York (recommended for enterprise apps)
# - Base color: Neutral
# - CSS variables: Yes
```

### 2. Install Core shadcn Components

```bash
# Essential components for our dashboard
npx shadcn@latest add button card dialog sheet tabs
npx shadcn@latest add sidebar chart data-table
npx shadcn@latest add select dropdown-menu
npx shadcn@latest add toast sonner
npx shadcn@latest add skeleton badge
npx shadcn@latest add scroll-area separator
```

### 3. Install Additional Dependencies

```bash
# State management and utilities
npm install zustand @tanstack/react-table recharts
npm install date-fns clsx tailwind-merge
npm install @radix-ui/react-icons lucide-react
```

## Component Architecture

### 1. Layout with Sidebar (app/layout.tsx)

```typescript
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { WebSocketProvider } from "@/components/providers/websocket-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WebSocketProvider>
            <SidebarProvider>
              <div className="flex h-screen overflow-hidden">
                <AppSidebar />
                <main className="flex-1 overflow-y-auto">
                  <div className="container h-full p-4 md:p-6">
                    <SidebarTrigger className="mb-4 md:hidden" />
                    {children}
                  </div>
                </main>
              </div>
            </SidebarProvider>
          </WebSocketProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2. Event Timeline with Data Table

```typescript
'use client'

import { useEventStore } from "@/stores/event-store"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { Card } from "@/components/ui/card"

export function EventTimeline() {
  const events = useEventStore((state) => state.filteredEvents)
  
  return (
    <Card className="flex-1">
      <DataTable
        columns={columns}
        data={events}
        pagination
        sorting
        filtering
      />
    </Card>
  )
}
```

### 3. Live Chart with Recharts

```typescript
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import { useChartData } from "@/hooks/use-chart-data"

export function LivePulseChart() {
  const { data, config } = useChartData()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[300px] w-full">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <ChartTooltip />
            <Area
              type="monotone"
              dataKey="events"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
```

### 4. WebSocket Provider (Client-Only)

```typescript
'use client'

import { createContext, useContext, useEffect, useRef } from 'react'
import { useEventStore } from '@/stores/event-store'

const WebSocketContext = createContext<WebSocket | null>(null)

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const ws = useRef<WebSocket | null>(null)
  const { addEvent, setEvents, setConnected } = useEventStore()
  
  useEffect(() => {
    // Connect to external WebSocket server
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000/stream'
    ws.current = new WebSocket(wsUrl)
    
    ws.current.onopen = () => {
      setConnected(true)
    }
    
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'initial') {
        setEvents(data.data)
      } else if (data.type === 'event') {
        addEvent(data.data)
      }
    }
    
    ws.current.onclose = () => {
      setConnected(false)
      // Implement reconnection logic
    }
    
    return () => {
      ws.current?.close()
    }
  }, [])
  
  return (
    <WebSocketContext.Provider value={ws.current}>
      {children}
    </WebSocketContext.Provider>
  )
}
```

## Scalability Features

### 1. Modular Block System
- Each major feature is a self-contained block
- Blocks can be composed and reused across pages
- Easy to add new features without affecting existing ones

### 2. Type-Safe Architecture
```typescript
// types/events.ts
export interface HookEvent {
  id: number
  source_app: string
  session_id: string
  hook_event_type: string
  payload: Record<string, any>
  chat?: any[]
  summary?: string
  timestamp: number
}

// Use throughout the app for consistency
```

### 3. Performance Optimizations
- Server Components for static content
- Client Components only where needed
- Dynamic imports for heavy components
- React.memo for expensive renders
- Virtual scrolling with TanStack Table

### 4. Theme System with CSS Variables
```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* shadcn theme variables */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  
  /* Chart colors */
  --chart-1: 12 76% 61%;
  --chart-2: 173 58% 39%;
  --chart-3: 197 37% 24%;
  --chart-4: 43 74% 66%;
  --chart-5: 27 87% 67%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

### 5. Extensible Sidebar Navigation
```typescript
// components/app-sidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, Activity, BarChart, Settings } from "lucide-react"

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Events", url: "/events", icon: Activity },
  { title: "Analytics", url: "/analytics", icon: BarChart },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
```

## Migration Phases

### Phase 1: Foundation (Week 1)
- [ ] Set up Next.js 15 with shadcn
- [ ] Configure Tailwind v4 with theme system
- [ ] Implement sidebar navigation
- [ ] Create base layouts and providers

### Phase 2: Core Features (Week 2)
- [ ] Port WebSocket connection logic
- [ ] Implement event data table
- [ ] Create live charts with Recharts
- [ ] Add filtering functionality

### Phase 3: Advanced Features (Week 3)
- [ ] Theme management UI
- [ ] Advanced analytics dashboard
- [ ] Export functionality
- [ ] Performance optimizations

### Phase 4: Polish & Deploy (Week 4)
- [ ] Complete UI/UX polish
- [ ] Comprehensive testing
- [ ] Documentation
- [ ] Production deployment

## Key Benefits of This Architecture

1. **Scalability**: Modular blocks allow easy feature additions
2. **Maintainability**: Clear separation of concerns with shadcn components
3. **Performance**: Optimized for Next.js 15 with server/client boundaries
4. **Developer Experience**: Type-safe, well-documented components
5. **User Experience**: Beautiful, accessible UI out of the box
6. **Flexibility**: Own your components, customize as needed

This architecture provides a solid foundation for growth while maintaining the exact server compatibility required.