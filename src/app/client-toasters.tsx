// app/client-toasters.tsx
"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export function ClientToasters() {
  return (
    <>
      <Toaster />
      <Sonner />
    </>
  );
}
