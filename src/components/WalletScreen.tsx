
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserData, Screen } from "@/pages/Index";
import { ArrowLeft, Send, Download, Clock, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { toast } from "sonner";

interface WalletScreenProps {
  userData: UserData;
  onNavigate: (screen: Screen) => void;
  isDarkTheme: boolean;
}

interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  currency: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

export const WalletScreen = ({ userData, onNavigate, isDarkTheme }: WalletScreenProps) => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  // Mock transaction history
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "incoming",
      amount: 50,
      currency: "WHA",
      date: new Date(Date.now() - 86400000),
      status: "completed",
      description: "Ad Reward"
    },
    {
      id: "2",
      type: "outgoing",
      amount: 100,
      currency: "USDT",
      date: new Date(Date.now() - 172800000),
      status: "completed",
      description: "Withdrawal to Wallet"
    },
    {
      id: "3",
      type: "incoming",
      amount: 25,
      currency: "WHA",
      date: new Date(Date.now() - 259200000),
      status: "completed",
      description: "Tap Rewards"
    }
  ];

  const handleWithdraw = () => {
    if (!withdrawAmount || !walletAddress) {
      toast("Please fill in all fields");
      return;
    }

    if (parseFloat(withdrawAmount) < 10) {
      toast("Minimum withdrawal amount is 10 USDT");
      return;
    }

    toast("Withdrawal request submitted! Processing time: 24-48 hours");
    setWithdrawAmount("");
    setWalletAddress("");
  };

  const textColors = isDarkTheme 
    ? { primary: "text-purple-200", secondary: "text-purple-300", accent: "text-purple-400", white: "text-white" }
    : { primary: "text-purple-800", secondary: "text-purple-700", accent: "text-purple-600", white: "text-purple-900" };

  const cardColors = isDarkTheme
    ? "bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30"
    : "bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-lg border-purple-300/50";

  const inputColors = isDarkTheme
    ? "bg-black/20 border-purple-500/30 text-purple-200 placeholder:text-purple-400"
    : "bg-white/50 border-purple-300/50 text-purple-800 placeholder:text-purple-500";

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className={`flex items-center gap-4 mb-6 ${textColors.white}`}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate("home")}
            className={`${isDarkTheme ? 'text-purple-300 hover:text-purple-200 hover:bg-purple-500/20' : 'text-purple-600 hover:text-purple-700 hover:bg-purple-100'}`}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-['Orbitron']">
            Wallet
          </h1>
        </div>

        <Tabs defaultValue="balance" className="w-full">
          <TabsList className={`grid w-full grid-cols-3 ${isDarkTheme ? 'bg-purple-800/50' : 'bg-purple-200/50'} mb-6`}>
            <TabsTrigger value="balance" className={`${textColors.secondary} ${isDarkTheme ? 'data-[state=active]:bg-purple-600 data-[state=active]:text-white' : 'data-[state=active]:bg-purple-500 data-[state=active]:text-white'} font-['Orbitron'] text-xs`}>
              Balance
            </TabsTrigger>
            <TabsTrigger value="withdraw" className={`${textColors.secondary} ${isDarkTheme ? 'data-[state=active]:bg-purple-600 data-[state=active]:text-white' : 'data-[state=active]:bg-purple-500 data-[state=active]:text-white'} font-['Orbitron'] text-xs`}>
              Withdraw
            </TabsTrigger>
            <TabsTrigger value="history" className={`${textColors.secondary} ${isDarkTheme ? 'data-[state=active]:bg-purple-600 data-[state=active]:text-white' : 'data-[state=active]:bg-purple-500 data-[state=active]:text-white'} font-['Orbitron'] text-xs`}>
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="balance" className="space-y-6">
            {/* Balance Cards */}
            <div className="space-y-4">
              <Card className={cardColors}>
                <CardContent className="p-6 text-center">
                  <p className={`${textColors.secondary} text-sm font-['Orbitron']`}>WHA Balance</p>
                  <p className={`text-3xl font-bold ${textColors.primary} font-['Orbitron']`}>{userData.whaBalance.toFixed(2)}</p>
                  <p className={`${textColors.accent} text-sm font-['Orbitron'] mt-2`}>
                    ≈ ${(userData.whaBalance * 0.001).toFixed(3)} USDT
                  </p>
                </CardContent>
              </Card>

              <Card className={cardColors}>
                <CardContent className="p-6 text-center">
                  <p className={`${textColors.secondary} text-sm font-['Orbitron']`}>Available for Withdrawal</p>
                  <p className={`text-2xl font-bold text-green-400 font-['Orbitron']`}>
                    ${(userData.whaBalance * 0.001).toFixed(3)} USDT
                  </p>
                  <p className={`${textColors.accent} text-sm font-['Orbitron'] mt-2`}>
                    Minimum: $10 USDT
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className={cardColors}>
                <CardContent className="p-4 text-center">
                  <p className={`${textColors.secondary} text-sm font-['Orbitron']`}>Total Earned</p>
                  <p className={`text-lg font-bold ${textColors.primary} font-['Orbitron']`}>{userData.whaBalance.toFixed(0)} WHA</p>
                </CardContent>
              </Card>
              
              <Card className={cardColors}>
                <CardContent className="p-4 text-center">
                  <p className={`${textColors.secondary} text-sm font-['Orbitron']`}>Multiplier</p>
                  <p className={`text-lg font-bold ${textColors.primary} font-['Orbitron']`}>{userData.currentMultiplier.toFixed(2)}x</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-6">
            <Card className={cardColors}>
              <CardHeader>
                <CardTitle className={`${textColors.secondary} font-['Orbitron']`}>Withdraw USDT</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount" className={`${textColors.secondary} font-['Orbitron']`}>
                    Amount (USDT)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter amount (min. 10 USDT)"
                    className={`${inputColors} font-['Orbitron']`}
                  />
                </div>

                <div>
                  <Label htmlFor="address" className={`${textColors.secondary} font-['Orbitron']`}>
                    USDT Wallet Address
                  </Label>
                  <Input
                    id="address"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Enter your USDT wallet address"
                    className={`${inputColors} font-['Orbitron']`}
                  />
                </div>

                <div className={`${isDarkTheme ? 'bg-purple-900/30' : 'bg-purple-100/50'} p-4 rounded-lg`}>
                  <h4 className={`${textColors.primary} font-bold mb-2 font-['Orbitron']`}>Withdrawal Info</h4>
                  <ul className={`text-sm space-y-1 ${textColors.secondary} font-['Orbitron']`}>
                    <li>• Minimum withdrawal: 10 USDT</li>
                    <li>• Processing time: 24-48 hours</li>
                    <li>• Network fee: 1 USDT</li>
                    <li>• Daily limit: 1000 USDT</li>
                  </ul>
                </div>

                <Button 
                  onClick={handleWithdraw}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-['Orbitron']"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Withdraw USDT
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className={cardColors}>
              <CardHeader>
                <CardTitle className={`${textColors.secondary} font-['Orbitron']`}>Transfer History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className={`flex items-center justify-between p-3 rounded-lg ${isDarkTheme ? 'bg-purple-900/20' : 'bg-purple-100/30'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.type === 'incoming' 
                            ? 'bg-green-500/20' 
                            : 'bg-red-500/20'
                        }`}>
                          {transaction.type === 'incoming' ? (
                            <ArrowDownLeft className="w-4 h-4 text-green-400" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className={`font-medium ${textColors.primary} font-['Orbitron']`}>
                            {transaction.description}
                          </p>
                          <p className={`text-sm ${textColors.accent} font-['Orbitron']`}>
                            {transaction.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          transaction.type === 'incoming' ? 'text-green-400' : 'text-red-400'
                        } font-['Orbitron']`}>
                          {transaction.type === 'incoming' ? '+' : '-'}{transaction.amount} {transaction.currency}
                        </p>
                        <div className="flex items-center gap-1">
                          {transaction.status === 'completed' && (
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          )}
                          {transaction.status === 'pending' && (
                            <Clock className="w-3 h-3 text-yellow-400" />
                          )}
                          <p className={`text-xs ${textColors.accent} font-['Orbitron']`}>
                            {transaction.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
