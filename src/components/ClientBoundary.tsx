// src/components/ClientBoundary.tsx
"use client";

import { useHydration } from "@/providers/hydration-provider";
import { ReactNode, Suspense } from "react";

interface ClientBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export function ClientBoundary({ 
  children, 
  fallback = null, 
  className 
}: ClientBoundaryProps) {
  const { isHydrated } = useHydration();

  if (!isHydrated) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <Suspense fallback={fallback}>
      <div className={className}>{children}</div>
    </Suspense>
  );
}