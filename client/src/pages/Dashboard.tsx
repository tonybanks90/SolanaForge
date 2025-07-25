import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TokenTable from '@/components/TokenTable';
import FloatingAlerts from '@/components/FloatingAlerts';
import MobileMenu from '@/components/MobileMenu';
import BottomMobileNav from '@/components/BottomMobileNav';
import { useTokens, useTokenStats } from '@/hooks/useTokens';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TokenFilters } from '@/types';

export default function Dashboard() {
  const [filters, setFilters] = useState<TokenFilters>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const { data: tokens = [], isLoading, error, refetch } = useTokens({
    ...filters,
    category: selectedCategory === 'all' ? undefined : selectedCategory,
  });

  const { data: stats } = useTokenStats();

  const handleFiltersChange = (newFilters: TokenFilters) => {
    setFilters(newFilters);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMobileMenuToggle={() => setMobileMenuOpen(true)}
        onRefresh={handleRefresh}
        autoRefresh={autoRefresh}
        onAutoRefreshToggle={() => setAutoRefresh(!autoRefresh)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <div className="flex">
        {!isMobile && (
          <Sidebar 
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        )}
        
        <main className={`flex-1 p-4 md:p-6 ${isMobile ? 'pb-20' : ''}`}>
          {/* Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <h2 className="text-xl sm:text-2xl font-bold">{t('main.liveTokens')}</h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full pulse-green"></div>
                <span>{stats?.totalTokens || 0} {t('main.activeTokens')}</span>
              </div>
            </div>
          </div>

          {/* Alert Banner */}
          <div className="bg-gradient-to-r from-primary/20 to-warning/20 border border-primary/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <i className="fas fa-bell text-primary text-sm sm:text-base"></i>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">{t('alert.fomoActive')}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {stats?.newTokens || 0} {t('alert.fomoDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* Token Categories */}
          <div className="flex space-x-2 sm:space-x-4 mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors text-sm sm:text-base ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              <i className="fas fa-list text-sm sm:text-base"></i>
              <span>All ({stats?.totalTokens || 0})</span>
            </button>
            
            <button
              onClick={() => handleCategoryChange('new')}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors text-sm sm:text-base ${
                selectedCategory === 'new'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              <i className="fas fa-seedling text-sm sm:text-base"></i>
              <span>{t('categories.new')} ({stats?.newTokens || 0})</span>
            </button>
            
            <button
              onClick={() => handleCategoryChange('completing')}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors text-sm sm:text-base ${
                selectedCategory === 'completing'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              <i className="fas fa-clock text-sm sm:text-base"></i>
              <span>{t('categories.completing')} ({stats?.completingTokens || 0})</span>
            </button>
            
            <button
              onClick={() => handleCategoryChange('completed')}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors text-sm sm:text-base ${
                selectedCategory === 'completed'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              <i className="fas fa-check-circle text-sm sm:text-base"></i>
              <span>{t('categories.completed')} ({stats?.completedTokens || 0})</span>
            </button>
            
            <button
              onClick={() => handleCategoryChange('trending')}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors text-sm sm:text-base ${
                selectedCategory === 'trending'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              <i className="fas fa-fire text-sm sm:text-base"></i>
              <span>{t('categories.trending')} ({stats?.trendingTokens || 0})</span>
            </button>
          </div>

          <TokenTable 
            tokens={tokens}
            isLoading={isLoading}
            error={error}
            viewMode={viewMode}
          />
        </main>
      </div>

      <FloatingAlerts />
      
      {isMobile && (
        <>
          <MobileMenu
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onRefresh={handleRefresh}
            autoRefresh={autoRefresh}
            onAutoRefreshToggle={() => setAutoRefresh(!autoRefresh)}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          <BottomMobileNav onMenuToggle={() => setMobileMenuOpen(true)} />
        </>
      )}
    </div>
  );
}
