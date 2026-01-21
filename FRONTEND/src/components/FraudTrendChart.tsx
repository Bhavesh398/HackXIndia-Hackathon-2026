import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const weeklyData = [
  { day: "Mon", fraudBlocked: 234, genuine: 1890, savings: 45000 },
  { day: "Tue", fraudBlocked: 298, genuine: 2100, savings: 52000 },
  { day: "Wed", fraudBlocked: 187, genuine: 1750, savings: 38000 },
  { day: "Thu", fraudBlocked: 345, genuine: 2340, savings: 67000 },
  { day: "Fri", fraudBlocked: 412, genuine: 2890, savings: 78000 },
  { day: "Sat", fraudBlocked: 523, genuine: 3450, savings: 95000 },
  { day: "Sun", fraudBlocked: 478, genuine: 3120, savings: 89000 },
];

const platformData = [
  { name: "Zomato", blocked: 1325, color: "#ef4444" },
  { name: "Swiggy", blocked: 1532, color: "#f97316" },
  { name: "Blinkit", blocked: 892, color: "#eab308" },
  { name: "Zepto", blocked: 634, color: "#a855f7" },
];

const FraudTrendChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Weekly Trend */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base">Weekly Fraud Trends</CardTitle>
            <p className="text-xs text-muted-foreground">Fraud blocked vs genuine claims</p>
          </div>
          <Badge variant="outline" className="text-xs">Last 7 days</Badge>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorGenuine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="genuine"
                  stroke="hsl(var(--success))"
                  fillOpacity={1}
                  fill="url(#colorGenuine)"
                  name="Genuine Claims"
                />
                <Area
                  type="monotone"
                  dataKey="fraudBlocked"
                  stroke="hsl(var(--destructive))"
                  fillOpacity={1}
                  fill="url(#colorFraud)"
                  name="Fraud Blocked"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Platform Comparison */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base">Fraud by Platform</CardTitle>
            <p className="text-xs text-muted-foreground">Total blocked attempts per platform</p>
          </div>
          <Badge variant="outline" className="text-xs">This month</Badge>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar 
                  dataKey="blocked" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                  name="Blocked Attempts"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudTrendChart;
