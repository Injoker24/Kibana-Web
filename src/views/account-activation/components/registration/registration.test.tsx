import React from 'react';
import 'mutationobserver-shim';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';

import Registration from './registration';
import { AccountActivationService, OBMService } from 'services';

let handleSubmitMock: () => void,
    handleErrorMock: () => void

beforeEach(() => {
    handleSubmitMock = jest.fn();
    handleErrorMock = jest.fn();
});

afterEach(cleanup);

const setup = () => {
    const { debug, getByText, getByLabelText } =
        render(
            <Registration
                requestId={'REQUEST_ID'}
                phoneNumber={'081234567890'}
                birthDate={'2016-04-02'}
                chainingId={'CHAINING_ID'}
                onError={handleErrorMock}
                onSubmit={handleSubmitMock} />
        );

    return {
        debug,
        getByText,
        getByLabelText,

        $header: getByText(/registrasi/i),
    };
}

it(`should be able to create new user`, async () => {

    jest.spyOn(OBMService, 'encryptPIN')
        .mockResolvedValueOnce({
            encoding: 'p-string-result',
            encryptedPIN: 'c-string-result',
            sessionId: 'session-id',
            randomNumber: 'random-number'
        });

    jest.spyOn(AccountActivationService, 'createNewUser')
        .mockResolvedValue({
            error_schema: {
                error_code: 'X-Y-ZZZ',
                fatal_error_flag: false,
                message: 'Sukses'
            },
            output_schema: {
                status: 'Success'
            }
        });

    const { getByText, getByLabelText } = setup();

    fireEvent.input(getByLabelText(/nama/i), { target: { value: 'Andika Putra' } });
    fireEvent.input(getByLabelText(/email/i), { target: { value: 'andika@mail.com' } });

    await wait(() => {
        fireEvent.click(getByText(/lanjut/i));
    });

    fireEvent.input(getByLabelText(/buat pin sakuku/i), { target: { value: '123987' } });
    fireEvent.input(getByLabelText(/ulangi pin sakuku/i), { target: { value: '123987' } });

    await wait(() => {
        fireEvent.click(getByText(/lanjut/i));
    });

    expect(OBMService.encryptPIN)
        .toHaveBeenCalledWith('REQUEST_ID', '081234567890', '123987');

    expect(AccountActivationService.createNewUser).toHaveBeenCalledWith(
        'REQUEST_ID',
        {
            birth_date: '2016-04-02',
            customer_name: 'Andika Putra',
            email: 'andika@mail.com',
            encoding: 'p-string-result',
            epin: 'c-string-result',
            session_id: 'session-id',
            chaining_id: 'CHAINING_ID',
            random_number: 'random-number'
        }
    );
});