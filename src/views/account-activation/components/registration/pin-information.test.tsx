import React from 'react';
import 'mutationobserver-shim';
import { render, fireEvent, cleanup, wait, screen } from '@testing-library/react';

import PINInformation from './pin-information';

let handleSubmitMock: (pin: string) => void

beforeEach(() => {
    handleSubmitMock = jest.fn();
});

afterEach(cleanup);

const setup = () => {
    const { debug, getByLabelText, getByText } = render(<PINInformation onSubmit={handleSubmitMock} />);

    return {
        debug,
        $pinInput: getByLabelText('Buat PIN Sakuku'),
        $rePinInput: getByLabelText('Ulangi PIN Sakuku'),
        $submitButton: getByText(/lanjut/i)
    };
}

// it(`on initial: should render blank forms with disabled button`, async () => {
//     const { $pinInput, $rePinInput, $submitButton } = setup();

//     expect($pinInput).toHaveValue('');
//     expect($rePinInput).toHaveValue('');

//     await wait(() => {
//         expect($submitButton).toBeDisabled();
//     });
// });

it(`should be able to submit when input was completed`, async () => {
    const { $pinInput, $rePinInput, $submitButton } = setup();

    fireEvent.input($pinInput, { target: { value: '123987' } });
    fireEvent.input($rePinInput, { target: { value: '123987' } });

    fireEvent.click($submitButton);

    await wait(() => {
        expect(handleSubmitMock).toHaveBeenCalledWith('123987');
    });
});

it(`should not be able to submit when pin was incorrect (rePin != pin)`, async () => {
    const { $pinInput, $rePinInput, $submitButton } = setup();

    // await wait(() => {
    fireEvent.input($pinInput, { target: { value: '999999' } });
    // });
    // await wait(() => {
    fireEvent.input($rePinInput, { target: { value: '111111' } });
    // });
    fireEvent.click($submitButton);

    await wait(() => {
        screen.getByText(/konfirmasi pin tidak sesuai/i);
        expect(handleSubmitMock).not.toHaveBeenCalled();
    });
});