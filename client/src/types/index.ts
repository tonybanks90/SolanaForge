export interface TokenFilters {
  search?: string;
  platform?: string;
  category?: string;
  minMarketCap?: number;
  maxMarketCap?: number;
  minAge?: number;
  maxAge?: number;
  safetyCheck?: boolean;
}

export interface TokenStats {
  totalTokens: number;
  newTokens: number;
  completingTokens: number;
  completedTokens: number;
  trendingTokens: number;
  totalVolume: number;
  totalMarketCap: number;
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'zh';

export interface Translations {
  [key: string]: {
    en: string;
    zh: string;
  };
}
