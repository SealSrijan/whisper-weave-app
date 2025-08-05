import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: string;
  sender: string;
  timestamp: string;
  isOwn: boolean;
  isGroupChat?: boolean;
}

export const MessageBubble = ({ 
  message, 
  sender, 
  timestamp, 
  isOwn, 
  isGroupChat = false 
}: MessageBubbleProps) => {
  return (
    <div className={cn(
      "flex items-end space-x-2 animate-message-in",
      isOwn ? "justify-end" : "justify-start"
    )}>
      {!isOwn && (
        <Avatar className="h-6 w-6 border border-border/50">
          <AvatarFallback className="bg-gradient-sky text-xs font-semibold">
            {sender.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-xs lg:max-w-md space-y-1",
        isOwn ? "items-end" : "items-start"
      )}>
        {isGroupChat && !isOwn && (
          <p className="text-xs text-muted-foreground px-1 font-medium">
            {sender}
          </p>
        )}
        
        <div className={cn(
          "px-4 py-2 rounded-2xl shadow-message transition-all duration-200 hover:shadow-soft",
          isOwn 
            ? "bg-chat-message-sent text-chat-message-sent-foreground rounded-br-md" 
            : "bg-chat-message-received text-chat-message-received-foreground rounded-bl-md"
        )}>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        
        <p className={cn(
          "text-xs text-muted-foreground px-1",
          isOwn ? "text-right" : "text-left"
        )}>
          {timestamp}
        </p>
      </div>
      
      {isOwn && (
        <Avatar className="h-6 w-6 border border-border/50">
          <AvatarFallback className="bg-gradient-warm text-xs font-semibold">
            {sender.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};