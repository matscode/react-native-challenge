import { useAlertStore } from "@/store/useAlertStore";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActiveAlertCard } from "./ActiveAlertCard";
import { AlertDirectionSelector } from "./AlertDirectionSelector";

interface AlertModalProps {
  visible: boolean;
  onClose: () => void;
  coinId: string;
  currentPrice: number;
}

export function AlertModal({ visible, onClose, coinId, currentPrice }: AlertModalProps) {
  const { alerts, addAlert, removeAlert } = useAlertStore();
  const [targetPrice, setTargetPrice] = useState("");
  const [direction, setDirection] = useState<'above' | 'below'>('above');
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 600;

  const activeAlerts = alerts.filter(
    (a) => a.coinId === coinId && a.status === 'active'
  );

  const handleSetAlert = () => {
    const price = parseFloat(targetPrice);
    if (isNaN(price) || price <= 0) return;

    addAlert(coinId, price, direction);
    setTargetPrice("");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl p-6" style={{ paddingBottom: bottom + 20, maxHeight: '80%' }}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-gray-900">
              Manage Alerts
            </Text>
            <Pressable onPress={onClose}>
              <Text className="text-gray-500 font-medium">Close</Text>
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="mb-6">
              <Text className="text-gray-600 mb-2">Current Price: ${currentPrice.toLocaleString()}</Text>
              
              <View className={`mb-4 ${isSmallScreen ? 'flex-col gap-3' : 'flex-row gap-3'}`}>
                <View className={isSmallScreen ? 'w-full' : 'w-48'}>
                   <AlertDirectionSelector value={direction} onChange={setDirection} />
                </View>
                <TextInput
                  className={`bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-lg ${isSmallScreen ? 'w-full' : 'flex-1'}`}
                  placeholder="Target Price ($)"
                  keyboardType="numeric"
                  value={targetPrice}
                  onChangeText={setTargetPrice}
                />
              </View>
              
              <Pressable
                onPress={handleSetAlert}
                className={`py-3 rounded-xl items-center ${
                  targetPrice ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                disabled={!targetPrice}
              >
                <Text className="text-white font-bold text-lg">Add Alert</Text>
              </Pressable>
            </View>

            {activeAlerts.length > 0 && (
              <View>
                <Text className="text-lg font-bold text-gray-900 mb-3">Active Alerts</Text>
                {activeAlerts.map(alert => (
                  <ActiveAlertCard 
                    key={alert.id} 
                    alert={alert} 
                    onRemove={() => removeAlert(alert.id)} 
                  />
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
