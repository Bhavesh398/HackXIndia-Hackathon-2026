import { Eye, AlertTriangle, CheckCircle, XCircle, Scan } from "lucide-react";
import { AnalysisResult } from "@/hooks/useDeepfakeAnalysis";

interface VisualForensicsProps {
  isAnalyzed: boolean;
  analysisResult?: AnalysisResult | null;
}

const VisualForensics = ({ isAnalyzed, analysisResult }: VisualForensicsProps) => {
  if (!isAnalyzed) {
    return (
      <div className="forensic-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Eye className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold">Visual Forensics</h3>
        </div>
        <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
          Run analysis to see results
        </div>
      </div>
    );
  }

  const visual = analysisResult?.visualAnalysis;
  
  const visualChecks = [
    { 
      check: "Face Swap Detection", 
      status: (visual?.faceSwapScore || 0) > 70 ? "fail" : (visual?.faceSwapScore || 0) > 40 ? "warning" : "pass", 
      confidence: visual?.faceSwapScore || 0, 
      detail: (visual?.faceSwapScore || 0) > 70 ? "GAN-based replacement detected" : "No significant face swap artifacts" 
    },
    { 
      check: "GAN Artifacts", 
      status: (visual?.ganArtifactScore || 0) > 70 ? "fail" : (visual?.ganArtifactScore || 0) > 40 ? "warning" : "pass", 
      confidence: visual?.ganArtifactScore || 0, 
      detail: (visual?.ganArtifactScore || 0) > 70 ? "Synthetic generation patterns found" : "No GAN artifacts detected" 
    },
    { 
      check: "Boundary Artifacts", 
      status: (visual?.boundaryArtifacts || 0) > 70 ? "fail" : (visual?.boundaryArtifacts || 0) > 40 ? "warning" : "pass", 
      confidence: visual?.boundaryArtifacts || 0, 
      detail: (visual?.boundaryArtifacts || 0) > 70 ? "Jaw and hairline inconsistencies" : "Clean boundaries detected" 
    },
    { 
      check: "Lighting Consistency", 
      status: (visual?.lightingConsistency || 100) < 50 ? "fail" : (visual?.lightingConsistency || 100) < 70 ? "warning" : "pass", 
      confidence: visual?.lightingConsistency || 100, 
      detail: (visual?.lightingConsistency || 100) < 50 ? "Directional mismatch detected" : "Consistent light sources" 
    },
  ];

  const hasManipulation = visualChecks.some(c => c.status === "fail");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass": return <CheckCircle className="w-4 h-4 text-success" />;
      case "fail": return <XCircle className="w-4 h-4 text-destructive" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-warning" />;
      default: return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "pass": return "bg-success/10 border-success/20";
      case "fail": return "bg-destructive/10 border-destructive/20";
      case "warning": return "bg-warning/10 border-warning/20";
      default: return "";
    }
  };

  return (
    <div className="forensic-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${hasManipulation ? 'bg-destructive/10' : 'bg-success/10'}`}>
            <Eye className={`w-5 h-5 ${hasManipulation ? 'text-destructive' : 'text-success'}`} />
          </div>
          <h3 className="font-semibold">Visual Forensics</h3>
        </div>
        {hasManipulation && (
          <span className="threat-high text-xs">
            <AlertTriangle className="w-3 h-3" />
            MANIPULATION
          </span>
        )}
      </div>

      {visual?.details && (
        <p className="text-sm text-muted-foreground mb-4">{visual.details}</p>
      )}

      <div className="space-y-3">
        {visualChecks.map((result, i) => (
          <div key={i} className={`p-3 rounded-lg border ${getStatusBg(result.status)}`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                {getStatusIcon(result.status)}
                <span className="text-sm font-medium">{result.check}</span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">{result.confidence}%</span>
            </div>
            <p className="text-xs text-muted-foreground pl-6">{result.detail}</p>
          </div>
        ))}
      </div>

      <div className={`mt-4 p-3 rounded-lg ${hasManipulation ? 'bg-destructive/10 border border-destructive/20' : 'bg-success/10 border border-success/20'}`}>
        <div className="flex items-center gap-2">
          <Scan className={`w-4 h-4 ${hasManipulation ? 'text-destructive' : 'text-success'}`} />
          <span className={`text-sm font-medium ${hasManipulation ? 'text-destructive' : 'text-success'}`}>
            {hasManipulation ? 'Visual Manipulation Detected' : 'No Visual Manipulation Detected'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VisualForensics;
