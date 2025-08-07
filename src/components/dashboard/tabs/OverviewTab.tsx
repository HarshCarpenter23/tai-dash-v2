import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartCard } from "../charts/ChartCard";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Target, Award, AlertTriangle } from "lucide-react";
import { 
  portfolioMetrics, 
  currentMarket, 
  equityCurveData, 
  recentSignals 
} from "@/data/mockData";

export function OverviewTab() {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const formatPercentage = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {formatPercentage(portfolioMetrics.totalReturn)}
            </div>
            <p className="text-xs text-muted-foreground">Since inception</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily P&L</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(portfolioMetrics.dailyPnL)}
            </div>
            <p className="text-xs text-muted-foreground">Today's performance</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unrealized P&L</CardTitle>
            <Target className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {formatCurrency(portfolioMetrics.unrealizedPnL)}
            </div>
            <p className="text-xs text-muted-foreground">Open positions</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
            <Award className="h-4 w-4 text-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(portfolioMetrics.accountBalance)}
            </div>
            <p className="text-xs text-muted-foreground">Available equity</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Market & Risk Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Market */}
        <Card>
          <CardHeader>
            <CardTitle>Current Market</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{currentMarket.symbol}</span>
                <Badge variant={currentMarket.change > 0 ? "default" : "destructive"}>
                  {currentMarket.change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {formatPercentage(currentMarket.change)}
                </Badge>
              </div>
              <div className="text-2xl font-bold">{formatCurrency(currentMarket.price)}</div>
              <div className={`text-sm ${currentMarket.change > 0 ? 'text-success' : 'text-danger'}`}>
                {currentMarket.change > 0 ? '+' : ''}{formatCurrency(currentMarket.changeAmount)} today
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Metrics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Risk Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{portfolioMetrics.sharpeRatio}</div>
                <div className="text-xs text-muted-foreground">Sharpe Ratio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{portfolioMetrics.winRate}%</div>
                <div className="text-xs text-muted-foreground">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{portfolioMetrics.profitFactor}</div>
                <div className="text-xs text-muted-foreground">Profit Factor</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-danger">{portfolioMetrics.maxDrawdown}%</div>
                <div className="text-xs text-muted-foreground">Max Drawdown</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equity Curve */}
        <ChartCard title="Equity Curve">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={equityCurveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [formatCurrency(value), 'Equity']}
              />
              <Line 
                type="monotone" 
                dataKey="equity" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Recent Signals */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSignals.map((signal, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <Badge variant={signal.signal === 'BUY' ? 'default' : 'destructive'}>
                      {signal.signal}
                    </Badge>
                    <div>
                      <div className="font-medium text-sm">{signal.symbol}</div>
                      <div className="text-xs text-muted-foreground">{signal.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(signal.price)}</div>
                    <div className="text-xs text-muted-foreground">{signal.confidence}% confidence</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}