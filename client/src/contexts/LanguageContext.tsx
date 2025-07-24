import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language, Translations } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  'header.title': { en: 'GMGN.AI', zh: 'GMGN.AI' },
  'header.subtitle': { en: 'Snipe MEME Tokens', zh: '狙击模因代币' },
  'nav.allTokens': { en: 'All Tokens', zh: '所有代币' },
  'nav.trenches': { en: 'Trenches', zh: '战壕' },
  'nav.copyTrade': { en: 'Copy Trade', zh: '跟单交易' },
  'nav.portfolio': { en: 'Portfolio', zh: '投资组合' },
  'button.connectWallet': { en: 'Connect Wallet', zh: '连接钱包' },
  'search.placeholder': { en: 'Search tokens...', zh: '搜索代币...' },
  'filters.title': { en: 'Filters', zh: '筛选器' },
  'filters.platform': { en: 'Platform', zh: '平台' },
  'filters.marketCap': { en: 'Market Cap', zh: '市值' },
  'filters.tokenAge': { en: 'Token Age', zh: '代币年龄' },
  'filters.safety': { en: 'Safety', zh: '安全性' },
  'filters.lpBurned': { en: 'LP Burned', zh: 'LP已销毁' },
  'filters.renounced': { en: 'Renounced', zh: '已放弃所有权' },
  'filters.noHoneypot': { en: 'No Honeypot', zh: '非蜜罐' },
  'filters.apply': { en: 'Apply', zh: '应用' },
  'filters.reset': { en: 'Reset', zh: '重置' },
  'table.token': { en: 'Token', zh: '代币' },
  'table.price': { en: 'Price', zh: '价格' },
  'table.marketCap': { en: 'Market Cap', zh: '市值' },
  'table.volume': { en: 'Volume', zh: '交易量' },
  'table.holders': { en: 'Holders', zh: '持有者' },
  'table.safety': { en: 'Safety', zh: '安全性' },
  'table.age': { en: 'Age', zh: '年龄' },
  'table.actions': { en: 'Actions', zh: '操作' },
  'button.buy': { en: 'Buy', zh: '买入' },
  'button.risky': { en: 'Risky', zh: '风险' },
  'status.new': { en: 'NEW', zh: '新' },
  'status.hot': { en: 'HOT', zh: '热门' },
  'status.risk': { en: 'RISK', zh: '风险' },
  'alert.newToken': { en: 'New Token Alert!', zh: '新代币提醒！' },
  'alert.priceSpike': { en: 'Price Spike Alert!', zh: '价格飙升提醒！' },
  'categories.new': { en: 'New', zh: '新代币' },
  'categories.completing': { en: 'Completing', zh: '即将完成' },
  'categories.completed': { en: 'Completed', zh: '已完成' },
  'categories.trending': { en: 'Trending', zh: '趋势' },
  'main.liveTokens': { en: 'Live Tokens', zh: '实时代币' },
  'main.activeTokens': { en: 'active tokens', zh: '活跃代币' },
  'alert.fomoActive': { en: 'FOMO Alert Active', zh: 'FOMO提醒激活' },
  'alert.fomoDesc': { en: 'new tokens with high volume detected in the last 5 minutes', zh: '在过去5分钟内检测到高交易量的新代币' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
