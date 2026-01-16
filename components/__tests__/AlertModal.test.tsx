import { useAlertStore } from '@/store/useAlertStore';
import { fireEvent, render } from '@testing-library/react-native';
import { AlertModal } from '../AlertModal';

// Mock store
jest.mock('@/store/useAlertStore', () => ({
  useAlertStore: jest.fn(),
}));

// Mock safe area context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

describe('AlertModal', () => {
  const mockAddAlert = jest.fn();
  const mockRemoveAlert = jest.fn();

  beforeEach(() => {
    (useAlertStore as unknown as jest.Mock).mockReturnValue({
      alerts: [],
      addAlert: mockAddAlert,
      removeAlert: mockRemoveAlert,
    });
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    const onClose = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <AlertModal visible={true} onClose={onClose} coinId="bitcoin" currentPrice={50000} />
    );

    expect(getByText('Manage Alerts')).toBeTruthy();
    expect(getByText('Current Price: $50,000')).toBeTruthy();
    expect(getByPlaceholderText('Target Price ($)')).toBeTruthy();
  });

  it('adds alert when valid price is entered', () => {
    const onClose = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <AlertModal visible={true} onClose={onClose} coinId="bitcoin" currentPrice={50000} />
    );

    fireEvent.changeText(getByPlaceholderText('Target Price ($)'), '60000');
    fireEvent.press(getByText('Add Alert'));

    expect(mockAddAlert).toHaveBeenCalledWith('bitcoin', 60000, 'above', 50000);
  });

  it('shows error for invalid price', () => {
    const onClose = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <AlertModal visible={true} onClose={onClose} coinId="bitcoin" currentPrice={50000} />
    );

    fireEvent.changeText(getByPlaceholderText('Target Price ($)'), '-100');
    
    expect(getByText('Price must be positive')).toBeTruthy();
  });
});
