import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // Create a Jest mock function
      const onSubmit = jest.fn();

      // Render the SignInContainer component with the mock function as a prop
      render(<SignInContainer onSubmit={onSubmit} />);
      
      // Fill the text inputs
      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
      
      // Press the submit button
      fireEvent.press(screen.getByText('Sign in'));

      // Wait for the onSubmit function to be called
      await waitFor(() => {
        // Check if the onSubmit function was called once
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // Check if the onSubmit function was called with the correct arguments
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});