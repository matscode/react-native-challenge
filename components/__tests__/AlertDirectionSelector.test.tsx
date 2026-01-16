import { render, userEvent } from '@testing-library/react-native';
import { AlertDirectionSelector } from '../AlertDirectionSelector';

describe('AlertDirectionSelector', () => {
  it('renders correctly with initial value', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<AlertDirectionSelector value="above" onChange={onChange} />);
    
    // Check if both options are present
    expect(getByTestId('direction-above')).toBeTruthy();
    expect(getByTestId('direction-below')).toBeTruthy();
  });

  it('calls onChange when options are selected', async () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<AlertDirectionSelector value="above" onChange={onChange} />);
    
    const user = userEvent.setup();
    await user.press(getByTestId('direction-below'));
    expect(onChange).toHaveBeenCalledWith('below');

    await user.press(getByTestId('direction-above'));
    expect(onChange).toHaveBeenCalledWith('above');
  });
});
