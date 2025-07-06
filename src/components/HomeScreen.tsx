
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserData, Screen } from "@/pages/Index";
import { LogOut, Wallet, Play, Zap } from "lucide-react";
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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
            <CardContent className="p-4 text-center">
              <p className="text-purple-300 text-sm font-['Orbitron']">Balance</p>
              <p className="text-2xl font-bold text-white font-['Orbitron']">{userData.whaBalance.toFixed(0)}</p>
              <p className="text-purple-400 text-xs font-['Orbitron']">WHA</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
            <CardContent className="p-4 text-center">
              <p className="text-purple-300 text-sm font-['Orbitron']">Multiplier</p>
              <p className="text-2xl font-bold text-white font-['Orbitron']">{userData.currentMultiplier.toFixed(2)}x</p>
              <p className="text-purple-400 text-xs font-['Orbitron']">Active</p>
            </CardContent>
          </Card>
        </div>

        {/* Tap Logo */}
        <div className="flex justify-center mb-8">
          <div 
            className={`relative cursor-pointer transition-transform duration-300 ${
              tapAnimation ? 'transform scale-95' : 'hover:scale-105'
            }`}
            onClick={handleTap}
          >
            <img 
              src="/lovable-uploads/5edcf466-9ce8-4535-be1a-f67af6fcdcd9.png" 
              alt="Walverha Logo"
              className="w-48 h-48 rounded-full shadow-2xl border-4 border-purple-500/50 hover:border-purple-400/70 transition-all duration-300"
            />
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
        <div className="space-y-4 mb-6">
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
              <p className="text-white font-['Orbitron']">
                {userData.offlineHoursAvailable > 0 
                  ? `${userData.offlineHoursAvailable.toFixed(1)} hours remaining`
                  : "Not active"
                }
              </p>
              <p className="text-purple-400 text-sm font-['Orbitron']">
                Ads watched: {userData.adsWatchedOffline}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300 text-lg font-['Orbitron']">Multiplier Boost</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white font-['Orbitron']">
                Current: {userData.currentMultiplier.toFixed(2)}x
              </p>
              <p className="text-purple-400 text-sm font-['Orbitron']">
                Ads watched: {userData.adsWatchedMultiplier}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
