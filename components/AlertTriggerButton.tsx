import { BellRinging } from "phosphor-react-native";
import { Pressable, Text, View } from "react-native";

interface AlertTriggerButtonProps {
  onPress: () => void;
}

export function AlertTriggerButton({ onPress }: AlertTriggerButtonProps) {
  return (
    <View className="bg-gray-100/80 rounded-lg p-1">
      <Pressable 
        onPress={onPress}
        className="bg-white px-2 py-1.5 rounded-md items-center justify-center flex-row gap-1.5"
        testID="alert-trigger-button"
      >
        <BellRinging size={16} color="#374151" />
        <Text className="font-medium text-gray-700">Set alert</Text>
      </Pressable>
    </View>
  );
}
