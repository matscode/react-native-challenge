import { useChartTypeStore } from "@/store/useChartTypeStore";
import { Pressable, Text, View } from "react-native";

export function ChartTypeButton() {
  const { chartType, setChartType } = useChartTypeStore();

  return (
    <View className="flex-row bg-gray-100/80 rounded-lg p-1">
      <Pressable 
        onPress={() => setChartType('line')}
        className={`px-3 py-1 rounded-md ${chartType === 'line' ? 'bg-white' : ''}`}
      >
        <Text className={`text-xs font-medium ${chartType === 'line' ? 'text-gray-900' : 'text-gray-500'}`}>Line</Text>
      </Pressable>
      
      <Pressable 
        onPress={() => setChartType('candle')}
        className={`px-3 py-1 rounded-md ${chartType === 'candle' ? 'bg-white' : ''}`}
      >
        <Text className={`text-xs font-medium ${chartType === 'candle' ? 'text-gray-900' : 'text-gray-500'}`}>Candle</Text>
      </Pressable>
    </View>
  );
}
