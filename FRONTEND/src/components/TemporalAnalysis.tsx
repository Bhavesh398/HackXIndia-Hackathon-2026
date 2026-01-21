import { Clock, AlertTriangle, Eye, Film } from "lucide-react";
import { AnalysisResult } from "@/hooks/useDeepfakeAnalysis";

interface TemporalAnalysisProps {
  isAnalyzed: boolean;
  analysisResult?: AnalysisResult | null;
}

const TemporalAnalysis = ({ isAnalyzed, analysisResult }: TemporalAnalysisProps) => {
  if (!isAnalyzed) {
    return (
      <div className="forensic-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold">Temporal Analysis</h3>
        </div>
        <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
          Run analysis to see results
        </div>
      </div>
    );
  }

  const temporal = analysisResult?.temporalAnalysis;

  const temporalChecks = [
    { 
      label: "Frame Consistency", 
      value: temporal?.frameConsistency || 50, 
      threshold: 85, 
      status: (temporal?.frameConsistency || 50) < 60 ? "fail" : (temporal?.frameConsistency || 50) < 85 ? "warning" : "pass" 
    },
    { 
      label: "Blink Pattern Score", 
      value: temporal?.blinkPatternScore || 50, 
      threshold: 70, 
      status: (temporal?.blinkPatternScore || 50) < 50 ? "fail" : (temporal?.blinkPatternScore || 50) < 70 ? "warning" : "pass" 
    },
    { 
      label: "Motion Coherence", 
      value: temporal?.motionCoherence || 50, 
      threshold: 80, 
      status: (temporal?.motionCoherence || 50) < 60 ? "fail" : (temporal?.motionCoherence || 50) < 80 ? "warning" : "pass" 
    },
  ];

  const hasAnomalies = temporalChecks.some(c => c.status === "fail" || c.status === "warning");
  const hasDesync = (temporal?.frameConsistency || 100) < 70;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "fail": return "text-destructive";
      case "warning": return "text-warning";
      case "pass": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "fail": return "bg-destructive";
      case "warning": return "bg-warning";
      case "pass": return "bg-success";
      default: return "bg-muted";
    }
  };

  return (
    <div className="forensic-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${hasAnomalies ? 'bg-warning/10' : 'bg-success/10'}`}>
            <Clock className={`w-5 h-5 ${hasAnomalies ? 'text-warning' : 'text-success'}`} />
          </div>
          <h3 className="font-semibold">Temporal Analysis</h3>
        </div>
        {hasAnomalies && (
          <span className="threat-medium text-xs">
            <AlertTriangle className="w-3 h-3" />
            ANOMALIES
          </span>
        )}
      </div>

      {hasDesync && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-4">
          <div className="flex items-center gap-2 text-destructive text-sm font-medium">
            <Eye className="w-4 h-4" />
            <span>Temporal Inconsistencies Detected</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {temporal?.details || "Frame-level anomalies suggest potential manipulation"}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {temporalChecks.map((check, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">{check.label}</span>
              <span className={`text-xs font-mono ${getStatusColor(check.status)}`}>
                {check.value}% / {check.threshold}%
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${getProgressColor(check.status)}`}
                style={{ width: `${Math.min((check.value / check.threshold) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-4 p-3 rounded-lg ${hasAnomalies ? 'bg-warning/10 border border-warning/20' : 'bg-success/10 border border-success/20'}`}>
        <div className="flex items-center gap-2">
          <Film className={`w-4 h-4 ${hasAnomalies ? 'text-warning' : 'text-success'}`} />
          <span className={`text-sm font-medium ${hasAnomalies ? 'text-warning' : 'text-success'}`}>
            {hasAnomalies ? 'Temporal Artifacts Detected' : 'Temporal Consistency Verified'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TemporalAnalysis;
