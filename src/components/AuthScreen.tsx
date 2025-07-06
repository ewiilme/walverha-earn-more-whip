
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface AuthScreenProps {
  onLogin: (email: string) => void;
}

export const AuthScreen = ({ onLogin }: AuthScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      toast("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      toast("Password must be at least 6 characters");
      return;
    }

    // Simulate authentication
    if (isLogin) {
      // Check if user exists in localStorage
      const userData = localStorage.getItem(`walverha_${email}`);
      if (userData) {
        onLogin(email);
      } else {
        toast("User not found. Please register first.");
      }
    } else {
      // Register new user
      const existingData = localStorage.getItem(`walverha_${email}`);
      if (existingData) {
        toast("User already exists. Please login instead.");
      } else {
        // Create new user data
        localStorage.setItem(`walverha_${email}`, JSON.stringify({
          email,
          whaBalance: 0,
          currentMultiplier: 1.0,
          offlineHoursAvailable: 0,
          adsWatchedMultiplier: 0,
          adsWatchedOffline: 0
        }));
        toast("Registration successful! Please login.");
        setIsLogin(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white mb-2">
            Walverha
          </CardTitle>
          <CardDescription className="text-white/80">
            {isLogin ? "Welcome back!" : "Create your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/80 hover:text-white underline"
            >
              {isLogin ? "Need an account? Register" : "Have an account? Login"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
