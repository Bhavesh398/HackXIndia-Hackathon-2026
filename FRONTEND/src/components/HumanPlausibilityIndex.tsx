import { User, Brain } from "lucide-react";

const HumanPlausibilityIndex = ({ isAnalyzed }: { isAnalyzed: boolean }) => {
  const score = 24;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  if (!isAnalyzed) {
    return (
      <div className="forensic-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">Human Plausibility Index</h2>
            <p className="text-xs text-muted-foreground">Behavioral pattern analysis</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center h-40">
          <div className="w-32 h-32 rounded-full border-4 border-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Pending</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forensic-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-destructive/10">
          <Brain className="w-5 h-5 text-destructive" />
        </div>
        <div>
          <h2 className="font-semibold">Human Plausibility Index</h2>
          <p className="text-xs text-muted-foreground">Behavioral pattern analysis</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {/* Radial gauge */}
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--destructive))" />
                <stop offset="100%" stopColor="hsl(var(--warning))" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-destructive font-mono">{score}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">/ 100</span>
          </div>
        </div>

        {/* Status label */}
        <div className="mt-4 threat-high">
          Non-Human Patterns
        </div>

        {/* Explanation */}
        <div className="mt-4 p-4 bg-muted/30 rounded-lg w-full">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            <span className="text-destructive font-medium">Low score indicates non-human behavioral patterns</span>
            {" "}in facial motion, micro-expressions, and speech cadence. 
            The subject displays synthetic movement characteristics inconsistent with natural human behavior.
          </p>
        </div>

        {/* Breakdown */}
        <div className="mt-4 w-full space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Facial Motion</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-destructive" style={{ width: '18%' }} />
              </div>
              <span className="font-mono text-destructive">18%</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Micro-expressions</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-warning" style={{ width: '32%' }} />
              </div>
              <span className="font-mono text-warning">32%</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Speech Cadence</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-destructive" style={{ width: '22%' }} />
              </div>
              <span className="font-mono text-destructive">22%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanPlausibilityIndex;
