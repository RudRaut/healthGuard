// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { LucideIcon } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface HealthCardProps {
//   title: string;
//   value: string | number;
//   unit?: string;
//   icon: LucideIcon;
//   trend?: "up" | "down" | "stable";
//   status?: "normal" | "warning" | "alert" | "success";
//   description?: string;
//   className?: string;
// }

// export default function HealthCard({
//   title,
//   value,
//   unit,
//   icon: Icon,
//   trend,
//   status = "normal",
//   description,
//   className,
// }: HealthCardProps) {
//   const getStatusColor = () => {
//     switch (status) {
//       case "success":
//         return "text-success border-success/20 bg-success-soft/30";
//       case "warning":
//         return "text-warning border-warning/20 bg-warning-soft/30";
//       case "alert":
//         return "text-destructive border-destructive/20 bg-destructive-soft/30";
//       default:
//         return "text-primary border-primary/20 bg-primary-soft/20";
//     }
//   };

//   const getTrendIndicator = () => {
//     if (!trend) return null;
    
//     switch (trend) {
//       case "up":
//         return <span className="text-success">↑</span>;
//       case "down":
//         return <span className="text-destructive">↓</span>;
//       case "stable":
//         return <span className="text-muted-foreground">→</span>;
//     }
//   };

//   return (
//     <Card className={cn(
//       "health-card border-2 transition-all duration-300",
//       getStatusColor(),
//       className
//     )}>
//       <CardHeader className="pb-2">
//         <CardTitle className="flex items-center justify-between text-health-large">
//           <span className="flex items-center gap-2">
//             <Icon className="h-6 w-6" />
//             {title}
//           </span>
//           {getTrendIndicator()}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex flex-col gap-1">
//           <div className="flex items-baseline gap-1">
//             <span className="text-health-display">{value}</span>
//             {unit && <span className="text-muted-foreground text-lg">{unit}</span>}
//           </div>
//           {description && (
//             <p className="text-muted-foreground text-sm leading-relaxed">
//               {description}
//             </p>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }



import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  status?: "normal" | "warning" | "alert" | "success";
  description?: string;
  className?: string;
  loading?: boolean; // <-- 1. Added the loading prop
}

export default function HealthCard({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  status = "normal",
  description,
  className,
  loading = false, // <-- 2. Destructured the prop with a default value
}: HealthCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-success border-success/20 bg-success-soft/30";
      case "warning":
        return "text-warning border-warning/20 bg-warning-soft/30";
      case "alert":
        return "text-destructive border-destructive/20 bg-destructive-soft/30";
      default:
        return "text-primary border-primary/20 bg-primary-soft/20";
    }
  };

  const getTrendIndicator = () => {
    if (!trend) return null;
    
    switch (trend) {
      case "up":
        return <span className="text-success">↑</span>;
      case "down":
        return <span className="text-destructive">↓</span>;
      case "stable":
        return <span className="text-muted-foreground">→</span>;
    }
  };

  return (
    <Card className={cn(
      "health-card border-2 transition-all duration-300",
      getStatusColor(),
      className
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-health-large">
          <span className="flex items-center gap-2">
            <Icon className="h-6 w-6" />
            {title}
          </span>
          {getTrendIndicator()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* --- Start of Changes --- */}
        {/* 3. Conditional rendering based on the loading prop */}
        {loading ? (
          // Skeleton Loader View
          <div className="flex flex-col gap-2 pt-2">
            {/* Skeleton for the large value display */}
            <div className="h-10 w-3/5 animate-pulse rounded-md bg-muted/50"></div>
            {/* Skeleton for the description line */}
            <div className="h-4 w-full animate-pulse rounded-md bg-muted/50"></div>
          </div>
        ) : (
          // Original Data View
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-1">
              <span className="text-health-display">{value}</span>
              {unit && <span className="text-muted-foreground text-lg">{unit}</span>}
            </div>
            {description && (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
        {/* --- End of Changes --- */}
      </CardContent>
    </Card>
  );
}