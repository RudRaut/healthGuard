import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Pill, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description: string;
  type: "medication" | "appointment" | "exercise" | "vital-check";
  time: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  className?: string;
}

const taskIcons = {
  medication: Pill,
  appointment: Calendar,
  exercise: Users,
  "vital-check": Clock,
};

const priorityColors = {
  high: "border-l-destructive bg-destructive-soft/20",
  medium: "border-l-warning bg-warning-soft/20",
  low: "border-l-primary bg-primary-soft/20",
};

export default function TaskList({ tasks, onTaskComplete, className }: TaskListProps) {
  return (
    <Card className={cn("health-card", className)}>
      <CardHeader>
        <CardTitle className="text-health-xl flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          Today's Care Tasks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            All tasks completed! Great job! 🎉
          </p>
        ) : (
          tasks.map((task) => {
            const IconComponent = taskIcons[task.type];
            return (
              <div
                key={task.id}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-lg border-l-4 transition-all duration-200",
                  priorityColors[task.priority],
                  task.completed && "opacity-60"
                )}
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => onTaskComplete(task.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent className="h-4 w-4 text-primary flex-shrink-0" />
                    <h4 className={cn(
                      "font-medium text-health-large",
                      task.completed && "line-through"
                    )}>
                      {task.title}
                    </h4>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                    {task.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-3 w-3" />
                    <span className="text-muted-foreground">{task.time}</span>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      task.priority === "high" && "bg-destructive-soft text-destructive",
                      task.priority === "medium" && "bg-warning-soft text-warning",
                      task.priority === "low" && "bg-primary-soft text-primary"
                    )}>
                      {task.priority} priority
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
        
        <div className="pt-3 border-t">
          <Link to="/schedule" className="w-full">
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              View Full Schedule
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}