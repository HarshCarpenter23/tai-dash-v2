import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartCard } from "../charts/ChartCard";
import { Activity, DollarSign, Clock, AlertTriangle } from "lucide-react";
import { systemServices, systemCosts, systemPerformanceData } from "@/data/mockData";

export function SystemTab() {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'warning': return 'secondary';
      case 'inactive': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'warning': return 'text-warning';
      case 'inactive': return 'text-danger';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Cost Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hourly Cost</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(systemCosts.hourly)}
            </div>
            <p className="text-xs text-muted-foreground">Current rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {formatCurrency(systemCosts.daily)}
            </div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Est.</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {formatCurrency(systemCosts.monthly)}
            </div>
            <p className="text-xs text-muted-foreground">Projected</p>
          </CardContent>
        </Card>
      </div>

      {/* System Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>System Services</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`h-3 w-3 rounded-full ${
                      service.status === 'active' ? 'bg-success animate-pulse-slow' :
                      service.status === 'warning' ? 'bg-warning' :
                      'bg-danger'
                    }`} />
                    <div className="font-medium">{service.service}</div>
                  </div>
                  
                  <Badge variant={getStatusVariant(service.status)}>
                    {service.status}
                  </Badge>
                </div>

                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="text-muted-foreground">Latency</div>
                    <div className="font-medium">{service.latency}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-muted-foreground">Cost</div>
                    <div className="font-medium">{service.cost}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-muted-foreground">Memory</div>
                    <div className="font-medium">{service.memory}</div>
                  </div>
                  
                  <div className="text-center min-w-[60px]">
                    <div className="text-muted-foreground">Usage</div>
                    <div className="font-medium">{service.usage}</div>
                    <div className="w-full bg-muted rounded-full h-1 mt-1">
                      <div 
                        className={`h-1 rounded-full transition-all duration-300 ${
                          parseInt(service.usage) > 80 ? 'bg-danger' :
                          parseInt(service.usage) > 60 ? 'bg-warning' :
                          'bg-success'
                        }`}
                        style={{ width: service.usage }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Performance Chart */}
      <ChartCard title="System Performance (24h)">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={systemPerformanceData}>
            <defs>
              <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="networkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number, name: string) => [`${value}%`, name.toUpperCase()]}
            />
            
            <Area
              type="monotone"
              dataKey="cpu"
              stroke="hsl(var(--chart-primary))"
              fillOpacity={1}
              fill="url(#cpuGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="memory"
              stroke="hsl(var(--chart-secondary))"
              fillOpacity={1}
              fill="url(#memoryGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="network"
              stroke="hsl(var(--chart-tertiary))"
              fillOpacity={1}
              fill="url(#networkGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        {/* Legend */}
        <div className="flex justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-primary" />
            <span>CPU Usage</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-secondary" />
            <span>Memory Usage</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-tertiary" />
            <span>Network Usage</span>
          </div>
        </div>
      </ChartCard>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <span>System Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <div>
                  <div className="font-medium">High Analytics Memory Usage</div>
                  <div className="text-sm text-muted-foreground">Analytics service using 89% memory</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">2 min ago</div>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-3">
                <div className="h-4 w-4 rounded-full bg-success" />
                <div>
                  <div className="font-medium">ML Engine Restarted</div>
                  <div className="text-sm text-muted-foreground">ML Engine service successfully restarted</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">15 min ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}