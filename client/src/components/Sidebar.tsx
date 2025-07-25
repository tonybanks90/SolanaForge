import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Rocket, Flame, Star, Shield } from 'lucide-react';
import type { TokenFilters } from '@/types';

interface SidebarProps {
  filters: TokenFilters;
  onFiltersChange: (filters: TokenFilters) => void;
}

export default function Sidebar({ filters, onFiltersChange }: SidebarProps) {
  const { t } = useLanguage();
  const [localFilters, setLocalFilters] = useState<TokenFilters>(filters);

  const handleFilterChange = (key: keyof TokenFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
  };

  const resetFilters = () => {
    const emptyFilters: TokenFilters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  return (
    <aside className="w-80 bg-card border-r border-border h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="p-3 h-auto flex-col space-y-1"
              onClick={() => handleFilterChange('category', 'new')}
            >
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-xs">New</span>
            </Button>
            <Button
              variant="outline"
              className="p-3 h-auto flex-col space-y-1"
              onClick={() => handleFilterChange('category', 'trending')}
            >
              <Flame className="w-4 h-4 text-warning" />
              <span className="text-xs">Trending</span>
            </Button>
            <Button
              variant="outline"
              className="p-3 h-auto flex-col space-y-1"
            >
              <Star className="w-4 h-4 text-primary" />
              <span className="text-xs">Favorites</span>
            </Button>
            <Button
              variant="outline"
              className="p-3 h-auto flex-col space-y-1"
              onClick={() => handleFilterChange('safetyCheck', true)}
            >
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs">Safe</span>
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Search
          </h3>
          <div className="relative">
            <Input
              type="text"
              placeholder={t('search.placeholder')}
              value={localFilters.search || ''}
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
          
          {/* Chain Filter */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Chain</Label>
            <Select
              value={localFilters.chain || 'all'}
              onValueChange={(value) => handleFilterChange('chain', value === 'all' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All chains" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All chains</SelectItem>
                <SelectItem value="solana">Solana</SelectItem>
                <SelectItem value="bitcoin">Bitcoin</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Platform Filter */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">{t('filters.platform')}</Label>
            <Select
              value={localFilters.platform || 'all'}
              onValueChange={(value) => handleFilterChange('platform', value === 'all' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All platforms</SelectItem>
                <SelectItem value="pump.fun">Pump.fun (Solana)</SelectItem>
                <SelectItem value="raydium">Raydium (Solana)</SelectItem>
                <SelectItem value="meteora">Meteora (Solana)</SelectItem>
                <SelectItem value="odin.fun">Odin.fun (Bitcoin)</SelectItem>
                <SelectItem value="tychi.fun">Tychi.fun (Bitcoin)</SelectItem>
                <SelectItem value="uniswap">Uniswap (Ethereum)</SelectItem>
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
                value={localFilters.minMarketCap || ''}
                onChange={(e) => handleFilterChange('minMarketCap', e.target.value ? parseFloat(e.target.value) : undefined)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={localFilters.maxMarketCap || ''}
                onChange={(e) => handleFilterChange('maxMarketCap', e.target.value ? parseFloat(e.target.value) : undefined)}
              />
            </div>
          </div>

          {/* Age Filter */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">{t('filters.tokenAge')}</Label>
            <Select
              value={localFilters.maxAge?.toString() || 'all'}
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
                  id="safetyCheck"
                  checked={localFilters.safetyCheck || false}
                  onCheckedChange={(checked) => handleFilterChange('safetyCheck', checked)}
                />
                <Label htmlFor="safetyCheck" className="text-sm">
                  Only safe tokens (7+ safety score)
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Filters */}
        <div className="flex space-x-2">
          <Button onClick={applyFilters} className="flex-1">
            {t('filters.apply')}
          </Button>
          <Button variant="outline" onClick={resetFilters}>
            {t('filters.reset')}
          </Button>
        </div>
      </div>
    </aside>
  );
}
