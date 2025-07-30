import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  avatar?: string;
  status: "online" | "offline" | "busy";
  lastContact: string;
  role: "primary-caregiver" | "family" | "healthcare-provider";
}

interface ManageCareNetworkModalProps {
  members: FamilyMember[];
  onUpdateMembers: (members: FamilyMember[]) => void;
}

export default function ManageCareNetworkModal({ members, onUpdateMembers }: ManageCareNetworkModalProps) {
  const [open, setOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [newMember, setNewMember] = useState({
    name: "",
    relationship: "",
    role: "family" as const,
    status: "offline" as const
  });
  const { toast } = useToast();

  const handleAddMember = () => {
    if (!newMember.name || !newMember.relationship) {
      toast({
        title: "Please fill required fields",
        description: "Name and relationship are required",
        variant: "destructive"
      });
      return;
    }

    const member: FamilyMember = {
      id: Date.now().toString(),
      name: newMember.name,
      relationship: newMember.relationship,
      role: newMember.role,
      status: newMember.status,
      lastContact: "Just added"
    };

    onUpdateMembers([...members, member]);
    setNewMember({
      name: "",
      relationship: "",
      role: "family",
      status: "offline"
    });

    toast({
      title: "Member added successfully",
      description: `${member.name} has been added to the care network`,
      variant: "default"
    });
  };

  const handleDeleteMember = (memberId: string) => {
    const updatedMembers = members.filter(member => member.id !== memberId);
    onUpdateMembers(updatedMembers);
    
    toast({
      title: "Member removed",
      description: "Care network member has been removed",
      variant: "default"
    });
  };

  const statusColors = {
    online: "bg-success",
    offline: "bg-muted-foreground",
    busy: "bg-warning",
  };

  const roleLabels = {
    "primary-caregiver": "Primary Caregiver",
    "family": "Family Member",
    "healthcare-provider": "Healthcare Provider",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Users className="h-4 w-4 mr-2" />
          Manage Care Network
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-health-xl">Manage Care Network</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Members */}
          <div>
            <h3 className="text-health-large font-medium mb-4">Current Members</h3>
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-primary-soft text-primary font-medium">
                        {member.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white",
                        statusColors[member.status]
                      )}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-muted-foreground text-sm">{member.relationship}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary-soft text-primary">
                      {roleLabels[member.role]}
                    </span>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingMember(member)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteMember(member.id)}
                      className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Member */}
          <div className="border-t pt-6">
            <h3 className="text-health-large font-medium mb-4">Add New Member</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    placeholder="Enter member name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship *</Label>
                  <Input
                    id="relationship"
                    value={newMember.relationship}
                    onChange={(e) => setNewMember({...newMember, relationship: e.target.value})}
                    placeholder="e.g., Daughter, Doctor"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={newMember.role} onValueChange={(value: any) => setNewMember({...newMember, role: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family">Family Member</SelectItem>
                      <SelectItem value="primary-caregiver">Primary Caregiver</SelectItem>
                      <SelectItem value="healthcare-provider">Healthcare Provider</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newMember.status} onValueChange={(value: any) => setNewMember({...newMember, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleAddMember} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}