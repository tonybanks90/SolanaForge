import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAlerts, useMarkAlertAsRead } from '@/hooks/useTokens';
import { X, Rocket, TrendingUp, AlertTriangle } from 'lucide-react';
import type { Alert } from '@shared/schema';

export default function FloatingAlerts() {
  const { data: alerts = [] } = useAlerts();
  const markAsRead = useMarkAlertAsRead();
  const [visibleAlerts, setVisibleAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Show only unread alerts
    const unreadAlerts = alerts.filter(alert => !alert.isRead).slice(0, 3);
    setVisibleAlerts(prev => {
      // Only update if the alerts have actually changed
      if (JSON.stringify(prev) !== JSON.stringify(unreadAlerts)) {
        return unreadAlerts;
      }
      return prev;
    });
  }, [alerts]);

  const handleClose = (alertId: number) => {
    markAsRead.mutate(alertId);
    setVisibleAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'new_token':
        return <Rocket className="w-5 h-5" />;
      case 'price_change':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'new_token':
        return 'bg-primary text-primary-foreground';
      case 'price_change':
        return 'bg-warning text-black';
      default:
        return 'bg-muted text-foreground';
    }
  };

  if (visibleAlerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 space-y-3 z-50 floating-alerts-mobile">
      {visibleAlerts.map((alert) => (
        <div
          key={alert.id}
          className={`${getAlertColor(alert.type)} p-4 rounded-lg shadow-lg max-w-sm slide-in`}
        >
          <div className="flex items-start space-x-3">
            {getAlertIcon(alert.type)}
            <div className="flex-1">
              <h4 className="font-semibold">{alert.title}</h4>
              <p className="text-sm opacity-90 mt-1">{alert.message}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleClose(alert.id)}
              className="p-1 h-auto hover:bg-black/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
