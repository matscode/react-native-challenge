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
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: insets.bottom
      }}
    >
      <TopNavbar />
      <Slot />
    </View>
  );
}
