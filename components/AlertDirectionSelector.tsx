import { ArrowDown, ArrowUp } from "phosphor-react-native";
import { Pressable, Text, View } from "react-native";

interface AlertDirectionSelectorProps {
  value: 'above' | 'below';
  onChange: (value: 'above' | 'below') => void;
}

export function AlertDirectionSelector({ value, onChange }: AlertDirectionSelectorProps) {
  return (
    <View className="flex-row bg-gray-100 rounded-xl p-1 h-[54px]">
      <Pressable 
        onPress={() => onChange('above')}
        className={`flex-1 flex-row items-center justify-center rounded-lg gap-2 ${value === 'above' ? 'bg-white shadow-sm' : ''}`}
      >
        <ArrowUp size={16} weight="bold" color={value === 'above' ? '#16A34A' : '#6B7280'} />
        <Text className={`text-sm font-medium ${value === 'above' ? 'text-gray-900' : 'text-gray-500'}`}>Above</Text>
      </Pressable>
      
      <Pressable 
        onPress={() => onChange('below')}
        className={`flex-1 flex-row items-center justify-center rounded-lg gap-2 ${value === 'below' ? 'bg-white shadow-sm' : ''}`}
      >
        <ArrowDown size={16} weight="bold" color={value === 'below' ? '#DC2626' : '#6B7280'} />
        <Text className={`text-sm font-medium ${value === 'below' ? 'text-gray-900' : 'text-gray-500'}`}>Below</Text>
      </Pressable>
    </View>
  );
}
