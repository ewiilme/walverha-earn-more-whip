
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { UserData, Screen } from "@/pages/Index";

interface HomeScreenProps {
  userData: UserData;
  onUpdateUserData: (updates: Partial<UserData>) => void;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export const HomeScreen = ({ userData, onUpdateUserData, onNavigate, onLogout }: HomeScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Simulate offline earnings
  useEffect(() => {
    const interval = setInterval(() => {
      if (userData.offlineHoursAvailable > 0) {
        const offlineEarning = userData.currentMultiplier * 0.1; // Earn every minute
        onUpdateUserData({
          whaBalance: userData.whaBalance + offlineEarning,
          offlineHoursAvailable: Math.max(0, userData.offlineHoursAvailable - (1/60)) // Decrease by 1 minute
        });
      }
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [userData, onUpdateUserData]);

  const handleLogoClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
    
    const earned = 1 * userData.currentMultiplier;
    onUpdateUserData({
      whaBalance: userData.whaBalance + earned
    });
    
    toast(`+${earned.toFixed(2)} WHA earned!`);
  };

  const handleOfflineAd = () => {
    // Simulate watching ad
    setTimeout(() => {
      const newHours = Math.min(24, userData.offlineHoursAvailable + 6);
      onUpdateUserData({
        offlineHoursAvailable: newHours,
        adsWatchedOffline: userData.adsWatchedOffline + 1
      });
      toast(`+6 hours offline earning! Total: ${newHours}h`);
    }, 2000);
    toast("Watching ad...");
  };

  const handleMultiplierAd = () => {
    // Simulate watching ad
    setTimeout(() => {
      const newCount = userData.adsWatchedMultiplier + 1;
      const newMultiplier = calculateMultiplier(newCount);
      onUpdateUserData({
        adsWatchedMultiplier: newCount,
        currentMultiplier: newMultiplier
      });
      toast(`Multiplier increased to ${newMultiplier.toFixed(2)}x!`);
    }, 2000);
    toast("Watching ad...");
  };

  const calculateMultiplier = (count: number): number => {
    if (count <= 1) return 1.0;
    if (count === 2) return 1.1;
    if (count === 3) return 1.3;
    if (count <= 40) return 1.3 + (count - 3) * 0.05;
    return 3.0;
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 text-white">
          <h1 className="text-2xl font-bold">Walverha</h1>
          <Button variant="outline" size="sm" onClick={onLogout}>
            Logout
          </Button>
        </div>

        {/* Balance Card */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
          <CardContent className="p-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              {userData.whaBalance.toFixed(2)} WHA
            </h2>
            <p className="text-white/80">
              Multiplier: {userData.currentMultiplier.toFixed(2)}x
            </p>
            {userData.offlineHoursAvailable > 0 && (
              <p className="text-green-400 text-sm mt-2">
                Offline earning: {userData.offlineHoursAvailable.toFixed(1)}h remaining
              </p>
            )}
          </CardContent>
        </Card>

        {/* Logo Click Area */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
          <CardContent className="p-6">
            <div 
              className={`w-48 h-48 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 ${
                isAnimating ? 'scale-90' : 'scale-100 hover:scale-105'
              }`}
              onClick={handleLogoClick}
            >
              <span className="text-4xl font-bold text-white">W</span>
            </div>
            <p className="text-center text-white/80 mt-4">
              Tap to earn WHA!
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleOfflineAd}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            Watch Ad (+6h Offline Earning)
          </Button>
          
          <Button 
            onClick={handleMultiplierAd}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          >
            Watch Ad (Increase Multiplier)
          </Button>
          
          <Button 
            onClick={() => onNavigate("wallet")}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Go to Wallet
          </Button>
        </div>

        {/* Stats */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mt-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 text-center text-white/80">
              <div>
                <p className="text-sm">Offline Ads</p>
                <p className="font-bold">{userData.adsWatchedOffline}</p>
              </div>
              <div>
                <p className="text-sm">Multiplier Ads</p>
                <p className="font-bold">{userData.adsWatchedMultiplier}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
