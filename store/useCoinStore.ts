import { create } from 'zustand';
import { Coin } from '@/types';

interface CoinStore {
  coins: Coin[];
  isLoading: boolean;
  error: string | null;
  fetchCoins: () => Promise<void>;
}

export const useCoinStore = create<CoinStore>((set) => ({
  coins: [],
  isLoading: false,
  error: null,
  fetchCoins: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );
      if (!response.ok) throw new Error('Failed to fetch coins');
      const data = await response.json();
      set({ coins: data, isLoading: false });
    } catch (error) {
      console.error('Fetch error:', error);
      // Fallback or error state
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
