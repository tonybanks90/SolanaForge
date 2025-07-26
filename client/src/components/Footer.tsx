import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="hidden lg:block bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <h3 className="text-lg font-bold text-primary">OMAXPro</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-telegram text-lg"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-discord text-lg"></i>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('footer.product')}</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.allTokens')}
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.trenches')}
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.copyTrade')}
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.portfolio')}
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.analytics')}
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('footer.resources')}</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.documentation')}
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.api')}
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.tutorials')}
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.blog')}
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.community')}
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('footer.legal')}</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.termsOfService')}
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.privacyPolicy')}
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.disclaimer')}
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.support')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 {t('header.title')}. {t('footer.allRightsReserved')}
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">{t('footer.poweredBy')}</span>
            <div className="flex space-x-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Solana</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Pump.fun</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Raydium</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}