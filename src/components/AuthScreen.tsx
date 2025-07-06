
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AuthScreenProps {
  onLogin: (email: string) => void;
}

export const AuthScreen = ({ onLogin }: AuthScreenProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast("Please enter your email");
      return;
    }

    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      onLogin(email.trim());
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/a47d9812-f8f7-45b1-82d3-4a321fbce9e6.png" 
            alt="Walverha Coin"
            className="w-24 h-24 mx-auto mb-4 rounded-full shadow-2xl"
          />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-['Orbitron'] mb-2">
            Walverha
          </h1>
          <p className="text-purple-300 font-['Orbitron']">Earn More WHA</p>
        </div>

        <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-center text-purple-300 font-['Orbitron']">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-purple-300 font-['Orbitron']">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-black/20 border-purple-500/30 text-white placeholder:text-purple-400 font-['Orbitron']"
                  disabled={isLoading}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-['Orbitron']"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-purple-400 text-sm font-['Orbitron']">
                Start earning WHA coins today!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 space-y-4">
          <Card className="bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-lg border-purple-500/20">
            <CardContent className="p-4">
              <h3 className="text-purple-300 font-bold mb-2 font-['Orbitron']">🎯 Tap to Earn</h3>
              <p className="text-purple-200 text-sm font-['Orbitron']">Tap the Walverha logo to earn WHA coins instantly</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-lg border-purple-500/20">
            <CardContent className="p-4">
              <h3 className="text-purple-300 font-bold mb-2 font-['Orbitron']">📺 Watch Ads</h3>
              <p className="text-purple-200 text-sm font-['Orbitron']">Increase your multiplier and enable offline earning</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-lg border-purple-500/20">
            <CardContent className="p-4">
              <h3 className="text-purple-300 font-bold mb-2 font-['Orbitron']">💰 Withdraw USDT</h3>
              <p className="text-purple-200 text-sm font-['Orbitron']">Convert your WHA to USDT when you reach minimum threshold</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
