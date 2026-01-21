import { useState } from "react";
import { Eye, Mic, Clock, FileText, Scan, Activity, Waves, Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AnalysisTabs = ({ isAnalyzed }: { isAnalyzed: boolean }) => {
  if (!isAnalyzed) {
    return (
      <div className="forensic-card p-6">
        <h2 className="font-semibold mb-4">Multi-Modal Analysis</h2>
        <div className="flex items-center justify-center h-48 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground text-sm">Analysis data will appear after processing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="forensic-card p-6">
      <Tabs defaultValue="visual" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1 h-auto">
          <TabsTrigger value="visual" className="flex items-center gap-2 py-2.5 data-[state=active]:bg-background">
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Visual</span>
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2 py-2.5 data-[state=active]:bg-background">
            <Mic className="w-4 h-4" />
            <span className="hidden sm:inline">Audio</span>
          </TabsTrigger>
          <TabsTrigger value="temporal" className="flex items-center gap-2 py-2.5 data-[state=active]:bg-background">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">Temporal</span>
          </TabsTrigger>
          <TabsTrigger value="metadata" className="flex items-center gap-2 py-2.5 data-[state=active]:bg-background">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Metadata</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Scan className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Face Regions Heatmap</span>
              </div>
              <div className="aspect-video bg-forensic-navy rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-32 border-2 border-destructive rounded-lg relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-destructive/40 via-warning/30 to-success/20 rounded-lg" />
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 bg-destructive/60 rounded blur-sm animate-pulse" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 text-xs bg-background/80 px-2 py-1 rounded font-mono">
                  Manipulation: Jaw Region
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">GAN Noise Inconsistency</span>
              </div>
              <div className="aspect-video bg-forensic-navy rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 p-4">
                  <div className="h-full flex items-end justify-around gap-1">
                    {[65, 45, 78, 92, 55, 88, 72, 95, 40, 85].map((height, i) => (
                      <div
                        key={i}
                        className={`w-full rounded-t transition-all duration-500 ${
                          height > 80 ? 'bg-destructive' : height > 60 ? 'bg-warning' : 'bg-success'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 text-xs bg-background/80 px-2 py-1 rounded font-mono">
                  Anomaly Score: 0.87
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-3">Visual Analysis Summary</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-destructive font-mono">94%</div>
                <div className="text-xs text-muted-foreground">Face Manipulation</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning font-mono">67%</div>
                <div className="text-xs text-muted-foreground">Boundary Artifacts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-destructive font-mono">89%</div>
                <div className="text-xs text-muted-foreground">GAN Fingerprint</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audio" className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Waves className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Voice Authenticity</span>
              </div>
              <div className="aspect-video bg-forensic-navy rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-destructive font-mono mb-2">23%</div>
                  <div className="text-sm text-muted-foreground">Authenticity Score</div>
                  <div className="mt-2 threat-high">Synthetic Voice</div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Lip-Sync Analysis</span>
              </div>
              <div className="aspect-video bg-forensic-navy rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-warning font-mono mb-2">-120ms</div>
                  <div className="text-sm text-muted-foreground">Audio-Visual Offset</div>
                  <div className="mt-2 threat-medium">Sync Mismatch</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Mic className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-destructive">Voice Cloning Detected</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Spectral analysis indicates synthetic voice generation using neural TTS technology. 
                  Formant patterns inconsistent with natural human speech.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="temporal" className="mt-6 space-y-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Blink Frequency Analysis</span>
            </div>
            <div className="h-32 bg-forensic-navy rounded-lg p-4 relative">
              <div className="absolute inset-x-4 bottom-4 top-4 flex items-end gap-1">
                {[20, 15, 45, 12, 80, 10, 55, 15, 90, 12, 40, 18, 75, 14, 25].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t ${h > 60 ? 'bg-destructive' : 'bg-primary/60'}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="absolute top-2 right-2 text-xs bg-background/80 px-2 py-1 rounded">
                <span className="text-destructive">Anomaly</span> at frames 5, 9, 13
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Expected: 15-20 blinks/min | Detected: Irregular pattern with unnatural gaps
            </p>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Frame-to-Frame Irregularity</span>
            </div>
            <div className="h-24 bg-forensic-navy rounded-lg flex items-center justify-center relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                <path
                  d="M0,50 Q20,30 40,50 T80,50 T120,50 T160,80 T200,20 T240,50 T280,50 T320,70 T360,40 T400,50"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                />
                <circle cx="160" cy="80" r="5" fill="hsl(var(--destructive))" />
                <circle cx="200" cy="20" r="5" fill="hsl(var(--destructive))" />
                <circle cx="320" cy="70" r="5" fill="hsl(var(--warning))" />
              </svg>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Frame 0</span>
              <span className="text-destructive">High variance detected</span>
              <span>Frame 480</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="metadata" className="mt-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Database className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">EXIF Data</span>
              </div>
              <span className="threat-high">Missing/Stripped</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Creation Date</span>
              </div>
              <span className="text-sm font-mono text-muted-foreground">Inconsistent</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Compression History</span>
              </div>
              <span className="text-sm font-mono text-warning">3 re-compressions</span>
            </div>
          </div>

          <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
            <h4 className="text-sm font-medium text-warning mb-3">Platform Fingerprints Detected</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-background/50 rounded-full text-xs font-medium">Instagram</span>
              <span className="px-3 py-1.5 bg-background/50 rounded-full text-xs font-medium">WhatsApp</span>
              <span className="px-3 py-1.5 bg-background/50 rounded-full text-xs font-medium">Telegram</span>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              File shows evidence of multiple platform uploads, suggesting viral distribution
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisTabs;
