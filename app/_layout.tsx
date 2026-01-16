import { AlertManager } from "@/components/AlertManager";
import { useNotifications } from "@/hooks/useNotifications";
import { useCoinStore } from "@/store/useCoinStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { fetchCoins } = useCoinStore();
  useNotifications();

  useEffect(() => {
    async function prepare() {
      try {
        await fetchCoins();
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fetchCoins]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="dark" animated />
          <AlertManager />
          <Slot />
        </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
