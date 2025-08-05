import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Users, Plus } from "lucide-react";

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChat: (name: string, type: 'direct' | 'group') => void;
}

export const NewChatModal = ({ isOpen, onClose, onCreateChat }: NewChatModalProps) => {
  const [chatName, setChatName] = useState("");
  const [chatType, setChatType] = useState<'direct' | 'group'>('direct');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatName.trim()) {
      onCreateChat(chatName.trim(), chatType);
      setChatName("");
      onClose();
    }
  };

  const handleClose = () => {
    setChatName("");
    setChatType('direct');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-0 shadow-float rounded-2xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-center">
            Start New Chat
          </DialogTitle>
          <DialogDescription className="text-center">
            Create a new space for warm conversations
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium">Chat Type</Label>
            <RadioGroup 
              value={chatType} 
              onValueChange={(value) => setChatType(value as 'direct' | 'group')}
              className="grid grid-cols-2 gap-3"
            >
              <Label 
                htmlFor="direct" 
                className={`flex items-center space-x-3 p-4 rounded-2xl border-2 cursor-pointer 
                           transition-all duration-200 hover:shadow-message ${
                             chatType === 'direct' 
                               ? 'border-primary bg-gradient-warm shadow-soft' 
                               : 'border-border hover:border-primary/50'
                           }`}
              >
                <RadioGroupItem value="direct" id="direct" className="sr-only" />
                <div className={`p-2 rounded-full ${
                  chatType === 'direct' ? 'bg-primary-foreground/20' : 'bg-muted'
                }`}>
                  <User className="h-4 w-4" />
                </div>
                <span className="font-medium">Direct</span>
              </Label>
              
              <Label 
                htmlFor="group" 
                className={`flex items-center space-x-3 p-4 rounded-2xl border-2 cursor-pointer 
                           transition-all duration-200 hover:shadow-message ${
                             chatType === 'group' 
                               ? 'border-primary bg-gradient-sky shadow-soft' 
                               : 'border-border hover:border-primary/50'
                           }`}
              >
                <RadioGroupItem value="group" id="group" className="sr-only" />
                <div className={`p-2 rounded-full ${
                  chatType === 'group' ? 'bg-secondary-foreground/20' : 'bg-muted'
                }`}>
                  <Users className="h-4 w-4" />
                </div>
                <span className="font-medium">Group</span>
              </Label>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="chatName" className="text-sm font-medium">
              {chatType === 'direct' ? 'Friend\'s Name' : 'Group Name'}
            </Label>
            <Input
              id="chatName"
              type="text"
              placeholder={chatType === 'direct' ? 'Enter friend\'s name...' : 'Enter group name...'}
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              className="h-12 rounded-2xl border-2 border-border/50 
                        focus:border-primary/50 transition-all duration-300
                        focus:shadow-soft"
              autoFocus
            />
          </div>
          
          <div className="flex space-x-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="flex-1 h-12 rounded-2xl border-2 border-border/50 
                        hover:border-primary/50 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!chatName.trim()}
              className="flex-1 h-12 rounded-2xl bg-gradient-warm 
                        hover:shadow-soft transition-all duration-300 
                        hover:scale-105 active:scale-95"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};