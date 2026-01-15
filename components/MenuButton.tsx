import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { List } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export function MenuButton({ className }: { className?: string }) {
  const navigation = useNavigation();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <TouchableOpacity
      onPress={toggleDrawer}
      className={`p-2 bg-gray-200/70 rounded-full ${className}`}
    >
      <List size={32} color="#000" />
    </TouchableOpacity>
  );
}
