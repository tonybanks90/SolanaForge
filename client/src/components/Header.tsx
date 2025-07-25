import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, Moon, Sun, Menu, RefreshCw, Table, Grid3X3 } from 'lucide-react';
import { Link, useLocation } from 'wouter';

interface HeaderProps {
  onMobileMenuToggle: () => void;
  onRefresh: () => void;
  autoRefresh: boolean;
  onAutoRefreshToggle: () => void;
  viewMode: 'table' | 'cards';
  onViewModeChange: (mode: 'table' | 'cards') => void;
}

export default function Header({
  onMobileMenuToggle,
  onRefresh,
  autoRefresh,
  onAutoRefreshToggle,
  viewMode,
  onViewModeChange,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-chart-line text-primary-foreground text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">{t('header.title')}</h1>
              <p className="text-xs text-muted-foreground">{t('header.subtitle')}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className={location === "/" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary transition-colors"}>
              {t('nav.allTokens')}
            </Link>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.trenches')}
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.copyTrade')}
            </a>
            <Link href="/portfolio" className={location === "/portfolio" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary transition-colors"}>
              {t('nav.portfolio')}
            </Link>
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="bg-card rounded-lg p-1">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewModeChange('table')}
                >
                  <Table className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewModeChange('cards')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
              </div>

              {/* Auto-refresh Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={onAutoRefreshToggle}
                className={autoRefresh ? 'bg-primary/20 border-primary' : ''}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
                Auto
              </Button>

              {/* Manual Refresh */}
              <Button variant="outline" size="sm" onClick={onRefresh}>
                <RefreshCw className="w-4 h-4" />
              </Button>

              {/* Language Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {language.toUpperCase()}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setLanguage('en')}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('zh')}>
                    中文
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <Button variant="outline" size="sm" onClick={toggleTheme}>
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-primary" />
                ) : (
                  <Moon className="w-4 h-4 text-primary" />
                )}
              </Button>
            </div>

            {/* Connect Wallet - always visible */}
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 hidden sm:flex">
              {t('button.connectWallet')}
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="outline"
              size="sm"
              onClick={onMobileMenuToggle}
              className="md:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
