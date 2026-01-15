import { View, Text } from "react-native";

export default function AlertsScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Alerts</Text>
      <Text className="text-gray-500">Manage your price alerts here</Text>
    </View>
  );
}
