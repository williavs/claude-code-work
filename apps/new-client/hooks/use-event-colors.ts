'use client';

export function useEventColors() {
  // Use shadcn chart colors from CSS variables
  const chartColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];

  const hashString = (str: string): number => {
    let hash = 7151;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return Math.abs(hash >>> 0);
  };

  const getColorForSession = (sessionId: string): string => {
    const hash = hashString(sessionId);
    const index = hash % chartColors.length;
    return chartColors[index];
  };

  const getColorForApp = (appName: string): string => {
    const hash = hashString(appName);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const getHexColorForSession = (sessionId: string): string => {
    // For canvas rendering, we need to convert HSL to hex
    // This is a simplified version - in production you'd want a proper HSL to HEX converter
    const color = getColorForSession(sessionId);
    return color; // Canvas can handle HSL directly
  };

  const getHexColorForApp = (appName: string): string => {
    return getColorForApp(appName);
  };

  const getGradientForSession = (sessionId: string): string => {
    const hash = hashString(sessionId);
    const hue = hash % 360;
    return `linear-gradient(to right, hsl(${hue}, 70%, 50%), hsl(${hue}, 70%, 40%))`;
  };

  const getGradientForApp = (appName: string): string => {
    const hash = hashString(appName);
    const hue = hash % 360;
    return `linear-gradient(to right, hsl(${hue}, 60%, 60%), hsl(${hue}, 60%, 50%))`;
  };

  return {
    getColorForSession,
    getColorForApp,
    getHexColorForSession,
    getHexColorForApp,
    getGradientForSession,
    getGradientForApp,
  };
}