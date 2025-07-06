
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserData, Screen } from "@/pages/Index";
import { ArrowDownLeft, ArrowUpRight, Clock } from "lucide-react";

interface WalletScreenProps {
  userData: UserData;
  onNavigate: (screen: Screen) => void;
}

// Örnek transfer geçmişi verileri
const transactionHistory = [
  {
    id: 1,
    type: "incoming" as const,
    amount: 150.50,
    currency: "WHA",
    from: "System Reward",
    date: "2024-01-15",
    time: "14:30",
    status: "completed"
  },
  {
    id: 2,
    type: "outgoing" as const,
    amount: 50.00,
    currency: "USDT",
    to: "External Wallet",
    date: "2024-01-14",
    time: "09:15",
    status: "completed"
  },
  {
    id: 3,
    type: "incoming" as const,
    amount: 75.25,
    currency: "WHA",
    from: "Ad Rewards",
    date: "2024-01-13",
    time: "16:45",
    status: "completed"
  },
  {
    id: 4,
    type: "pending" as const,
    amount: 100.00,
    currency: "USDT",
    to: "Bank Account",
    date: "2024-01-12",
    time: "11:20",
    status: "pending"
  }
];

export const WalletScreen = ({ userData, onNavigate }: WalletScreenProps) => {
  const usdtValue = userData.whaBalance * 0.0000020;
  const canWithdraw = usdtValue >= 100;

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 text-white">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-['Orbitron']">
            Walverha Wallet
          </h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onNavigate("home")}
            className="border-purple-500 text-purple-300 hover:bg-purple-500/20"
          >
            Back
          </Button>
        </div>

        {/* Top Row - Wallet Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Wallet ID */}
          <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300 font-['Orbitron']">Wallet ID</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 font-mono text-sm bg-black/20 p-3 rounded border">
                ABCD123456789
              </p>
            </CardContent>
          </Card>

          {/* Balance */}
          <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300 font-['Orbitron']">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-white font-['Orbitron']">
                  {userData.whaBalance.toFixed(0)} WHA
                </p>
                <p className="text-xl text-purple-300 font-['Orbitron']">
                  ≈ ${usdtValue.toFixed(2)} USDT
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Withdrawal Section */}
        <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30 mb-8">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-purple-300 mb-2 font-['Orbitron']">Minimum Withdrawal</p>
              <p className="text-3xl font-bold text-red-400 font-['Orbitron'] mb-4">
                $100.00 USDT
              </p>
              {!canWithdraw && (
                <p className="text-red-400 text-sm mb-4 font-['Orbitron']">
                  You need ${(100 - usdtValue).toFixed(2)} more to withdraw
                </p>
              )}
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-600 font-['Orbitron']"
                disabled={!canWithdraw}
              >
                {canWithdraw ? "Withdraw to USDT" : "Insufficient Balance"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300 text-2xl font-['Orbitron'] flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Transfer History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-purple-500/30">
                    <TableHead className="text-purple-300 font-['Orbitron']">Type</TableHead>
                    <TableHead className="text-purple-300 font-['Orbitron']">Amount</TableHead>
                    <TableHead className="text-purple-300 font-['Orbitron']">From/To</TableHead>
                    <TableHead className="text-purple-300 font-['Orbitron']">Date</TableHead>
                    <TableHead className="text-purple-300 font-['Orbitron']">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionHistory.map((transaction) => (
                    <TableRow key={transaction.id} className="border-purple-500/20 hover:bg-purple-500/10">
                      <TableCell className="text-white">
                        <div className="flex items-center gap-2">
                          {transaction.type === "incoming" ? (
                            <ArrowDownLeft className="w-4 h-4 text-green-400" />
                          ) : transaction.type === "outgoing" ? (
                            <ArrowUpRight className="w-4 h-4 text-red-400" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-400" />
                          )}
                          <span className="font-['Orbitron'] text-sm">
                            {transaction.type === "incoming" ? "Incoming" : 
                             transaction.type === "outgoing" ? "Outgoing" : "Pending"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-white font-['Orbitron']">
                        <span className={`font-bold ${
                          transaction.type === "incoming" ? "text-green-400" : 
                          transaction.type === "outgoing" ? "text-red-400" : "text-yellow-400"
                        }`}>
                          {transaction.type === "incoming" ? "+" : transaction.type === "outgoing" ? "-" : ""}
                          {transaction.amount} {transaction.currency}
                        </span>
                      </TableCell>
                      <TableCell className="text-purple-200 font-['Orbitron'] text-sm">
                        {transaction.from || transaction.to}
                      </TableCell>
                      <TableCell className="text-purple-200 font-['Orbitron'] text-sm">
                        <div>
                          <div>{transaction.date}</div>
                          <div className="text-xs text-purple-400">{transaction.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold font-['Orbitron'] ${
                          transaction.status === "completed" 
                            ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        }`}>
                          {transaction.status === "completed" ? "Completed" : "Pending"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Earning Tips */}
        <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-lg border-purple-500/30 mt-6">
          <CardHeader>
            <CardTitle className="text-purple-300 text-xl font-['Orbitron']">Earning Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-purple-200 text-sm space-y-2 font-['Orbitron']">
              <li>• Tap the Walverha logo to earn WHA coins</li>
              <li>• Watch ads to increase your multiplier</li>
              <li>• Enable offline earning to earn while away</li>
              <li>• Higher multipliers = faster earning</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
