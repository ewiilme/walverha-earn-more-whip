import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserData, Screen } from "@/pages/Index";
import { toast } from "sonner";

interface WalletScreenProps {
  userData: UserData;
  onNavigate: (screen: Screen) => void;
}

interface Transaction {
  type: 'incoming' | 'outgoing';
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  address?: string;
}

export const WalletScreen = ({ userData, onNavigate }: WalletScreenProps) => {
  const [usdtAddress, setUsdtAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      type: 'incoming',
      amount: 5000,
      date: '2024-08-15 14:30',
      status: 'completed'
    },
    {
      type: 'outgoing',
      amount: 1500,
      date: '2024-08-14 09:15',
      status: 'completed',
      address: '0x123...ABC'
    },
    {
      type: 'incoming',
      amount: 2000,
      date: '2024-08-13 18:00',
      status: 'pending'
    }
  ]);

  const handleWithdraw = () => {
    if (withdrawAmount < 1000) {
      toast("Minimum withdrawal amount is 1000 WHA");
      return;
    }
    if (withdrawAmount > userData.whaBalance) {
      toast("You don't have enough WHA to withdraw");
      return;
    }
    if (!usdtAddress) {
      toast("Please enter your USDT wallet address");
      return;
    }

    // Simulate withdrawal
    toast("Withdrawal request submitted");
    const newTransaction: Transaction = {
      type: 'outgoing',
      amount: withdrawAmount,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'pending',
      address: usdtAddress
    };
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={() => onNavigate("home")}
            className="border-purple-500 text-purple-300 hover:bg-purple-500/20 font-['Orbitron']"
          >
            ← Back
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-['Orbitron']">
            Wallet
          </h1>
          <div></div>
        </div>

        <Tabs defaultValue="balance" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-purple-800/50 mb-6">
            <TabsTrigger value="balance" className="text-purple-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-['Orbitron']">
              Balance
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="text-purple-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-['Orbitron']">
              Withdraw
            </TabsTrigger>
            <TabsTrigger value="history" className="text-purple-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-['Orbitron']">
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="balance" className="space-y-6">
            {/* Balance Card */}
            <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300 font-['Orbitron']">Your Balance</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <p className="text-4xl font-bold text-purple-200 font-['Orbitron']">{userData.whaBalance.toFixed(2)}</p>
                  <p className="text-purple-400 font-['Orbitron']">WHA Coins</p>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg">
                  <p className="text-purple-300 text-sm font-['Orbitron']">
                    USDT Equivalent: ${(userData.whaBalance * 0.001).toFixed(4)}
                  </p>
                  <p className="text-purple-400 text-xs font-['Orbitron'] mt-1">
                    Rate: 1000 WHA = 1 USDT
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
                <CardContent className="p-4 text-center">
                  <p className="text-purple-300 text-sm font-['Orbitron']">Total Earned</p>
                  <p className="text-xl font-bold text-purple-200 font-['Orbitron']">{userData.whaBalance.toFixed(0)}</p>
                  <p className="text-purple-400 text-xs font-['Orbitron']">WHA</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
                <CardContent className="p-4 text-center">
                  <p className="text-purple-300 text-sm font-['Orbitron']">Multiplier</p>
                  <p className="text-xl font-bold text-purple-200 font-['Orbitron']">{userData.currentMultiplier.toFixed(2)}x</p>
                  <p className="text-purple-400 text-xs font-['Orbitron']">Active</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300 font-['Orbitron']">Withdraw USDT</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-amber-900/30 border border-amber-500/30 p-4 rounded-lg">
                  <p className="text-amber-300 text-sm font-['Orbitron']">
                    ⚠️ Minimum withdrawal: 1000 WHA (1 USDT)
                  </p>
                </div>

                <div>
                  <Label htmlFor="usdt-address" className="text-purple-300 font-['Orbitron']">
                    USDT Wallet Address (TRC20)
                  </Label>
                  <Input
                    id="usdt-address"
                    value={usdtAddress}
                    onChange={(e) => setUsdtAddress(e.target.value)}
                    placeholder="Enter your USDT wallet address"
                    className="bg-black/20 border-purple-500/30 text-purple-200 placeholder:text-purple-400 font-['Orbitron']"
                  />
                </div>

                <div>
                  <Label htmlFor="amount" className="text-purple-300 font-['Orbitron']">
                    Amount (WHA)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    placeholder="Enter amount to withdraw"
                    max={userData.whaBalance}
                    className="bg-black/20 border-purple-500/30 text-purple-200 placeholder:text-purple-400 font-['Orbitron']"
                  />
                  <p className="text-purple-400 text-xs mt-1 font-['Orbitron']">
                    USDT Amount: ${(withdrawAmount * 0.001).toFixed(4)}
                  </p>
                </div>

                <Button 
                  onClick={handleWithdraw}
                  disabled={withdrawAmount < 1000 || withdrawAmount > userData.whaBalance || !usdtAddress}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 font-['Orbitron']"
                >
                  Withdraw USDT
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300 font-['Orbitron']">Transfer History</CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <p className="text-purple-400 text-center py-8 font-['Orbitron']">
                    No transactions yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {transactions.map((transaction, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-purple-900/30 rounded-lg border border-purple-500/20">
                        <div>
                          <p className="text-purple-200 font-semibold font-['Orbitron']">
                            {transaction.type === 'incoming' ? '+ Received' : '- Sent'}
                          </p>
                          <p className="text-purple-400 text-sm font-['Orbitron']">{transaction.date}</p>
                          {transaction.address && (
                            <p className="text-purple-400 text-xs font-['Orbitron']">
                              {transaction.address.slice(0, 8)}...{transaction.address.slice(-8)}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className={`font-bold font-['Orbitron'] ${
                            transaction.type === 'incoming' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {transaction.type === 'incoming' ? '+' : '-'}{transaction.amount} WHA
                          </p>
                          <p className="text-purple-400 text-sm font-['Orbitron']">
                            ${(transaction.amount * 0.001).toFixed(4)} USDT
                          </p>
                          <span className={`text-xs px-2 py-1 rounded font-['Orbitron'] ${
                            transaction.status === 'completed' 
                              ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                              : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
