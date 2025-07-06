
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
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("walverha_user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserData(user);
      setCurrentScreen("home");
    }

    // Load theme preference
    const savedTheme = localStorage.getItem("walverha_theme");
    if (savedTheme === "dark") {
      setIsDarkTheme(true);
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

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem("walverha_theme", newTheme ? "dark" : "light");
  };

  const themeClasses = isDarkTheme 
    ? "bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900" 
    : "bg-gradient-to-br from-purple-100 via-indigo-100 to-slate-100";

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      {currentScreen === "auth" && (
        <AuthScreen onLogin={handleLogin} isDarkTheme={isDarkTheme} />
      )}
      {currentScreen === "home" && userData && (
        <HomeScreen 
          userData={userData}
          onUpdateUserData={updateUserData}
          onNavigate={setCurrentScreen}
          onLogout={handleLogout}
          isDarkTheme={isDarkTheme}
          onToggleTheme={toggleTheme}
        />
      )}
      {currentScreen === "wallet" && userData && (
        <WalletScreen 
          userData={userData}
          onNavigate={setCurrentScreen}
          isDarkTheme={isDarkTheme}
        />
      )}
    </div>
  );
};

export default Index;
