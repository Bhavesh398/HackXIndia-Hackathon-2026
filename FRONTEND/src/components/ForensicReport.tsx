import { FileText, AlertCircle, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { AnalysisResult } from "@/hooks/useDeepfakeAnalysis";

interface ForensicReportProps {
  isAnalyzed: boolean;
  analysisResult?: AnalysisResult | null;
}

const ForensicReport = ({ isAnalyzed, analysisResult }: ForensicReportProps) => {
  if (!isAnalyzed || !analysisResult) {
    return (
      <div className="forensic-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">Explainable Forensic Report</h2>
            <p className="text-xs text-muted-foreground">AI-generated analysis summary</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center h-48 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground text-sm">Report will be generated after analysis</p>
        </div>
      </div>
    );
  }

  // Generate report items from analysis result
  const reportItems: { severity: string; title: string; description: string }[] = [];

  // Add threats as report items
  if (analysisResult.threats) {
    analysisResult.threats.forEach(threat => {
      reportItems.push({
        severity: threat.severity === "CRITICAL" || threat.severity === "HIGH" ? "critical" : 
                  threat.severity === "MEDIUM" ? "warning" : "info",
        title: threat.type,
        description: threat.description
      });
    });
  }

  // Add manipulation types
  if (analysisResult.manipulationTypes) {
    analysisResult.manipulationTypes.forEach(type => {
      if (!reportItems.find(item => item.title.toLowerCase().includes(type.toLowerCase()))) {
        reportItems.push({
          severity: "warning",
          title: type,
          description: `${type} manipulation detected with ${analysisResult.confidence}% confidence`
        });
      }
    });
  }

  // Add recommendations as info items
  if (analysisResult.recommendations) {
    analysisResult.recommendations.forEach(rec => {
      reportItems.push({
        severity: "info",
        title: "Recommendation",
        description: rec
      });
    });
  }

  // Fallback if no items
  if (reportItems.length === 0) {
    reportItems.push({
      severity: analysisResult.verdict === "LIKELY_MANIPULATED" ? "critical" : "info",
      title: "Analysis Complete",
      description: analysisResult.forensicSummary || "Analysis completed successfully"
    });
  }

  const isManipulated = analysisResult.verdict === "LIKELY_MANIPULATED";

  const handleCopy = () => {
    const reportText = [
      `DEEPFAKE ANALYSIS REPORT`,
      `========================`,
      ``,
      `Verdict: ${analysisResult.verdict}`,
      `Confidence: ${analysisResult.confidence}%`,
      `Fake Probability: ${analysisResult.fakeProbability}%`,
      `Risk Level: ${analysisResult.riskLevel}`,
      ``,
      `FINDINGS:`,
      ...reportItems.map(item => `[${item.severity.toUpperCase()}] ${item.title}: ${item.description}`),
      ``,
      `SUMMARY:`,
      analysisResult.forensicSummary || "N/A"
    ].join('\n');
    
    navigator.clipboard.writeText(reportText);
    toast({
      title: "Report Copied",
      description: "Forensic report has been copied to clipboard",
    });
  };

  const handleExport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      ...analysisResult
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forensic-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report Exported",
      description: "Forensic report has been downloaded as JSON",
    });
  };

  return (
    <div className="forensic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isManipulated ? 'bg-destructive/10' : 'bg-success/10'}`}>
            <FileText className={`w-5 h-5 ${isManipulated ? 'text-destructive' : 'text-success'}`} />
          </div>
          <div>
            <h2 className="font-semibold">Explainable Forensic Report</h2>
            <p className="text-xs text-muted-foreground">AI-generated analysis summary</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
            <Copy className="w-3.5 h-3.5" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {reportItems.map((item, index) => (
          <div
            key={index}
            className={`
              p-4 rounded-lg border-l-4 bg-muted/20 animate-fade-up
              ${item.severity === 'critical' 
                ? 'border-l-destructive' 
                : item.severity === 'warning'
                ? 'border-l-warning'
                : 'border-l-primary'
              }
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className={`
                w-5 h-5 flex-shrink-0 mt-0.5
                ${item.severity === 'critical' 
                  ? 'text-destructive' 
                  : item.severity === 'warning'
                  ? 'text-warning'
                  : 'text-primary'
                }
              `} />
              <div>
                <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-forensic-navy rounded-lg border border-border">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-2 h-2 rounded-full ${isManipulated ? 'bg-destructive' : 'bg-success'} animate-pulse`} />
          <span className="text-sm font-semibold">Final Assessment</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {analysisResult.forensicSummary || (
            isManipulated 
              ? "This media exhibits multiple high-confidence manipulation indicators consistent with AI-generated deepfake content."
              : "This media appears to be authentic based on the forensic analysis. No significant manipulation indicators were detected."
          )}
        </p>
      </div>
    </div>
  );
};

export default ForensicReport;
