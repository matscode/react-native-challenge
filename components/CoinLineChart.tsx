import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { LineChart } from "react-native-wagmi-charts";
import { AlertControl } from "./AlertControl";

interface CoinLineChartProps {
  coinId: string;
  height: number;
  width: number;
  onPriceChange?: (price: number) => void;
}

export function CoinLineChart({ coinId, height, width, onPriceChange }: CoinLineChartProps) {
  const { data: chartData, isLoading, error } = useQuery({
    queryKey: ["chart", coinId, "line"],
    queryFn: async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
      );
      if (!res.ok) throw new Error("Failed to fetch chart");
      const data = await res.json();
      return data.prices.map(([timestamp, price]: [number, number]) => ({
        timestamp,
        value: price,
      }));
    },
    enabled: !!coinId,
    refetchInterval: process.env.EXPO_PUBLIC_ENABLE_CHART_POLLING === 'true' ? 30000 : false, // Poll every 30 seconds if enabled
    gcTime: 0,
    staleTime: 0,
  });

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      onPriceChange?.(chartData[chartData.length - 1].value);
    }
  }, [chartData, onPriceChange]);

  if (isLoading) {
    return (
      <View style={{ height, width }} className="items-center justify-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Failed to load chart</Text>
      </View>
    );
  }

  const currentPrice = chartData && chartData.length > 0 ? chartData[chartData.length - 1].value : 0;

  return (
    <LineChart.Provider data={chartData}>
      <View className="relative">
        <LineChart height={height} width={width}>
          <LineChart.Path color="#2563EB" width={3}>
            <LineChart.Gradient color="#2563EB" />
          </LineChart.Path>
        </LineChart>
        
        <View 
          className="absolute bottom-4 right-8"
        >
          <AlertControl coinId={coinId} currentPrice={currentPrice} />
        </View>
      </View>
    </LineChart.Provider>
  );
}
