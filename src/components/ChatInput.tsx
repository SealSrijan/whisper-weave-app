import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Heart } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

export const ChatInput = ({ onSendMessage, placeholder = "Type a warm message..." }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-border/50 bg-card p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="h-12 pl-4 pr-12 rounded-2xl border-2 border-border/50 
                      focus:border-primary/50 transition-all duration-300
                      focus:shadow-soft bg-background/50"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Heart className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={!message.trim()}
          className="h-12 w-12 rounded-2xl bg-gradient-warm p-0 
                    hover:shadow-soft transition-all duration-300 
                    hover:scale-105 active:scale-95 disabled:opacity-50 
                    disabled:scale-100"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
      
      <p className="text-xs text-muted-foreground text-center mt-2">
        Press Enter to send • Shift+Enter for new line
      </p>
    </div>
  );
};