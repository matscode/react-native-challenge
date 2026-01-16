import { Alert } from "@/store/useAlertStore";
import { ArrowDown, ArrowUp, Trash } from "phosphor-react-native";
import { Pressable, Text, View } from "react-native";

interface ActiveAlertCardProps {
  alert: Alert;
  onRemove?: () => void;
}

export function ActiveAlertCard({ alert, onRemove }: ActiveAlertCardProps) {
  return (
    <View className="bg-white border border-gray-200 rounded-lg p-3 flex-row items-center justify-between mb-2">
      <View className="flex-row items-center gap-3">
        <View className={`w-8 h-8 rounded-full items-center justify-center ${alert.type === 'above' ? 'bg-green-100' : 'bg-red-100'}`}>
          {alert.type === 'above' ? (
            <ArrowUp size={16} color="#16A34A" weight="bold" />
          ) : (
            <ArrowDown size={16} color="#DC2626" weight="bold" />
          )}
        </View>
        <View>
          <Text className="text-sm font-medium text-gray-900">
            {alert.type === 'above' ? 'Price rises above' : 'Price drops below'}
          </Text>
          <Text className="text-lg font-bold text-gray-900">
            ${alert.targetPrice.toLocaleString()}
          </Text>
          {alert.initialPrice !== undefined && (
             <Text className="text-xs text-gray-500">
                Entry: ${alert.initialPrice.toLocaleString()}
             </Text>
          )}
        </View>
      </View>
      
      {onRemove && (
        <Pressable onPress={onRemove} className="p-2">
          <Trash size={20} color="#9CA3AF" />
        </Pressable>
      )}
    </View>
  );
}
