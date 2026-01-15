import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function CryptoDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold capitalize">{id}</Text>
      <Text className="text-gray-500">Chart goes here</Text>
    </View>
  );
}
