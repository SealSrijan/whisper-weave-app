import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { ChatHeader } from "./ChatHeader";
import { ChatSidebar } from "./ChatSidebar";
import { ChatArea } from "./ChatArea";
import { NewChatModal } from "./NewChatModal";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

interface Chat {
  id: string;
  name: string;
  type: 'direct' | 'group';
  messages: Message[];
  lastMessage?: string;
  unread?: number;
}

export const HearthApp = () => {
  const [user, setUser] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Sarah',
      type: 'direct',
      messages: [
        {
          id: '1',
          text: 'Hey! How are you doing today? ☀️',
          sender: 'Sarah',
          timestamp: '2:30 PM'
        },
        {
          id: '2',
          text: 'I\'m doing great! Just working on some cozy projects. How about you?',
          sender: user || 'You',
          timestamp: '2:32 PM'
        }
      ],
      lastMessage: 'I\'m doing great! Just working on...',
      unread: 0
    },
    {
      id: '2',
      name: 'Book Club',
      type: 'group',
      messages: [
        {
          id: '3',
          text: 'Has everyone finished reading this month\'s book?',
          sender: 'Emma',
          timestamp: '1:15 PM'
        },
        {
          id: '4',
          text: 'Almost done! Just a few chapters left 📚',
          sender: 'Alex',
          timestamp: '1:18 PM'
        }
      ],
      lastMessage: 'Almost done! Just a few chapters left 📚',
      unread: 2
    }
  ]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  const handleLogin = (username: string) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveChat(null);
  };

  const handleSendMessage = (messageText: string) => {
    if (!activeChat || !user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: user,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === activeChat 
          ? { 
              ...chat, 
              messages: [...chat.messages, newMessage],
              lastMessage: messageText
            }
          : chat
      )
    );
  };

  const handleCreateChat = (name: string, type: 'direct' | 'group') => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name,
      type,
      messages: [],
      unread: 0
    };

    setChats(prevChats => [...prevChats, newChat]);
    setActiveChat(newChat.id);
  };

  const getCurrentChat = () => {
    return chats.find(chat => chat.id === activeChat);
  };

  const currentChat = getCurrentChat();

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <ChatHeader 
        username={user} 
        onLogout={handleLogout}
        activeChat={currentChat?.name || null}
        chatType={currentChat?.type || null}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <ChatSidebar
          chats={chats}
          activeChat={activeChat}
          onChatSelect={setActiveChat}
          onNewChat={() => setShowNewChatModal(true)}
        />
        
        <ChatArea
          messages={currentChat?.messages || []}
          onSendMessage={handleSendMessage}
          currentUser={user}
          chatName={currentChat?.name || null}
          isGroupChat={currentChat?.type === 'group'}
        />
      </div>

      <NewChatModal
        isOpen={showNewChatModal}
        onClose={() => setShowNewChatModal(false)}
        onCreateChat={handleCreateChat}
      />
    </div>
  );
};