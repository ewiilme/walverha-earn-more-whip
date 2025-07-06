
import { useState, useEffect } from "react";
import { AuthScreen } from "@/components/AuthScreen";
import { HomeScreen } from "@/components/HomeScreen";
import { WalletScreen } from "@/components/WalletScreen";
import { toast } from "sonner";

export type Screen = "auth" | "home" | "wallet";

export interface UserData {
  email: string;
  whaBalance: number;
  currentMultiplier: number;
  offlineHoursAvailable: number;
  adsWatchedMultiplier: number;
  adsWatchedOffline: number;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("auth");
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("walverha_user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserData(user);
      setCurrentScreen("home");
    }
  }, []);

  const handleLogin = (email: string) => {
    const newUserData: UserData = {
      email,
      whaBalance: 0,
      currentMultiplier: 1.0,
      offlineHoursAvailable: 0,
      adsWatchedMultiplier: 0,
      adsWatchedOffline: 0
    };
    
    // Load existing data if available
    const savedData = localStorage.getItem(`walverha_${email}`);
    if (savedData) {
      const existingData = JSON.parse(savedData);
      Object.assign(newUserData, existingData);
    }
    
    setUserData(newUserData);
    localStorage.setItem("walverha_user", JSON.stringify(newUserData));
    setCurrentScreen("home");
    toast("Welcome to Walverha!");
  };

  const handleLogout = () => {
    localStorage.removeItem("walverha_user");
    setUserData(null);
    setCurrentScreen("auth");
    toast("Logged out successfully");
  };

  const updateUserData = (updates: Partial<UserData>) => {
    if (!userData) return;
    
    const updatedData = { ...userData, ...updates };
    setUserData(updatedData);
    localStorage.setItem("walverha_user", JSON.stringify(updatedData));
    localStorage.setItem(`walverha_${userData.email}`, JSON.stringify(updatedData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
      {currentScreen === "auth" && (
        <AuthScreen onLogin={handleLogin} />
      )}
      {currentScreen === "home" && userData && (
        <HomeScreen 
          userData={userData}
          onUpdateUserData={updateUserData}
          onNavigate={setCurrentScreen}
          onLogout={handleLogout}
        />
      )}
      {currentScreen === "wallet" && userData && (
        <WalletScreen 
          userData={userData}
          onNavigate={setCurrentScreen}
        />
      )}
    </div>
  );
};

export default Index;
