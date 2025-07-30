import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import AlertCard from "@/components/AlertCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, AlertTriangle, CheckCircle } from "lucide-react";
import caregiverAvatar from "@/assets/caregiver-avatar.png";

export default function Notifications() {
  const [filter, setFilter] = useState<"all" | "critical" | "high" | "medium" | "low">("all");
  
  const notifications = [
    {
      id: "1",
      title: "🚨 Fall Risk Alert",
      message: "Ramesh's movement patterns indicate increased instability. His gait analysis shows 15% higher fall risk than yesterday. Consider assisting with mobility and removing any trip hazards.",
      severity: "critical" as const,
      timestamp: "7:30 AM",
      source: "AI Movement Monitor",
      acknowledged: false,
    },
    {
      id: "2",
      title: "💊 Medication Reminder",
      message: "Ramesh's morning blood pressure medication is due in 15 minutes. Please ensure he takes Lisinopril 10mg with a glass of water.",
      severity: "high" as const,
      timestamp: "7:45 AM",
      source: "AI Health Assistant",
      acknowledged: false,
    },
    {
      id: "3",
      title: "😴 Sleep Schedule Reminder",
      message: "Ramesh stayed up 45 minutes past his usual bedtime yesterday. Consider encouraging an earlier bedtime tonight (9:30 PM) to maintain his sleep routine.",
      severity: "medium" as const,
      timestamp: "8:00 AM",
      source: "AI Sleep Monitor",
      acknowledged: false,
    },
    {
      id: "4",
      title: "💧 Hydration Achievement",
      message: "Ramesh has successfully met his daily hydration goal for 3 consecutive days! Keep encouraging water intake throughout the day.",
      severity: "low" as const,
      timestamp: "Yesterday, 8:30 PM",
      source: "Health Tracker",
      acknowledged: true,
    },
    {
      id: "5",
      title: "📱 Heart Rate Anomaly",
      message: "Ramesh's heart rate was elevated (95 BPM) for 20 minutes during afternoon rest. This has been logged and Dr. Sharma has been notified.",
      severity: "high" as const,
      timestamp: "Yesterday, 3:20 PM",
      source: "Cardiac Monitor",
      acknowledged: true,
    },
    {
      id: "6",
      title: "🏥 Appointment Reminder",
      message: "Dr. Rajesh Sharma appointment is scheduled for tomorrow at 2:00 PM. Location: Apollo Hospital, Cardiology Wing.",
      severity: "medium" as const,
      timestamp: "Yesterday, 10:00 AM",
      source: "Calendar System",
      acknowledged: false,
    }
  ];

  const handleAcknowledge = (notificationId: string) => {
    console.log(`Acknowledged notification: ${notificationId}`);
    // Implementation for acknowledging notifications
  };

  const handleDismiss = (notificationId: string) => {
    console.log(`Dismissed notification: ${notificationId}`);
    // Implementation for dismissing notifications
  };

  const filteredNotifications = notifications.filter(notification => 
    filter === "all" || notification.severity === filter
  );

  const getFilterCount = (severity: string) => {
    return notifications.filter(n => severity === "all" ? true : n.severity === severity).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userName="Meera Sharma"
        userAvatar={caregiverAvatar}
        notificationCount={5}
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-health-display text-foreground">Notifications</h1>
            <p className="text-health-large text-muted-foreground">
              Manage alerts and updates for Ramesh's care
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="flex items-center gap-2"
          >
            <Filter className="h-3 w-3" />
            All ({getFilterCount("all")})
          </Button>
          <Button
            variant={filter === "critical" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("critical")}
            className="flex items-center gap-2"
          >
            <AlertTriangle className="h-3 w-3 text-destructive" />
            Critical ({getFilterCount("critical")})
          </Button>
          <Button
            variant={filter === "high" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("high")}
          >
            High ({getFilterCount("high")})
          </Button>
          <Button
            variant={filter === "medium" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("medium")}
          >
            Medium ({getFilterCount("medium")})
          </Button>
          <Button
            variant={filter === "low" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("low")}
            className="flex items-center gap-2"
          >
            <CheckCircle className="h-3 w-3 text-success" />
            Updates ({getFilterCount("low")})
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-health-xl font-medium text-foreground mb-2">
                No notifications found
              </h3>
              <p className="text-muted-foreground">
                No notifications match the selected filter.
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div key={notification.id} className={notification.acknowledged ? "opacity-75" : ""}>
                <AlertCard
                  title={notification.title}
                  message={notification.message}
                  severity={notification.severity}
                  timestamp={notification.timestamp}
                  source={notification.source}
                  onAcknowledge={!notification.acknowledged ? () => handleAcknowledge(notification.id) : undefined}
                  onDismiss={() => handleDismiss(notification.id)}
                />
              </div>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <h3 className="text-health-large font-medium mb-2">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
            <Button variant="outline" size="sm">
              Clear Acknowledged
            </Button>
            <Button variant="outline" size="sm">
              Notification Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}