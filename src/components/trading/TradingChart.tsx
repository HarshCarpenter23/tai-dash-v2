// src/components/trading/TradingChart.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Color utility to resolve CSS variables
function getComputedColor(cssVariable: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  
  try {
    const style = getComputedStyle(document.documentElement);
    const value = style.getPropertyValue(cssVariable.replace('var(', '').replace(')', '')).trim();
    
    if (value) {
      // Convert HSL to hex or return RGB
      if (value.includes('hsl')) {
        return fallback; // Use fallback for complex HSL
      }
      return value.startsWith('#') ? value : `#${value}`;
    }
  } catch (error) {
    console.warn('Could not resolve CSS variable:', cssVariable);
  }
  
  return fallback;
}

// Theme-aware color scheme
const getChartColors = (isDark: boolean = false) => {
  const colors = {
    light: {
      background: 'transparent',
      textColor: '#64748b',
      gridColor: '#e2e8f0',
      borderColor: '#e2e8f0',
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      tertiary: '#10b981',
      upColor: '#10b981',
      downColor: '#ef4444',
      watermark: 'rgba(100, 116, 139, 0.2)',
    },
    dark: {
      background: 'transparent',
      textColor: '#94a3b8',
      gridColor: '#374151',
      borderColor: '#374151',
      primary: '#60a5fa',
      secondary: '#a78bfa',
      tertiary: '#34d399',
      upColor: '#34d399',
      downColor: '#f87171',
      watermark: 'rgba(148, 163, 184, 0.2)',
    }
  };

  return isDark ? colors.dark : colors.light;
};

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

// Generate more realistic mock data
const generateMockData = () => {
  const data = [];
  let basePrice = 43000;
  const now = Math.floor(Date.now() / 1000);
  
  for (let i = 0; i < 200; i++) {
    const time = now - (200 - i) * 300; // 5-minute intervals
    const volatility = Math.random() * 300 + 100;
    const trend = Math.sin(i * 0.1) * 50; // Add some trend
    const noise = (Math.random() - 0.5) * volatility;
    
    const open = basePrice;
    const close = open + trend + noise;
    const high = Math.max(open, close) + Math.random() * 150;
    const low = Math.min(open, close) - Math.random() * 150;
    
    data.push({
      time: time,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    });
    
    basePrice = close + (Math.random() - 0.5) * 50; // Gradual price movement
  }
  
  return data;
};

function TradingChartComponent({ symbol, interval, indicators }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const [chartLibrary, setChartLibrary] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      if (typeof window !== 'undefined') {
        const isDark = document.documentElement.classList.contains('dark') ||
          window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(isDark);
      }
    };

    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    if (document.documentElement) {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    return () => observer.disconnect();
  }, []);

  // Dynamic import of lightweight-charts
  useEffect(() => {
    const loadChart = async () => {
      try {
        const { createChart, ColorType } = await import('lightweight-charts');
        setChartLibrary({ createChart, ColorType });
      } catch (error) {
        console.error('Failed to load lightweight-charts:', error);
      }
    };

    loadChart();
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current || !chartLibrary) return;

    const { createChart, ColorType } = chartLibrary;
    const colors = getChartColors(isDarkMode);

    // Clear any existing chart
    if (chartRef.current) {
      chartRef.current.remove();
    }

    try {
      // Create chart with resolved colors
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: colors.background },
          textColor: colors.textColor,
        },
        grid: {
          vertLines: { color: colors.gridColor },
          horzLines: { color: colors.gridColor },
        },
        crosshair: {
          mode: 1,
          vertLine: {
            color: colors.primary,
            width: 1,
            style: 2,
          },
          horzLine: {
            color: colors.primary,
            width: 1,
            style: 2,
          },
        },
        rightPriceScale: {
          borderColor: colors.borderColor,
          textColor: colors.textColor,
        },
        timeScale: {
          borderColor: colors.borderColor,
          textColor: colors.textColor,
          timeVisible: true,
          secondsVisible: false,
        },
        watermark: {
          visible: true,
          fontSize: 32,
          horzAlign: 'center',
          vertAlign: 'center',
          color: colors.watermark,
          text: symbol,
        },
        handleScroll: {
          mouseWheel: true,
          pressedMouseMove: true,
        },
        handleScale: {
          axisPressedMouseMove: true,
          mouseWheel: true,
          pinch: true,
        },
      });

      chartRef.current = chart;

      // Add candlestick series
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: colors.upColor,
        downColor: colors.downColor,
        borderVisible: false,
        wickUpColor: colors.upColor,
        wickDownColor: colors.downColor,
        priceFormat: {
          type: 'price',
          precision: 2,
          minMove: 0.01,
        },
      });

      // Generate and set mock data
      const data = generateMockData();
      candlestickSeries.setData(data);

      // Add SMA if enabled
      if (indicators.sma) {
        const smaData = data.map((candle, index) => {
          if (index < 19) return { time: candle.time, value: candle.close };
          
          const sum = data.slice(index - 19, index + 1).reduce((acc, c) => acc + c.close, 0);
          return {
            time: candle.time,
            value: parseFloat((sum / 20).toFixed(2)),
          };
        });

        const smaSeries = chart.addLineSeries({
          color: colors.secondary,
          lineWidth: 2,
          title: 'SMA(20)',
          crosshairMarkerVisible: true,
          lastValueVisible: true,
          priceLineVisible: false,
        });

        smaSeries.setData(smaData);
      }

      // Add EMA if enabled
      if (indicators.ema) {
        const emaData = [];
        const multiplier = 2 / (20 + 1);
        let ema = data[0].close;

        data.forEach((candle, index) => {
          if (index === 0) {
            ema = candle.close;
          } else {
            ema = (candle.close - ema) * multiplier + ema;
          }
          emaData.push({ 
            time: candle.time, 
            value: parseFloat(ema.toFixed(2))
          });
        });

        const emaSeries = chart.addLineSeries({
          color: colors.tertiary,
          lineWidth: 2,
          title: 'EMA(20)',
          lineStyle: 2, // Dashed line
          crosshairMarkerVisible: true,
          lastValueVisible: true,
          priceLineVisible: false,
        });

        emaSeries.setData(emaData);
      }

      // Handle resize
      const handleResize = () => {
        if (chartRef.current && chartContainerRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
          });
        }
      };

      // Fit content on load
      setTimeout(() => {
        if (chartRef.current) {
          chartRef.current.timeScale().fitContent();
        }
      }, 100);

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Error creating chart:', error);
    }
  }, [chartLibrary, symbol, interval, indicators, isDarkMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, []);

  if (!chartLibrary) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center border border-border rounded-lg bg-card">
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <div className="text-muted-foreground text-sm">Loading chart...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={chartContainerRef} 
        className="w-full h-[400px] rounded-lg overflow-hidden border border-border bg-card"
      />
      
      {/* Chart overlay with current price */}
      <div className="absolute top-2 left-2 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-2 text-xs">
        <div className="font-semibold">{symbol}</div>
        <div className="text-muted-foreground">{interval.toUpperCase()}</div>
      </div>
      
      {/* Legend */}
      <div className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-2 text-xs space-y-1">
        {indicators.sma && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-purple-500"></div>
            <span>SMA(20)</span>
          </div>
        )}
        {indicators.ema && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-green-500 opacity-75" style={{borderStyle: 'dashed'}}></div>
            <span>EMA(20)</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Dynamic import wrapper
const TradingChartInner = dynamic(() => Promise.resolve(TradingChartComponent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center border border-border rounded-lg bg-card">
      <div className="flex flex-col items-center space-y-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <div className="text-muted-foreground text-sm">Loading chart...</div>
      </div>
    </div>
  ),
});

export function TradingChart(props: TradingChartProps) {
  return <TradingChartInner {...props} />;
}