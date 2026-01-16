import { useAlertStore } from "@/store/useAlertStore";
import { useEffect } from "react";
import { Alert as NativeAlert, Vibration } from "react-native";

export function AlertManager() {
  const { alerts, triggerAlert } = useAlertStore();

  useEffect(() => {
    const checkAlerts = async () => {
      const activeAlerts = alerts.filter((a) => a.status === 'active');
      if (activeAlerts.length === 0) return;

      const uniqueCoinIds = [...new Set(activeAlerts.map((a) => a.coinId))];
      
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${uniqueCoinIds.join(',')}&vs_currencies=usd`
        );
        const data = await response.json();

        activeAlerts.forEach((alert) => {
          const price = data[alert.coinId]?.usd;
          if (!price) return;

          let shouldTrigger = false;
          if (alert.type === 'above' && price > alert.targetPrice) {
            shouldTrigger = true;
          } else if (alert.type === 'below' && price < alert.targetPrice) {
            shouldTrigger = true;
          }

          if (shouldTrigger) {
            triggerAlert(alert.id);
            Vibration.vibrate();
            NativeAlert.alert(
              "Price Alert! 🚨",
              `${alert.coinId.toUpperCase()} is now ${alert.type} $${alert.targetPrice}`
            );
          }
        });
      } catch (error) {
        console.error("Alert polling error:", error);
      }
    };

    // Check immediately on mount/update
    checkAlerts();

    if (process.env.EXPO_PUBLIC_ENABLE_PRICE_MONITOR_POLLING === 'true') {
      // Poll every 30 seconds
      const interval = setInterval(checkAlerts, 30000);
      return () => clearInterval(interval);
    }
  }, [alerts]); // Re-run if alerts change (to pick up new ones)

  return null; // Logic only component
}
