// src/app/layout.tsx
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryProvider } from "./providers";
import { ThemeProvider } from "./theme-provider";
import { HydrationProvider } from "@/providers/hydration-providers";
import { ClientToasters } from "./client-toasters";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TAI V5 - Trading AI System",
  description: "Professional-grade automated trading platform with real-time analytics, AI-powered insights, and comprehensive portfolio management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <HydrationProvider>
              <TooltipProvider>
                <ClientToasters />
                {children}
              </TooltipProvider>
            </HydrationProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
