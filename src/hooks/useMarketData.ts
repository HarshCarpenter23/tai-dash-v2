// src/hooks/useMarketData.ts
"use client";

import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CandlestickData } from 'lightweight-charts';
import { marketDataService, TickerData } from '@/services/marketDataService';

// Hook for candlestick data
export function useKlineData(symbol: string, interval: string) {
  const [realtimeData, setRealtimeData] = useState<CandlestickData[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  // Fetch initial historical data
  const { data: historicalData, isLoading, error } = useQuery({
    queryKey: ['kline', symbol, interval],
    queryFn: () => marketDataService.getKlineData(symbol, interval),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  // Setup WebSocket for real-time updates
  useEffect(() => {
    if (!historicalData) return;

    setRealtimeData(historicalData);

    // Create WebSocket connection
    wsRef.current = marketDataService.createKlineStream(
      symbol,
      interval,
      (newCandle) => {
        setRealtimeData(prevData => {
          const updatedData = [...prevData];
          const lastIndex = updatedData.length - 1;
          
          // If it's the same time period, update the last candle
          if (updatedData[lastIndex]?.time === newCandle.time) {
            updatedData[lastIndex] = newCandle;
          } else {
            // New time period, add new candle
            updatedData.push(newCandle);
            // Keep only last 500 candles for performance
            if (updatedData.length > 500) {
              updatedData.shift();
            }
          }
          
          return updatedData;
        });
      }
    );

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [symbol, interval, historicalData]);

  return {
    data: realtimeData,
    isLoading,
    error,
  };
}

// Hook for ticker data
export function useTickerData(symbol: string) {
  const [realtimePrice, setRealtimePrice] = useState<TickerData | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();

  // Fetch initial ticker data
  const { data: initialTicker, isLoading } = useQuery({
    queryKey: ['ticker', symbol],
    queryFn: () => marketDataService.getTicker(symbol),
    staleTime: 10 * 1000, // 10 seconds
  });

  // Setup WebSocket for real-time price updates
  useEffect(() => {
    if (!initialTicker) return;

    setRealtimePrice(initialTicker);

    wsRef.current = marketDataService.createTickerStream(symbol, (tickerData) => {
      setRealtimePrice(tickerData);
      
      // Update the query cache
      queryClient.setQueryData(['ticker', symbol], tickerData);
    });

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [symbol, initialTicker, queryClient]);

  return {
    data: realtimePrice,
    isLoading,
  };
}

// Hook for multiple tickers (market overview)
export function useMarketTickers() {
  return useQuery({
    queryKey: ['tickers'],
    queryFn: () => marketDataService.getAllTickers(),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000,
  });
}

