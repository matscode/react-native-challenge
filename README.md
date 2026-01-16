# 🧪 React Native Coding Challenge

## Crypto Chart Viewer + Price Alerts

### 🔍 Overview

Build a **Crypto Chart Viewer app** using **React Native with Expo** that:

- Displays interactive price charts for **10 cryptocurrencies**
- Allows users to navigate via a **drawer**
- Enables users to set **price alerts** per crypto
- Shows a notification indicator when an alert is triggered
- Lets users review and clear triggered alerts

---

## 📝 Implementation Checklist

- [x] **Project Setup**: Clean up, install packages (Zustand, Wagmi Charts, NativeWind, TanStack Query, Phosphor), configure NativeWind
- [x] **Navigation**: Setup Drawer Navigation with 10 cryptos
- [x] **Data Fetching**: Fetch crypto data (CoinGecko)
- [x] **Detail Screen**:
  - [x] Display Current Price
  - [x] Interactive Chart (wagmi-charts)
- [x] **Alerts System**:
  - [x] Set/Update Price Alerts
  - [x] Trigger Logic
  - [x] Notification Icon & Badge
  - [x] Alerts History Screen
- [x] **Styling**: Polish UI with NativeWind

---

## 🎯 Objectives

### 🧭 Navigation

- Implement **drawer navigation**
- The drawer should be a list of **10 cryptocurrencies** by market cap
- Selecting a currency opens a **detail screen** for that cryptocurrency

---

### 📈 Crypto Detail Screen

- Show a **price chart** (e.g., last 24h or 7d)
- Display the **current price**
- Allow users to **set a price alert** (e.g., "Notify me if the price goes above $70,000")
- If an alert is already active, display it with an option to cancel or update

---

### 🚨 Alerts System

- Display a **notification icon** in the top-right of the app
  - Show a badge or indicator when **any alert is triggered**
- Tapping the icon opens an **Alerts screen**
  - List all **triggered alerts** with timestamps UTC
- When alerts are displayed in the log, they are **cleared** and not shown again

---

## 🧩 Technical Requirements

- Use **React Native with Expo**
- Style the app using **NativeWind**
  - How you style is up to you
- Implement real-time or frequently updated price tracking
- State management (Your choice of framework)
- Use **TypeScript** and clean, modular code
- The app should work smoothly on both **iOS and Android**

---

## ✅ What We’re Looking For

- Scalable app structure and clean state architecture
- Good UX around charts, alert creation, and notifications
- Clear handling of edge cases (e.g., API failures, invalid inputs, rapid price changes)
- Maintainable TypeScript usage and reusable components

---

## 💡 Bonus (Optional)

- Animations on the chart render
- Persist alert state across app restarts
- Send **push notifications** when a price alert is triggered
- Implement **deep linking** so that tapping a push notification opens the **Alerts screen** directly

---

## 📝 Submission Instructions

- Include an `OVERVIEW.md` with:
  - A short overview of your approach
  - Instructions for running the app
  - Any limitations, trade-offs, or assumptions made
- Fork this REPO and push your code
- Create an apk build and share a link to download it in the README.

---

## ⚖️ Tradeoffs & Performance Opportunities

### Tradeoffs
*   **Polling vs. WebSockets**: We use polling (every 30s) for simplicity and API cost management (CoinGecko free tier).
    *   *Pro*: Easy to implement, predictable API usage.
    *   *Con*: Data is not truly real-time (up to 30s latency). WebSockets would be better for a "pro" trading experience but require a paid plan or a different provider.
*   **No Caching**: We disabled `tanstack-query` caching (`gcTime: 0`) for charts.
    *   *Pro*: Always shows the latest data.
    *   *Con*: Higher bandwidth usage and potential "flicker" or loading state on every navigation or rotation.

### Performance Opportunities
*   **Optimized Polling**: Instead of two separate polls (one for alert checks, one for chart data), we could consolidate them into a single global store action that fetches price data once and distributes it. currently, we might be double-fetching for the same coin if the user is viewing its chart.
*   **Background Fetch**: For alerts, we rely on the app being open. Using `expo-background-fetch` or native modules would allow price monitoring even when the app is backgrounded or killed (crucial for a real production app).
*   **Render Optimization**: The `AlertModal` re-renders entirely when typing the price. Separating the form state into a smaller sub-component would reduce render work.
