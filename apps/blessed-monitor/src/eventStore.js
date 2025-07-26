export class EventStore {
  constructor(maxEvents = 1000) {
    this.maxEvents = maxEvents;
    this.events = [];
    this.filters = {
      sourceApp: null,
      sessionId: null,
      eventType: null
    };
    this.availableFilters = {
      sourceApp: new Set(),
      sessionId: new Set(),
      eventType: new Set()
    };
  }

  addEvent(event) {
    // Normalize property names from snake_case to camelCase for internal use
    const normalizedEvent = {
      timestamp: event.timestamp || new Date().toISOString(),
      sourceApp: event.source_app || event.sourceApp || 'unknown',
      sessionId: event.session_id || event.sessionId || 'unknown',
      hookEventType: event.hook_event_type || event.hookEventType || 'Unknown',
      payload: event.payload || {},
      chat: event.chat || [],
      summary: event.summary || '',
      id: event.id
    };
    
    // Add event to the store
    this.events.push(normalizedEvent);
    
    // Update available filter values
    if (normalizedEvent.sourceApp) this.availableFilters.sourceApp.add(normalizedEvent.sourceApp);
    if (normalizedEvent.sessionId) this.availableFilters.sessionId.add(normalizedEvent.sessionId);
    if (normalizedEvent.hookEventType) this.availableFilters.eventType.add(normalizedEvent.hookEventType);
    
    // Limit the number of stored events
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }
  }

  getFilteredEvents() {
    return this.events.filter(event => {
      if (this.filters.sourceApp && event.sourceApp !== this.filters.sourceApp) {
        return false;
      }
      if (this.filters.sessionId && event.sessionId !== this.filters.sessionId) {
        return false;
      }
      if (this.filters.eventType && event.hookEventType !== this.filters.eventType) {
        return false;
      }
      return true;
    });
  }

  setFilter(type, value) {
    if (this.filters.hasOwnProperty(type)) {
      this.filters[type] = value;
    }
  }

  cycleFilter(type) {
    if (!this.filters.hasOwnProperty(type)) return;
    
    const values = Array.from(this.availableFilters[type]).sort();
    if (values.length === 0) return;
    
    const currentValue = this.filters[type];
    const currentIndex = values.indexOf(currentValue);
    
    if (currentIndex === -1 || currentIndex === values.length - 1) {
      // No filter or last value, go to first value
      this.filters[type] = values[0];
    } else if (currentIndex === values.length - 2) {
      // Second to last value, clear filter
      this.filters[type] = null;
    } else {
      // Go to next value
      this.filters[type] = values[currentIndex + 1];
    }
  }

  clearFilters() {
    this.filters = {
      sourceApp: null,
      sessionId: null,
      eventType: null
    };
  }

  getFilters() {
    return { ...this.filters };
  }

  getAvailableFilters() {
    return {
      sourceApp: Array.from(this.availableFilters.sourceApp).sort(),
      sessionId: Array.from(this.availableFilters.sessionId).sort(),
      eventType: Array.from(this.availableFilters.eventType).sort()
    };
  }

  getChartData(minutes = 5) {
    const now = Date.now();
    const startTime = now - (minutes * 60 * 1000);
    const bucketSize = 10000; // 10 seconds
    const buckets = new Map();
    
    // Initialize buckets
    for (let time = startTime; time <= now; time += bucketSize) {
      buckets.set(Math.floor(time / bucketSize) * bucketSize, 0);
    }
    
    // Count events in each bucket
    const filteredEvents = this.getFilteredEvents();
    filteredEvents.forEach(event => {
      const eventTime = new Date(event.timestamp).getTime();
      if (eventTime >= startTime) {
        const bucketTime = Math.floor(eventTime / bucketSize) * bucketSize;
        if (buckets.has(bucketTime)) {
          buckets.set(bucketTime, buckets.get(bucketTime) + 1);
        }
      }
    });
    
    // Convert to array for chart
    const data = Array.from(buckets.entries())
      .map(([time, count]) => ({
        x: new Date(time).toLocaleTimeString(),
        y: count
      }))
      .slice(-20); // Limit to last 20 data points
    
    return data;
  }

  clear() {
    this.events = [];
    this.clearFilters();
    this.availableFilters = {
      sourceApp: new Set(),
      sessionId: new Set(),
      eventType: new Set()
    };
  }
}