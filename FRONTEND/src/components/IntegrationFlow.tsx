import { ArrowRight, Upload, Cpu, Shield, CheckCircle, AlertTriangle } from "lucide-react";

interface IntegrationFlowProps {
  isAnalyzed: boolean;
  isAnalyzing: boolean;
}

const IntegrationFlow = ({ isAnalyzed, isAnalyzing }: IntegrationFlowProps) => {
  const steps = [
    {
      icon: Upload,
      label: "Upload",
      status: isAnalyzed || isAnalyzing ? "complete" : "pending"
    },
    {
      icon: Cpu,
      label: "AI Analysis",
      status: isAnalyzing ? "active" : isAnalyzed ? "complete" : "pending"
    },
    {
      icon: Shield,
      label: "Forensics",
      status: isAnalyzing ? "active" : isAnalyzed ? "complete" : "pending"
    },
    {
      icon: isAnalyzed ? AlertTriangle : CheckCircle,
      label: isAnalyzed ? "Flagged" : "Verdict",
      status: isAnalyzed ? "flagged" : "pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-success text-success-foreground border-success";
      case "active":
        return "bg-primary text-primary-foreground border-primary animate-pulse";
      case "flagged":
        return "bg-destructive text-destructive-foreground border-destructive";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getLineColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-success";
      case "active":
        return "bg-primary animate-pulse";
      default:
        return "bg-border";
    }
  };

  return (
    <div className="forensic-card p-5">
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${getStatusColor(step.status)}`}>
                <step.icon className="w-4 h-4" />
              </div>
              <span className="mt-1.5 text-xs font-medium text-center whitespace-nowrap">{step.label}</span>
            </div>
            
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 min-w-[40px] ${getLineColor(step.status)}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationFlow;
