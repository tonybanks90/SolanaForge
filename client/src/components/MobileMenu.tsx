import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Search, RefreshCw, Table, Grid3X3, ChevronDown, Moon, Sun, Languages, Palette } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import type { TokenFilters } from '@/types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  filters: TokenFilters;
  onFiltersChange: (filters: TokenFilters) => void;
  onRefresh: () => void;
  autoRefresh: boolean;
  onAutoRefreshToggle: () => void;
  viewMode: 'table' | 'cards';
  onViewModeChange: (mode: 'table' | 'cards') => void;
}

export default function MobileMenu({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  onRefresh,
  autoRefresh,
  onAutoRefreshToggle,
  viewMode,
  onViewModeChange
}: MobileMenuProps) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  const handleFilterChange = (key: keyof TokenFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    onFiltersChange({});
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-primary">GMGN.AI</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          {/* Mobile Controls */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Controls
            </h3>
            
            {/* View Mode Toggle */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">View Mode</Label>
              <div className="flex bg-card rounded-lg p-1">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewModeChange('table')}
                  className="flex-1"
                >
                  <Table className="w-4 h-4 mr-2" />
                  Table
                </Button>
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewModeChange('cards')}
                  className="flex-1"
                >
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  Cards
                </Button>
              </div>
            </div>

            {/* Auto-refresh Toggle */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Auto Refresh</Label>
              <Button
                variant={autoRefresh ? 'default' : 'outline'}
                size="sm"
                onClick={onAutoRefreshToggle}
                className="w-full"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
                {autoRefresh ? 'Auto ON' : 'Auto OFF'}
              </Button>
            </div>

            {/* Manual Refresh */}
            <Button variant="outline" size="sm" onClick={onRefresh} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Now
            </Button>

            {/* Language Toggle */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Language</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-between">
                    <div className="flex items-center">
                      <Languages className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'English' : '中文'}
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem onClick={() => setLanguage('en')}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('zh')}>
                    中文
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Theme Toggle */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Theme</Label>
              <Button variant="outline" size="sm" onClick={toggleTheme} className="w-full justify-start">
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 mr-2" />
                    Switch to Light
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 mr-2" />
                    Switch to Dark
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Navigation
            </h3>
            <Link href="/" className={location === "/" ? "block py-2 text-primary font-medium" : "block py-2 text-muted-foreground hover:text-primary transition-colors"}>
              {t('nav.allTokens')}
            </Link>
            <a href="#" className="block py-2 text-muted-foreground hover:text-primary transition-colors">
              {t('nav.trenches')}
            </a>
            <a href="#" className="block py-2 text-muted-foreground hover:text-primary transition-colors">
              {t('nav.copyTrade')}
            </a>
            <Link href="/portfolio" className={location === "/portfolio" ? "block py-2 text-primary font-medium" : "block py-2 text-muted-foreground hover:text-primary transition-colors"}>
              {t('nav.portfolio')}
            </Link>
          </nav>

          {/* Search */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Search
            </h3>
            <div className="relative">
              <Input
                type="text"
                placeholder={t('search.placeholder')}
                value={filters.search || ''}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {t('filters.title')}
            </h3>
            
            {/* Platform Filter */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">{t('filters.platform')}</Label>
              <Select
                value={filters.platform || 'all'}
                onValueChange={(value) => handleFilterChange('platform', value === 'all' ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All platforms</SelectItem>
                  <SelectItem value="pump.fun">Pump.fun</SelectItem>
                  <SelectItem value="raydium">Raydium</SelectItem>
                  <SelectItem value="meteora">Meteora</SelectItem>
                  <SelectItem value="orca">Orca</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Market Cap Filter */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">{t('filters.marketCap')}</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minMarketCap || ''}
                  onChange={(e) => handleFilterChange('minMarketCap', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxMarketCap || ''}
                  onChange={(e) => handleFilterChange('maxMarketCap', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
            </div>

            {/* Age Filter */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">{t('filters.tokenAge')}</Label>
              <Select
                value={filters.maxAge?.toString() || 'all'}
                onValueChange={(value) => handleFilterChange('maxAge', value === 'all' ? undefined : parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All ages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ages</SelectItem>
                  <SelectItem value="60">Last 1 hour</SelectItem>
                  <SelectItem value="1440">Last 24 hours</SelectItem>
                  <SelectItem value="10080">Last week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Safety Checks */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">{t('filters.safety')}</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mobile-safetyCheck"
                    checked={filters.safetyCheck || false}
                    onCheckedChange={(checked) => handleFilterChange('safetyCheck', checked)}
                  />
                  <Label htmlFor="mobile-safetyCheck" className="text-sm">
                    Only safe tokens (7+ safety score)
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Apply Filters */}
          <div className="flex space-x-2">
            <Button onClick={onClose} className="flex-1">
              {t('filters.apply')}
            </Button>
            <Button variant="outline" onClick={resetFilters}>
              {t('filters.reset')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
