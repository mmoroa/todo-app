import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from '../pages/authentications/components/RegisterForm';

const renderRegisterForm = () => {
    return render(
        <MemoryRouter>
            <RegisterForm />
        </MemoryRouter>,
    );
};

describe('<RegisterFrom />', () => {
    test('should display a blank register form', async () => {
        const { findByTestId } = renderRegisterForm();

        const usernameField = await findByTestId('username');
        const emailField = await findByTestId('email');
        const passwordField = await findByTestId('password');
        expect(usernameField.getAttribute('value')).toBe('');
        expect(emailField.getAttribute('value')).toBe('');
        expect(passwordField.getAttribute('value')).toBe(null);
    });

    test('should allow entering a username', async () => {
        const { findByTestId } = renderRegisterForm();

        const email = await findByTestId('username');

        fireEvent.change(email, { target: { value: 'moroa' } });
        expect(email.getAttribute('value')).toBe('moroa');
    });

    test('should allow entering a email address', async () => {
        const { findByTestId } = renderRegisterForm();

        const email = await findByTestId('email');

        fireEvent.change(email, { target: { value: 'admin@test.com' } });
        expect(email.getAttribute('value')).toBe('admin@test.com');
    });

    test('should allow entering a password', async () => {
        const { findByTestId } = renderRegisterForm();
        const password = await findByTestId('password');

        fireEvent.change(password, { target: { value: 'test123' } });
        expect(password.getAttribute('value')).toBe('test123');
    });

    it('should show invalid field errors for each invalid input field', async () => {
        const { findByTestId, findByText } = renderRegisterForm();

        const submitButton = await findByTestId('signUpButton');

        fireEvent.click(submitButton);

        const emailField = await findByText("'email' is required");
        const passwordField = await findByText('password is required');
        const usernameField = await findByText('Username is required');

        expect(emailField).toBeVisible();
        expect(passwordField).toBeVisible();
        expect(usernameField).toBeVisible();
    });
});
