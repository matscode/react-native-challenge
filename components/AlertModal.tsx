import { useAlertStore } from "@/store/useAlertStore";
import { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, TextInput, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as yup from 'yup';
import { ActiveAlertCard } from "./ActiveAlertCard";
import { AlertDirectionSelector } from "./AlertDirectionSelector";

const alertSchema = yup.object().shape({
  price: yup.number()
    .typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be positive')
});

interface AlertModalProps {
  visible: boolean;
  onClose: () => void;
  coinId: string;
  currentPrice: number;
}

export function AlertModal({ visible, onClose, coinId, currentPrice }: AlertModalProps) {
  const { alerts, addAlert, removeAlert } = useAlertStore();
  const [targetPrice, setTargetPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirection] = useState<'above' | 'below'>('above');
  const { top, bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 600;

  const activeAlerts = alerts.filter(
    (a) => a.coinId === coinId && a.status === 'active'
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handlePriceChange = (text: string) => {
    setTargetPrice(text);
    if (!text) {
      setError(null);
      return;
    }
    
    // Replace comma with dot for international users, though keyboardType="numeric" usually handles this
    const normalizedText = text.replace(',', '.');
    
    try {
      alertSchema.validateSync({ price: normalizedText });
      setError(null);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.message);
      }
    }
  };

  const handleSetAlert = () => {
    if (error) return;
    const price = parseFloat(targetPrice.replace(',', '.'));
    if (isNaN(price) || price <= 0) return;

    addAlert(coinId, price, direction, currentPrice);
    setTargetPrice("");
    setError(null);
  };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      transparent={true}
    >
      <View className="flex-1">
        <Pressable className="absolute inset-0 bg-black/50" onPress={onClose} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-start px-4"
          pointerEvents="box-none"
          style={{ paddingTop: top + 20 }}
        >
          <View
            className="bg-white rounded-2xl p-6 shadow-xl max-h-[80%]"
            style={{ paddingBottom: 20 }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-xl font-bold text-gray-900">
                  Manage Alerts
                </Text>
                <Pressable onPress={onClose}>
                  <Text className="text-gray-500 font-medium">Close</Text>
                </Pressable>
              </View>

              <View className="mb-6">
                <Text className="text-gray-600 mb-2">
                  Current Price: ${currentPrice.toLocaleString()}
                </Text>

                <View
                  className={`mb-4 ${isSmallScreen ? "flex-col gap-3" : "flex-row gap-3"}`}
                >
                  <View className={isSmallScreen ? "w-full" : "w-48"}>
                    <AlertDirectionSelector
                      value={direction}
                      onChange={setDirection}
                    />
                  </View>
                  <TextInput
                    className={`bg-gray-100 border ${error ? "border-red-500" : "border-gray-200"} rounded-xl px-4 py-3 text-lg ${isSmallScreen ? "w-full" : "flex-1"}`}
                    placeholder="Target Price ($)"
                    keyboardType="numeric"
                    value={targetPrice}
                    onChangeText={handlePriceChange}
                  />
                </View>
                {error && (
                  <Text className="text-red-500 text-sm mb-4 ml-1">
                    {error}
                  </Text>
                )}

                <Pressable
                  onPress={handleSetAlert}
                  className={`py-3 rounded-xl items-center ${
                    targetPrice && !error ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  disabled={!targetPrice || !!error}
                >
                  <Text className="text-white font-bold text-lg">
                    Add Alert
                  </Text>
                </Pressable>
              </View>

              {activeAlerts.length > 0 && (
                <View>
                  <Text className="text-lg font-bold text-gray-900 mb-3">
                    Active Alerts
                  </Text>
                  {activeAlerts.map((alert) => (
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
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
