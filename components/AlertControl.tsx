import * as Notifications from 'expo-notifications';
import { useState } from "react";
import { Alert } from "react-native";
import { AlertModal } from "./AlertModal";
import { AlertTriggerButton } from "./AlertTriggerButton";

interface AlertControlProps {
  coinId: string;
  currentPrice: number;
}

export function AlertControl({ coinId, currentPrice }: AlertControlProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    
    if (status === 'granted') {
      setModalVisible(true);
      return;
    }

    Alert.alert(
      "Permission Required",
      "To receive price alerts, you need to enable notifications for this app.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Enable", 
          onPress: async () => {
            const { status: newStatus } = await Notifications.requestPermissionsAsync();
            if (newStatus === 'granted') {
              setModalVisible(true);
            }
          } 
        }
      ]
    );
  };

  return (
    <>
      <AlertTriggerButton onPress={handlePress} />
      <AlertModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        coinId={coinId}
        currentPrice={currentPrice}
      />
    </>
  );
}
