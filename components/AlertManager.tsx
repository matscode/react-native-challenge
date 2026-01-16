import { useAlertStore } from "@/store/useAlertStore";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

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

        activeAlerts.forEach(async (alert) => {
          const price = data[alert.coinId]?.usd;
          if (!price) return;

          let shouldTrigger = false;
          const useFutureCrossing = process.env.EXPO_PUBLIC_ENABLE_FUTURE_CROSSING_ALERTS === 'true';

          if (useFutureCrossing && alert.initialPrice !== undefined) {
            // Future crossing logic
            if (alert.type === 'above') {
              if (alert.initialPrice < alert.targetPrice && price > alert.targetPrice) {
                shouldTrigger = true;
              }
            } else if (alert.type === 'below') {
              if (alert.initialPrice > alert.targetPrice && price < alert.targetPrice) {
                shouldTrigger = true;
              }
            }
          } else {
            // Standard logic
            if (alert.type === 'above' && price > alert.targetPrice) {
              shouldTrigger = true;
            } else if (alert.type === 'below' && price < alert.targetPrice) {
              shouldTrigger = true;
            }
          }

          if (shouldTrigger) {
            const { status } = await Notifications.getPermissionsAsync();
            
            if (status === 'granted') {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "Price Alert! 🚨",
                  body: `${alert.coinId.toUpperCase()} is now ${alert.type} $${alert.targetPrice}`,
                  sound: true,
                },
                trigger: null,
              });
            }

            triggerAlert(alert.id);
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
  }, [alerts, triggerAlert]);

  return null; // Logic only component
}
