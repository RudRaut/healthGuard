import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Heart, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import elderlyAvatar from "@/assets/elderly-avatar.png";

interface HeaderProps {
  userName: string;
  userAvatar?: string;
  notificationCount?: number;
  onMenuClick?: () => void;
}

export default function Header({ userName, userAvatar, notificationCount = 0, onMenuClick }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useState(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-health-xl text-primary font-bold">HealthGuard</h1>
                <p className="text-xs text-muted-foreground">AI-Powered Care Platform</p>
              </div>
            </div>
          </div>

          {/* Center - Time and Date (hidden on mobile) */}
          <div className="hidden md:block text-center">
            <div className="text-health-xl font-semibold text-foreground">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-muted-foreground">
              {formatDate(currentTime)}
            </div>
          </div>

          {/* Right side - Notifications and User */}
          <div className="flex items-center gap-3">
            <Link to="/notifications">
              <Button
                variant="ghost"
                size="sm"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </Button>
            </Link>

            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-primary-soft text-primary font-medium text-sm">
                  {userName.split(" ").map(n => n[0]).join("").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">Welcome back</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}