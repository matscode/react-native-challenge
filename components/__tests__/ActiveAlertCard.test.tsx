import { Alert } from '@/store/useAlertStore';
import { render, userEvent } from '@testing-library/react-native';
import { ActiveAlertCard } from '../ActiveAlertCard';

const mockAlert: Alert = {
  id: '1',
  coinId: 'bitcoin',
  targetPrice: 50000,
  type: 'above',
  status: 'active',
  triggeredAt: null,
  createdAt: new Date().toISOString(),
  readAt: null,
  initialPrice: 45000,
};

describe('ActiveAlertCard', () => {
  it('renders correctly', () => {
    const { getByText } = render(<ActiveAlertCard alert={mockAlert} />);
    
    expect(getByText('Price rises above')).toBeTruthy();
    expect(getByText('$50,000')).toBeTruthy();
    expect(getByText('Entry: $45,000')).toBeTruthy();
  });

  it('calls onRemove when delete button is pressed', async () => {
    const onRemove = jest.fn();
    const { getByTestId } = render(<ActiveAlertCard alert={mockAlert} onRemove={onRemove} />);
    
    const user = userEvent.setup();
    await user.press(getByTestId('remove-alert-button'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
