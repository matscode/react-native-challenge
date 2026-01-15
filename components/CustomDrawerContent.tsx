import { useCoinStore } from "@/store/useCoinStore";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { usePathname, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerSectionTitle } from "./DrawerSectionTitle";

export function CustomDrawerContent(props: any) {
  const router = useRouter();
  const pathname = usePathname();
  const { top } = useSafeAreaInsets();
  const { coins } = useCoinStore();

  const isAlertsActive = pathname.includes("alerts");

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: top }}>
        <View className="px-6 py-6">
          <Text className="text-2xl font-bold">Coinscout</Text>
        </View>

        <View className="py-4">
          <DrawerSectionTitle title="Top Coins" />
          <View className="flex-row flex-wrap px-4 gap-2">
            {coins.map((coin) => {
              const isActive = pathname.includes(coin.id);
              
              return (
                <Pressable
                  key={coin.id}
                  onPress={() => router.push(`/(drawer)/(inner)/${coin.id}`)}
                  className={`rounded-full px-4 py-2 mb-2 ${
                    isActive ? "bg-blue-600" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <Text className={`font-medium ${isActive ? "text-white" : "text-gray-800"}`}>
                    {coin.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View className="py-6">
          <DrawerSectionTitle title="Alerts" />
          <View className="px-4">
            <DrawerItem
              label="Manage Alerts"
              onPress={() => router.push("/(drawer)/(inner)/alerts")}
              focused={isAlertsActive}
              activeTintColor="#2563EB"
              activeBackgroundColor="#DBEAFE"
              labelStyle={{ 
                marginLeft: -16, 
                fontSize: 16, 
                color: isAlertsActive ? '#2563EB' : '#374151',
                fontWeight: isAlertsActive ? '600' : '400'
              }}
            />
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
