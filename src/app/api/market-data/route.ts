// src/app/api/market-data/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate real market data
  const mockData = {
    price: Math.random() * 50000 + 30000, // Random price between 30k-80k
    change: (Math.random() - 0.5) * 10, // Random change ±5%
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(mockData);
}