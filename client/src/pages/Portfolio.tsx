import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Download, 
  Upload, 
  Copy, 
  MoreHorizontal, 
  ChevronDown,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import Header from "@/components/Header";
import BottomMobileNav from "@/components/BottomMobileNav";
import MobileMenu from "@/components/MobileMenu";
import { useTheme } from "@/contexts/ThemeContext";

interface Wallet {
  id: string;
  name: string;
  address: string;
  balance: number;
  type: 'trading' | 'withdrawal';
  isVisible: boolean;
}

export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const { theme } = useTheme();
  
  const [tradingWallets, setTradingWallets] = useState<Wallet[]>([
    {
      id: '1',
      name: 'Starting Solana Wallet',
      address: 'bCNn_ZaXc',
      balance: 1.32,
      type: 'trading',
      isVisible: true
    },
    {
      id: '2',
      name: 'Banks',
      address: 'bbTRn_Wnzp',
      balance: 30.00,
      type: 'trading',
      isVisible: true
    }
  ]);

  const [withdrawalWallets, setWithdrawalWallets] = useState<Wallet[]>([
    {
      id: '3',
      name: 'Pha',
      address: 'CmFVe_6cFg',
      balance: 0,
      type: 'withdrawal',
      isVisible: true
    }
  ]);

  const [archivedWallets, setArchivedWallets] = useState<Wallet[]>([]);

  const toggleWalletVisibility = (walletId: string, type: 'trading' | 'withdrawal') => {
    if (type === 'trading') {
      setTradingWallets(prev => prev.map(wallet => 
        wallet.id === walletId ? { ...wallet, isVisible: !wallet.isVisible } : wallet
      ));
    } else {
      setWithdrawalWallets(prev => prev.map(wallet => 
        wallet.id === walletId ? { ...wallet, isVisible: !wallet.isVisible } : wallet
      ));
    }
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  const WalletCard = ({ wallet, onToggleVisibility }: { wallet: Wallet; onToggleVisibility: () => void }) => (
    <Card className="border-border bg-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-foreground font-medium">{wallet.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyAddress(wallet.address)}
                className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-muted-foreground text-sm">{wallet.address}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">
                ${wallet.balance.toFixed(2)}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {wallet.type === 'trading' && (
              <>
                <Button variant="outline" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground border-primary">
                  <Upload className="h-4 w-4 mr-1" />
                  Withdraw
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Deposit
                </Button>
              </>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onToggleVisibility}>
                  {wallet.isVisible ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {wallet.isVisible ? 'Hide' : 'Show'}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Archive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
        onRefresh={() => {}}
        autoRefresh={autoRefresh}
        onAutoRefreshToggle={() => setAutoRefresh(!autoRefresh)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        filters={{}}
        onFiltersChange={() => {}}
        onRefresh={() => {}}
        autoRefresh={autoRefresh}
        onAutoRefreshToggle={() => setAutoRefresh(!autoRefresh)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <div className="container mx-auto px-4 py-6 max-w-7xl pb-20 md:pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                Portfolio
              </Badge>
              <Badge variant="secondary">
                Wallets
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Solana (2)
            </Badge>
            <span className="text-foreground font-medium">$1.32</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trading Wallets */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                Trading Wallets
                <Badge variant="secondary">
                  {tradingWallets.length}
                </Badge>
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground border-primary">
                  <Plus className="h-4 w-4 mr-1" />
                  Create
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Import
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              {tradingWallets.map((wallet) => (
                <WalletCard 
                  key={wallet.id} 
                  wallet={wallet} 
                  onToggleVisibility={() => toggleWalletVisibility(wallet.id, 'trading')}
                />
              ))}
            </div>
          </div>

          {/* Withdrawal Wallets */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                Withdrawal Wallets
                <Badge variant="secondary">
                  {withdrawalWallets.length}
                </Badge>
              </h2>
              <Button variant="outline" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground border-primary">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            
            <div className="space-y-3">
              {withdrawalWallets.map((wallet) => (
                <WalletCard 
                  key={wallet.id} 
                  wallet={wallet} 
                  onToggleVisibility={() => toggleWalletVisibility(wallet.id, 'withdrawal')}
                />
              ))}
            </div>
          </div>

          {/* Archived Wallets */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                Archived wallets
                <Badge variant="secondary">
                  {archivedWallets.length}
                </Badge>
              </h2>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            
            {archivedWallets.length === 0 ? (
              <Card className="border-dashed border-border bg-card/50">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No archived wallets</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {archivedWallets.map((wallet) => (
                  <WalletCard 
                    key={wallet.id} 
                    wallet={wallet} 
                    onToggleVisibility={() => {}}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <BottomMobileNav onMenuToggle={() => setIsMobileMenuOpen(true)} />
    </div>
  );
}