import { Button } from '@/components/ui/button';
import { Home, TrendingUp, Search, User, Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BottomMobileNavProps {
  onMenuToggle: () => void;
}

export default function BottomMobileNav({ onMenuToggle }: BottomMobileNavProps) {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-40">
      <div className="flex items-center justify-around py-2 px-4">
        <Button variant="ghost" size="sm" className="flex-col h-auto py-2 px-3">
          <Home className="w-5 h-5 mb-1" />
          <span className="text-xs">Home</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex-col h-auto py-2 px-3">
          <TrendingUp className="w-5 h-5 mb-1" />
          <span className="text-xs">Trending</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex-col h-auto py-2 px-3">
          <Search className="w-5 h-5 mb-1" />
          <span className="text-xs">Search</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex-col h-auto py-2 px-3">
          <User className="w-5 h-5 mb-1" />
          <span className="text-xs">Portfolio</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex-col h-auto py-2 px-3" onClick={onMenuToggle}>
          <Menu className="w-5 h-5 mb-1" />
          <span className="text-xs">Menu</span>
        </Button>
      </div>
    </div>
  );
}