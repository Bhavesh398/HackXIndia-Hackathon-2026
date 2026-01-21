import { AlertTriangle, ShieldCheck, ShieldX, TrendingUp } from "lucide-react";
import { AnalysisResult } from "@/hooks/useDeepfakeAnalysis";

interface RiskSummaryProps {
  isAnalyzed: boolean;
  isAnalyzing: boolean;
  analysisResult: AnalysisResult | null;
}

const RiskSummary = ({ isAnalyzed, isAnalyzing, analysisResult }: RiskSummaryProps) => {
  if (!isAnalyzed && !isAnalyzing) {
    return (
      <div className="forensic-card p-8 flex flex-col items-center justify-center h-full min-h-[300px]">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <ShieldCheck className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Awaiting Analysis</h3>
        <p className="text-muted-foreground text-center max-w-sm">
          Upload a media file and run AI forensic analysis to see authenticity results
        </p>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="forensic-card-glow p-8 flex flex-col items-center justify-center h-full min-h-[300px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent scan-line" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-full border-4 border-primary/30 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">AI Analysis in Progress</h3>
          <p className="text-muted-foreground text-center text-sm">
            Running multi-modal deepfake detection models...
          </p>
          
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {["CNN Detection", "GAN Artifacts", "Audio Sync", "Metadata"].map((step, i) => (
              <div 
                key={step}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isManipulated = analysisResult?.verdict === "LIKELY_MANIPULATED";
  const isAuthentic = analysisResult?.verdict === "LIKELY_AUTHENTIC";

  const getRiskBadge = () => {
    switch (analysisResult?.riskLevel) {
      case "CRITICAL":
      case "HIGH":
        return <span className="threat-high"><AlertTriangle className="w-3 h-3" />{analysisResult.riskLevel} RISK</span>;
      case "MEDIUM":
        return <span className="threat-medium"><AlertTriangle className="w-3 h-3" />MEDIUM RISK</span>;
      case "LOW":
        return <span className="threat-low"><ShieldCheck className="w-3 h-3" />LOW RISK</span>;
      default:
        return null;
    }
  };

  return (
    <div className={`${isManipulated ? 'forensic-card-danger' : isAuthentic ? 'forensic-card' : 'forensic-card'} p-6 relative overflow-hidden`}>
      {/* Background gradient effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${isManipulated ? 'from-destructive/10' : isAuthentic ? 'from-success/10' : 'from-warning/10'} via-transparent to-transparent`} />
      
      <div className="relative z-10">
        {/* Main verdict */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`p-3 rounded-xl ${isManipulated ? 'bg-destructive/20' : isAuthentic ? 'bg-success/20' : 'bg-warning/20'}`}>
            {isManipulated ? (
              <ShieldX className="w-8 h-8 text-destructive" />
            ) : isAuthentic ? (
              <ShieldCheck className="w-8 h-8 text-success" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-warning" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className={`text-2xl font-bold ${isManipulated ? 'text-destructive' : isAuthentic ? 'text-success' : 'text-warning'}`}>
                {analysisResult?.predictionLabel?.toUpperCase() || (isManipulated ? "FAKE" : isAuthentic ? "REAL" : "INCONCLUSIVE")}
              </h2>
              {getRiskBadge()}
            </div>
            <p className="text-sm text-muted-foreground">
              {analysisResult?.forensicSummary || "Analysis completed with AI-powered detection"}
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-background/50 rounded-lg p-4 text-center">
            <div className={`text-3xl font-bold font-mono mb-1 ${isManipulated ? 'text-destructive' : isAuthentic ? 'text-success' : 'text-warning'}`}>
              {analysisResult?.fakeProbability || 0}%
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Fake Probability</div>
          </div>
          <div className="bg-background/50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className={`w-5 h-5 ${isManipulated ? 'text-destructive' : isAuthentic ? 'text-success' : 'text-warning'}`} />
              <span className={`text-2xl font-bold ${isManipulated ? 'text-destructive' : isAuthentic ? 'text-success' : 'text-warning'}`}>
                {analysisResult?.confidence || 0}%
              </span>
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">AI Confidence</div>
          </div>
          <div className="bg-background/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-warning font-mono mb-1">
              {analysisResult?.manipulationTypes?.length || 0}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Manipulation Types</div>
          </div>
        </div>

        {/* Threat level breakdown */}
        {analysisResult?.threats && analysisResult.threats.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Threat Assessment</h4>
            
            <div className="space-y-2">
              {analysisResult.threats.slice(0, 3).map((threat, i) => (
                <div 
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    threat.severity === "CRITICAL" || threat.severity === "HIGH"
                      ? "bg-destructive/10 border-destructive/20"
                      : threat.severity === "MEDIUM"
                      ? "bg-warning/10 border-warning/20"
                      : "bg-success/10 border-success/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      threat.severity === "CRITICAL" || threat.severity === "HIGH"
                        ? "bg-destructive"
                        : threat.severity === "MEDIUM"
                        ? "bg-warning"
                        : "bg-success"
                    }`} />
                    <span className="text-sm font-medium">{threat.type}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    threat.severity === "CRITICAL" || threat.severity === "HIGH"
                      ? "threat-high"
                      : threat.severity === "MEDIUM"
                      ? "threat-medium"
                      : "threat-low"
                  }`}>
                    {threat.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskSummary;
