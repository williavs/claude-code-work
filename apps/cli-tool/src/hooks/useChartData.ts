import { useState, useEffect, useRef } from 'react';

interface UseChartDataReturn {
  chartData: number[];
  addEvent: () => void;
}

export const useChartData = (bucketCount: number = 60, bucketDurationSec: number = 3): UseChartDataReturn => {
  const [chartData, setChartData] = useState<number[]>(Array(bucketCount).fill(0));
  const lastBucketRef = useRef<number>(-1);
  
  const getCurrentBucket = () => {
    const now = Date.now();
    return Math.floor((now / 1000 / bucketDurationSec) % bucketCount);
  };
  
  const addEvent = () => {
    const currentBucket = getCurrentBucket();
    
    setChartData(prev => {
      const newData = [...prev];
      
      // If we've moved to a new bucket, reset it
      if (currentBucket !== lastBucketRef.current) {
        lastBucketRef.current = currentBucket;
        newData[currentBucket] = 0;
      }
      
      // Increment the current bucket
      newData[currentBucket]++;
      
      return newData;
    });
  };
  
  // Reset old buckets periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const currentBucket = getCurrentBucket();
      
      setChartData(prev => {
        const newData = [...prev];
        
        // Clear buckets that are older than our window
        for (let i = 0; i < bucketCount; i++) {
          const bucketAge = (currentBucket - i + bucketCount) % bucketCount;
          if (bucketAge > bucketCount * 0.8) {
            newData[i] = 0;
          }
        }
        
        return newData;
      });
    }, bucketDurationSec * 1000);
    
    return () => clearInterval(interval);
  }, [bucketCount, bucketDurationSec]);
  
  return { chartData, addEvent };
};