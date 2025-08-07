// Mock data for TAI V5 Trading Dashboard

export const portfolioMetrics = {
  totalReturn: 25.3,
  dailyPnL: 2847,
  unrealizedPnL: 1234,
  accountBalance: 50847,
  sharpeRatio: 1.42,
  winRate: 68.5,
  profitFactor: 1.8,
  maxDrawdown: -8.2,
};

export const currentMarket = {
  symbol: "BTC/USD",
  price: 43675.82,
  change: 2.4,
  changeAmount: 1024.50,
};

export const equityCurveData = [
  { date: "2024-01", equity: 45000 },
  { date: "2024-02", equity: 46200 },
  { date: "2024-03", equity: 44800 },
  { date: "2024-04", equity: 47100 },
  { date: "2024-05", equity: 48500 },
  { date: "2024-06", equity: 49200 },
  { date: "2024-07", equity: 50847 },
];

export const recentSignals = [
  { time: "09:24:15", signal: "BUY", confidence: 92, price: 43651.20, symbol: "BTC/USD" },
  { time: "09:18:42", signal: "SELL", confidence: 87, price: 2287.45, symbol: "ETH/USD" },
  { time: "09:12:11", signal: "BUY", confidence: 76, price: 178.32, symbol: "SOL/USD" },
  { time: "09:05:33", signal: "SELL", confidence: 84, price: 43589.11, symbol: "BTC/USD" },
  { time: "08:58:07", signal: "BUY", confidence: 91, price: 2285.67, symbol: "ETH/USD" },
];

export const autoTradingEngine = {
  status: "active",
  strategy: "Momentum Scalping",
  timeframe: "5m",
  confidence: 85,
  dailyTrades: 24,
  successRate: 72.5,
};

export const plannedTrades = [
  { id: 1, symbol: "BTC/USD", type: "BUY", size: 0.5, price: 43500, confidence: 89, eta: "2 min" },
  { id: 2, symbol: "ETH/USD", type: "SELL", size: 2.0, price: 2290, confidence: 82, eta: "5 min" },
  { id: 3, symbol: "SOL/USD", type: "BUY", size: 10, price: 175, confidence: 76, eta: "8 min" },
];

export const liveAutoTrades = [
  { id: 1, time: "09:24:15", symbol: "BTC/USD", type: "BUY", size: 0.3, price: 43651.20, pnl: 156.80, status: "open" },
  { id: 2, time: "09:18:42", symbol: "ETH/USD", type: "SELL", size: 1.5, price: 2287.45, pnl: -42.30, status: "open" },
  { id: 3, time: "09:12:11", symbol: "SOL/USD", type: "BUY", size: 8, price: 178.32, pnl: 89.20, status: "closed" },
];

export const openPositions = [
  { id: 1, symbol: "BTC/USD", entry: 43200, current: 43651.20, size: 0.5, pnl: 225.60, percentage: 1.04, tp: 44000, sl: 42800, duration: "2h 15m" },
  { id: 2, symbol: "ETH/USD", entry: 2310, current: 2287.45, size: 2.0, pnl: -45.10, percentage: -0.97, tp: 2350, sl: 2250, duration: "45m" },
  { id: 3, symbol: "SOL/USD", entry: 175, current: 178.32, size: 10, pnl: 33.20, percentage: 1.90, tp: 185, sl: 170, duration: "1h 32m" },
];

export const marketData = [
  { symbol: "BTC/USD", price: 43675.82, change: 2.4, volume: "1.2B" },
  { symbol: "ETH/USD", price: 2287.45, change: -1.2, volume: "654M" },
  { symbol: "SOL/USD", price: 178.32, change: 3.8, volume: "89M" },
  { symbol: "S&P 500", price: 4785.2, change: 0.8, volume: "3.2B" },
  { symbol: "NASDAQ", price: 15234.8, change: 1.2, volume: "2.8B" },
  { symbol: "DXY", price: 103.45, change: -0.3, volume: "45M" },
  { symbol: "Gold", price: 2045.60, change: 0.5, volume: "234M" },
  { symbol: "Oil", price: 78.32, change: -2.1, volume: "456M" },
];

export const economicCalendar = [
  { time: "10:00", event: "CPI Release", country: "US", forecast: "3.2%", previous: "3.1%" },
  { time: "14:30", event: "Fed Interest Rate", country: "US", forecast: "5.50%", previous: "5.25%" },
  { time: "16:00", event: "GDP Growth", country: "EU", forecast: "1.8%", previous: "1.6%" },
  { time: "20:00", event: "Employment Data", country: "US", forecast: "3.7%", previous: "3.8%" },
];

export const systemServices = [
  { service: "Price Feed", status: "active", latency: "12ms", cost: "$0.45/hr", memory: "256MB", usage: "78%" },
  { service: "Order Engine", status: "active", latency: "8ms", cost: "$1.20/hr", memory: "512MB", usage: "45%" },
  { service: "Risk Manager", status: "active", latency: "15ms", cost: "$0.80/hr", memory: "128MB", usage: "32%" },
  { service: "Analytics", status: "warning", latency: "45ms", cost: "$2.10/hr", memory: "1GB", usage: "89%" },
  { service: "Database", status: "active", latency: "22ms", cost: "$1.50/hr", memory: "2GB", usage: "67%" },
  { service: "ML Engine", status: "inactive", latency: "N/A", cost: "$3.20/hr", memory: "4GB", usage: "0%" },
];

export const systemCosts = {
  hourly: 8.25,
  daily: 198.00,
  monthly: 5940.00,
};

export const systemPerformanceData = [
  { time: "00:00", cpu: 45, memory: 67, network: 23 },
  { time: "04:00", cpu: 38, memory: 72, network: 19 },
  { time: "08:00", cpu: 78, memory: 85, network: 54 },
  { time: "12:00", cpu: 92, memory: 91, network: 67 },
  { time: "16:00", cpu: 85, memory: 88, network: 72 },
  { time: "20:00", cpu: 67, memory: 79, network: 45 },
];

export const aiChatMessages = [
  { id: 1, sender: "user", message: "Analyze BTC trend for next 4 hours", timestamp: "09:24:15" },
  { id: 2, sender: "assistant", message: "Based on current momentum and volume analysis, BTC shows bullish continuation signals. Price target: $44,200-$44,500 range with support at $43,200.", timestamp: "09:24:18" },
  { id: 3, sender: "user", message: "Risk assessment for current portfolio", timestamp: "09:25:02" },
  { id: 4, sender: "assistant", message: "Portfolio risk metrics: VaR (1-day, 95%): -$1,247. Current beta: 1.34. Correlation with BTC: 0.78. Recommended position sizing adjustment: -15% for optimal risk-adjusted returns.", timestamp: "09:25:07" },
];

export const aiMonitorLogs = [
  { timestamp: "09:25:12", type: "Claude", message: "Price pattern recognition: Double bottom formation detected on ETH 15m chart", severity: "info" },
  { timestamp: "09:25:08", type: "GPT", message: "Sentiment analysis: Crypto Twitter sentiment shifted to 72% bullish (prev: 58%)", severity: "info" },
  { timestamp: "09:25:05", type: "Database", message: "Historical backtest completed: Strategy returns +23.4% vs benchmark +18.2%", severity: "success" },
  { timestamp: "09:25:01", type: "Claude", message: "Risk alert: Correlation spike detected between BTC and traditional markets", severity: "warning" },
  { timestamp: "09:24:58", type: "GPT", message: "News sentiment impact: Federal Reserve dovish comments detected, crypto positive", severity: "info" },
];

export const chartData = {
  candlestick: [
    { time: "09:00", open: 43500, high: 43650, low: 43480, close: 43620, volume: 1250000 },
    { time: "09:05", open: 43620, high: 43680, low: 43590, close: 43651, volume: 980000 },
    { time: "09:10", open: 43651, high: 43720, low: 43630, close: 43675, volume: 1100000 },
    { time: "09:15", open: 43675, high: 43695, low: 43655, close: 43682, volume: 890000 },
    { time: "09:20", open: 43682, high: 43710, low: 43665, close: 43690, volume: 1050000 },
    { time: "09:25", open: 43690, high: 43715, low: 43675, close: 43700, volume: 1200000 },
  ],
  indicators: {
    sma: [43580, 43595, 43610, 43625, 43640, 43655],
    ema: [43585, 43600, 43618, 43635, 43652, 43668],
    rsi: [65, 68, 72, 69, 71, 73],
    macd: [15, 18, 22, 19, 21, 24],
  }
};