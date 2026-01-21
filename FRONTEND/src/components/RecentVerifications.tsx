import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Image, 
  Video, 
  Mic, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Eye,
  ChevronRight
} from "lucide-react";

interface Verification {
  id: string;
  platform: string;
  platformLogo: string;
  mediaType: "image" | "video" | "audio";
  complaintId: string;
  timestamp: string;
  authenticityScore: number;
  fraudRiskScore: number;
  confidence: number;
  action: "auto-approved" | "manual-review" | "rejected";
  claimAmount: string;
}

const mockVerifications: Verification[] = [
  {
    id: "1",
    platform: "Zomato",
    platformLogo: "🍽️",
    mediaType: "image",
    complaintId: "ZMT-2024-78234",
    timestamp: "2 min ago",
    authenticityScore: 92,
    fraudRiskScore: 8,
    confidence: 95,
    action: "auto-approved",
    claimAmount: "₹450",
  },
  {
    id: "2",
    platform: "Swiggy",
    platformLogo: "🛵",
    mediaType: "video",
    complaintId: "SWG-2024-45123",
    timestamp: "5 min ago",
    authenticityScore: 34,
    fraudRiskScore: 78,
    confidence: 89,
    action: "rejected",
    claimAmount: "₹1,200",
  },
  {
    id: "3",
    platform: "Blinkit",
    platformLogo: "⚡",
    mediaType: "image",
    complaintId: "BLK-2024-12987",
    timestamp: "8 min ago",
    authenticityScore: 67,
    fraudRiskScore: 45,
    confidence: 72,
    action: "manual-review",
    claimAmount: "₹890",
  },
  {
    id: "4",
    platform: "Zepto",
    platformLogo: "🚀",
    mediaType: "audio",
    complaintId: "ZPT-2024-34521",
    timestamp: "12 min ago",
    authenticityScore: 88,
    fraudRiskScore: 12,
    confidence: 91,
    action: "auto-approved",
    claimAmount: "₹320",
  },
  {
    id: "5",
    platform: "Swiggy",
    platformLogo: "🛵",
    mediaType: "image",
    complaintId: "SWG-2024-45678",
    timestamp: "15 min ago",
    authenticityScore: 23,
    fraudRiskScore: 89,
    confidence: 94,
    action: "rejected",
    claimAmount: "₹2,100",
  },
];

const MediaIcon = ({ type }: { type: "image" | "video" | "audio" }) => {
  switch (type) {
    case "image":
      return <Image className="w-4 h-4" />;
    case "video":
      return <Video className="w-4 h-4" />;
    case "audio":
      return <Mic className="w-4 h-4" />;
  }
};

const ActionBadge = ({ action }: { action: Verification["action"] }) => {
  switch (action) {
    case "auto-approved":
      return (
        <Badge className="bg-success/10 text-success border-success/20 gap-1">
          <CheckCircle className="w-3 h-3" />
          Auto-Approved
        </Badge>
      );
    case "manual-review":
      return (
        <Badge className="bg-warning/10 text-warning border-warning/20 gap-1">
          <AlertTriangle className="w-3 h-3" />
          Manual Review
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1">
          <XCircle className="w-3 h-3" />
          Rejected
        </Badge>
      );
  }
};

const RecentVerifications = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Recent Verifications</CardTitle>
          <p className="text-sm text-muted-foreground">Live feed of TRUEFY verification results</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          View All
          <ChevronRight className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockVerifications.map((verification) => (
            <div
              key={verification.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                selectedId === verification.id 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 bg-muted/20"
              }`}
              onClick={() => setSelectedId(selectedId === verification.id ? null : verification.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
                    {verification.platformLogo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{verification.complaintId}</span>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted text-xs text-muted-foreground">
                        <MediaIcon type={verification.mediaType} />
                        {verification.mediaType}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{verification.platform} • {verification.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">{verification.claimAmount}</p>
                    <p className="text-xs text-muted-foreground">Claim</p>
                  </div>
                  <ActionBadge action={verification.action} />
                </div>
              </div>

              {selectedId === verification.id && (
                <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4">
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Authenticity</p>
                    <p className={`text-lg font-bold ${verification.authenticityScore >= 70 ? "text-success" : verification.authenticityScore >= 40 ? "text-warning" : "text-destructive"}`}>
                      {verification.authenticityScore}%
                    </p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Fraud Risk</p>
                    <p className={`text-lg font-bold ${verification.fraudRiskScore <= 30 ? "text-success" : verification.fraudRiskScore <= 60 ? "text-warning" : "text-destructive"}`}>
                      {verification.fraudRiskScore}%
                    </p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                    <p className="text-lg font-bold text-primary">{verification.confidence}%</p>
                  </div>
                  <div className="col-span-3 flex justify-end">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="w-3 h-3" />
                      View Full Report
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentVerifications;
