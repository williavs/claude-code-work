<template>
  <div class="h-screen flex flex-col bg-[var(--theme-bg-secondary)]">
    <!-- Minimal Header -->
    <header class="bg-[var(--theme-bg-primary)] border-b border-[var(--theme-border-primary)]">
      <div class="px-3 py-2 flex items-center justify-between">
        <!-- Title Section -->
        <h1 class="text-lg font-medium text-[var(--theme-text-primary)]">
          Agent Observability Dock
        </h1>
        
        <!-- Status and Controls -->
        <div class="flex items-center gap-3">
          <!-- Connection Status -->
          <div class="flex items-center gap-1">
            <span :class="[
              'w-2 h-2 rounded-full',
              isConnected ? 'bg-green-500' : 'bg-red-500'
            ]"></span>
            <span class="text-xs text-[var(--theme-text-secondary)]">
              {{ isConnected ? 'Connected' : 'Offline' }}
            </span>
          </div>
          
          <!-- Event Count -->
          <span class="text-xs text-[var(--theme-text-secondary)]">
            {{ events.length }}
          </span>
          
          <!-- Filters Toggle -->
          <button
            @click="showFilters = !showFilters"
            class="p-1 rounded hover:bg-[var(--theme-bg-secondary)] transition-colors"
            :title="showFilters ? 'Hide filters' : 'Show filters'"
          >
            <svg class="w-4 h-4 text-[var(--theme-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
          
          <!-- Theme Toggle -->
          <button
            @click="handleThemeManagerClick"
            class="p-1 rounded hover:bg-[var(--theme-bg-secondary)] transition-colors"
            title="Toggle theme"
          >
            <svg class="w-4 h-4 text-[var(--theme-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
    
    <!-- Filters -->
    <FilterPanel
      v-if="showFilters"
      :filters="filters"
      @update:filters="filters = $event"
    />
    
    <!-- Live Pulse Chart -->
    <LivePulseChart
      :events="events"
      :filters="filters"
    />
    
    <!-- Timeline -->
    <EventTimeline
      :events="events"
      :filters="filters"
      v-model:stick-to-bottom="stickToBottom"
    />
    
    <!-- Stick to bottom button -->
    <StickScrollButton
      :stick-to-bottom="stickToBottom"
      @toggle="stickToBottom = !stickToBottom"
    />
    
    <!-- Error message -->
    <div
      v-if="error"
      class="fixed bottom-4 left-4 mobile:bottom-3 mobile:left-3 mobile:right-3 bg-red-100 border border-red-400 text-red-700 px-3 py-2 mobile:px-2 mobile:py-1.5 rounded mobile:text-xs"
    >
      {{ error }}
    </div>
    
    <!-- Theme Manager -->
    <ThemeManager 
      :is-open="showThemeManager"
      @close="showThemeManager = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useWebSocket } from './composables/useWebSocket';
import { useThemes } from './composables/useThemes';
import EventTimeline from './components/EventTimeline.vue';
import FilterPanel from './components/FilterPanel.vue';
import StickScrollButton from './components/StickScrollButton.vue';
import LivePulseChart from './components/LivePulseChart.vue';
import ThemeManager from './components/ThemeManager.vue';

// WebSocket connection
const { events, isConnected, error } = useWebSocket('ws://localhost:4000/stream');

// Theme management
const { state: themeState } = useThemes();

// Filters
const filters = ref({
  sourceApp: '',
  sessionId: '',
  eventType: ''
});

// UI state
const stickToBottom = ref(true);
const showThemeManager = ref(false);
const showFilters = ref(false);

// Computed properties
const isDark = computed(() => {
  return themeState.value.currentTheme === 'dark' || 
         (themeState.value.isCustomTheme && 
          themeState.value.customThemes.find(t => t.id === themeState.value.currentTheme)?.name.includes('dark'));
});

// Debug handler for theme manager
const handleThemeManagerClick = () => {
  console.log('Theme manager button clicked!');
  showThemeManager.value = true;
};
</script>