import { TrendingUp, Shield, DollarSign, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  trend: "up" | "down";
}

const MetricCard = ({ title, value, change, changeLabel, icon, trend }: MetricCardProps) => (
  <Card className="bg-card border-border hover:border-primary/50 transition-colors">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="p-2 rounded-lg bg-primary/10">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center gap-1 mt-1">
        {trend === "up" ? (
          <ArrowUpRight className="w-4 h-4 text-success" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-destructive" />
        )}
        <span className={`text-sm ${trend === "up" ? "text-success" : "text-destructive"}`}>
          {change}%
        </span>
        <span className="text-xs text-muted-foreground">{changeLabel}</span>
      </div>
    </CardContent>
  </Card>
);

const BusinessImpactDashboard = () => {
  const metrics = [
    {
      title: "Total Refunds Prevented",
      value: "₹12.4L",
      change: 23.5,
      changeLabel: "vs last month",
      icon: <DollarSign className="w-4 h-4 text-primary" />,
      trend: "up" as const,
    },
    {
      title: "Fraud Attempts Blocked",
      value: "2,847",
      change: 18.2,
      changeLabel: "vs last month",
      icon: <Shield className="w-4 h-4 text-primary" />,
      trend: "up" as const,
    },
    {
      title: "Estimated Cost Savings",
      value: "₹45.2L",
      change: 31.4,
      changeLabel: "this quarter",
      icon: <TrendingUp className="w-4 h-4 text-primary" />,
      trend: "up" as const,
    },
    {
      title: "Approval Speed",
      value: "2.3s",
      change: 45.0,
      changeLabel: "faster",
      icon: <Clock className="w-4 h-4 text-primary" />,
      trend: "up" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default BusinessImpactDashboard;
