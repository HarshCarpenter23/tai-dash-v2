// src/hooks/use-realtime-data.ts
"use client";

import { useEffect, useState } from "react";
import { useHydration } from "@/providers/hydration-provider";

export function useRealtimeData<T>(
  initialData: T,
  fetchFn: () => Promise<T>,
  intervalMs: number = 5000
) {
  const { isHydrated } = useHydration();
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isHydrated) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const newData = await fetchFn();
        setData(newData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval for real-time updates
    const interval = setInterval(fetchData, intervalMs);

    return () => clearInterval(interval);
  }, [isHydrated, fetchFn, intervalMs]);

  return { data, isLoading, error, isHydrated };
}