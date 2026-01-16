import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CandlestickChart } from "react-native-wagmi-charts";
import { AlertControl } from "./AlertControl";

interface CoinCandleChartProps {
  coinId: string;
  height: number;
  width: number;
  onPriceChange?: (price: number) => void;
}

export function CoinCandleChart({ coinId, height, width, onPriceChange }: CoinCandleChartProps) {
  const insets = useSafeAreaInsets();
  const { data: chartData, isLoading, error } = useQuery({
    queryKey: ["chart", coinId, "candle"],
    queryFn: async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=7`
      );
      if (!res.ok) throw new Error("Failed to fetch chart");
      const data = await res.json();
      return data.map(([timestamp, open, high, low, close]: number[]) => ({
        timestamp,
        open,
        high,
        low,
        close,
      }));
    },
    enabled: !!coinId,
    refetchInterval: process.env.EXPO_PUBLIC_ENABLE_CHART_POLLING === 'true' ? 30000 : false, // Poll every 30 seconds if enabled
    gcTime: 0,
    staleTime: 0,
  });

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      onPriceChange?.(chartData[chartData.length - 1].close);
    }
  }, [chartData, onPriceChange]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#2563EB" />;
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Failed to load chart</Text>
      </View>
    );
  }

  const currentPrice = chartData?.[chartData.length - 1]?.close || 0;

  return (
    <View className="relative w-full">
      <CandlestickChart.Provider data={chartData}>
        <CandlestickChart height={height} width={width}>
          <CandlestickChart.Candles />
        </CandlestickChart>
      </CandlestickChart.Provider>

      <View 
        className="absolute right-4"
        style={{ bottom: 16 + insets.bottom }}
      >
        <AlertControl coinId={coinId} currentPrice={currentPrice} />
      </View>
    </View>
  );
}
