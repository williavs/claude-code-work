import blessed from 'blessed';

export function createFilterPanel(screen) {
  const filterPanel = blessed.box({
    parent: screen,
    label: ' Filters ',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'black',
      border: {
        fg: 'yellow'
      },
      label: {
        fg: 'yellow',
        bold: true
      }
    },
    padding: {
      left: 1,
      right: 1
    },
    hidden: true
  });

  // Method to update filter display
  filterPanel.updateFilters = function(filters) {
    const lines = [];
    
    lines.push('{yellow-fg}{bold}Active Filters:{/bold}{/yellow-fg}');
    lines.push('');
    
    const filterInfo = [
      { key: '1', type: 'sourceApp', label: 'Source App', value: filters.sourceApp },
      { key: '2', type: 'sessionId', label: 'Session ID', value: filters.sessionId },
      { key: '3', type: 'eventType', label: 'Event Type', value: filters.eventType }
    ];
    
    filterInfo.forEach(({ key, label, value }) => {
      const status = value ? `{green-fg}${value}{/green-fg}` : '{gray-fg}ALL{/gray-fg}';
      lines.push(`{cyan-fg}[${key}]{/cyan-fg} ${label}: ${status}`);
    });
    
    lines.push('');
    lines.push('{gray-fg}Press 1-3 to cycle filters, C to clear all{/gray-fg}');
    
    this.setContent(lines.join('\n'));
  };

  // Initialize with empty filters
  filterPanel.updateFilters({
    sourceApp: null,
    sessionId: null,
    eventType: null
  });

  return filterPanel;
}