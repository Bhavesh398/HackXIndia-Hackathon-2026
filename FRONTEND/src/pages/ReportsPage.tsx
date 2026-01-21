import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import BusinessImpactDashboard from "@/components/BusinessImpactDashboard";
import PlatformAnalytics from "@/components/PlatformAnalytics";
import RecentVerifications from "@/components/RecentVerifications";
import FraudTrendChart from "@/components/FraudTrendChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Building2, 
  FileText, 
  Download, 
  Calendar,
  Filter,
  RefreshCw
} from "lucide-react";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <MainLayout title="Business Reports" subtitle="Enterprise Fraud Prevention Analytics">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Live Data
            </Badge>
            <Badge variant="secondary">Last updated: 2 min ago</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Business Impact Dashboard */}
        <BusinessImpactDashboard />

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="platforms" className="gap-2">
              <Building2 className="w-4 h-4" />
              Platform Analytics
            </TabsTrigger>
            <TabsTrigger value="verifications" className="gap-2">
              <FileText className="w-4 h-4" />
              Verifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Trend Charts */}
            <FraudTrendChart />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    TRUEFY Integration Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                    <span className="font-semibold">All Systems Operational</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    API Response Time: 1.2s avg
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    AI Model Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">98.7%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on 42,940 verified cases
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Monthly ROI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">324%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Cost savings vs. manual review
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="platforms">
            <PlatformAnalytics />
          </TabsContent>

          <TabsContent value="verifications">
            <RecentVerifications />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ReportsPage;
