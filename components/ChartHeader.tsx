import { Text, View } from "react-native";
import type { ReactNode } from "react";

interface ChartHeaderProps {
  symbol?: string;
  children: ReactNode;
}

export function ChartHeader({ symbol, children }: ChartHeaderProps) {
  return (
    <View>
      <Text className="text-gray-500 text-lg uppercase font-medium">
        {symbol} Price
      </Text>
      {children}
    </View>
  );
}
