"use client"
import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  MousePointer, 
  Briefcase, 
  DollarSign, 
  Monitor, 
  MessageSquare,
  ChevronLeft,
  Activity,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "auto-trade", label: "Auto Trade", icon: TrendingUp },
  { id: "manual-trade", label: "Manual Trade", icon: MousePointer },
  { id: "positions", label: "Open Positions", icon: Briefcase },
  { id: "markets", label: "Markets", icon: DollarSign },
  { id: "system", label: "System Monitor", icon: Monitor },
  { id: "chat", label: "TAI Chat", icon: MessageSquare },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "h-full bg-gradient-to-b from-card to-card/95 border-r border-border/50 backdrop-blur-lg transition-all duration-500 ease-in-out flex flex-col relative",
      "before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary/5 before:to-transparent before:pointer-events-none",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Elegant Header */}
      <div className="p-4 border-b border-border/30 flex items-center justify-between relative backdrop-blur-sm">
        {!collapsed && (
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <Zap className="h-7 w-7 text-primary drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 h-7 w-7 bg-primary/20 rounded-full blur-md animate-pulse-slow" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl gradient-text-primary tracking-tight">TAI V5</span>
              <span className="text-xs text-muted-foreground font-medium">Trading System</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto relative group">
            <Zap className="h-6 w-6 text-primary drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 h-6 w-6 bg-primary/20 rounded-full blur-md animate-pulse-slow" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-accent/50 transition-all duration-300 hover:scale-105 group"
        >
          <ChevronLeft className={cn(
            "h-4 w-4 transition-all duration-300 group-hover:text-primary",
            collapsed && "rotate-180"
          )} />
        </button>
      </div>

      {/* Enhanced Navigation */}
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "group w-full flex items-center px-3 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                "hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:shadow-md hover:scale-[1.02]",
                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background",
                collapsed ? "justify-center" : "space-x-3",
                isActive ? 
                  "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg glow-primary" :
                  "text-foreground/70 hover:text-foreground"
              )}
              title={collapsed ? tab.label : undefined}
              style={{ 
                animationDelay: `${index * 50}ms`,
                animation: "fade-in 0.5s ease-out forwards"
              }}
            >
              {/* Background effect for active state */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur-sm" />
              )}
              
              {/* Icon with enhanced styling */}
              <div className="relative z-10 flex items-center justify-center">
                <Icon className={cn(
                  "h-5 w-5 flex-shrink-0 transition-all duration-300",
                  isActive ? "scale-110 drop-shadow-sm" : "group-hover:scale-105",
                  collapsed && "h-6 w-6"
                )} />
              </div>
              
              {/* Label with smooth transitions */}
              {!collapsed && (
                <div className="relative z-10 flex flex-col items-start">
                  <span className={cn(
                    "font-semibold text-sm transition-all duration-300 leading-tight",
                    isActive ? "text-primary-foreground" : "group-hover:text-foreground"
                  )}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <div className="h-0.5 w-full bg-primary-foreground/30 rounded-full mt-1 animate-fade-in" />
                  )}
                </div>
              )}
              
              {/* Hover effect indicator */}
              <div className={cn(
                "absolute right-2 w-1 h-8 bg-primary rounded-full transition-all duration-300 opacity-0",
                "group-hover:opacity-30",
                isActive && "opacity-100",
                collapsed && "hidden"
              )} />
            </button>
          );
        })}
      </nav>

      {/* Enhanced Status Indicator */}
      <div className="p-4 border-t border-border/30 bg-gradient-to-t from-muted/20 to-transparent">
        <div className={cn(
          "flex items-center px-3 py-3 rounded-xl bg-gradient-to-r from-success/10 to-success/5 border border-success/20 backdrop-blur-sm",
          "hover:from-success/15 hover:to-success/10 transition-all duration-300 hover:shadow-md",
          collapsed ? "justify-center space-x-0" : "space-x-3"
        )}>
          <div className="relative flex items-center justify-center">
            <div className="h-3 w-3 bg-success rounded-full animate-pulse-slow shadow-lg" />
            <div className="absolute h-3 w-3 bg-success/40 rounded-full animate-ping" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm text-success font-semibold">System Online</span>
              <span className="text-xs text-success/70 font-medium">All systems operational</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}