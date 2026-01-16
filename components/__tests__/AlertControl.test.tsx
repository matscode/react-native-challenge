import { render, userEvent, waitFor } from '@testing-library/react-native';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';
import { AlertControl } from '../AlertControl';

// Mock expo-notifications
jest.mock('expo-notifications', () => ({
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
}));

// Mock AlertModal since we are testing AlertControl logic, not the modal itself
jest.mock('../AlertModal', () => {
  const { View } = require('react-native');
  return {
    AlertModal: ({ visible }: { visible: boolean }) => (visible ? <View testID="alert-modal" /> : null),
  };
});

describe('AlertControl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('opens modal if permissions are granted', async () => {
    (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'granted' });
    
    const { getByTestId, findByTestId } = render(<AlertControl coinId="bitcoin" currentPrice={50000} />);
    
    const user = userEvent.setup();
    await user.press(getByTestId('alert-trigger-button'));
    
    expect(await findByTestId('alert-modal')).toBeTruthy();
  });

  it('requests permissions if not granted', async () => {
    (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'undetermined' });
    const alertSpy = jest.spyOn(Alert, 'alert');
    
    const { getByTestId } = render(<AlertControl coinId="bitcoin" currentPrice={50000} />);
    
    const user = userEvent.setup();
    await user.press(getByTestId('alert-trigger-button'));
    
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalled();
    });
  });
});
