import { useAlertStore } from "@/store/useAlertStore";
import { useGlobalSearchParams, useRouter, useSegments } from "expo-router";
import { Bell } from "phosphor-react-native";
import { Pressable, Text, View } from "react-native";
import { ChartTypeButton } from "./ChartTypeButton";
import { MenuButton } from "./MenuButton";

export function TopNavbar() {
  
  const { id } = useGlobalSearchParams();
  const segments = useSegments();
  const router = useRouter();
  const title = typeof id === 'string' ? id : 'Coinscout';
  const { alerts } = useAlertStore();

  const triggeredCount = alerts.filter(a => a.status === 'triggered').length;
  const showChartToggle = segments[segments.length - 1] === '[id]';

  return (
    <View 
    >

    <View 
      className="flex-row items-center justify-between px-4 pb-4"
    >
      <View className="flex-row items-center gap-4">
        <Text className="text-xl font-bold capitalize text-gray-700 ml-2">{title}</Text>
        {showChartToggle && <ChartTypeButton />}
      </View>
      
      <View className="flex-row items-center gap-4">
        <Pressable 
          onPress={() => router.push('/(drawer)/(inner)/notifications')}
          className="relative p-2"
        >
          <Bell size={24} color="#374151" weight="bold" />
          {triggeredCount > 0 && (
            <View className="absolute top-1 right-1 bg-red-500 w-4 h-4 rounded-full items-center justify-center border border-white">
              <Text className="text-white text-[10px] font-bold">{triggeredCount}</Text>
            </View>
          )}
        </Pressable>
        <MenuButton />
      </View>
    </View>
    </View>
  );
}
