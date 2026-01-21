import { ShieldCheck, Zap, Server, Globe } from "lucide-react";

const Footer = () => {
  const features = [
    { icon: ShieldCheck, label: "Privacy Compliant" },
    { icon: Zap, label: "Low-Latency API" },
    { icon: Server, label: "Enterprise Scale" },
    { icon: Globe, label: "Multi-Format Support" },
  ];

  return (
    <footer className="w-full border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © 2024 TRUEFY — AI Deepfake Detection
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <f.icon className="w-3 h-3 text-success" />
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
