import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface AuthScreenProps {
  onLogin: (email: string) => void;
  isDarkTheme: boolean;
}

const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' }
];

export const AuthScreen = ({ onLogin, isDarkTheme }: AuthScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent, isRegister: boolean = false) => {
    e.preventDefault();
    if (!email.trim()) {
      toast("Please enter your email");
      return;
    }

    if (isRegister) {
      if (password !== confirmPassword) {
        toast("Passwords do not match");
        return;
      }
      if (password.length < 6) {
        toast("Password must be at least 6 characters");
        return;
      }
    }

    setIsLoading(true);
    
    setTimeout(() => {
      onLogin(email.trim());
      setIsLoading(false);
    }, 1000);
  };

  const textColors = isDarkTheme 
    ? { primary: "text-purple-200", secondary: "text-purple-300", accent: "text-purple-400" }
    : { primary: "text-purple-800", secondary: "text-purple-700", accent: "text-purple-600" };

  const cardColors = isDarkTheme
    ? "bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30"
    : "bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-lg border-purple-300/50";

  const inputColors = isDarkTheme
    ? "bg-black/20 border-purple-500/30 text-white placeholder:text-purple-400"
    : "bg-white/50 border-purple-300/50 text-purple-800 placeholder:text-purple-500";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Language Selector */}
        <div className="mb-4 flex justify-end">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className={`w-32 ${isDarkTheme ? 'bg-purple-800/30 border-purple-500/30 text-purple-200' : 'bg-white/50 border-purple-300/50 text-purple-700'}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={isDarkTheme ? "bg-purple-800 border-purple-500/30" : "bg-white border-purple-300/50"}>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code} className={`${isDarkTheme ? 'text-purple-200 hover:bg-purple-700' : 'text-purple-700 hover:bg-purple-100'}`}>
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
          <p className={`${textColors.secondary} font-['Orbitron']`}>Earn More WHA</p>
        </div>

        <Card className={cardColors}>
          <CardHeader>
            <CardTitle className={`text-center ${textColors.secondary} font-['Orbitron']`}>
              Welcome
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className={`grid w-full grid-cols-2 ${isDarkTheme ? 'bg-purple-800/50' : 'bg-purple-200/50'}`}>
                <TabsTrigger value="login" className={`${textColors.secondary} ${isDarkTheme ? 'data-[state=active]:bg-purple-600 data-[state=active]:text-white' : 'data-[state=active]:bg-purple-500 data-[state=active]:text-white'} font-['Orbitron']`}>
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="register" className={`${textColors.secondary} ${isDarkTheme ? 'data-[state=active]:bg-purple-600 data-[state=active]:text-white' : 'data-[state=active]:bg-purple-500 data-[state=active]:text-white'} font-['Orbitron']`}>
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-4">
                <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email" className={`${textColors.secondary} font-['Orbitron']`}>
                      Email Address
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={`${inputColors} font-['Orbitron']`}
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
              </TabsContent>

              <TabsContent value="register" className="space-y-4 mt-4">
                <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                  <div>
                    <Label htmlFor="register-email" className={`${textColors.secondary} font-['Orbitron']`}>
                      Email Address
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={`${inputColors} font-['Orbitron']`}
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-password" className={`${textColors.secondary} font-['Orbitron']`}>
                      Password
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={`${inputColors} font-['Orbitron']`}
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirm-password" className={`${textColors.secondary} font-['Orbitron']`}>
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className={`${inputColors} font-['Orbitron']`}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-['Orbitron']"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className={`${textColors.accent} text-sm font-['Orbitron']`}>
                Start earning WHA coins today!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 space-y-4">
          <Card className={`${isDarkTheme ? 'bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-lg border-purple-500/20' : 'bg-gradient-to-br from-white/60 to-purple-50/60 backdrop-blur-lg border-purple-300/30'}`}>
            <CardContent className="p-4">
              <h3 className={`${textColors.secondary} font-bold mb-2 font-['Orbitron']`}>🎯 Tap to Earn</h3>
              <p className={`${textColors.primary} text-sm font-['Orbitron']`}>Tap the Walverha logo to earn WHA coins instantly</p>
            </CardContent>
          </Card>

          <Card className={`${isDarkTheme ? 'bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-lg border-purple-500/20' : 'bg-gradient-to-br from-white/60 to-purple-50/60 backdrop-blur-lg border-purple-300/30'}`}>
            <CardContent className="p-4">
              <h3 className={`${textColors.secondary} font-bold mb-2 font-['Orbitron']`}>📺 Watch Ads</h3>
              <p className={`${textColors.primary} text-sm font-['Orbitron']`}>Increase your multiplier and enable offline earning</p>
            </CardContent>
          </Card>

          <Card className={`${isDarkTheme ? 'bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-lg border-purple-500/20' : 'bg-gradient-to-br from-white/60 to-purple-50/60 backdrop-blur-lg border-purple-300/30'}`}>
            <CardContent className="p-4">
              <h3 className={`${textColors.secondary} font-bold mb-2 font-['Orbitron']`}>💰 Withdraw USDT</h3>
              <p className={`${textColors.primary} text-sm font-['Orbitron']`}>Convert your WHA to USDT when you reach minimum threshold</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
