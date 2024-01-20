import React from 'react';
import 'mutationobserver-shim';
import { render, fireEvent, cleanup, wait, screen } from '@testing-library/react';

import Verification from './verification';
import { AccountActivationService } from 'services';

let handleSubmitMock: () => void,
    handleErrorMock: () => void;

beforeEach(() => {
    handleSubmitMock = jest.fn();
    handleErrorMock = jest.fn();
});

afterEach(cleanup);

const setup = () => {
    const { debug } = render(
        <Verification
            merchantId={'MERCHANT_ID'}
            requestId={'REQUEST_ID'}
            phoneNumber={'081802866612'}
            onError={handleErrorMock}
            onSubmit={handleSubmitMock} />
    );

    return {
        debug,
        $header: screen.getByText(/Aktivasi/i),
    };
}

it(`should be able to verify`, async () => {
    jest.spyOn(AccountActivationService, 'generateOTP')
        .mockResolvedValueOnce({
            error_schema: {
                error_code: 'X-Y-ZZZ',
                fatal_error_flag: false,
                message: 'Sukses'
            },
            output_schema: {
                otp_status: 'SUKSES'
            }
        });

    jest.spyOn(AccountActivationService, 'verifyOTP')
        .mockResolvedValueOnce({
            error_schema: {
                error_code: 'X-Y-ZZZ',
                fatal_error_flag: false,
                message: 'Sukses'
            },
            output_schema: {
                otp_status: 'SUKSES',
                is_registered: true,
                chaining_id: 'CHAINING_DUMMY'
            }
        });

    setup();


    //#region Step Information
    const $submitButton = screen.getByRole('button', { name: /lanjut/i });
    // display the given phone number
    screen.getByText(/081802866612/i);

    // display fee information
    // screen.getByText(/registrasi ini dikenakan biaya sms/i);

    // disabled submit button
    expect($submitButton).toBeDisabled();

    // input birth date
    // Select 10
    fireEvent.change(screen.getByTestId('select-day'), {
        target: { value: 10 }
    });

    // Select June
    fireEvent.change(screen.getByTestId('select-month'), {
        target: { value: 5 }
    });

    // Select 2000
    fireEvent.change(screen.getByTestId('select-year'), {
        target: { value: 2000 }
    });

    expect($submitButton).toBeEnabled();

    await wait(() => {
        fireEvent.click($submitButton);
    });

    expect(AccountActivationService.generateOTP)
        .toHaveBeenCalledWith('REQUEST_ID', {
            merchant_id: 'MERCHANT_ID',
            phone_number: '081802866612'
        });
    //#endregion

    //#region Step OTP Input
    const $confirmButton = screen.getByRole('button', { name: /konfirmasi/i });

    // disabled confirm button
    expect($confirmButton).toBeDisabled();

    // display information
    screen.getByText(/bca telah mengirim sms berisi 6 digit kode verifikasi ke nomor handphone/i);

    // display fee information
    // screen.getByText(/registrasi ini dikenakan biaya sms/i);

    // complete all inputs. Note: the active element will be automatically selected
    fireEvent.input(document.activeElement, { target: { value: '1' } });
    fireEvent.input(document.activeElement, { target: { value: '2' } });
    fireEvent.input(document.activeElement, { target: { value: '3' } });
    fireEvent.input(document.activeElement, { target: { value: '4' } });
    fireEvent.input(document.activeElement, { target: { value: '5' } });
    fireEvent.input(document.activeElement, { target: { value: '6' } });

    expect($confirmButton).toBeEnabled();

    await wait(() => {
        fireEvent.click($confirmButton);
    });

    expect(AccountActivationService.verifyOTP)
        .toHaveBeenCalledWith('REQUEST_ID', {
            merchant_id: 'MERCHANT_ID',
            phone_number: '081802866612',
            birth_date: '2000-06-10',
            otp_code: '123456'
        });

    expect(handleSubmitMock).toHaveBeenCalledWith({
        chaining_id: 'CHAINING_DUMMY',
        birth_date: '2000-06-10',
        is_registered: true
    });
    //#endregion
});