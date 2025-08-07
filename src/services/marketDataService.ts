// src/services/marketDataService.ts
import { CandlestickData } from 'lightweight-charts';

export interface MarketDataPoint {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TickerData {
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  lastUpdated: string;
}

class MarketDataService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.yourexchange.com';
  private wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://stream.yourexchange.com';

  // REST API calls
  async getKlineData(
    symbol: string, 
    interval: string, 
    limit: number = 500
  ): Promise<CandlestickData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: MarketDataPoint[] = await response.json();
      
      return data.map(item => ({
        time: item.timestamp as any,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }));
    } catch (error) {
      console.error('Error fetching kline data:', error);
      throw error;
    }
  }

  async getTicker(symbol: string): Promise<TickerData> {
    try {
      const response = await fetch(`${this.baseUrl}/ticker/24hr?symbol=${symbol}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching ticker data:', error);
      throw error;
    }
  }

  async getAllTickers(): Promise<TickerData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/ticker/24hr`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching all tickers:', error);
      throw error;
    }
  }

  // WebSocket connections for real-time data
  createKlineStream(
    symbol: string, 
    interval: string, 
    onMessage: (data: CandlestickData) => void
  ): WebSocket {
    const ws = new WebSocket(`${this.wsUrl}/ws/${symbol.toLowerCase()}@kline_${interval}`);
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const kline = data.k;
        
        onMessage({
          time: kline.t as any,
          open: parseFloat(kline.o),
          high: parseFloat(kline.h),
          low: parseFloat(kline.l),
          close: parseFloat(kline.c),
        });
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    return ws;
  }

  createTickerStream(
    symbol: string,
    onMessage: (data: TickerData) => void
  ): WebSocket {
    const ws = new WebSocket(`${this.wsUrl}/ws/${symbol.toLowerCase()}@ticker`);
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage({
          symbol: data.s,
          price: parseFloat(data.c),
          change24h: parseFloat(data.P),
          changePercent24h: parseFloat(data.p),
          volume24h: parseFloat(data.v),
          high24h: parseFloat(data.h),
          low24h: parseFloat(data.l),
          lastUpdated: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error parsing ticker WebSocket message:', error);
      }
    };
    
    return ws;
  }
}

export const marketDataService = new MarketDataService();
