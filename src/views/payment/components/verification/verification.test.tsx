import React from 'react';

import {
    render,
    screen,
    fireEvent,
    cleanup,
    waitForElement
} from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import Verification from './verification';
import { OBMService, PaymentService } from 'services';
import { PaymentStatus } from 'enums';

let handleSubmitMock: () => void;
let handleCancelMock: () => void;
let handleErrorMock: () => void;

beforeEach(() => {
    handleSubmitMock = jest.fn();
    handleCancelMock = jest.fn();
    handleErrorMock = jest.fn();
});

afterEach(cleanup);

const setup = () => {
    const {
        container,
        getAllByTestId,
        debug
    } = render(
        <Verification
            transactionData={{
                merchant_name: 'KOPI KENANGAN',
                transaction_id: 'INV20200527-1125',
                transaction_date: 1577415411,
                amount: 150000,
                remaining_time: 300,
                phone_number: '081234567890',
                status: PaymentStatus.Unprocessed
            }}
            paymentId={'PAYMENT_ID'}
            onError={handleErrorMock}
            onSubmit={handleSubmitMock}
            onCancel={handleCancelMock}
        />
    );

    const $inputs = getAllByTestId('input');
    const $submit = screen.getByRole('button', { name: /konfirmasi/i });
    const $cancel = screen.getByRole('button', { name: /batal/i });

    return { container, $inputs, $submit, $cancel, debug };
};

it(`should render
    payment informations,
    6 inputs for otp input,
    and 2 action buttons`, () => {
    const { $inputs, $submit, $cancel } = setup();

    // payment informations
    screen.getByRole('heading', { name: /konfirmasi pembayaran/i });
    screen.getByText(/kopi kenangan/i);
    screen.getByText(/INV20200527-1125/i);
    screen.getByText(/19 Januari 1970 13:10:15/i);
    screen.getByText('150.000');

    expect($inputs).toHaveLength(6);

    // Confirm button should not emit event since the otpinput is empty
    expect($submit).toBeDisabled();
    fireEvent.click($submit);
    expect(handleSubmitMock).toHaveBeenCalledTimes(0);

    // Cancel button can be clicked
    fireEvent.click($cancel);
    expect(handleCancelMock).toHaveBeenCalledTimes(1);
});

it(`should be able to submit when the otp input is valid`, async () => {
    jest.spyOn(OBMService, 'encryptPIN')
        .mockResolvedValueOnce({
            encoding: 'p-string-result',
            encryptedPIN: 'c-string-result',
            sessionId: 'session-id',
            randomNumber: 'random-number'
        });

    jest.spyOn(PaymentService, 'executePayment')
        .mockResolvedValueOnce({
            error_schema: {
                error_code: 'X-Y-ZZZ',
                fatal_error_flag: false,
                message: 'Sukses'
            },
            output_schema: {
                status: 'Success'
            }
        });

    const { $inputs, $submit } = setup();

    fireEvent.change(document.activeElement, {
        target: { value: '1' }
    });

    // disclaimer: ini mestinya ga perlu karena focusnya otomatis pindah sih :|
    fireEvent.focus($inputs[1]);
    fireEvent.change(document.activeElement, {
        target: { value: '2' }
    });

    // disclaimer: ini mestinya ga perlu karena focusnya otomatis pindah sih :|
    fireEvent.focus($inputs[2]);
    fireEvent.change(document.activeElement, {
        target: { value: '3' }
    });

    // disclaimer: ini mestinya ga perlu karena focusnya otomatis pindah sih :|
    fireEvent.focus($inputs[3]);
    fireEvent.change(document.activeElement, {
        target: { value: '4' }
    });

    // disclaimer: ini mestinya ga perlu karena focusnya otomatis pindah sih :|
    fireEvent.focus($inputs[4]);
    fireEvent.change(document.activeElement, {
        target: { value: '5' }
    });

    // disclaimer: ini mestinya ga perlu karena focusnya otomatis pindah sih :|
    fireEvent.focus($inputs[5]);
    fireEvent.change(document.activeElement, {
        target: { value: '6' }
    });

    // submit
    expect($submit).toBeEnabled();

    fireEvent.click($submit);

    // loader should be shown
    await waitForElement(() => screen.getByTestId('loader-wrapper'));

    expect(OBMService.encryptPIN)
        .toHaveBeenCalledWith(
            'PAYMENT_ID',
            '081234567890',
            '123456'
        );

    expect(PaymentService.executePayment)
        .toHaveBeenCalledWith('PAYMENT_ID', {
            encoding: 'p-string-result',
            epin: 'c-string-result',
            session_id: 'session-id',
            random_number: 'random-number'
        });

    // loader should be removed
    expect(screen.queryByTestId('loader-wrapper')).toBeNull();

    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
});