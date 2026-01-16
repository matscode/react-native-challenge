# Crypto Chart Viewer + Price Alerts: Coinscout

> **Note**: For the original coding challenge instructions and requirements, please see [PROJECT_INSTRUCTIONS.md](./PROJECT_INSTRUCTIONS.md).

## 📥 Download APK

You can download the latest build here: [Download APK](https://expo.dev/artifacts/eas/eLz8JnKN5Rrgu4N2bHKrHS.apk) | [Mirror Link](https://drive.google.com/file/d/1PRNCySnK0qdg2hO6vIsy-2316cGkFRAC/view?usp=sharing)

## Overview

### Approach

This app uses a React Native + Expo stack with:

- **Expo Router** for navigation (Drawer + Stack).
- **Zustand** for global state management (Coins, Alerts, Chart settings).
- **TanStack Query** for efficient data fetching and caching (CoinGecko API).
- **NativeWind** for utility-first styling.
- **react-native-wagmi-charts** for interactive, high-performance charts.
- **expo-notifications** for local price alerts.
- **react-native-keyboard-controller** for robust keyboard handling in modals.
- **yup** for form validation.

The architecture separates concerns:

- `store/`: State logic.
- `components/`: UI components and Logic-only components (like `AlertManager`).
- `app/`: Routing and screen layout.
- `hooks/`: Custom hooks (e.g., notification setup).

## 📝 Implementation Checklist

- [x] **Project Setup**: Clean up, install packages (Zustand, Wagmi Charts, NativeWind, TanStack Query, Phosphor), configure NativeWind
- [x] **Navigation**: Setup Drawer Navigation with 10 cryptos
- [x] **Data Fetching**: Fetch crypto data (CoinGecko)
- [x] **Detail Screen**:
  - [x] Display Current Price
  - [x] Interactive Chart (wagmi-charts)
- [x] **Alerts System**:
  - [x] Set Price Alerts
  - [x] Trigger Logic
  - [x] Notification Icon & Badge
  - [x] Alerts History Screen (shows Entry Price)
- [x] **Styling**: Polish UI with NativeWind
- [x] **Unit Tests**:
  - [x] AlertModal
  - [x] AlertControl
  - [x] ActiveAlertCard
  - [x] AlertDirectionSelector
- [x] **Bonus Features**:
  - [x] Animations on the chart render
  - [x] Persist alert state across app restarts
  - [x] Send **push notifications** when a price alert is triggered
  - [x] Implement **deep linking** so that tapping a push notification opens the **Alerts screen** directly

## How to Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. **Run Unit Tests**:

   To verify the logic and components:

   ```bash
   npm test
   ```

3. **Configure Environment** (Optional):

   - **`EXPO_PUBLIC_ENABLE_FUTURE_CROSSING_ALERTS`** (Default: `true`)
     - Controls alert logic. If `true`, alerts only trigger when price *crosses* the target. If `false` (for testing), triggers immediately if condition met.
   - **`EXPO_PUBLIC_ENABLE_PRICE_MONITOR_POLLING`** (Default: `true`)
     - Set to `true` to enable background polling for price alerts (every 30s) while app is open.
   - **`EXPO_PUBLIC_ENABLE_CHART_POLLING`** (Default: `true`)
     - Set to `true` to enable live chart updates (every 30s).

4. Start the development server:

   ```bash
   npx expo start
   ```

5. Run on Android/iOS simulator or device.

6. **Build APK for Android**:

   To generate an installable APK for testing or direct distribution:

   ```bash
   eas build -p android --profile production
   ```

   *Note: This produces an APK instead of an AAB due to the updated configuration in `eas.json`.*

## Trade-offs & Limitations

### 1. No Alert Editing

- **Create/Delete Only**: Users cannot edit an existing alert. They must delete it and create a new one.
  - *Rationale*: Simplifies the UI and state management for this assessment.

### 2. Foreground Monitoring

- **Polling Mechanism**: Price monitoring runs via `AlertManager` inside the React Native app context.
  - *Limitation*: Alerts only trigger while the app is running (foreground or background while active). If the app is killed, price monitoring stops.
  - *Solution for Production*: A backend service (server-side) should monitor prices and send remote push notifications (FCM/APNs) to wake the device.

### 3. API Limits

- **CoinGecko Free Tier**: The app polls every 30 seconds to respect rate limits. Real-time updates via WebSockets were skipped to avoid complexity and rate limit issues.

### 4. Alert Modal Design

- **Top Position**: The alert modal is positioned at the top of the screen rather than a bottom sheet.
  - *Rationale*: Improves usability with the keyboard, preventing the input from being covered.
- **Height Constraint**: The modal has a maximum height of 80% of the screen.
  - *Trade-off*: While this prevents the modal from expanding off-screen with many alerts, it requires scrolling for long lists.

## 🎓 Lessons Learned

### NativeWind & Shadows

**NativeWind's `shadow-*` classes don't map 1:1 to React Native** because native platforms handle shadows differently than web CSS.

- **Issue**: React Native uses `elevation` (Android) and specific shadow properties (iOS), which don't perfectly align with Tailwind's `box-shadow` utilities.
- **Impact**: In this project, attempting to use these classes caused unexpected errors like `"Couldn't find a navigation context"` during state changes (global or local).
- **Lesson**: `shadow-*` utilities are web-centric and often fail on mobile. Use platform-native properties (e.g., `elevation` on Android) to ensure correct shadow rendering.

## ⚖️ Tradeoffs & Performance Opportunities

### Tradeoffs

- **Polling vs. WebSockets**: We use polling (every 30s) for simplicity and API cost management (CoinGecko free tier).
  - *Pro*: Easy to implement, predictable API usage.
  - *Con*: Data is not truly real-time (up to 30s latency). WebSockets would be better for a "pro" trading experience but require a paid plan or a different provider.

- **No Caching**: We disabled `tanstack-query` caching for charts.
  - *Pro*: Always shows the latest data.
  - *Con*: Higher bandwidth usage and potential "flicker" or loading state on every navigation or rotation.

### Performance Opportunities

- **Optimized Polling**: Instead of two separate polls (one for alert checks, one for chart data), we could consolidate them into a single global store action that fetches price data once and distributes it. currently, we might be double-fetching for the same coin if the user is viewing its chart.

- **Render Optimization**: The `AlertModal` re-renders entirely when typing the price. Separating the form state into a smaller sub-component would reduce render work.

## 🚀 Improvement Opportunities

- **Chart Features**:
  - Add timeline toggle (1d, 7d, 1m, 1y).
  - Add interactivity: Pan, Zoom, Grid lines.
- **UI/UX**:
  - **Dark Mode** support.
  - Improved navigation with back buttons and smoother transitions.
  - **Onboarding Flow**: A journey map or tutorial to introduce features to new users.
- **Testing**:
  - **Robust Strategy**: Implement a consistent `testID` naming convention (e.g., `ScreenName.ComponentName.Element`) to avoid conflicts and improve test maintainability.
  - **Expanded Coverage**: Add tests for `AlertManager` (polling logic), `useAlertStore`, and Chart components.
  - **E2E Tests**: Add Maestro or Detox for end-to-end user flow validation.
