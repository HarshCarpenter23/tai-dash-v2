"use client"
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { OverviewTab } from "@/components/dashboard/tabs/OverviewTab";
import { AutoTradeTab } from "@/components/dashboard/tabs/AutoTradeTab";
import { ManualTradeTab } from "@/components/dashboard/tabs/ManualTradeTab";
import { PositionsTab } from "@/components/dashboard/tabs/PositionsTab";
import { MarketsTab } from "@/components/dashboard/tabs/MarketsTab";
import { SystemTab } from "@/components/dashboard/tabs/SystemTab";
import { ChatTab } from "@/components/dashboard/tabs/ChatTab";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "auto-trade":
        return <AutoTradeTab />;
      case "manual-trade":
        return <ManualTradeTab />;
      case "positions":
        return <PositionsTab />;
      case "markets":
        return <MarketsTab />;
      case "system":
        return <SystemTab />;
      case "chat":
        return <ChatTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="sticky top-0 h-screen">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
          <Header />
        </div>
        
        <main className="flex-1 p-6 overflow-auto">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}