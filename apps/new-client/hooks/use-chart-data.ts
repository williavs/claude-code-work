'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { HookEvent, ChartDataPoint, TimeRange } from '@/lib/types';
import { CHART_TIME_RANGES } from '@/lib/constants';
import { useEventStore } from '@/stores/event-store';

export function useChartData(timeRange: TimeRange) {
  const events = useEventStore((state) => state.events);

  const { dataPoints, maxValue } = useMemo(() => {
    const now = Date.now();
    const rangeSeconds = CHART_TIME_RANGES[timeRange].seconds;
    const rangeMs = rangeSeconds * 1000;
    const bucketCount = 30; // Number of data points to show
    const bucketSizeMs = rangeMs / bucketCount;
    
    // Initialize buckets
    const buckets: ChartDataPoint[] = [];
    
    for (let i = 0; i < bucketCount; i++) {
      const bucketEnd = now - (i * bucketSizeMs);
      const bucketStart = bucketEnd - bucketSizeMs;
      
      buckets.unshift({
        time: new Date(bucketEnd).toISOString(),
        count: 0,
        events: [],
        timestamp: bucketEnd,
        eventTypes: {},
        sessions: {}
      });
    }
    
    // Process events into buckets
    const cutoffTime = now - rangeMs;
    
    events.forEach(event => {
      const eventTime = new Date(event.timestamp).getTime();
      
      // Skip events outside our time range
      if (eventTime < cutoffTime || eventTime > now) {
        return;
      }
      
      // Find the appropriate bucket
      const bucketIndex = buckets.findIndex(bucket => {
        const bucketStart = bucket.timestamp! - bucketSizeMs;
        return eventTime >= bucketStart && eventTime < bucket.timestamp!;
      });
      
      if (bucketIndex !== -1) {
        const bucket = buckets[bucketIndex];
        bucket.count++;
        bucket.events.push(event);
        
        // Track event types
        if (bucket.eventTypes) {
          bucket.eventTypes[event.hook_event_type] = (bucket.eventTypes[event.hook_event_type] || 0) + 1;
        }
        
        // Track sessions
        if (bucket.sessions && event.session_id) {
          bucket.sessions[event.session_id] = (bucket.sessions[event.session_id] || 0) + 1;
        }
      }
    });
    
    // Calculate max value for scaling
    const maxValue = Math.max(...buckets.map(b => b.count), 1);
    
    return { dataPoints: buckets, maxValue };
  }, [events, timeRange]);

  return { dataPoints, maxValue };
}