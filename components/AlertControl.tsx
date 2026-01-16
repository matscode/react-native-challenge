import { useState } from "react";
import { AlertModal } from "./AlertModal";
import { AlertTriggerButton } from "./AlertTriggerButton";

interface AlertControlProps {
  coinId: string;
  currentPrice: number;
}

export function AlertControl({ coinId, currentPrice }: AlertControlProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <AlertTriggerButton onPress={() => setModalVisible(true)} />
      <AlertModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        coinId={coinId}
        currentPrice={currentPrice}
      />
    </>
  );
}
