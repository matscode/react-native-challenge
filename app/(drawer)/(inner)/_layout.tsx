import { TopNavbar } from "@/components/TopNavbar";
import { Slot } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function InnerLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      className="flex-1 bg-white" 
      style={{ 
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: insets.bottom
      }}
    >
      <View className="absolute top-0 left-0 right-0 z-50">
        <TopNavbar />
      </View>
      
      <Slot />
    </View>
  );
}
