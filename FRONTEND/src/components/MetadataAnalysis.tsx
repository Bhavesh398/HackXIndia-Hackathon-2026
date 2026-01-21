import { FileCode, AlertTriangle, CheckCircle, XCircle, Link2 } from "lucide-react";
import { AnalysisResult } from "@/hooks/useDeepfakeAnalysis";

interface MetadataAnalysisProps {
  isAnalyzed: boolean;
  analysisResult?: AnalysisResult | null;
}

const MetadataAnalysis = ({ isAnalyzed, analysisResult }: MetadataAnalysisProps) => {
  if (!isAnalyzed) {
    return (
      <div className="forensic-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileCode className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold">Metadata Analysis</h3>
        </div>
        <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
          Run analysis to see results
        </div>
      </div>
    );
  }

  const metadata = analysisResult?.metadataAnalysis;

  const metadataChecks = [
    { 
      field: "EXIF Integrity", 
      value: metadata?.exifIntegrity !== undefined ? `${metadata.exifIntegrity}%` : "Unknown", 
      status: (metadata?.exifIntegrity || 0) > 70 ? "pass" : (metadata?.exifIntegrity || 0) > 40 ? "warning" : "fail" 
    },
    { 
      field: "Source Verified", 
      value: metadata?.sourceVerified ? "Verified" : "Unverified", 
      status: metadata?.sourceVerified ? "pass" : "warning" 
    },
    { 
      field: "Editing Detected", 
      value: metadata?.editingDetected ? "Yes" : "No", 
      status: metadata?.editingDetected ? "fail" : "pass" 
    },
  ];

  const hasIssues = metadataChecks.some(c => c.status === "fail" || c.status === "warning");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass": return <CheckCircle className="w-3.5 h-3.5 text-success" />;
      case "fail": return <XCircle className="w-3.5 h-3.5 text-destructive" />;
      case "warning": return <AlertTriangle className="w-3.5 h-3.5 text-warning" />;
      default: return null;
    }
  };

  return (
    <div className="forensic-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${hasIssues ? 'bg-warning/10' : 'bg-success/10'}`}>
            <FileCode className={`w-5 h-5 ${hasIssues ? 'text-warning' : 'text-success'}`} />
          </div>
          <h3 className="font-semibold">Metadata Analysis</h3>
        </div>
        {hasIssues && (
          <span className="threat-medium text-xs">
            <AlertTriangle className="w-3 h-3" />
            MODIFIED
          </span>
        )}
      </div>

      {metadata?.details && (
        <p className="text-sm text-muted-foreground mb-4">{metadata.details}</p>
      )}

      <div className="space-y-2 mb-4">
        {metadataChecks.map((check, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded bg-muted/30">
            <div className="flex items-center gap-2">
              {getStatusIcon(check.status)}
              <span className="text-sm">{check.field}</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">{check.value}</span>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Link2 className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium">Analysis Summary</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {metadata?.details || "Metadata analysis complete. Check individual fields for details."}
        </p>
      </div>

      <div className={`mt-4 p-3 rounded-lg ${hasIssues ? 'bg-warning/10 border border-warning/20' : 'bg-success/10 border border-success/20'}`}>
        <div className="flex items-center gap-2">
          <AlertTriangle className={`w-4 h-4 ${hasIssues ? 'text-warning' : 'text-success'}`} />
          <span className={`text-sm font-medium ${hasIssues ? 'text-warning' : 'text-success'}`}>
            {hasIssues ? 'Metadata Integrity Compromised' : 'Metadata Integrity Verified'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MetadataAnalysis;
