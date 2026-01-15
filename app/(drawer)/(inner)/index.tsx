import { useCoinStore } from "@/store/useCoinStore";
import { Redirect } from "expo-router";

export default function Home() {
  const { coins } = useCoinStore();
  const firstCoin = coins[0];

  if (!firstCoin) {
    return null;
  }

  return <Redirect href={`/(drawer)/(inner)/${firstCoin.id}`} />;
}
