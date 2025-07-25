import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChartLine } from 'lucide-react';
import type { Token } from '@shared/schema';

interface TokenRowProps {
  token: Token;
}

export default function TokenRow({ token }: TokenRowProps) {
  const { t } = useLanguage();

  const formatNumber = (value: string, suffix: string = '') => {
    const num = parseFloat(value);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M${suffix}`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K${suffix}`;
    }
    return `${num.toFixed(2)}${suffix}`;
  };

  const formatAge = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    } else if (minutes < 1440) {
      return `${Math.floor(minutes / 60)}h`;
    } else {
      return `${Math.floor(minutes / 1440)}d`;
    }
  };

  const getStatusBadge = () => {
    const priceChange = parseFloat(token.priceChange24h);
    
    if (token.category === 'new') {
      return <Badge className="bg-primary/20 text-primary border-primary/30">{t('status.new')}</Badge>;
    } else if (priceChange > 100) {
      return <Badge className="bg-warning/20 text-warning border-warning/30">{t('status.hot')}</Badge>;
    } else if (token.safetyScore < 5) {
      return <Badge variant="destructive">{t('status.risk')}</Badge>;
    }
    return null;
  };

  const getSafetyIndicators = () => {
    const indicators = [];
    
    if (token.lpBurned) {
      indicators.push(<div key="lp" className="safety-indicator safe" title="LP Burned" />);
    } else {
      indicators.push(<div key="lp" className="safety-indicator danger" title="LP Not Burned" />);
    }
    
    if (token.renounced) {
      indicators.push(<div key="renounced" className="safety-indicator safe" title="Renounced" />);
    } else {
      indicators.push(<div key="renounced" className="safety-indicator warning" title="Not Renounced" />);
    }
    
    if (token.honeypotCheck) {
      indicators.push(<div key="honeypot" className="safety-indicator safe" title="No Honeypot" />);
    } else {
      indicators.push(<div key="honeypot" className="safety-indicator danger" title="Possible Honeypot" />);
    }
    
    return indicators;
  };

  const getPriceChangeColor = () => {
    const change = parseFloat(token.priceChange24h);
    if (change > 0) return 'text-primary';
    if (change < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getActionButton = () => {
    const priceChange = parseFloat(token.priceChange24h);
    
    if (token.safetyScore < 5) {
      return (
        <Button size="sm" variant="destructive">
          {t('button.risky')}
        </Button>
      );
    }
    
    return (
      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
        {t('button.buy')}
      </Button>
    );
  };

  return (
    <TableRow className="token-row-hover">
      <TableCell className="sticky left-0 bg-card min-w-[180px] sm:min-w-[200px] p-2 sm:p-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-bold text-xs sm:text-sm">
              {token.symbol.slice(0, 2)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-xs sm:text-sm md:text-base truncate">{token.symbol}</span>
              <div className="hidden sm:block">
                {getStatusBadge()}
              </div>
            </div>
            <div className="text-xs text-muted-foreground truncate">{token.name}</div>
            <div className="sm:hidden mt-1">
              {getStatusBadge()}
            </div>
          </div>
        </div>
      </TableCell>
      
      <TableCell className="min-w-[90px] sm:min-w-[120px] p-2 sm:p-4">
        <div className="font-semibold text-xs sm:text-sm md:text-base">${token.price}</div>
        <div className={`text-xs ${getPriceChangeColor()}`}>
          {parseFloat(token.priceChange24h) > 0 ? '+' : ''}
          {token.priceChange24h}%
        </div>
      </TableCell>
      
      <TableCell className="min-w-[120px] hidden sm:table-cell p-2 sm:p-4">
        <div className="font-semibold text-xs sm:text-sm">{formatNumber(token.marketCap, '')}</div>
        <div className="text-xs text-muted-foreground">{token.platform}</div>
      </TableCell>
      
      <TableCell className="min-w-[120px] hidden md:table-cell p-2 sm:p-4">
        <div className="font-semibold text-xs sm:text-sm">{formatNumber(token.volume24h, '')}</div>
        <div className="text-xs text-muted-foreground">24h</div>
      </TableCell>
      
      <TableCell className="min-w-[100px] hidden lg:table-cell p-2 sm:p-4">
        <div className="font-semibold text-xs sm:text-sm">{token.holders.toLocaleString()}</div>
        <div className="text-xs text-primary">+{Math.floor(Math.random() * 50)} (1h)</div>
      </TableCell>
      
      <TableCell className="min-w-[120px] hidden md:table-cell p-2 sm:p-4">
        <div className="flex flex-wrap gap-1 mb-1">
          {getSafetyIndicators()}
        </div>
        <div className="text-xs text-muted-foreground">{token.safetyScore}/10</div>
      </TableCell>
      
      <TableCell className="min-w-[80px] hidden lg:table-cell p-2 sm:p-4">
        <div className="text-xs sm:text-sm">{formatAge(token.age)}</div>
      </TableCell>
      
      <TableCell className="min-w-[80px] sm:min-w-[120px] p-2 sm:p-4">
        <div className="flex flex-col gap-1">
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs px-2 py-1 w-full"
          >
            {t('button.buy')}
          </Button>
          <div className="text-xs text-muted-foreground text-center lg:hidden">
            {formatAge(token.age)}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
