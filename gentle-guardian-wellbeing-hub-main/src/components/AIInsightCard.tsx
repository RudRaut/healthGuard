import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIInsightCardProps {
  title: string;
  content: string;
  icon: LucideIcon;
  type: "good" | "bad" | "suggestion";
  className?: string;
}

export default function AIInsightCard({
  title,
  content,
  icon: Icon,
  type,
  className,
}: AIInsightCardProps) {
  const getTypeStyles = () => {
    switch (type) {
      case "good":
        return "border-success/20 bg-success-soft/30 text-success-foreground";
      case "bad":
        return "border-destructive/20 bg-destructive-soft/30 text-destructive-foreground";
      case "suggestion":
        return "border-primary/20 bg-primary-soft/30 text-primary-foreground";
      default:
        return "border-muted bg-muted/30";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "good":
        return "text-success";
      case "bad":
        return "text-destructive";
      case "suggestion":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card
      className={cn(
        "health-card border-2 transition-all duration-300",
        getTypeStyles(),
        className
      )}
    >
      <CardHeader className="text-black pb-3">
        <CardTitle className="text-black flex items-center gap-2 text-health-large">
          <Icon className={cn("h-5 w-5", getIconColor())} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground leading-relaxed">{content}</p>
      </CardContent>
    </Card>
  );
}
