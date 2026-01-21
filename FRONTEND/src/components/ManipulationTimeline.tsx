import { Clock, AlertCircle, AlertTriangle, Info } from "lucide-react";

interface TimelineEvent {
  time: string;
  frame: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    time: "00:00:00",
    frame: "Frame 1-45",
    type: "info",
    title: "Original Footage",
    description: "No manipulation detected in opening sequence"
  },
  {
    time: "00:00:02",
    frame: "Frame 46-128",
    type: "critical",
    title: "Face Swap Detected",
    description: "GAN-based face replacement with 94% confidence"
  },
  {
    time: "00:00:05",
    frame: "Frame 129-240",
    type: "critical",
    title: "Lip-Sync Tampering",
    description: "Audio-visual mismatch of 120ms detected"
  },
  {
    time: "00:00:10",
    frame: "Frame 241-312",
    type: "warning",
    title: "Re-Compression Detected",
    description: "Social media platform fingerprint (Instagram)"
  },
  {
    time: "00:00:13",
    frame: "Frame 313-480",
    type: "critical",
    title: "Voice Cloning",
    description: "Synthetic voice pattern with spectral anomalies"
  }
];

const ManipulationTimeline = ({ isAnalyzed }: { isAnalyzed: boolean }) => {
  if (!isAnalyzed) {
    return (
      <div className="forensic-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">Manipulation Timeline</h2>
            <p className="text-xs text-muted-foreground">Temporal analysis of detected alterations</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center h-32 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground text-sm">Timeline will appear after analysis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="forensic-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Clock className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold">Manipulation Timeline</h2>
          <p className="text-xs text-muted-foreground">Temporal analysis of detected alterations</p>
        </div>
      </div>

      {/* Timeline progress bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-success via-warning via-destructive to-destructive" style={{ width: '100%' }} />
        </div>
        
        {/* Timeline markers */}
        <div className="absolute -top-1 left-0 w-4 h-4 rounded-full bg-success border-2 border-background" />
        <div className="absolute -top-1 left-[15%] w-4 h-4 rounded-full bg-destructive border-2 border-background animate-pulse" />
        <div className="absolute -top-1 left-[35%] w-4 h-4 rounded-full bg-destructive border-2 border-background animate-pulse" />
        <div className="absolute -top-1 left-[65%] w-4 h-4 rounded-full bg-warning border-2 border-background" />
        <div className="absolute -top-1 left-[85%] w-4 h-4 rounded-full bg-destructive border-2 border-background animate-pulse" />
      </div>

      {/* Timeline events */}
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        {timelineEvents.map((event, index) => (
          <div 
            key={index}
            className={`
              flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 hover:translate-x-1
              ${event.type === 'critical' 
                ? 'bg-destructive/5 border-destructive/30' 
                : event.type === 'warning'
                ? 'bg-warning/5 border-warning/30'
                : 'bg-muted/30 border-border'
              }
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`
              p-2 rounded-lg flex-shrink-0
              ${event.type === 'critical' 
                ? 'bg-destructive/20 text-destructive' 
                : event.type === 'warning'
                ? 'bg-warning/20 text-warning'
                : 'bg-primary/20 text-primary'
              }
            `}>
              {event.type === 'critical' ? <AlertCircle className="w-4 h-4" /> :
               event.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
               <Info className="w-4 h-4" />}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">{event.title}</span>
                <span className={`
                  text-xs px-2 py-0.5 rounded font-mono
                  ${event.type === 'critical' 
                    ? 'bg-destructive/20 text-destructive' 
                    : event.type === 'warning'
                    ? 'bg-warning/20 text-warning'
                    : 'bg-primary/20 text-primary'
                  }
                `}>
                  {event.type.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{event.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                <span>{event.time}</span>
                <span className="text-border">|</span>
                <span>{event.frame}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManipulationTimeline;
