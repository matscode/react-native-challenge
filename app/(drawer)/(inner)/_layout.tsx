import { TopNavbar } from "@/components/TopNavbar";
import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InnerLayout() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['left', 'right', 'bottom']}>
      <View className="absolute top-0 left-0 right-0 z-50">
        <TopNavbar />
      </View>
      
      <Slot />
    </SafeAreaView>
  );
}
