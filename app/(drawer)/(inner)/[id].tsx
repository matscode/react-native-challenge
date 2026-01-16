import { ChartHeader } from "@/components/ChartHeader";
import { CoinCandleChart } from "@/components/CoinCandleChart";
import { CoinLineChart } from "@/components/CoinLineChart";
import { useChartTypeStore } from "@/store/useChartTypeStore";
import { useCoinStore } from "@/store/useCoinStore";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CryptoDetail() {
  const { id } = useLocalSearchParams();
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { coins } = useCoinStore();
  const coin = coins.find(c => c.id === id);
  const { chartType } = useChartTypeStore();

  const [currentPrice, setCurrentPrice] = useState(coin?.current_price || 0);

  useEffect(() => {
    if (coin) setCurrentPrice(coin.current_price);
  }, [coin]);

  if (!coin) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Coin not found</Text>
      </View>
    );
  }

  // Calculate available height for chart
  // height - header (approx 100) - bottom tab/padding
  const chartHeight = height * 0.70;
  const adjustedWidth = width - insets.left - insets.right;

  return (
    <View className="flex-1 bg-white">
      <View className="px-8 pb-8 pt-4">
        <ChartHeader symbol={coin?.symbol}>
          <Text className="text-4xl font-bold text-gray-900">
            ${currentPrice.toLocaleString()}
          </Text>
        </ChartHeader>
      </View>

      <View className="flex-1 items-center justify-end pb-4">
        {chartType === 'line' ? (
          <CoinLineChart 
            coinId={id as string} 
            height={chartHeight} 
            width={adjustedWidth}
            onPriceChange={setCurrentPrice} 
          />
        ) : (
          <CoinCandleChart 
            coinId={id as string} 
            height={chartHeight} 
            width={adjustedWidth}
            onPriceChange={setCurrentPrice} 
          />
        )}
      </View>
    </View>
  );
}
