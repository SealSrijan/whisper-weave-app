import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Users, Plus, Hash } from "lucide-react";

interface Chat {
  id: string;
  name: string;
  type: 'direct' | 'group';
  lastMessage?: string;
  unread?: number;
}

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
}

export const ChatSidebar = ({ chats, activeChat, onChatSelect, onNewChat }: ChatSidebarProps) => {
  const directChats = chats.filter(chat => chat.type === 'direct');
  const groupChats = chats.filter(chat => chat.type === 'group');

  return (
    <div className="w-80 bg-card border-r border-border/50 flex flex-col h-full">
      <div className="p-4">
        <Button 
          onClick={onNewChat}
          className="w-full rounded-2xl bg-gradient-warm hover:shadow-soft 
                    transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Start New Chat
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-2">
        {directChats.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              <span>Direct Messages</span>
            </div>
            
            <div className="space-y-1">
              {directChats.map((chat) => (
                <ChatItem 
                  key={chat.id}
                  chat={chat}
                  isActive={activeChat === chat.id}
                  onClick={() => onChatSelect(chat.id)}
                />
              ))}
            </div>
          </div>
        )}
        
        {groupChats.length > 0 && (
          <div className="mb-6">
            <Separator className="my-4" />
            <div className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Group Chats</span>
            </div>
            
            <div className="space-y-1">
              {groupChats.map((chat) => (
                <ChatItem 
                  key={chat.id}
                  chat={chat}
                  isActive={activeChat === chat.id}
                  onClick={() => onChatSelect(chat.id)}
                />
              ))}
            </div>
          </div>
        )}
        
        {chats.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="p-4 bg-gradient-glow rounded-full w-16 h-16 mx-auto mb-4 
                            flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground text-sm">
              No chats yet. Start a conversation!
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

const ChatItem = ({ chat, isActive, onClick }: { 
  chat: Chat; 
  isActive: boolean; 
  onClick: () => void; 
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-2xl text-left transition-all duration-200 
                 hover:bg-muted/50 hover:shadow-message group ${
                   isActive 
                     ? 'bg-gradient-warm shadow-soft' 
                     : 'hover:scale-105'
                 }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${
          chat.type === 'group' ? 'bg-gradient-sky' : 'bg-gradient-warm'
        } shadow-message`}>
          {chat.type === 'group' ? (
            <Hash className="h-3 w-3 text-white" />
          ) : (
            <MessageCircle className="h-3 w-3 text-white" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className={`font-medium truncate ${
              isActive ? 'text-primary-foreground' : 'text-foreground'
            }`}>
              {chat.name}
            </p>
            {chat.unread && chat.unread > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 
                              rounded-full font-medium shadow-message">
                {chat.unread}
              </span>
            )}
          </div>
          
          {chat.lastMessage && (
            <p className={`text-xs truncate mt-1 ${
              isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
            }`}>
              {chat.lastMessage}
            </p>
          )}
        </div>
      </div>
    </button>
  );
};