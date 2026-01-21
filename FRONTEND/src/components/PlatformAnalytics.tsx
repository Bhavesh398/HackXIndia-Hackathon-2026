import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";

interface PlatformData {
  name: string;
  logo: string;
  color: string;
  totalCases: number;
  autoApproved: number;
  manualReview: number;
  rejected: number;
  avgProcessingTime: string;
  fraudRate: number;
  savingsAmount: string;
}

const platforms: PlatformData[] = [
  {
    name: "Zomato",
    logo: "🍽️",
    color: "bg-red-500",
    totalCases: 12450,
    autoApproved: 8234,
    manualReview: 2891,
    rejected: 1325,
    avgProcessingTime: "1.8s",
    fraudRate: 10.6,
    savingsAmount: "₹18.2L",
  },
  {
    name: "Swiggy",
    logo: "🛵",
    color: "bg-orange-500",
    totalCases: 15230,
    autoApproved: 10156,
    manualReview: 3542,
    rejected: 1532,
    avgProcessingTime: "2.1s",
    fraudRate: 10.1,
    savingsAmount: "₹22.4L",
  },
  {
    name: "Blinkit",
    logo: "⚡",
    color: "bg-yellow-500",
    totalCases: 8920,
    autoApproved: 6244,
    manualReview: 1784,
    rejected: 892,
    avgProcessingTime: "1.5s",
    fraudRate: 10.0,
    savingsAmount: "₹12.8L",
  },
  {
    name: "Zepto",
    logo: "🚀",
    color: "bg-purple-500",
    totalCases: 6340,
    autoApproved: 4438,
    manualReview: 1268,
    rejected: 634,
    avgProcessingTime: "1.2s",
    fraudRate: 10.0,
    savingsAmount: "₹9.1L",
  },
];

const PlatformCard = ({ platform }: { platform: PlatformData }) => {
  const approvalRate = ((platform.autoApproved / platform.totalCases) * 100).toFixed(1);
  const reviewRate = ((platform.manualReview / platform.totalCases) * 100).toFixed(1);
  const rejectRate = ((platform.rejected / platform.totalCases) * 100).toFixed(1);

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center text-xl`}>
              {platform.logo}
            </div>
            <div>
              <CardTitle className="text-lg">{platform.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{platform.totalCases.toLocaleString()} cases processed</p>
            </div>
          </div>
          <Badge variant="outline" className="text-success border-success">
            {platform.savingsAmount} saved
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Processing Stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-2 rounded-lg bg-success/10">
            <CheckCircle className="w-4 h-4 text-success mx-auto mb-1" />
            <p className="text-lg font-bold text-success">{approvalRate}%</p>
            <p className="text-[10px] text-muted-foreground">Auto-Approved</p>
          </div>
          <div className="p-2 rounded-lg bg-warning/10">
            <AlertTriangle className="w-4 h-4 text-warning mx-auto mb-1" />
            <p className="text-lg font-bold text-warning">{reviewRate}%</p>
            <p className="text-[10px] text-muted-foreground">Manual Review</p>
          </div>
          <div className="p-2 rounded-lg bg-destructive/10">
            <XCircle className="w-4 h-4 text-destructive mx-auto mb-1" />
            <p className="text-lg font-bold text-destructive">{rejectRate}%</p>
            <p className="text-[10px] text-muted-foreground">Rejected</p>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Fraud Detection Rate</span>
            <span className="font-medium">{platform.fraudRate}%</span>
          </div>
          <Progress value={platform.fraudRate * 5} className="h-2" />
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Avg. {platform.avgProcessingTime}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {platform.rejected.toLocaleString()} blocked
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

const PlatformAnalytics = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredPlatforms = activeTab === "all" 
    ? platforms 
    : platforms.filter(p => p.name.toLowerCase() === activeTab);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Platform Analytics</h3>
          <p className="text-sm text-muted-foreground">Real-time fraud prevention metrics by platform</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="all">All Platforms</TabsTrigger>
          <TabsTrigger value="zomato">Zomato</TabsTrigger>
          <TabsTrigger value="swiggy">Swiggy</TabsTrigger>
          <TabsTrigger value="blinkit">Blinkit</TabsTrigger>
          <TabsTrigger value="zepto">Zepto</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPlatforms.map((platform) => (
              <PlatformCard key={platform.name} platform={platform} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformAnalytics;
