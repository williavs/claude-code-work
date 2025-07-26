import blessed from 'blessed';

export function createActivityChart(screen) {
  const chart = blessed.box({
    parent: screen,
    label: ' Activity ',
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
    },
    padding: {
      left: 1,
      right: 1
    }
  });

  // Custom method to set chart data
  chart.setData = function(data) {
    if (!data || data.length === 0) {
      this.setContent('{center}No activity data{/center}');
      return;
    }

    // Find max value for scaling
    const maxValue = Math.max(...data.map(d => d.y), 1);
    const chartHeight = this.height - 4; // Account for border and padding
    const chartWidth = this.width - 4;
    
    // Create simple ASCII bar chart
    const barWidth = Math.floor(chartWidth / data.length);
    const bars = [];
    
    // Draw bars
    for (let i = 0; i < Math.min(data.length, Math.floor(chartWidth / 2)); i++) {
      const value = data[i].y;
      const barHeight = Math.round((value / maxValue) * chartHeight);
      const color = value > 0 ? 'green' : 'gray';
      
      for (let h = 0; h < chartHeight; h++) {
        if (!bars[h]) bars[h] = '';
        
        if (h >= chartHeight - barHeight) {
          bars[h] += `{${color}-fg}█{/${color}-fg} `;
        } else {
          bars[h] += '  ';
        }
      }
    }
    
    // Add scale on the left
    const scaleText = `${maxValue}`;
    if (bars[0]) {
      bars[0] = `{gray-fg}${scaleText.padStart(3)}{/gray-fg} ` + bars[0];
    }
    
    // Join bars and reverse so they draw from bottom up
    const content = bars.reverse().join('\n');
    this.setContent(content);
  };

  // Initialize with empty data
  chart.setData([]);

  return chart;
}