import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import MediaUpload from "@/components/MediaUpload";
import RiskSummary from "@/components/RiskSummary";
import IntegrationFlow from "@/components/IntegrationFlow";
import { useDeepfakeAnalysis } from "@/hooks/useDeepfakeAnalysis";
import { ArrowRight, Scan, FileCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const [mediaType, setMediaType] = useState<"image" | "video" | "audio">("video");
  const { isAnalyzing, analysisResult, analyzeMedia, resetAnalysis } = useDeepfakeAnalysis();

  const handleAnalyze = async (type: "image" | "video" | "audio", mediaData?: string) => {
    setMediaType(type);
    await analyzeMedia(type, mediaData, ["visual", "audio", "temporal", "metadata"]);
  };

  const handleReset = () => {
    resetAnalysis();
  };

  const isAnalyzed = !!analysisResult;

  const stats = [
    { label: "Files Analyzed", value: "0", icon: FileCheck, color: "text-primary" },
    { label: "Threats Detected", value: "0", icon: Scan, color: "text-destructive" },
    { label: "Accuracy Rate", value: "99%", icon: TrendingUp, color: "text-success" },
  ];

  return (
    <MainLayout title="Dashboard" subtitle="AI-Powered Media Authenticity">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="forensic-card p-4 flex items-center gap-4"
            >
              <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Flow */}
        <IntegrationFlow isAnalyzed={isAnalyzed} isAnalyzing={isAnalyzing} />

        {/* Main Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Upload Panel */}
          <div className="lg:col-span-5">
            <MediaUpload
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              onReset={handleReset}
            />
          </div>

          {/* Risk Summary */}
          <div className="lg:col-span-7">
            <RiskSummary
              isAnalyzed={isAnalyzed}
              isAnalyzing={isAnalyzing}
              analysisResult={analysisResult}
            />
          </div>
        </div>

        {/* Quick Actions */}
        {isAnalyzed && (
          <div className="forensic-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">Analysis Complete</h3>
              <p className="text-sm text-muted-foreground">
                View detailed forensic breakdown and generate reports
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link to="/analysis">
                  View Details
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild>
                <Link to="/reports">
                  Generate Report
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
