import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, Square, AlertTriangle, Settings, Activity } from "lucide-react";
import { autoTradingEngine, plannedTrades, liveAutoTrades } from "@/data/mockData";

export function AutoTradeTab() {
  const [engineStatus, setEngineStatus] = useState(autoTradingEngine.status);
  const [selectedTimeframe, setSelectedTimeframe] = useState("5m");

  const handleEngineControl = (action: string) => {
    switch (action) {
      case 'start':
        setEngineStatus('active');
        break;
      case 'pause':
        setEngineStatus('paused');
        break;
      case 'stop':
        setEngineStatus('inactive');
        break;
      case 'emergency':
        setEngineStatus('emergency');
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'paused': return 'text-warning';
      case 'inactive': return 'text-muted-foreground';
      case 'emergency': return 'text-danger';
      default: return 'text-muted-foreground';
    }
  };

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Engine Control */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Trading Engine Control</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">Status: 
                    <span className={`ml-2 ${getStatusColor(engineStatus)}`}>
                      {engineStatus.charAt(0).toUpperCase() + engineStatus.slice(1)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Strategy: {autoTradingEngine.strategy}
                  </div>
                </div>
                <div className={`h-3 w-3 rounded-full ${
                  engineStatus === 'active' ? 'bg-success animate-pulse-slow' : 
                  engineStatus === 'paused' ? 'bg-warning' : 
                  engineStatus === 'emergency' ? 'bg-danger animate-pulse-slow' : 'bg-muted-foreground'
                }`} />
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={() => handleEngineControl('start')}
                  disabled={engineStatus === 'active'}
                  className="btn-buy"
                  size="sm"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Start
                </Button>
                <Button 
                  onClick={() => handleEngineControl('pause')}
                  disabled={engineStatus !== 'active'}
                  variant="outline"
                  size="sm"
                >
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </Button>
                <Button 
                  onClick={() => handleEngineControl('stop')}
                  disabled={engineStatus === 'inactive'}
                  variant="outline"
                  size="sm"
                >
                  <Square className="h-4 w-4 mr-1" />
                  Stop
                </Button>
                <Button 
                  onClick={() => handleEngineControl('emergency')}
                  className="btn-sell"
                  size="sm"
                >
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Emergency
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm text-muted-foreground">Daily Trades</div>
                  <div className="text-2xl font-bold">{autoTradingEngine.dailyTrades}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                  <div className="text-2xl font-bold text-success">{autoTradingEngine.successRate}%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Strategy Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Timeframe</label>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">1 Minute</SelectItem>
                    <SelectItem value="5m">5 Minutes</SelectItem>
                    <SelectItem value="15m">15 Minutes</SelectItem>
                    <SelectItem value="1h">1 Hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Confidence Threshold</span>
                  <span className="text-sm font-medium">{autoTradingEngine.confidence}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${autoTradingEngine.confidence}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Planned and Live Trades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Planned Trades */}
        <Card>
          <CardHeader>
            <CardTitle>Planned Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {plannedTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <Badge variant={trade.type === 'BUY' ? 'default' : 'destructive'}>
                      {trade.type}
                    </Badge>
                    <div>
                      <div className="font-medium text-sm">{trade.symbol}</div>
                      <div className="text-xs text-muted-foreground">Size: {trade.size}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(trade.price)}</div>
                    <div className="text-xs text-muted-foreground">ETA: {trade.eta}</div>
                    <div className="text-xs text-success">{trade.confidence}% conf</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Auto Trades */}
        <Card>
          <CardHeader>
            <CardTitle>Live Auto Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {liveAutoTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <Badge variant={trade.type === 'BUY' ? 'default' : 'destructive'}>
                      {trade.type}
                    </Badge>
                    <div>
                      <div className="font-medium text-sm">{trade.symbol}</div>
                      <div className="text-xs text-muted-foreground">{trade.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(trade.price)}</div>
                    <div className={`text-sm ${trade.pnl > 0 ? 'text-success' : 'text-danger'}`}>
                      {trade.pnl > 0 ? '+' : ''}{formatCurrency(trade.pnl)}
                    </div>
                    <Badge variant={trade.status === 'open' ? 'default' : 'secondary'} className="text-xs">
                      {trade.status}
                    </Badge>
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