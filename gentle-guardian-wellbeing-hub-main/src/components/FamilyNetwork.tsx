import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ManageCareNetworkModal from "@/components/ManageCareNetworkModal";
import { Phone, MessageCircle, Video, Users } from "lucide-react";
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

interface FamilyNetworkProps {
  members: FamilyMember[];
  onContact: (memberId: string, method: "call" | "message" | "video") => void;
  onUpdateMembers: (members: FamilyMember[]) => void;
  className?: string;
}

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

export default function FamilyNetwork({ members, onContact, onUpdateMembers, className }: FamilyNetworkProps) {
  return (
    <Card className={cn("health-card", className)}>
      <CardHeader>
        <CardTitle className="text-health-xl flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Care Network
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-primary-soft text-primary font-medium">
                  {member.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                  statusColors[member.status]
                )}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-health-large">{member.name}</h4>
              <p className="text-muted-foreground text-sm">{member.relationship}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-1 rounded-full bg-primary-soft text-primary">
                  {roleLabels[member.role]}
                </span>
                <span className="text-xs text-muted-foreground">
                  Last contact: {member.lastContact}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onContact(member.id, "call")}
                className="h-8 w-8 p-0"
              >
                <Phone className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onContact(member.id, "message")}
                className="h-8 w-8 p-0"
              >
                <MessageCircle className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onContact(member.id, "video")}
                className="h-8 w-8 p-0"
              >
                <Video className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="pt-3 border-t">
          <ManageCareNetworkModal 
            members={members}
            onUpdateMembers={onUpdateMembers}
          />
        </div>
      </CardContent>
    </Card>
  );
}