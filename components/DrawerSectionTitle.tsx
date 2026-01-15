import { Text } from "react-native";

export function DrawerSectionTitle({ title }: { title: string }) {
  return (
    <Text className="px-6 mb-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
      {title}
    </Text>
  );
}
