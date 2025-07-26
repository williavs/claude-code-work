import React from 'react';
import { Box, Text } from 'ink';

interface ChartProps {
  chartData: number[];
}

export const Chart: React.FC<ChartProps> = ({ chartData }) => {
  const maxValue = Math.max(...chartData, 1);
  const bars = chartData.map(value => {
    const height = Math.round((value / maxValue) * 3);
    switch (height) {
      case 0: return '▁';
      case 1: return '▂';
      case 2: return '▃';
      case 3: return '▅';
      default: return '▇';
    }
  }).join('');

  return (
    <Box borderStyle="single" paddingX={2} paddingY={1}>
      <Text>
        <Text color="cyan" bold>Activity (3m): </Text>
        <Text color="blue">{bars}</Text>
      </Text>
    </Box>
  );
};