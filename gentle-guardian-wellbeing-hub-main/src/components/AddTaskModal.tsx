import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddTaskModalProps {
  onAddTask: (task: any) => void;
}

export default function AddTaskModal({ onAddTask }: AddTaskModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "medication",
    time: "",
    date: "today",
    priority: "medium",
    recurring: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.time) {
      toast({
        title: "Please fill required fields",
        description: "Title and time are required",
        variant: "destructive"
      });
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      type: formData.type,
      time: formData.time,
      date: formData.date,
      completed: false,
      priority: formData.priority,
      recurring: formData.recurring || undefined
    };

    onAddTask(newTask);
    setOpen(false);
    setFormData({
      title: "",
      description: "",
      type: "medication",
      time: "",
      date: "today",
      priority: "medium",
      recurring: ""
    });

    toast({
      title: "Task added successfully",
      description: "New care task has been added to the schedule",
      variant: "default"
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-health-xl">Add New Care Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Morning Medication - Ramesh"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Additional details about the task..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Task Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medication">Medication</SelectItem>
                  <SelectItem value="appointment">Appointment</SelectItem>
                  <SelectItem value="exercise">Exercise</SelectItem>
                  <SelectItem value="vital-check">Vital Check</SelectItem>
                  <SelectItem value="meal">Meal</SelectItem>
                  <SelectItem value="therapy">Therapy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Select value={formData.date} onValueChange={(value) => setFormData({...formData, date: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recurring">Recurring (Optional)</Label>
            <Select value={formData.recurring} onValueChange={(value) => setFormData({...formData, recurring: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <Calendar className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}