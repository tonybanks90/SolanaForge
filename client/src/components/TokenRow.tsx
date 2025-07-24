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
      <TableCell>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-primary font-bold text-sm">
              {token.symbol.slice(0, 3)}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{token.symbol}</span>
              {getStatusBadge()}
            </div>
            <div className="text-sm text-muted-foreground">{token.name}</div>
            <div className="text-xs text-muted-foreground font-mono">
              {token.address.slice(0, 4)}...{token.address.slice(-4)}
            </div>
          </div>
        </div>
      </TableCell>
      
      <TableCell>
        <div className="font-semibold">${token.price}</div>
        <div className={`text-sm ${getPriceChangeColor()}`}>
          {parseFloat(token.priceChange24h) > 0 ? '+' : ''}
          {token.priceChange24h}%
        </div>
      </TableCell>
      
      <TableCell>
        <div className="font-semibold">{formatNumber(token.marketCap, '')}</div>
        <div className="text-sm text-muted-foreground">{token.platform}</div>
      </TableCell>
      
      <TableCell>
        <div className="font-semibold">{formatNumber(token.volume24h, '')}</div>
        <div className="text-sm text-muted-foreground">24h</div>
      </TableCell>
      
      <TableCell>
        <div className="font-semibold">{token.holders.toLocaleString()}</div>
        <div className="text-sm text-primary">+{Math.floor(Math.random() * 50)} (1h)</div>
      </TableCell>
      
      <TableCell>
        <div className="flex space-x-1 mb-1">
          {getSafetyIndicators()}
        </div>
        <div className="text-xs text-muted-foreground">{token.safetyScore}/10</div>
      </TableCell>
      
      <TableCell>
        <div className="text-sm">{formatAge(token.age)}</div>
      </TableCell>
      
      <TableCell>
        <div className="flex space-x-2">
          {getActionButton()}
          <Button variant="outline" size="sm">
            <ChartLine className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
