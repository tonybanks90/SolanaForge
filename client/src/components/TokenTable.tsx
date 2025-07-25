import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import TokenRow from './TokenRow';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Token } from '@shared/schema';

interface TokenTableProps {
  tokens: Token[];
  isLoading: boolean;
  error: Error | null;
  viewMode: 'table' | 'cards';
}

export default function TokenTable({ tokens, isLoading, error, viewMode }: TokenTableProps) {
  const { t } = useLanguage();

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load tokens. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6 space-y-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-12 text-center">
        <div className="text-muted-foreground">
          <i className="fas fa-search text-4xl mb-4"></i>
          <h3 className="text-lg font-semibold mb-2">No tokens found</h3>
          <p>Try adjusting your filters or search criteria.</p>
        </div>
      </div>
    );
  }

  if (viewMode === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tokens.map((token) => (
          <div key={token.id} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">
                  {token.symbol.slice(0, 3)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">{token.symbol}</h3>
                <p className="text-sm text-muted-foreground">{token.name}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-semibold">${token.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Cap:</span>
                <span>${(parseFloat(token.marketCap) / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volume:</span>
                <span>${(parseFloat(token.volume24h) / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Holders:</span>
                <span>{token.holders}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold min-w-[200px] sticky left-0 bg-muted/50 p-2 sm:p-4">{t('table.token')}</TableHead>
              <TableHead className="font-semibold min-w-[120px] p-2 sm:p-4">{t('table.price')}</TableHead>
              <TableHead className="font-semibold min-w-[120px] p-2 sm:p-4 hidden sm:table-cell">{t('table.marketCap')}</TableHead>
              <TableHead className="font-semibold min-w-[120px] p-2 sm:p-4 hidden md:table-cell">{t('table.volume')}</TableHead>
              <TableHead className="font-semibold min-w-[100px] p-2 sm:p-4 hidden lg:table-cell">{t('table.holders')}</TableHead>
              <TableHead className="font-semibold min-w-[120px] p-2 sm:p-4 hidden md:table-cell">{t('table.safety')}</TableHead>
              <TableHead className="font-semibold min-w-[80px] p-2 sm:p-4 hidden lg:table-cell">{t('table.age')}</TableHead>
              <TableHead className="font-semibold min-w-[140px] p-2 sm:p-4">{t('table.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map((token) => (
              <TokenRow key={token.id} token={token} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-6 border-t">
        <div className="text-sm text-muted-foreground">
          Showing <span className="text-foreground">1-{tokens.length}</span> of{' '}
          <span className="text-foreground">{tokens.length}</span> tokens
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 bg-muted border border-border rounded hover:bg-muted/80 transition-colors">
            Previous
          </button>
          <button className="px-3 py-2 bg-primary text-primary-foreground rounded font-medium">
            1
          </button>
          <button className="px-3 py-2 bg-muted border border-border rounded hover:bg-muted/80 transition-colors">
            2
          </button>
          <button className="px-3 py-2 bg-muted border border-border rounded hover:bg-muted/80 transition-colors">
            3
          </button>
          <button className="px-3 py-2 bg-muted border border-border rounded hover:bg-muted/80 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
