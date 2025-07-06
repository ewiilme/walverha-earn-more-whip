
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserData, Screen } from "@/pages/Index";

interface WalletScreenProps {
  userData: UserData;
  onNavigate: (screen: Screen) => void;
}

export const WalletScreen = ({ userData, onNavigate }: WalletScreenProps) => {
  const usdtValue = userData.whaBalance * 0.0000020; // Conversion rate
  const canWithdraw = usdtValue >= 100;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 text-white">
          <h1 className="text-2xl font-bold">Wallet</h1>
          <Button variant="outline" size="sm" onClick={() => onNavigate("home")}>
            Back
          </Button>
        </div>

        {/* Wallet ID */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Wallet ID</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 font-mono text-sm">
              ABCD123456789
            </p>
          </CardContent>
        </Card>

        {/* Balance */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-white">
                {userData.whaBalance.toFixed(0)} WHA
              </p>
              <p className="text-lg text-white/80">
                ≈ ${usdtValue.toFixed(2)} USDT
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal Info */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-white/80 mb-2">Minimum Withdrawal</p>
              <p className="text-2xl font-bold text-red-400">
                $100.00 USDT
              </p>
              {!canWithdraw && (
                <p className="text-red-400 text-sm mt-2">
                  You need ${(100 - usdtValue).toFixed(2)} more to withdraw
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal Button */}
        <Button 
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600"
          disabled={!canWithdraw}
        >
          {canWithdraw ? "Withdraw to USDT" : "Insufficient Balance"}
        </Button>

        {/* Earning Tips */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mt-6">
          <CardHeader>
            <CardTitle className="text-white text-lg">Earning Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-white/80 text-sm space-y-2">
              <li>• Tap the logo to earn WHA coins</li>
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
