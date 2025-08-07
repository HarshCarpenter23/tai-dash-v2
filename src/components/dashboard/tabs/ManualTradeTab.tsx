// src/components/trading/ManualTradeTab.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ChartCard } from "../charts/ChartCard";
import { TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react";
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickData, LineData } from 'lightweight-charts';

// Mock data - replace with your actual data
const generateMockData = (): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let basePrice = 43000;
  const now = Math.floor(Date.now() / 1000);
  
  for (let i = 0; i < 100; i++) {
    const time = now - (100 - i) * 300; // 5-minute intervals
    const volatility = 200;
    const change = (Math.random() - 0.5) * volatility;
    
    const open = basePrice;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 100;
    const low = Math.min(open, close) - Math.random() * 100;
    
    data.push({
      time: time as any,
      open,
      high,
      low,
      close,
    });
    
    basePrice = close;
  }
  
  return data;
};

// Professional Candlestick Chart Component
interface TradingChartProps {
  symbol: string;
  interval: string;
  indicators: {
    sma: boolean;
    ema: boolean;
    rsi: boolean;
    macd: boolean;
    bb: boolean;
  };
}

function TradingChart({ symbol, interval, indicators }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const smaSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const emaSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'hsl(var(--muted-foreground))',
      },
      grid: {
        vertLines: { color: 'hsl(var(--border))' },
        horzLines: { color: 'hsl(var(--border))' },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: 'hsl(var(--primary))',
          width: 1,
          style: 2,
        },
        horzLine: {
          color: 'hsl(var(--primary))',
          width: 1,
          style: 2,
        },
      },
      rightPriceScale: {
        borderColor: 'hsl(var(--border))',
        textColor: 'hsl(var(--muted-foreground))',
      },
      timeScale: {
        borderColor: 'hsl(var(--border))',
        textColor: 'hsl(var(--muted-foreground))',
        timeVisible: true,
        secondsVisible: false,
      },
      watermark: {
        visible: true,
        fontSize: 48,
        horzAlign: 'center',
        vertAlign: 'center',
        color: 'hsl(var(--muted-foreground))',
        text: symbol,
      },
    });

    chartRef.current = chart;

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#10b981', // green
      downColor: '#ef4444', // red
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    candlestickSeriesRef.current = candlestickSeries;

    // Generate and set data
    const data = generateMockData();
    candlestickSeries.setData(data);

    // Calculate and add SMA if enabled
    if (indicators.sma) {
      const smaSeries = chart.addLineSeries({
        color: '#3b82f6',
        lineWidth: 2,
        title: 'SMA(20)',
      });
      smaSeriesRef.current = smaSeries;

      // Simple Moving Average calculation
      const smaData: LineData[] = data.map((candle, index) => {
        if (index < 19) return { time: candle.time, value: candle.close };
        
        const sum = data.slice(index - 19, index + 1).reduce((acc, c) => acc + c.close, 0);
        return {
          time: candle.time,
          value: sum / 20,
        };
      });
      
      smaSeries.setData(smaData);
    }

    // Calculate and add EMA if enabled
    if (indicators.ema) {
      const emaSeries = chart.addLineSeries({
        color: '#ef4444',
        lineWidth: 2,
        title: 'EMA(20)',
        lineStyle: 2, // dashed
      });
      emaSeriesRef.current = emaSeries;

      // Exponential Moving Average calculation
      const emaData: LineData[] = [];
      const multiplier = 2 / (20 + 1);
      let ema = data[0].close;

      data.forEach((candle, index) => {
        if (index === 0) {
          ema = candle.close;
        } else {
          ema = (candle.close - ema) * multiplier + ema;
        }
        emaData.push({ time: candle.time, value: ema });
      });

      emaSeries.setData(emaData);
    }

    // Handle resize
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current?.clientWidth || 0,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [symbol, interval, indicators]);

  return (
    <div 
      ref={chartContainerRef} 
      className="w-full h-[400px] rounded-lg overflow-hidden border border-border"
    />
  );
}

export function ManualTradeTab() {
  const [orderType, setOrderType] = useState("market");
  const [tradeType, setTradeType] = useState("buy");
  const [chartType, setChartType] = useState("candlestick");
  const [interval, setInterval] = useState("5m");
  const [indicators, setIndicators] = useState({
    sma: true,
    ema: false,
    rsi: false,
    macd: false,
    bb: false,
  });

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <ChartCard 
            title={`BTC/USD - ${interval.toUpperCase()}`}
            headerActions={
              <div className="flex space-x-2">
                <div className="flex items-center space-x-2 bg-muted/30 rounded-lg p-1">
                  <Button
                    variant={chartType === "line" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setChartType("line")}
                    className="h-8 px-3"
                  >
                    <Activity className="h-4 w-4 mr-1" />
                    Line
                  </Button>
                  <Button
                    variant={chartType === "candlestick" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setChartType("candlestick")}
                    className="h-8 px-3"
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Candles
                  </Button>
                </div>
                <Select value={interval} onValueChange={setInterval}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">1m</SelectItem>
                    <SelectItem value="5m">5m</SelectItem>
                    <SelectItem value="15m">15m</SelectItem>
                    <SelectItem value="1h">1h</SelectItem>
                    <SelectItem value="4h">4h</SelectItem>
                    <SelectItem value="1d">1d</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            }
          >
            {/* Professional Trading Chart */}
            <TradingChart 
              symbol="BTC/USD" 
              interval={interval}
              indicators={indicators}
            />

            {/* Technical Indicators Panel */}
            <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold">Technical Indicators</h3>
                <div className="text-xs text-muted-foreground">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(indicators).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-2 bg-card rounded border border-border/30">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={value}
                        onCheckedChange={(checked) => 
                          setIndicators(prev => ({ ...prev, [key]: checked }))
                        }
                        className="scale-75"
                      />
                      <Label className="text-xs font-medium">{key.toUpperCase()}</Label>
                    </div>
                    {value && (
                      <div className="text-xs text-primary font-mono">
                        {key === 'sma' && '20'}
                        {key === 'ema' && '20'}
                        {key === 'rsi' && '14'}
                        {key === 'macd' && '12,26,9'}
                        {key === 'bb' && '20,2'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Trading Form */}
        <Card className="border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Manual Order
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {/* Buy/Sell Toggle */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={tradeType === 'buy' ? 'default' : 'outline'}
                  onClick={() => setTradeType('buy')}
                  className={`${tradeType === 'buy' ? 'bg-green-600 hover:bg-green-700 text-white' : 'hover:bg-green-50 hover:text-green-700 hover:border-green-300'} transition-all`}
                >
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Buy
                </Button>
                <Button
                  variant={tradeType === 'sell' ? 'default' : 'outline'}
                  onClick={() => setTradeType('sell')}
                  className={`${tradeType === 'sell' ? 'bg-red-600 hover:bg-red-700 text-white' : 'hover:bg-red-50 hover:text-red-700 hover:border-red-300'} transition-all`}
                >
                  <TrendingDown className="h-4 w-4 mr-1" />
                  Sell
                </Button>
              </div>

              {/* Order Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Order Type</Label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market Order</SelectItem>
                    <SelectItem value="limit">Limit Order</SelectItem>
                    <SelectItem value="stop">Stop Loss</SelectItem>
                    <SelectItem value="take-profit">Take Profit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Quantity (BTC)</Label>
                <Input 
                  type="number" 
                  placeholder="0.00000000" 
                  step="0.00000001"
                  className="font-mono"
                />
                <div className="text-xs text-muted-foreground">
                  Available: 0.00000000 BTC
                </div>
              </div>

              {/* Price (if not market order) */}
              {orderType !== 'market' && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Price (USD)</Label>
                  <Input 
                    type="number" 
                    placeholder="43,675.82" 
                    className="font-mono"
                  />
                  <div className="text-xs text-muted-foreground">
                    Market: $43,675.82
                  </div>
                </div>
              )}

              {/* Advanced Options */}
              <div className="space-y-3 p-3 bg-muted/30 rounded-lg border border-border/30">
                <div className="text-sm font-medium">Advanced Options</div>
                
                {/* Take Profit */}
                <div className="space-y-2">
                  <Label className="text-xs">Take Profit (USD)</Label>
                  <Input 
                    type="number" 
                    placeholder="45,000.00" 
                    className="text-sm font-mono"
                  />
                </div>

                {/* Stop Loss */}
                <div className="space-y-2">
                  <Label className="text-xs">Stop Loss (USD)</Label>
                  <Input 
                    type="number" 
                    placeholder="42,000.00" 
                    className="text-sm font-mono"
                  />
                </div>

                {/* Leverage */}
                <div className="space-y-2">
                  <Label className="text-xs">Leverage</Label>
                  <Select defaultValue="1x">
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1x">1x (Spot)</SelectItem>
                      <SelectItem value="2x">2x</SelectItem>
                      <SelectItem value="5x">5x</SelectItem>
                      <SelectItem value="10x">10x</SelectItem>
                      <SelectItem value="20x">20x</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-card border border-border rounded-lg space-y-3">
                <div className="text-sm font-semibold">Order Summary</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Cost:</span>
                    <span className="font-mono">$21,837.91</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trading Fee:</span>
                    <span className="font-mono">$10.92 (0.05%)</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span className="font-mono">$21,848.83</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                className={`w-full ${
                  tradeType === 'buy' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                } text-white font-semibold py-3`}
                size="lg"
              >
                Place {tradeType.toUpperCase()} Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}