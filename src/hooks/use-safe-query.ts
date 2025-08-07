// src/hooks/use-safe-query.ts
"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useHydration } from "@/providers/hydration-provider";

export function useSafeQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) {
  const { isHydrated } = useHydration();

  return useQuery({
    queryKey,
    queryFn,
    enabled: isHydrated && (options?.enabled ?? true),
    ...options,
  });
}