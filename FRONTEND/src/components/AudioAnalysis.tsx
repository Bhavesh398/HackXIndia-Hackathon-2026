import { Mic, AlertTriangle, Activity, AudioWaveform } from "lucide-react";
import { AnalysisResult } from "@/hooks/useDeepfakeAnalysis";

interface AudioAnalysisProps {
  isAnalyzed: boolean;
  analysisResult?: AnalysisResult | null;
}

const AudioAnalysis = ({ isAnalyzed, analysisResult }: AudioAnalysisProps) => {
  if (!isAnalyzed) {
    return (
      <div className="forensic-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Mic className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold">Audio Analysis</h3>
        </div>
        <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
          Run analysis to see results
        </div>
      </div>
    );
  }

  const audio = analysisResult?.audioAnalysis;

  const audioMetrics = [
    { 
      label: "Voice Authenticity", 
      value: audio?.voiceAuthenticity || 50, 
      status: (audio?.voiceAuthenticity || 50) < 40 ? "danger" : (audio?.voiceAuthenticity || 50) < 60 ? "warning" : "success" 
    },
    { 
      label: "Voice Cloning Score", 
      value: audio?.voiceCloningScore || 0, 
      status: (audio?.voiceCloningScore || 0) > 60 ? "danger" : (audio?.voiceCloningScore || 0) > 40 ? "warning" : "success" 
    },
    { 
      label: "Lip Sync Accuracy", 
      value: audio?.lipSyncAccuracy || 50, 
      status: (audio?.lipSyncAccuracy || 50) < 40 ? "danger" : (audio?.lipSyncAccuracy || 50) < 60 ? "warning" : "success" 
    },
    { 
      label: "Spectral Analysis", 
      value: 100 - (audio?.spectralAnomaly || 0), 
      status: (audio?.spectralAnomaly || 0) > 60 ? "danger" : (audio?.spectralAnomaly || 0) > 40 ? "warning" : "success" 
    },
  ];

  const hasVoiceCloning = (audio?.voiceCloningScore || 0) > 50;
  const syntheticProbability = audio?.voiceCloningScore || 0;

  const getProgressColor = (status: string) => {
    switch (status) {
      case "danger": return "bg-destructive";
      case "warning": return "bg-warning";
      case "success": return "bg-success";
      default: return "bg-primary";
    }
  };

  return (
    <div className="forensic-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${hasVoiceCloning ? 'bg-destructive/10' : 'bg-success/10'}`}>
            <Mic className={`w-5 h-5 ${hasVoiceCloning ? 'text-destructive' : 'text-success'}`} />
          </div>
          <h3 className="font-semibold">Audio Analysis</h3>
        </div>
        {hasVoiceCloning && (
          <span className="threat-high text-xs">
            <AlertTriangle className="w-3 h-3" />
            SYNTHETIC VOICE
          </span>
        )}
      </div>

      {hasVoiceCloning && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-4">
          <div className="flex items-center gap-2 text-destructive text-sm font-medium">
            <AlertTriangle className="w-4 h-4" />
            <span>Voice Cloning Detected</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {audio?.details || "Neural TTS patterns identified in audio stream"}
          </p>
        </div>
      )}

      <div className="space-y-3 mb-4">
        {audioMetrics.map((metric, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">{metric.label}</span>
              <span className="text-xs font-mono text-muted-foreground">{metric.value}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${getProgressColor(metric.status)}`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-muted/30 text-center">
          <AudioWaveform className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <div className="text-sm font-semibold">Spectral</div>
          <div className="text-xs text-muted-foreground">
            {(audio?.spectralAnomaly || 0) > 50 ? "Anomalies Found" : "Normal Pattern"}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-muted/30 text-center">
          <Activity className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <div className="text-sm font-semibold">{syntheticProbability}%</div>
          <div className="text-xs text-muted-foreground">Synthetic Prob.</div>
        </div>
      </div>
    </div>
  );
};

export default AudioAnalysis;
