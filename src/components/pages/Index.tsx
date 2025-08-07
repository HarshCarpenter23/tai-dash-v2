import { Button } from "@/components/ui/button";
import { Activity, ArrowRight, BarChart3, Bot, TrendingUp } from "lucide-react";
import Link from "next/link";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="p-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold gradient-text-primary">TAI V5</span>
          </div>
          <Link href="/dashboard">
            <Button className="bg-gradient-primary">
              Launch Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 gradient-text-primary">
            Trading AI System
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional-grade automated trading platform with real-time analytics, 
            AI-powered insights, and comprehensive portfolio management.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-gradient-primary glow-primary">
              Access Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all duration-300">
            <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-muted-foreground">
              Advanced charting, market data, and performance metrics with professional-grade visualization.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all duration-300">
            <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Trading</h3>
            <p className="text-muted-foreground">
              Automated trading strategies with machine learning algorithms and intelligent risk management.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all duration-300">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Portfolio Management</h3>
            <p className="text-muted-foreground">
              Comprehensive position tracking, risk analysis, and performance optimization tools.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;