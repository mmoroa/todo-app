import LoginForm from '../pages/authentications/components/LoginForm';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const renderLoginForm = () => {
    return render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>,
    );
};

describe('<LoginForm />', () => {
    test('should display a blank login form', async () => {
        const { findByTestId } = renderLoginForm();

        const emailField = await findByTestId('email');
        const passwordField = await findByTestId('password');
        expect(emailField.getAttribute('value')).toBe('');
        expect(passwordField.getAttribute('value')).toBe(null);
    });

    test('should allow entering a email address', async () => {
        const { findByTestId } = renderLoginForm();

        const email = await findByTestId('email');

        fireEvent.change(email, { target: { value: 'admin@test.com' } });
        expect(email.getAttribute('value')).toBe('admin@test.com');
    });

    test('should allow entering a password', async () => {
        const { findByTestId } = renderLoginForm();
        const password = await findByTestId('password');

        fireEvent.change(password, { target: { value: 'test123' } });
        expect(password.getAttribute('value')).toBe('test123');
    });

    it('should show invalid field errors for each invalid input field', async () => {
        const { findByTestId, findByText } = renderLoginForm();

        const submitButton = await findByTestId('signInButton');

        fireEvent.click(submitButton);

        const emailField = await findByText("'email' is required");
        const passwordField = await findByText("'password' is required");

        expect(emailField).toBeVisible();
        expect(passwordField).toBeVisible();
    });
});
