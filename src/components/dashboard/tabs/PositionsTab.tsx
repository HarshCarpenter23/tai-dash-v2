import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, X } from "lucide-react";
import { openPositions } from "@/data/mockData";

export function PositionsTab() {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const formatPercentage = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;

  const totalPnL = openPositions.reduce((sum, pos) => sum + pos.pnl, 0);
  const longPositions = openPositions.filter(pos => pos.pnl > 0).length;
  const shortPositions = openPositions.length - longPositions;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            {totalPnL > 0 ? 
              <TrendingUp className="h-4 w-4 text-success" /> : 
              <TrendingDown className="h-4 w-4 text-danger" />
            }
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPnL > 0 ? 'text-success' : 'text-danger'}`}>
              {formatCurrency(totalPnL)}
            </div>
            <p className="text-xs text-muted-foreground">All open positions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Long Positions</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{longPositions}</div>
            <p className="text-xs text-muted-foreground">Bullish trades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Short Positions</CardTitle>
            <TrendingDown className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">{shortPositions}</div>
            <p className="text-xs text-muted-foreground">Bearish trades</p>
          </CardContent>
        </Card>
      </div>

      {/* Positions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Open Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {openPositions.map((position) => (
              <div key={position.id} className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                <div className="flex items-center justify-between">
                  {/* Position Info */}
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-medium text-lg">{position.symbol}</div>
                      <div className="text-sm text-muted-foreground">Size: {position.size}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Entry</div>
                      <div className="font-medium">{formatCurrency(position.entry)}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Current</div>
                      <div className="font-medium">{formatCurrency(position.current)}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">TP / SL</div>
                      <div className="text-sm">
                        <span className="text-success">{formatCurrency(position.tp)}</span> / 
                        <span className="text-danger ml-1">{formatCurrency(position.sl)}</span>
                      </div>
                    </div>
                  </div>

                  {/* P&L and Actions */}
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className={`text-lg font-bold ${position.pnl > 0 ? 'text-success' : 'text-danger'}`}>
                        {formatCurrency(position.pnl)}
                      </div>
                      <div className={`text-sm ${position.percentage > 0 ? 'text-success' : 'text-danger'}`}>
                        {formatPercentage(position.percentage)}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="text-sm font-medium">{position.duration}</div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-danger/10 hover:text-danger"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress bar for P&L */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>SL: {formatCurrency(position.sl)}</span>
                    <span>Entry: {formatCurrency(position.entry)}</span>
                    <span>TP: {formatCurrency(position.tp)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 relative">
                    <div 
                      className={`absolute h-2 rounded-full transition-all duration-300 ${
                        position.percentage > 0 ? 'bg-success' : 'bg-danger'
                      }`}
                      style={{ 
                        width: '50%', 
                        left: '50%',
                        transform: `translateX(${position.percentage > 0 ? '0%' : '-100%'})`,
                      }}
                    />
                    <div className="absolute left-1/2 top-0 w-0.5 h-2 bg-border transform -translate-x-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Portfolio VaR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">-$1,247</div>
            <div className="text-sm text-muted-foreground">1-day, 95% confidence</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Beta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.34</div>
            <div className="text-sm text-muted-foreground">vs BTC benchmark</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">BTC Correlation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">0.78</div>
            <div className="text-sm text-muted-foreground">30-day rolling</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}