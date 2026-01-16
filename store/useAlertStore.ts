import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Alert {
  id: string;
  coinId: string;
  targetPrice: number;
  type: 'above' | 'below';
  initialPrice?: number;
  status: 'active' | 'triggered';
  triggeredAt: string | null; // ISO Date
  createdAt: string; // ISO Date
  readAt: string | null;
}

interface AlertStore {
  alerts: Alert[];
  addAlert: (coinId: string, targetPrice: number, type: 'above' | 'below', initialPrice?: number) => void;
  removeAlert: (id: string) => void;
  triggerAlert: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearTriggeredAlerts: () => void;
}

export const useAlertStore = create<AlertStore>()(
  persist(
    (set) => ({
      alerts: [],
      addAlert: (coinId, targetPrice, type, initialPrice) =>
        set((state) => ({
          alerts: [
            ...state.alerts,
            {
              id: Math.random().toString(36).substring(7),
              coinId,
              targetPrice,
              type,
              initialPrice,
              status: 'active',
              triggeredAt: null,
              createdAt: new Date().toISOString(),
              readAt: null,
            },
          ],
        })),
      removeAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.filter((a) => a.id !== id),
        })),
      triggerAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.map((a) =>
            a.id === id
              ? { ...a, status: 'triggered', triggeredAt: new Date().toISOString() }
              : a
          ),
        })),
      markAsRead: (id) =>
        set((state) => ({
          alerts: state.alerts.map((a) =>
            a.id === id ? { ...a, readAt: new Date().toISOString() } : a
          ),
        })),
      markAllAsRead: () =>
        set((state) => ({
          alerts: state.alerts.map((a) =>
            a.status === 'triggered' && !a.readAt
              ? { ...a, readAt: new Date().toISOString() }
              : a
          ),
        })),
      clearTriggeredAlerts: () =>
        set((state) => ({
          alerts: state.alerts.filter((a) => a.status !== 'triggered'),
        })),
    }),
    {
      name: 'alert-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
