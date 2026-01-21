import { useState, useCallback, useRef } from "react";
import { Upload, Link as LinkIcon, ArrowRight, CheckCircle, Sparkles, ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import truefyLogo from "@/assets/truefy-logo.png";
import truefyMascot from "@/assets/truefy-mascot.png";
import fakeFood from "@/assets/fake-food.png";
import realFood from "@/assets/real-food.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Navigate to dashboard with file info
      navigate("/dashboard", { state: { file: files[0] } });
    }
  }, [navigate]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      navigate("/dashboard", { state: { file: files[0] } });
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUrlSubmit = () => {
    if (mediaUrl.trim()) {
      navigate("/dashboard", { state: { url: mediaUrl } });
    }
  };

  const features = [
    {
      text: "Upload images, video, or audio to detect AI-generated or deepfake content using best-in-class models"
    },
    {
      text: "Get frame-by-frame analysis for video and audio files"
    },
    {
      text: "See probabilities from common generation sources like Sora, GPT, Midjourney, etc."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={truefyMascot} 
              alt="TRUEFY Mascot" 
              className="w-12 h-12 object-contain rounded-lg"
            />
            <span className="text-xl font-bold">
              <span className="text-foreground">TRUE</span>
              <span className="text-primary">FY</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
            <Button 
              size="sm"
              className="bg-primary hover:bg-primary/90"
              onClick={handleBrowseClick}
            >
              Upload Media
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img 
                  src={truefyMascot} 
                  alt="TRUEFY Mascot" 
                  className="w-20 h-20 object-contain rounded-xl shadow-lg border-2 border-primary/30"
                />
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
                    Detect AI-Generated &{" "}
                    <span className="text-primary">Deepfake Content</span>
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm">Powered by advanced forensic AI models</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real vs Fake Comparison */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h3 className="text-lg font-semibold text-center text-foreground">
                Can You Spot The Difference?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Fake Image */}
                <div className="relative group">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full text-xs font-bold bg-destructive text-destructive-foreground flex items-center gap-1 shadow-lg">
                    <AlertTriangle className="w-3 h-3" />
                    FAKE
                  </div>
                  <div className="relative overflow-hidden rounded-lg border-2 border-destructive/50 shadow-lg group-hover:border-destructive transition-colors">
                    <img 
                      src={fakeFood} 
                      alt="Fake manipulated image" 
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-destructive/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 left-2 right-2 text-xs text-white bg-black/60 rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Manipulated: Mold added digitally
                    </div>
                  </div>
                </div>

                {/* Real Image */}
                <div className="relative group">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full text-xs font-bold bg-success text-success-foreground flex items-center gap-1 shadow-lg">
                    <ShieldCheck className="w-3 h-3" />
                    REAL
                  </div>
                  <div className="relative overflow-hidden rounded-lg border-2 border-success/50 shadow-lg group-hover:border-success transition-colors">
                    <img 
                      src={realFood} 
                      alt="Authentic original image" 
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-success/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 left-2 right-2 text-xs text-white bg-black/60 rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Original unaltered image
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Our AI detects manipulated content in seconds with <span className="text-primary font-semibold">99.2% accuracy</span>
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-3">
              {features.map((feature, i) => (
                <div 
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Upload Panel */}
          <div className="bg-card rounded-2xl border border-border shadow-xl p-8 space-y-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*,audio/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Drag & Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-xl p-8 text-center
                transition-all duration-300 cursor-pointer
                ${isDragging 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
                }
              `}
              onClick={handleBrowseClick}
            >
              <div className={`
                w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center
                transition-all duration-300
                ${isDragging ? "bg-primary/20" : "bg-muted"}
              `}>
                <Upload className={`w-8 h-8 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              
              <p className="text-lg mb-1">
                Drag and drop your file here or{" "}
                <span className="text-primary font-medium cursor-pointer hover:underline">
                  browse to upload
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Supports image, video, and audio formats
              </p>
            </div>

            {/* Browse Button */}
            <Button 
              onClick={handleBrowseClick}
              className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90"
            >
              Browse Files
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">or</span>
              </div>
            </div>

            {/* URL Input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="url"
                  placeholder="Enter Media URL..."
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="pl-10 h-12"
                  onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
                />
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12"
                onClick={handleUrlSubmit}
                disabled={!mediaUrl.trim()}
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Terms Notice */}
            <p className="text-center text-xs text-muted-foreground">
              Use is subject to this site's{" "}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>.
            </p>

            {/* Supported Formats */}
            <div className="pt-4 border-t border-border space-y-2 text-center text-sm">
              <p className="text-muted-foreground">
                Supported: <span className="font-medium text-foreground">Image</span> (PNG, JPEG, JPG, WEBP)
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Video</span> (QuickTime, H264, MP4, WEBM, AVI, MKV, WMV)
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Audio</span> (FLAC, MP3, OGG, WAV, M4A)
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-6 py-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Ethics Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
