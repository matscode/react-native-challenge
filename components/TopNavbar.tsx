import { useGlobalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MenuButton } from "./MenuButton";

export function TopNavbar() {
  const { top } = useSafeAreaInsets();
  const { id } = useGlobalSearchParams();
  const title = typeof id === 'string' ? id : 'Coinscout';

  return (
    <View 
      style={{ paddingTop: top }} 
      className="flex-row items-center justify-end px-4 pb-4 gap-4"
    >
      <Text className="text-2xl font-bold capitalize text-gray-700">{title}</Text>
      <MenuButton />
    </View>
  );
}
