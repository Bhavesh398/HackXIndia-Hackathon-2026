import { useState } from "react";
import { X, HelpCircle, BookOpen, Upload, Shield, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import truefyMascot from "@/assets/truefy-mascot.png";

const TruefyHelper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const helpOptions = [
    {
      icon: Upload,
      label: "Analyze Media",
      description: "Upload image, video, or audio for deepfake detection",
      action: () => navigate("/dashboard"),
      color: "text-primary"
    },
    {
      icon: Shield,
      label: "How It Works",
      description: "Learn about our AI detection technology",
      action: () => {},
      color: "text-success"
    },
    {
      icon: BookOpen,
      label: "Guidelines",
      description: "Best practices for media verification",
      action: () => {},
      color: "text-warning"
    },
    {
      icon: HelpCircle,
      label: "Get Help",
      description: "FAQs and support resources",
      action: () => {},
      color: "text-primary"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-72 bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[hsl(var(--truefy-orange))] to-[hsl(var(--truefy-orange-dark))] p-4 text-white">
            <div className="flex items-center gap-3">
              <img 
                src={truefyMascot} 
                alt="Truefy" 
                className="w-10 h-10 rounded-lg object-cover border-2 border-white/30"
              />
              <div>
                <h3 className="font-bold text-sm">Truefy Assistant</h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Here to help you detect fakes
                </p>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="p-2 space-y-1">
            {helpOptions.map((option, i) => (
              <button
                key={i}
                onClick={() => {
                  option.action();
                  setIsOpen(false);
                }}
                className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left group"
              >
                <div className={`p-2 rounded-lg bg-muted group-hover:bg-background transition-colors ${option.color}`}>
                  <option.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{option.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{option.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border bg-muted/30">
            <p className="text-xs text-center text-muted-foreground">
              Powered by <span className="font-semibold text-primary">TRUEFY AI</span>
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-16 h-16 transition-all duration-300 hover:scale-110"
      >
        {isOpen ? (
          <div className="w-full h-full flex items-center justify-center bg-card rounded-full border border-border shadow-lg">
            <X className="w-6 h-6 text-foreground" />
          </div>
        ) : (
          <>
            <img 
              src={truefyMascot} 
              alt="Truefy Helper" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
            
            {/* Chat Bubble Indicator */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-md animate-bounce">
              <MessageCircle className="w-3 h-3 text-primary-foreground" />
            </div>
          </>
        )}
      </button>

      {/* Tooltip when closed */}
      {!isOpen && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-card border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          <p className="text-xs font-medium text-foreground">Need help? Click me!</p>
          <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-2 h-2 bg-card border-r border-b border-border" />
        </div>
      )}
    </div>
  );
};

export default TruefyHelper;
