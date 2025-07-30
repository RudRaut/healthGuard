import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import AddTaskModal from "@/components/AddTaskModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Calendar, Clock, Pill, Users, Activity, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import caregiverAvatar from "@/assets/caregiver-avatar.png";

interface Task {
  id: string;
  title: string;
  description: string;
  type: "medication" | "appointment" | "exercise" | "vital-check" | "meal" | "therapy";
  time: string;
  date: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  recurring?: "daily" | "weekly" | "monthly";
}

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState("today");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [allTasks, setAllTasks] = useState<Task[]>([

    // Today's tasks
    {
      id: "1",
      title: "Morning Medication - Ramesh",
      description: "Ensure Ramesh takes blood pressure medication (Lisinopril 10mg)",
      type: "medication",
      time: "8:00 AM",
      date: "today",
      completed: false,
      priority: "high",
      recurring: "daily",
    },
    {
      id: "2",
      title: "Blood Pressure Check - Ramesh",
      description: "Help Ramesh record morning blood pressure reading",
      type: "vital-check",
      time: "8:30 AM",
      date: "today",
      completed: false,
      priority: "medium",
      recurring: "daily",
    },
    {
      id: "3",
      title: "Breakfast with Ramesh",
      description: "Prepare and supervise balanced breakfast (low sodium)",
      type: "meal",
      time: "9:00 AM",
      date: "today",
      completed: true,
      priority: "medium",
      recurring: "daily",
    },
    {
      id: "4",
      title: "Physical Therapy Session",
      description: "Assist Ramesh with prescribed knee exercises",
      type: "therapy",
      time: "11:00 AM",
      date: "today",
      completed: false,
      priority: "high",
      recurring: "weekly",
    },
    {
      id: "5",
      title: "Dr. Sharma Appointment",
      description: "Accompany Ramesh to cardiology checkup at Apollo Hospital",
      type: "appointment",
      time: "2:00 PM",
      date: "today",
      completed: false,
      priority: "high",
    },
    {
      id: "6",
      title: "Afternoon Medication",
      description: "Ensure Ramesh takes diabetes medication (Metformin 500mg)",
      type: "medication",
      time: "2:30 PM",
      date: "today",
      completed: false,
      priority: "high",
      recurring: "daily",
    },
    {
      id: "7",
      title: "Evening Walk with Ramesh",
      description: "30-minute gentle walk in the garden",
      type: "exercise",
      time: "6:00 PM",
      date: "today",
      completed: false,
      priority: "low",
      recurring: "daily",
    },
    {
      id: "8",
      title: "Dinner Preparation",
      description: "Prepare heart-healthy dinner (low sodium, high fiber)",
      type: "meal",
      time: "7:00 PM",
      date: "today",
      completed: false,
      priority: "medium",
      recurring: "daily",
    },
    {
      id: "9",
      title: "Evening Medication",
      description: "Ensure Ramesh takes night-time medications",
      type: "medication",
      time: "9:00 PM",
      date: "today",
      completed: false,
      priority: "high",
      recurring: "daily",
    },
    // Tomorrow's tasks
    {
      id: "10",
      title: "Morning Medication - Ramesh",
      description: "Ensure Ramesh takes blood pressure medication (Lisinopril 10mg)",
      type: "medication",
      time: "8:00 AM",
      date: "tomorrow",
      completed: false,
      priority: "high",
      recurring: "daily",
    },
    {
      id: "11",
      title: "Ophthalmologist Appointment",
      description: "Eye check-up at Vision Care Center",
      type: "appointment",
      time: "10:00 AM",
      date: "tomorrow",
      completed: false,
      priority: "medium",
    },
    {
      id: "12",
      title: "Grocery Shopping",
      description: "Buy heart-healthy foods and medications",
      type: "meal",
      time: "3:00 PM",
      date: "tomorrow",
      completed: false,
      priority: "low",
    },
  ]);

  const taskIcons = {
    medication: Pill,
    appointment: Calendar,
    exercise: Activity,
    "vital-check": Clock,
    meal: Users,
    therapy: Activity,
  };

  const priorityColors = {
    high: "border-l-destructive bg-destructive-soft/20",
    medium: "border-l-warning bg-warning-soft/20",
    low: "border-l-primary bg-primary-soft/20",
  };

  const handleTaskComplete = (taskId: string) => {
    setAllTasks(allTasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = (newTask: Task) => {
    setAllTasks([...allTasks, newTask]);
  };

  const filteredTasks = allTasks
    .filter(task => task.date === selectedDate)
    .filter(task => {
      if (filter === "pending") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });

  const getTaskStats = (date: string) => {
    const dateTasks = allTasks.filter(task => task.date === date);
    const completed = dateTasks.filter(task => task.completed).length;
    const total = dateTasks.length;
    return { completed, total, pending: total - completed };
  };

  const todayStats = getTaskStats("today");
  const tomorrowStats = getTaskStats("tomorrow");

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userName="Meera Sharma"
        userAvatar={caregiverAvatar}
        notificationCount={5}
      />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-health-display text-foreground">Full Schedule</h1>
            <p className="text-health-large text-muted-foreground">
              Manage Ramesh's complete care schedule
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-health-xl">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-primary-soft/30 rounded-lg">
                  <h4 className="font-medium text-primary">Today</h4>
                  <p className="text-sm text-muted-foreground">
                    {todayStats.completed}/{todayStats.total} completed
                  </p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <h4 className="font-medium">Tomorrow</h4>
                  <p className="text-sm text-muted-foreground">
                    {tomorrowStats.total} tasks scheduled
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Date Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-health-large">Select Date</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedDate === "today" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedDate("today")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Today ({todayStats.total})
                </Button>
                <Button
                  variant={selectedDate === "tomorrow" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedDate("tomorrow")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Tomorrow ({tomorrowStats.total})
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All Tasks ({filteredTasks.length})
              </Button>
              <Button
                variant={filter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("pending")}
              >
                Pending ({filteredTasks.filter(t => !t.completed).length})
              </Button>
              <Button
                variant={filter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("completed")}
              >
                Completed ({filteredTasks.filter(t => t.completed).length})
              </Button>
              <div className="ml-auto">
                <AddTaskModal onAddTask={handleAddTask} />
              </div>
            </div>

            {/* Tasks List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-health-xl capitalize">
                  {selectedDate === "today" ? "Today's" : "Tomorrow's"} Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredTasks.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-health-xl font-medium text-foreground mb-2">
                      No tasks found
                    </h3>
                    <p className="text-muted-foreground">
                      No tasks match the selected criteria.
                    </p>
                  </div>
                ) : (
                  filteredTasks
                    .sort((a, b) => {
                      const timeA = new Date(`2000-01-01 ${a.time}`).getTime();
                      const timeB = new Date(`2000-01-01 ${b.time}`).getTime();
                      return timeA - timeB;
                    })
                    .map((task) => {
                      const IconComponent = taskIcons[task.type];
                      return (
                        <div
                          key={task.id}
                          className={cn(
                            "flex items-start gap-4 p-4 rounded-lg border-l-4 transition-all duration-200",
                            priorityColors[task.priority],
                            task.completed && "opacity-60"
                          )}
                        >
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => handleTaskComplete(task.id)}
                            className="mt-1"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <IconComponent className="h-4 w-4 text-primary flex-shrink-0" />
                              <h4 className={cn(
                                "font-medium text-health-large",
                                task.completed && "line-through"
                              )}>
                                {task.title}
                              </h4>
                              {task.recurring && (
                                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                  {task.recurring}
                                </span>
                              )}
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                              {task.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span className="text-muted-foreground font-medium">{task.time}</span>
                              </div>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}