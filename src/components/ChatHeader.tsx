import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, LogOut, Users, User } from "lucide-react";

interface ChatHeaderProps {
  username: string;
  onLogout: () => void;
  activeChat: string | null;
  chatType: 'direct' | 'group' | null;
}

export const ChatHeader = ({ username, onLogout, activeChat, chatType }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-card border-b border-border/50 shadow-soft">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-warm rounded-full shadow-message animate-glow-pulse">
            <Heart className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Hearth</h1>
        </div>
        
        {activeChat && (
          <>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              {chatType === 'group' ? (
                <Users className="h-4 w-4 text-muted-foreground" />
              ) : (
                <User className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="font-medium text-foreground">{activeChat}</span>
            </div>
          </>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8 border-2 border-primary/30">
            <AvatarFallback className="bg-gradient-sky text-xs font-semibold">
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground hidden sm:inline">
            {username}
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50 
                    rounded-full transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};