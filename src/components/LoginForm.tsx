import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";

interface LoginFormProps {
  onLogin: (username: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm p-4">
      <div className="absolute inset-0 bg-gradient-glow opacity-50"></div>
      
      <Card className="w-full max-w-md shadow-float border-0 relative">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-3 bg-gradient-warm rounded-full shadow-soft animate-bounce-gentle">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="p-3 bg-gradient-sky rounded-full shadow-soft animate-float">
              <MessageCircle className="h-6 w-6 text-secondary-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-warm bg-clip-text text-transparent">
            Welcome to Hearth
          </CardTitle>
          <CardDescription className="text-base">
            Where warm conversations begin ✨
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your cozy username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-center text-lg h-12 rounded-2xl border-2 border-border/50 
                          focus:border-primary/50 transition-all duration-300
                          focus:shadow-soft"
                autoFocus
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-lg rounded-2xl bg-gradient-warm 
                        hover:shadow-float transition-all duration-300 
                        hover:scale-105 active:scale-95"
              disabled={!username.trim()}
            >
              Join the Warmth
            </Button>
          </form>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            Create connections that feel like home 🏠
          </p>
        </CardContent>
      </Card>
    </div>
  );
};