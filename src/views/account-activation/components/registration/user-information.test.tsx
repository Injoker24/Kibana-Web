import React from 'react';
import 'mutationobserver-shim';
import { render, screen, fireEvent, cleanup, wait } from '@testing-library/react';

import UserInformation from './user-information';

let handleSubmitMock: (data: { name: string, email: string }) => void

beforeEach(() => {
    handleSubmitMock = jest.fn();
});

afterEach(cleanup);

const setup = () => {
    const { debug, getByLabelText, getByText } = render(<UserInformation onSubmit={handleSubmitMock} />);

    return {
        debug,
        $nameInput: getByLabelText(/nama/i),
        $emailInput: getByLabelText(/alamat email/i),
        $submitButton: getByText(/lanjut/i)
    };
}

// it(`on initial: should render blank forms with disabled button`, async () => {
//     const { $submitButton } = setup();

//     await wait(() => {
//         expect($submitButton).toBeDisabled();
//     });
// });

it(`should be able to submit when input was completed`, async () => {
    const { $nameInput, $emailInput, $submitButton } = setup();

    fireEvent.input($nameInput, { target: { value: 'Andika Putra' } })
    fireEvent.input($emailInput, { target: { value: 'andika_putra@bca.co.id' } });

    fireEvent.click($submitButton);

    await wait(() => {
        expect(handleSubmitMock).toHaveBeenCalledWith({
            name: 'Andika Putra',
            email: 'andika_putra@bca.co.id'
        });
    });
});

it(`should not be able to submit when input was incomplete`, async () => {
    const { $nameInput, $submitButton } = setup();

    fireEvent.input($nameInput, { target: { value: 'Andika Putra' } });
    fireEvent.click($submitButton);

    await wait(() => {
        expect(screen.getByText(/alamat email harus diisi/i)); // empty email

        expect(handleSubmitMock).not.toHaveBeenCalled();
    });
});

it(`should handle email validation`, async () => {
    const { $emailInput, $submitButton } = setup();

    fireEvent.input($emailInput, { target: { value: 'wrong-email-format' } });
    fireEvent.click($submitButton);

    await wait(() => {
        expect(screen.getByText(/nama harus diisi/i)); // empty name
        expect(screen.getByText(/format alamat email salah/i)); // invalid email
    });
});

it(`should handle invalid name input`, async () => {
    const { $nameInput, $submitButton } = setup();

    fireEvent.input($nameInput, { target: { value: 'Jack 5' } });
    fireEvent.click($submitButton);

    await wait(() => {
        expect(screen.getByText(/format nama salah/i));
    });
});