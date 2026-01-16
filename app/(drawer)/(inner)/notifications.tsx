import { useAlertStore } from "@/store/useAlertStore";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NotificationsScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const { alerts, markAllAsRead } = useAlertStore();

  const triggeredAlerts = alerts
    .filter(a => a.status === 'triggered')
    .sort((a, b) => new Date(b.triggeredAt!).getTime() - new Date(a.triggeredAt!).getTime());

  const hasUnread = triggeredAlerts.some(a => !a.readAt);

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: top + 60, paddingBottom: bottom }}>
      <ScrollView className="flex-1 px-6">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-3xl font-bold text-gray-900">Notifications</Text>
          {hasUnread && (
            <Pressable onPress={markAllAsRead}>
              <Text className="text-blue-600 font-medium">Mark all Read</Text>
            </Pressable>
          )}
        </View>

        {triggeredAlerts.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-gray-400 text-lg">No notifications</Text>
          </View>
        ) : (
          triggeredAlerts.map(alert => (
            <View 
              key={alert.id} 
              className={`p-4 rounded-xl mb-3 border ${!alert.readAt ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}
            >
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className={`font-bold text-lg uppercase ${!alert.readAt ? 'text-red-900' : 'text-gray-700'}`}>
                    {alert.coinId}
                  </Text>
                  <Text className={`${!alert.readAt ? 'text-red-700' : 'text-gray-600'}`}>
                    Price hit ${alert.targetPrice.toLocaleString()} ({alert.type})
                  </Text>
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
