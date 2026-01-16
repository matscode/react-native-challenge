import { useAlertStore } from "@/store/useAlertStore";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function NotificationsScreen() {
  const { alerts, clearTriggeredAlerts } = useAlertStore();

  const triggeredAlerts = alerts
    .filter(a => a.status === 'triggered')
    .sort((a, b) => new Date(b.triggeredAt!).getTime() - new Date(a.triggeredAt!).getTime());

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-3xl font-bold text-gray-900">
            Notifications {triggeredAlerts.length > 0 && `(${triggeredAlerts.length})`}
          </Text>
          {triggeredAlerts.length > 0 && (
            <Pressable onPress={clearTriggeredAlerts}>
              <Text className="text-blue-600 font-medium">Clear Log</Text>
            </Pressable>
          )}
        </View>

        {triggeredAlerts.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-gray-400 text-lg">No notifications</Text>
          </View>
        ) : (
          triggeredAlerts.map((alert) => (
            <View
              key={alert.id}
              className="p-4 rounded-xl mb-3 border bg-gray-50 border-gray-100"
            >
              <View className="flex-row justify-between items-start">
                <View>
                  <Text
                    className="font-bold text-lg uppercase text-gray-700"
                  >
                    {alert.coinId}
                  </Text>
                  <Text
                    className="text-gray-600"
                  >
                    Price hit ${alert.targetPrice.toLocaleString()} (
                    {alert.type})
                  </Text>
                  {alert.initialPrice !== undefined && (
                    <Text className="text-gray-600">
                      Entry Price: ${alert.initialPrice.toLocaleString()}
                    </Text>
                  )}
                  <Text className="text-gray-500 text-xs mt-1">
                    {new Date(alert.triggeredAt!).toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
