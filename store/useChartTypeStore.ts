import { create } from 'zustand';

type ChartType = 'line' | 'candle';

interface ChartTypeStore {
  chartType: ChartType;
  setChartType: (type: ChartType) => void;
}

export const useChartTypeStore = create<ChartTypeStore>((set) => ({
  chartType: 'line',
  setChartType: (type) => set({ chartType: type }),
}));
