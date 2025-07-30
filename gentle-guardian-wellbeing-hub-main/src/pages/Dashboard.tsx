// import { useEffect, useState } from "react";
// import Header from "@/components/Header";
// import HealthCard from "@/components/HealthCard";
// import AlertCard from "@/components/AlertCard";
// import TaskList from "@/components/TaskList";
// import FamilyNetwork from "@/components/FamilyNetwork";
// import AIInsightCard from "@/components/AIInsightCard";
// import {
//   Heart,
//   Activity,
//   Thermometer,
//   Droplets,
//   Brain,
//   TrendingUp,
//   Shield,
//   CheckCircle,
//   Lightbulb,
// } from "lucide-react";
// import caregiverAvatar from "@/assets/caregiver-avatar.png";

// import { useAi } from "../hooks/useAi";

// export default function Dashboard() {
//   const [heartRate, setHeartRate] = useState("75");
//   const [temperature, setTemperature] = useState("98.6");
//   const { getSuggestion, loading, suggestions, error } = useAi();

//   useEffect(() => {
//     getSuggestion(heartRate, temperature);
//   }, [temperature,heartRate]);

//   const [tasks, setTasks] = useState([
//     {
//       id: "1",
//       title: "Morning Medication - Ramesh",
//       description:
//         "Ensure Ramesh takes blood pressure medication (Lisinopril 10mg)",
//       type: "medication" as const,
//       time: "8:00 AM",
//       completed: false,
//       priority: "high" as const,
//     },
//     {
//       id: "2",
//       title: "Blood Pressure Check - Ramesh",
//       description: "Help Ramesh record morning blood pressure reading",
//       type: "vital-check" as const,
//       time: "8:30 AM",
//       completed: false,
//       priority: "medium" as const,
//     },
//     {
//       id: "3",
//       title: "Dr. Sharma Appointment",
//       description: "Accompany Ramesh to cardiology checkup at Apollo Hospital",
//       type: "appointment" as const,
//       time: "2:00 PM",
//       completed: false,
//       priority: "high" as const,
//     },
//     {
//       id: "4",
//       title: "Evening Walk with Ramesh",
//       description: "30-minute gentle walk in the garden with Ramesh",
//       type: "exercise" as const,
//       time: "6:00 PM",
//       completed: false,
//       priority: "low" as const,
//     },
//   ]);

//   const [familyMembers, setFamilyMembers] = useState([
//     {
//       id: "1",
//       name: "Priya Sharma",
//       relationship: "Sister (Co-caregiver)",
//       status: "online" as const,
//       lastContact: "2 hours ago",
//       role: "primary-caregiver" as const,
//     },
//     {
//       id: "2",
//       name: "Dr. Rajesh Sharma",
//       relationship: "Cardiologist",
//       status: "busy" as const,
//       lastContact: "Yesterday",
//       role: "healthcare-provider" as const,
//     },
//     {
//       id: "3",
//       name: "Amit Sharma",
//       relationship: "Son",
//       status: "offline" as const,
//       lastContact: "3 days ago",
//       role: "family" as const,
//     },
//     {
//       id: "4",
//       name: "Dr. Kavita Menon",
//       relationship: "General Physician",
//       status: "online" as const,
//       lastContact: "3 days ago",
//       role: "healthcare-provider" as const,
//     },
//   ]);

//   const handleTaskComplete = (taskId: string) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === taskId ? { ...task, completed: !task.completed } : task
//       )
//     );
//   };

//   const handleContact = (
//     memberId: string,
//     method: "call" | "message" | "video"
//   ) => {
//     console.log(`Contacting ${memberId} via ${method}`);
//     // Implementation for contacting family members
//   };

//   const handleUpdateMembers = (updatedMembers: any[]) => {
//     setFamilyMembers(updatedMembers);
//   };

//   const handleAlertAcknowledge = () => {
//     console.log("Alert acknowledged");
//     // Implementation for acknowledging alerts
//   };

//   const handleAlertDismiss = () => {
//     console.log("Alert dismissed");
//     // Implementation for dismissing alerts
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header
//         userName="Meera Sharma"
//         userAvatar={caregiverAvatar}
//         notificationCount={5}
//       />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <h1 className="text-health-display text-foreground mb-2">
//             Good Morning, Meera! 🌅
//           </h1>
//           <p className="text-health-large text-muted-foreground">
//             Here's Ramesh's health overview for today. He's in good care under
//             your supervision!
//           </p>
//         </div>

//         {/* Health Metrics Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <HealthCard
//             title="Ramesh's Heart Rate"
//             value={72}
//             unit="bpm"
//             icon={Heart}
//             status="success"
//             trend="stable"
//             description="Within healthy range"
//           />

//           <HealthCard
//             title="Ramesh's Blood Pressure"
//             value="125/82"
//             unit="mmHg"
//             icon={Activity}
//             status="warning"
//             trend="up"
//             description="Slightly elevated - medication needed"
//           />

//           <HealthCard
//             title="Ramesh's Temperature"
//             value={98.6}
//             unit="°F"
//             icon={Thermometer}
//             status="normal"
//             trend="stable"
//             description="Normal body temperature"
//           />

//           <HealthCard
//             title="Ramesh's Hydration"
//             value={6}
//             unit="glasses"
//             icon={Droplets}
//             status="success"
//             trend="up"
//             description="Well hydrated today!"
//           />

//           <HealthCard
//             title="Ramesh's Sleep Quality"
//             value={85}
//             unit="%"
//             icon={Brain}
//             status="success"
//             trend="up"
//             description="Excellent sleep last night"
//           />

//           <HealthCard
//             title="Ramesh's Activity Level"
//             value={4200}
//             unit="steps"
//             icon={TrendingUp}
//             status="normal"
//             trend="stable"
//             description="60% of daily goal"
//           />
//         </div>

//         {/* Alerts Section */}
//         <div className="text-black  mb-8 space-y-4">
//           <AlertCard
//             title="🚨 Fall Risk Alert"
//             message="Ramesh's movement patterns indicate increased instability. His gait analysis shows 15% higher fall risk than yesterday. Consider assisting with mobility and removing any trip hazards."
//             severity="critical"
//             timestamp="7:30 AM"
//             source="AI Movement Monitor"
//             onAcknowledge={handleAlertAcknowledge}
//             onDismiss={handleAlertDismiss}
//           />

//           <AlertCard
//             title="💊 Medication Reminder"
//             message="Ramesh's morning blood pressure medication is due in 15 minutes. Please ensure he takes Lisinopril 10mg with a glass of water."
//             severity="high"
//             timestamp="7:45 AM"
//             source="AI Health Assistant"
//             onAcknowledge={handleAlertAcknowledge}
//             onDismiss={handleAlertDismiss}
//           />

//           <AlertCard
//             title="😴 Sleep Schedule Reminder"
//             message="Ramesh stayed up 45 minutes past his usual bedtime yesterday. Consider encouraging an earlier bedtime tonight (9:30 PM) to maintain his sleep routine."
//             severity="medium"
//             timestamp="8:00 AM"
//             source="AI Sleep Monitor"
//             onAcknowledge={handleAlertAcknowledge}
//             onDismiss={handleAlertDismiss}
//           />
//         </div>

//         {/* Tasks and Family Network */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <TaskList tasks={tasks} onTaskComplete={handleTaskComplete} />

//           <FamilyNetwork
//             members={familyMembers}
//             onContact={handleContact}
//             onUpdateMembers={handleUpdateMembers}
//           />
//         </div>

//         {/* AI Insights Section */}
//         <div className="mt-8">
//           <h3 className="text-health-xl font-semibold text-primary mb-6">
//             🤖 AI Health Insights for Ramesh
//           </h3>

//           {loading ? (
//             <p className="text-muted-foreground text-sm">
//               Fetching insights...
//             </p>
//           ) : error ? (
//             <p className="text-destructive text-sm">
//               Error fetching insights: {error}
//             </p>
//           ) : suggestions ? (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <AIInsightCard
//                 title="Health Status"
//                 content={suggestions.badSign}
//                 icon={Shield}
//                 type="bad"
//               />
//               <AIInsightCard
//                 title="Current Condition"
//                 content={suggestions.goodSign}
//                 icon={CheckCircle}
//                 type="good"
//               />
//               <AIInsightCard
//                 title="Recommendations"
//                 content={suggestions.improvementSuggestion}
//                 icon={Lightbulb}
//                 type="suggestion"
//               />
//             </div>
//           ) : (
//             <p className="text-sm text-muted-foreground">
//               No insights available.
//             </p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HealthCard from "@/components/HealthCard";
import AlertCard from "@/components/AlertCard";
import TaskList from "@/components/TaskList";
import FamilyNetwork from "@/components/FamilyNetwork";
import AIInsightCard from "@/components/AIInsightCard";
import {
  Heart,
  Activity,
  Thermometer,
  Droplets,
  Brain,
  TrendingUp,
  Shield,
  CheckCircle,
  Lightbulb,
  RefreshCw, // 1. Imported the refresh icon
} from "lucide-react";
import caregiverAvatar from "@/assets/caregiver-avatar.png";

import { useAi } from "../hooks/useAi";
import useThingSpeak from "../hooks/useThingSpeak";

export default function Dashboard() {
  // --- STATE MANAGEMENT ---
  const [heartRate, setHeartRate] = useState("75");
  const [temperature, setTemperature] = useState("95.6");
  const [logs, setLogs] = useState([]);
  const [showAllLogs, setShowAllLogs] = useState(false);

  // --- CUSTOM HOOKS ---
  const {
    getSuggestion,
    loading: aiLoading,
    suggestions,
    error: aiError,
  } = useAi();

  const {
    data: thingSpeakData,
    loading: thingSpeakLoading,
    error: thingSpeakError,
    fetchLatestData,
  } = useThingSpeak();

  // --- DATA FETCHING AND SIDE EFFECTS ---

  // Effect 1: Get initial AI suggestion ONCE on page load.
  useEffect(() => {
    getSuggestion(heartRate, temperature);
  }, []);

  // Effect 2: Update local state whenever new data arrives from ThingSpeak.
  useEffect(() => {
    if (thingSpeakData) {
      if (thingSpeakData.field1) {
        setHeartRate(thingSpeakData.field1);
      }
      if (thingSpeakData.field2) {
        setTemperature(thingSpeakData.field2);
      }
    }
  }, [thingSpeakData]);

  // Effect 3: Get a new AI suggestion whenever heart rate or temperature is updated.
  useEffect(() => {
    // Only run if the data is from ThingSpeak (not the initial state)
    if (thingSpeakData) {
      getSuggestion(heartRate, temperature);
    }
  }, [heartRate, temperature]);

  // Effect 4: Log every new suggestion that comes from the AI.
  useEffect(() => {
    if (suggestions) {
      const newLog = {
        id: new Date().getTime(),
        timestamp: new Date(),
        data: suggestions,
      };
      setLogs((prevLogs) => [newLog, ...prevLogs]);
    }
  }, [suggestions]);


  // --- HANDLERS ---
  
  // 2. Handler for the new button to fetch data on-demand.
  const handleGetUpdate = () => {
    fetchLatestData();
  };
  
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Morning Medication - Ramesh",
      description:
        "Ensure Ramesh takes blood pressure medication (Lisinopril 10mg)",
      type: "medication" as const,
      time: "8:00 AM",
      completed: false,
      priority: "high" as const,
    },
    {
      id: "2",
      title: "Blood Pressure Check - Ramesh",
      description: "Help Ramesh record morning blood pressure reading",
      type: "vital-check" as const,
      time: "8:30 AM",
      completed: false,
      priority: "medium" as const,
    },
    {
      id: "3",
      title: "Dr. Sharma Appointment",
      description: "Accompany Ramesh to cardiology checkup at Apollo Hospital",
      type: "appointment" as const,
      time: "2:00 PM",
      completed: false,
      priority: "high" as const,
    },
    {
      id: "4",
      title: "Evening Walk with Ramesh",
      description: "30-minute gentle walk in the garden with Ramesh",
      type: "exercise" as const,
      time: "6:00 PM",
      completed: false,
      priority: "low" as const,
    },
  ]);

  const [familyMembers, setFamilyMembers] = useState([
    {
      id: "1",
      name: "Priya Sharma",
      relationship: "Sister (Co-caregiver)",
      status: "online" as const,
      lastContact: "2 hours ago",
      role: "primary-caregiver" as const,
    },
    {
      id: "2",
      name: "Dr. Rajesh Sharma",
      relationship: "Cardiologist",
      status: "busy" as const,
      lastContact: "Yesterday",
      role: "healthcare-provider" as const,
    },
    {
      id: "3",
      name: "Amit Sharma",
      relationship: "Son",
      status: "offline" as const,
      lastContact: "3 days ago",
      role: "family" as const,
    },
    {
      id: "4",
      name: "Dr. Kavita Menon",
      relationship: "General Physician",
      status: "online" as const,
      lastContact: "3 days ago",
      role: "healthcare-provider" as const,
    },
  ]);

  const handleTaskComplete = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleContact = (
    memberId: string,
    method: "call" | "message" | "video"
  ) => {
    console.log(`Contacting ${memberId} via ${method}`);
  };

  const handleUpdateMembers = (updatedMembers: any[]) => {
    setFamilyMembers(updatedMembers);
  };

  const handleAlertAcknowledge = () => {
    console.log("Alert acknowledged");
  };

  const handleAlertDismiss = () => {
    console.log("Alert dismissed");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        userName="Meera Sharma"
        userAvatar={caregiverAvatar}
        notificationCount={5}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* --- 3. UPDATED Welcome Section with Button --- */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-health-display text-foreground mb-2">
              Good Morning, Meera! 🌅
            </h1>
            <p className="text-health-large text-muted-foreground">
              Here's Ramesh's health overview for today.
            </p>
          </div>
          <button
            onClick={handleGetUpdate}
            disabled={thingSpeakLoading}
            className="px-4 py-2 flex items-center gap-2 bg-primary text-primary-foreground font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-5 w-5 ${thingSpeakLoading ? 'animate-spin' : ''}`} />
            {thingSpeakLoading ? "Updating..." : "Get Live Update"}
          </button>
        </div>

        {/* Health Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <HealthCard
            title="Ramesh's Heart Rate"
            value={Number(heartRate)}
            unit="bpm"
            icon={Heart}
            status="success"
            trend="stable"
            description="Click button to update"
            loading={thingSpeakLoading}
          />

          <HealthCard
            title="Ramesh's Blood Pressure"
            value="125/82"
            unit="mmHg"
            icon={Activity}
            status="warning"
            trend="up"
            description="Slightly elevated - medication needed"
          />

          <HealthCard
            title="Ramesh's Temperature"
            value={Number(temperature)}
            unit="°F"
            icon={Thermometer}
            status="normal"
            trend="stable"
            description="Click button to update"
            loading={thingSpeakLoading}
          />

          <HealthCard
            title="Ramesh's Hydration"
            value={6}
            unit="glasses"
            icon={Droplets}
            status="success"
            trend="up"
            description="Well hydrated today!"
          />

          <HealthCard
            title="Ramesh's Sleep Quality"
            value={85}
            unit="%"
            icon={Brain}
            status="success"
            trend="up"
            description="Excellent sleep last night"
          />

          <HealthCard
            title="Ramesh's Activity Level"
            value={4200}
            unit="steps"
            icon={TrendingUp}
            status="normal"
            trend="stable"
            description="60% of daily goal"
          />
        </div>

        {/* Alerts Section */}
        <div className="text-black  mb-8 space-y-4">
          <AlertCard
            title="🚨 Fall Risk Alert"
            message="Ramesh's movement patterns indicate increased instability. His gait analysis shows 15% higher fall risk than yesterday. Consider assisting with mobility and removing any trip hazards."
            severity="critical"
            timestamp="7:30 AM"
            source="AI Movement Monitor"
            onAcknowledge={handleAlertAcknowledge}
            onDismiss={handleAlertDismiss}
          />

          <AlertCard
            title="💊 Medication Reminder"
            message="Ramesh's morning blood pressure medication is due in 15 minutes. Please ensure he takes Lisinopril 10mg with a glass of water."
            severity="high"
            timestamp="7:45 AM"
            source="AI Health Assistant"
            onAcknowledge={handleAlertAcknowledge}
            onDismiss={handleAlertDismiss}
          />

          <AlertCard
            title="😴 Sleep Schedule Reminder"
            message="Ramesh stayed up 45 minutes past his usual bedtime yesterday. Consider encouraging an earlier bedtime tonight (9:30 PM) to maintain his sleep routine."
            severity="medium"
            timestamp="8:00 AM"
            source="AI Sleep Monitor"
            onAcknowledge={handleAlertAcknowledge}
            onDismiss={handleAlertDismiss}
          />
        </div>

        {/* Tasks and Family Network */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TaskList tasks={tasks} onTaskComplete={handleTaskComplete} />

          <FamilyNetwork
            members={familyMembers}
            onContact={handleContact}
            onUpdateMembers={handleUpdateMembers}
          />
        </div>

        {/* AI Insights Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-health-xl font-semibold text-primary">
              🤖 AI Health Insights for Ramesh
            </h3>
            {logs.length > 1 && (
              <button
                onClick={() => setShowAllLogs(!showAllLogs)}
                className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
              >
                {showAllLogs ? "Show Recent Log" : "Show All Logs"}
              </button>
            )}
          </div>

          {thingSpeakError && (
            <p className="text-destructive text-sm mb-4">
              ThingSpeak Error: {thingSpeakError}
            </p>
          )}

          {aiLoading && logs.length === 1 ? (
            <p className="text-muted-foreground text-sm">
              Analyzing new data...
            </p>
          ) : aiError ? (
            <p className="text-destructive text-sm">
              AI Error: {aiError}
            </p>
          ) : logs.length > 0 ? (
            <div className="space-y-8">
              {(showAllLogs ? logs : logs.slice(0, 1)).map((log, index) => (
                <div key={log.id}>
                  {showAllLogs && (
                    <div className="pb-4 mb-4 border-b border-border">
                      <h4 className="font-semibold text-foreground">
                        Log from:{" "}
                        <span className="text-muted-foreground font-normal">
                          {log.timestamp.toLocaleString()}
                        </span>
                      </h4>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AIInsightCard
                      title="Health Status"
                      content={log.data.badSign}
                      icon={Shield}
                      type="bad"
                    />
                    <AIInsightCard
                      title="Current Condition"
                      content={log.data.goodSign}
                      icon={CheckCircle}
                      type="good"
                    />
                    <AIInsightCard
                      title="Recommendations"
                      content={log.data.improvementSuggestion}
                      icon={Lightbulb}
                      type="suggestion"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No insights available yet.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}