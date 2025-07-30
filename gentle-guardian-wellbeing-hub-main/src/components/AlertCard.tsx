import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  title: string;
  message: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  source: string;
  onAcknowledge?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export default function AlertCard({
  title,
  message,
  severity,
  timestamp,
  source,
  onAcknowledge,
  onDismiss,
  className,
}: AlertCardProps) {
  const getSeverityStyles = () => {
    switch (severity) {
      case "critical":
        return "border-destructive bg-destructive-soft/50 text-destructive-foreground";
      case "high":
        return "border-warning bg-warning-soft/50 text-warning-foreground";
      case "medium":
        return "border-accent bg-accent-soft/50 text-accent-foreground";
      case "low":
        return "border-primary bg-primary-soft/30 text-primary-foreground";
      default:
        return "border-muted bg-muted/30";
    }
  };

  const getSeverityIcon = () => {
    switch (severity) {
      case "critical":
      case "high":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Card
      className={cn(
        "health-card border-l-4 transition-all duration-300",
        getSeverityStyles(),
        className
      )}
    >
      <CardHeader className="text-black   pb-3">
        <CardTitle className=" flex items-center gap-2 text-health-large">
          {getSeverityIcon()}
          {title}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {timestamp}
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {source}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-black text-foreground mb-4 leading-relaxed">
          {message}
        </p>
        <div className="flex gap-2">
          {onAcknowledge && (
            <Button
              onClick={onAcknowledge}
              variant="default"
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              Acknowledge
            </Button>
          )}
          {onDismiss && (
            <Button
              onClick={onDismiss}
              variant="outline"
              size="sm"
              className="text-black"
            >
              Dismiss
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
