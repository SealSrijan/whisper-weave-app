import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { Heart, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  currentUser: string;
  chatName: string | null;
  isGroupChat: boolean;
}

export const ChatArea = ({ 
  messages, 
  onSendMessage, 
  currentUser, 
  chatName,
  isGroupChat 
}: ChatAreaProps) => {
  if (!chatName) {
    return (
      <div className="flex-1 flex items-center justify-center bg-chat-background">
        <div className="text-center space-y-6 max-w-md">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-4 bg-gradient-warm rounded-full shadow-soft animate-bounce-gentle">
              <Heart className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="p-4 bg-gradient-sky rounded-full shadow-soft animate-float">
              <MessageCircle className="h-8 w-8 text-secondary-foreground" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">
              Welcome to Hearth
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Choose a chat from the sidebar to start a warm conversation, 
              or create a new one to connect with friends.
            </p>
          </div>
          
          <div className="p-6 bg-card rounded-2xl shadow-soft border border-border/50">
            <p className="text-sm text-muted-foreground italic">
              "The best conversations happen around the hearth" ✨
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-chat-background">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 bg-gradient-glow rounded-full w-16 h-16 mx-auto mb-4 
                              flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-primary animate-bounce-gentle" />
              </div>
              <p className="text-muted-foreground">
                Start the conversation! Say hello 👋
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message.text}
                sender={message.sender}
                timestamp={message.timestamp}
                isOwn={message.sender === currentUser}
                isGroupChat={isGroupChat}
              />
            ))
          )}
        </div>
      </ScrollArea>
      
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};