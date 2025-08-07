import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { marketData, economicCalendar } from "@/data/mockData";

export function MarketsTab() {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const formatPercentage = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;

  const cryptos = marketData.slice(0, 3);
  const indices = marketData.slice(3, 6);
  const commodities = marketData.slice(6);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Market Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cryptocurrencies */}
        <Card>
          <CardHeader>
            <CardTitle>Cryptocurrencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cryptos.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <div>
                    <div className="font-medium">{asset.symbol}</div>
                    <div className="text-sm text-muted-foreground">Vol: {asset.volume}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(asset.price)}</div>
                    <div className={`flex items-center text-sm ${asset.change > 0 ? 'text-success' : 'text-danger'}`}>
                      {asset.change > 0 ? 
                        <TrendingUp className="h-3 w-3 mr-1" /> : 
                        <TrendingDown className="h-3 w-3 mr-1" />
                      }
                      {formatPercentage(asset.change)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Indices */}
        <Card>
          <CardHeader>
            <CardTitle>Global Indices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {indices.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <div>
                    <div className="font-medium">{asset.symbol}</div>
                    <div className="text-sm text-muted-foreground">Vol: {asset.volume}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(asset.price)}</div>
                    <div className={`flex items-center text-sm ${asset.change > 0 ? 'text-success' : 'text-danger'}`}>
                      {asset.change > 0 ? 
                        <TrendingUp className="h-3 w-3 mr-1" /> : 
                        <TrendingDown className="h-3 w-3 mr-1" />
                      }
                      {formatPercentage(asset.change)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Commodities */}
        <Card>
          <CardHeader>
            <CardTitle>Commodities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {commodities.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <div>
                    <div className="font-medium">{asset.symbol}</div>
                    <div className="text-sm text-muted-foreground">Vol: {asset.volume}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(asset.price)}</div>
                    <div className={`flex items-center text-sm ${asset.change > 0 ? 'text-success' : 'text-danger'}`}>
                      {asset.change > 0 ? 
                        <TrendingUp className="h-3 w-3 mr-1" /> : 
                        <TrendingDown className="h-3 w-3 mr-1" />
                      }
                      {formatPercentage(asset.change)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Economic Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Economic Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {economicCalendar.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="text-center min-w-[60px]">
                    <div className="text-sm font-medium">{event.time}</div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {event.country}
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="font-medium">{event.event}</div>
                    <div className="text-sm text-muted-foreground">
                      Previous: {event.previous}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Forecast</div>
                  <div className="font-medium text-lg">{event.forecast}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Heat Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Market Sentiment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="text-2xl font-bold text-success">72%</div>
              <div className="text-sm text-success">Crypto Bullish</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="text-2xl font-bold text-warning">58%</div>
              <div className="text-sm text-warning">Fear & Greed</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="text-2xl font-bold text-primary">15.2</div>
              <div className="text-sm text-primary">VIX Index</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50 border">
              <div className="text-2xl font-bold">$1.2T</div>
              <div className="text-sm text-muted-foreground">Crypto Market Cap</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}