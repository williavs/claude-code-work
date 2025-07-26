import blessed from 'blessed';

export function createActivityChart(screen) {
  // Create a simple chart container
  const container = blessed.box({
    parent: screen,
    label: ' Activity (3min) ',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'black',
      border: {
        fg: 'cyan'
      },
      label: {
        fg: 'white',
        bold: true
      }
    }
  });

  // Simple setData method with sparkline
  container.setData = function(data) {
    if (!data || data.length === 0) {
      container.setContent('{center}{gray-fg}⏳ Waiting for events...{/gray-fg}{/center}');
      return;
    }

    // Data comes from eventStore in format: [{x: timeString, y: count}, ...]
    const values = data.map(d => d.y || 0);
    
    // Get actual available width dynamically (like we did for events)
    const availableWidth = container.width - 4; // Account for borders and padding
    
    if (values.length === 0 || availableWidth <= 0) {
      container.setContent('{center}{gray-fg}No data{/gray-fg}{/center}');
      return;
    }

    // Create sparkline visualization that fills the entire width
    const maxValue = Math.max(...values, 1);
    const sparklineChars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
    
    // Generate sparkline using full available width
    let sparkline = '';
    
    // If we have more data points than width, sample them
    // If we have fewer data points than width, stretch them
    for (let i = 0; i < availableWidth; i++) {
      let value = 0;
      
      if (values.length >= availableWidth) {
        // More data than space - sample the data
        const dataIndex = Math.floor((i / availableWidth) * values.length);
        value = values[dataIndex] || 0;
      } else {
        // Less data than space - stretch the data
        const dataIndex = Math.floor((i / availableWidth) * values.length);
        value = values[dataIndex] || 0;
      }
      
      const normalized = Math.floor((value / maxValue) * (sparklineChars.length - 1));
      const char = sparklineChars[normalized] || '▁';
      
      // Color based on activity level
      let color = 'green';
      if (value > maxValue * 0.7) color = 'red';
      else if (value > maxValue * 0.4) color = 'yellow';
      
      sparkline += `{${color}-fg}${char}{/${color}-fg}`;
    }

    const content = [
      '',
      sparkline,
      `{center}{gray-fg}Peak: ${maxValue} events{/gray-fg}{/center}`,
      ''
    ].join('\n');

    container.setContent(content);
  };

  // Initialize
  container.setData([]);

  return container;
}