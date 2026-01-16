import { useAlertStore } from "@/store/useAlertStore";
import { Trash } from "phosphor-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AlertsScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const { alerts, removeAlert } = useAlertStore();

  const activeAlerts = alerts.filter(a => a.status === 'active');

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: top + 60, paddingBottom: bottom }}>
      <ScrollView className="flex-1 px-6">
        <Text className="text-3xl font-bold text-gray-900 mb-6">Manage Alerts</Text>

        {activeAlerts.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-gray-400 text-lg">No active alerts</Text>
            <Text className="text-gray-400 text-sm mt-2">Go to a coin detail page to add one.</Text>
          </View>
        ) : (
          activeAlerts.map(alert => (
            <View key={alert.id} className="bg-blue-50 p-4 rounded-xl mb-3 border border-blue-100">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="font-bold text-blue-900 text-lg uppercase">{alert.coinId}</Text>
                  <Text className="text-blue-700">
                    Notify when {alert.type} ${alert.targetPrice.toLocaleString()}
                  </Text>
                </View>
                <Pressable onPress={() => removeAlert(alert.id)} className="p-2">
                  <Trash size={20} color="#2563EB" />
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
