import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import VisualForensics from "@/components/VisualForensics";
import AudioAnalysis from "@/components/AudioAnalysis";
import TemporalAnalysis from "@/components/TemporalAnalysis";
import MetadataAnalysis from "@/components/MetadataAnalysis";
import MediaUpload from "@/components/MediaUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Mic, Clock, FileCode, Upload } from "lucide-react";
import { useDeepfakeAnalysis } from "@/hooks/useDeepfakeAnalysis";

const AnalysisPage = () => {
  const [mediaType, setMediaType] = useState<"image" | "video" | "audio">("video");
  const { isAnalyzing, analysisResult, analyzeMedia, resetAnalysis } = useDeepfakeAnalysis();

  const handleAnalyze = async (type: "image" | "video" | "audio", mediaData?: string) => {
    setMediaType(type);
    await analyzeMedia(type, mediaData, ["visual", "audio", "temporal", "metadata"]);
  };

  const isAnalyzed = !!analysisResult;

  return (
    <MainLayout title="Analysis" subtitle="Multi-Modal Forensic Analysis">
      <div className="space-y-6">
        {/* Upload Section - Collapsible when analyzed */}
        {!isAnalyzed && (
          <div className="max-w-2xl mx-auto">
            <MediaUpload
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              onReset={resetAnalysis}
            />
          </div>
        )}

        {/* Analysis Tabs */}
        {(isAnalyzed || isAnalyzing) && (
          <Tabs defaultValue="visual" className="w-full">
            <TabsList className="w-full justify-start bg-card border border-border p-1 h-auto flex-wrap gap-1 mb-6">
              <TabsTrigger
                value="visual"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Visual Forensics</span>
                <span className="sm:hidden">Visual</span>
              </TabsTrigger>
              <TabsTrigger
                value="audio"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Mic className="w-4 h-4" />
                <span className="hidden sm:inline">Audio Analysis</span>
                <span className="sm:hidden">Audio</span>
              </TabsTrigger>
              <TabsTrigger
                value="temporal"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Temporal Analysis</span>
                <span className="sm:hidden">Temporal</span>
              </TabsTrigger>
              <TabsTrigger
                value="metadata"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <FileCode className="w-4 h-4" />
                <span className="hidden sm:inline">Metadata Analysis</span>
                <span className="sm:hidden">Metadata</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="visual" className="mt-0">
              <VisualForensics isAnalyzed={isAnalyzed} analysisResult={analysisResult} />
            </TabsContent>

            <TabsContent value="audio" className="mt-0">
              <AudioAnalysis isAnalyzed={isAnalyzed} analysisResult={analysisResult} />
            </TabsContent>

            <TabsContent value="temporal" className="mt-0">
              <TemporalAnalysis isAnalyzed={isAnalyzed} analysisResult={analysisResult} />
            </TabsContent>

            <TabsContent value="metadata" className="mt-0">
              <MetadataAnalysis isAnalyzed={isAnalyzed} analysisResult={analysisResult} />
            </TabsContent>
          </Tabs>
        )}

        {/* Empty State */}
        {!isAnalyzed && !isAnalyzing && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Media Analyzed</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Upload an image, video, or audio file above to begin forensic analysis
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AnalysisPage;
