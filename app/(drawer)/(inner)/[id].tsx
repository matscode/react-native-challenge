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
  const { top, bottom } = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
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

  const chartHeight = height * 0.85;

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: top + 60, paddingBottom: bottom }}>
      <View className="px-8 pb-8">
        <ChartHeader symbol={coin?.symbol}>
          <Text className="text-4xl font-bold text-gray-900">
            ${currentPrice.toLocaleString()}
          </Text>
        </ChartHeader>
      </View>

      <View className="absolute bottom-0 left-0 right-0 items-center">
        {chartType === 'line' ? (
          <CoinLineChart 
            coinId={id as string} 
            height={chartHeight} 
            width={width}
            onPriceChange={setCurrentPrice} 
          />
        ) : (
          <CoinCandleChart 
            coinId={id as string} 
            height={chartHeight} 
            width={width}
            onPriceChange={setCurrentPrice} 
          />
        )}
      </View>
    </View>
  );
}
