import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData, Screen } from "@/pages/Index";
import { LogOut, Wallet, Play, Zap, Copy, HelpCircle, User, Settings, Newspaper, Zap as Features } from "lucide-react";
import { toast } from "sonner";

interface HomeScreenProps {
  userData: UserData;
  onUpdateUserData: (updates: Partial<UserData>) => void;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export const HomeScreen = ({ userData, onUpdateUserData, onNavigate, onLogout }: HomeScreenProps) => {
  const [tapAnimation, setTapAnimation] = useState(false);
  const [earnedAmount, setEarnedAmount] = useState(0);
  const [inviteCode] = useState(`WHA${userData.email.split('@')[0].toUpperCase()}`);
  const [profileImage, setProfileImage] = useState("");

  const handleTap = () => {
    const earned = 1 * userData.currentMultiplier;
    setEarnedAmount(earned);
    setTapAnimation(true);
    
    onUpdateUserData({
      whaBalance: userData.whaBalance + earned
    });

    setTimeout(() => setTapAnimation(false), 300);
  };

  const handleWatchAd = (type: 'offline' | 'multiplier') => {
    if (type === 'offline') {
      const newOfflineHours = Math.min(userData.offlineHoursAvailable + 6, 24);
      onUpdateUserData({
        offlineHoursAvailable: newOfflineHours,
        adsWatchedOffline: userData.adsWatchedOffline + 1
      });
      toast(`Offline earning time +6 hours! Total: ${newOfflineHours}h`);
    } else {
      const newAdsCount = userData.adsWatchedMultiplier + 1;
      const newMultiplier = calculateMultiplier(newAdsCount);
      onUpdateUserData({
        currentMultiplier: newMultiplier,
        adsWatchedMultiplier: newAdsCount
      });
      toast(`Multiplier increased! Current: ${newMultiplier.toFixed(2)}x`);
    }
  };

  const calculateMultiplier = (count: number): number => {
    if (count <= 1) return 1.0;
    if (count === 2) return 1.1;
    if (count === 3) return 1.3;
    if (count <= 40) return 1.3 + (count - 3) * 0.05;
    return 3.0;
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    toast("Invite code copied to clipboard!");
  };

  const getInviteReward = (inviteCount: number): number => {
    if (inviteCount >= 1 && inviteCount <= 5) return 3;
    if (inviteCount >= 6 && inviteCount <= 20) return 1;
    return 0.5;
  };

  useEffect(() => {
    if (userData.offlineHoursAvailable > 0) {
      const interval = setInterval(() => {
        const offlineEarning = userData.currentMultiplier * 0.1;
        onUpdateUserData({
          whaBalance: userData.whaBalance + offlineEarning,
          offlineHoursAvailable: Math.max(userData.offlineHoursAvailable - 0.1, 0)
        });
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [userData.offlineHoursAvailable, userData.currentMultiplier]);

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 text-white">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-['Orbitron']">
            Walverha
          </h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onNavigate("wallet")}
              className="border-purple-500 text-purple-300 hover:bg-purple-500/20"
            >
              <Wallet className="w-4 h-4 mr-1" />
              Wallet
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onLogout}
              className="border-red-500 text-red-300 hover:bg-red-500/20"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-purple-800/50 mb-6">
            <TabsTrigger value="home" className="text-purple-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-['Orbitron'] text-xs">
              Home
            </TabsTrigger>
            <TabsTrigger value="news" className="text-purple-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-['Orbitron'] text-xs">
              <Newspaper className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="features" className="text-purple-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-['Orbitron'] text-xs">
              <Features className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="invite" className="text-purple-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-['Orbitron'] text-xs">
              Invite
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-purple-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-['Orbitron'] text-xs">
              <Settings className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
                <CardContent className="p-4 text-center">
                  <p className="text-purple-300 text-sm font-['Orbitron']">Balance</p>
                  <p className="text-2xl font-bold text-purple-200 font-['Orbitron']">{userData.whaBalance.toFixed(0)}</p>
                  <p className="text-purple-400 text-xs font-['Orbitron']">WHA</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
                <CardContent className="p-4 text-center">
                  <p className="text-purple-300 text-sm font-['Orbitron']">Multiplier</p>
                  <p className="text-2xl font-bold text-purple-200 font-['Orbitron']">{userData.currentMultiplier.toFixed(2)}x</p>
                  <p className="text-purple-400 text-xs font-['Orbitron']">Active</p>
                </CardContent>
              </Card>
            </div>

            {/* Tap Logo */}
            <div className="flex justify-center">
              <div 
                className={`relative cursor-pointer transition-transform duration-300 ${
                  tapAnimation ? 'transform scale-95' : 'hover:scale-105'
                }`}
                onClick={handleTap}
              >
                <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-purple-500/50 hover:border-purple-400/70 transition-all duration-300 flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-indigo-600/30">
                  <img 
                    src="/lovable-uploads/5edcf466-9ce8-4535-be1a-f67af6fcdcd9.png" 
                    alt="Walverha Logo"
                    className="w-44 h-44 object-contain"
                  />
                </div>
                {tapAnimation && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-green-400 font-bold text-2xl animate-bounce font-['Orbitron']">
                      +{earnedAmount.toFixed(2)}
                    </div>
                  </div>
                )}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-20 blur-lg animate-pulse"></div>
              </div>
            </div>

            {/* Ad Buttons */}
            <div className="space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-['Orbitron']"
                onClick={() => handleWatchAd('offline')}
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Offline Ad (+6h)
              </Button>
              
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 font-['Orbitron']"
                onClick={() => handleWatchAd('multiplier')}
              >
                <Zap className="w-4 h-4 mr-2" />
                Watch Multiplier Ad
              </Button>
            </div>

            {/* Status Cards */}
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300 text-lg font-['Orbitron']">Offline Earning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200 font-['Orbitron']">
                    {userData.offlineHoursAvailable > 0 
                      ? `${userData.offlineHoursAvailable.toFixed(1)} hours remaining`
                      : "Not active"
                    }
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300 text-lg font-['Orbitron']">Multiplier Boost</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200 font-['Orbitron']">
                    Current: {userData.currentMultiplier.toFixed(2)}x
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300 font-['Orbitron']">Latest News</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b border-purple-500/30 pb-3">
                  <h4 className="text-purple-200 font-bold font-['Orbitron']">New Multiplier System!</h4>
                  <p className="text-purple-300 text-sm font-['Orbitron']">Enhanced earning potential with improved ad rewards</p>
                  <p className="text-purple-400 text-xs font-['Orbitron']">2 days ago</p>
                </div>
                <div className="border-b border-purple-500/30 pb-3">
                  <h4 className="text-purple-200 font-bold font-['Orbitron']">Offline Earning Update</h4>
                  <p className="text-purple-300 text-sm font-['Orbitron']">Now earn up to 24 hours while offline!</p>
                  <p className="text-purple-400 text-xs font-['Orbitron']">5 days ago</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300 font-['Orbitron']">Coming Soon</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🎮</span>
                  </div>
                  <div>
                    <h4 className="text-purple-200 font-bold font-['Orbitron']">Mini Games</h4>
                    <p className="text-purple-300 text-sm font-['Orbitron']">Play games to earn extra WHA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🏆</span>
                  </div>
                  <div>
                    <h4 className="text-purple-200 font-bold font-['Orbitron']">Achievements</h4>
                    <p className="text-purple-300 text-sm font-['Orbitron']">Unlock rewards for milestones</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invite" className="space-y-4">
            <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-purple-300 font-['Orbitron']">Invite Friends</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-purple-400 hover:text-purple-200"
                >
                  <HelpCircle className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-purple-300 font-['Orbitron']">Your Invite Code</Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      value={inviteCode} 
                      readOnly 
                      className="bg-black/20 border-purple-500/30 text-purple-200 font-['Orbitron']"
                    />
                    <Button 
                      onClick={copyInviteCode}
                      variant="outline"
                      className="border-purple-500 text-purple-300 hover:bg-purple-500/20"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-purple-900/30 p-4 rounded-lg">
                  <h4 className="text-purple-200 font-bold mb-2 font-['Orbitron']">Reward Structure</h4>
                  <div className="space-y-2 text-sm font-['Orbitron']">
                    <div className="flex justify-between text-purple-300">
                      <span>1-5 invites:</span>
                      <span className="text-green-400 font-bold">3 USDT each</span>
                    </div>
                    <div className="flex justify-between text-purple-300">
                      <span>6-20 invites:</span>
                      <span className="text-green-400 font-bold">1 USDT each</span>
                    </div>
                    <div className="flex justify-between text-purple-300">
                      <span>20+ invites:</span>
                      <span className="text-green-400 font-bold">0.5 USDT each</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-purple-400 text-sm font-['Orbitron']">
                    Total Invites: 0 • Total Earned: 0 USDT
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300 font-['Orbitron']">Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={profileImage} />
                    <AvatarFallback className="bg-purple-600 text-white font-['Orbitron']">
                      <User className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button 
                      variant="outline"
                      className="border-purple-500 text-purple-300 hover:bg-purple-500/20 font-['Orbitron']"
                    >
                      Change Photo
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-purple-300 font-['Orbitron']">User ID</Label>
                  <Input 
                    value={userData.email} 
                    readOnly 
                    className="bg-black/20 border-purple-500/30 text-purple-200 font-['Orbitron']"
                  />
                </div>

                <div>
                  <Label className="text-purple-300 font-['Orbitron']">Email</Label>
                  <Input 
                    value={userData.email} 
                    readOnly 
                    className="bg-black/20 border-purple-500/30 text-purple-200 font-['Orbitron']"
                  />
                </div>

                <div className="pt-4 border-t border-purple-500/30">
                  <Button 
                    onClick={onLogout}
                    variant="destructive"
                    className="w-full font-['Orbitron']"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
