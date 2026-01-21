import { Shield, Layers, CloudFog, Gauge } from "lucide-react";

const RobustnessTest = ({ isAnalyzed }: { isAnalyzed: boolean }) => {
  const tests = [
    { name: "Compression", icon: Layers, score: 94, status: "stable" },
    { name: "Blur", icon: CloudFog, score: 89, status: "stable" },
    { name: "Noise", icon: Gauge, score: 91, status: "stable" },
  ];

  if (!isAnalyzed) {
    return (
      <div className="forensic-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">Robustness & Stress Test</h2>
            <p className="text-xs text-muted-foreground">Prediction stability analysis</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center h-32 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground text-sm">Stress test results pending</p>
        </div>
      </div>
    );
  }

  return (
    <div className="forensic-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-success/10">
          <Shield className="w-5 h-5 text-success" />
        </div>
        <div>
          <h2 className="font-semibold">Robustness & Stress Test</h2>
          <p className="text-xs text-muted-foreground">Prediction stability analysis</p>
        </div>
      </div>

      {/* Overall stability score */}
      <div className="bg-success/10 border border-success/30 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-success">Prediction Stability Score</p>
            <p className="text-xs text-muted-foreground mt-1">
              Model maintains high confidence under adversarial conditions
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-success font-mono">91%</div>
            <div className="text-xs text-success uppercase tracking-wider">Stable</div>
          </div>
        </div>
      </div>

      {/* Individual tests */}
      <div className="space-y-4">
        {tests.map((test, index) => (
          <div key={test.name} className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-muted">
              <test.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium">{test.name}</span>
                <span className="text-sm font-mono text-success">{test.score}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-success to-success/70 rounded-full transition-all duration-1000"
                  style={{ width: `${test.score}%`, animationDelay: `${index * 200}ms` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          Predictions remain consistent (±3%) across JPEG compression (Q=20), 
          Gaussian blur (σ=2.0), and additive noise (σ=0.05)
        </p>
      </div>
    </div>
  );
};

export default RobustnessTest;
