import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent, waitForElement } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import Payment from './payment';
import { PaymentService, OBMService } from 'services';
import { PaymentStatus } from 'enums';

/** Should be put on test-utils? */
function renderWithRouterMatch(
    ui: React.FC,
    {
        path = '/',
        //@ts-ignore
        route = '/',
        history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
) {
    return {
        ...render(
            <Router history={history}>
                <Route
                    path={path}
                    component={ui}
                />
            </Router>
        ),
        history
    }
}

it(`should be able to pay`, async () => {

    // @ts-ignore
    window.opener = {
        postMessage: jest.fn()
    }

    // mock service, return value xyz
    jest.spyOn(PaymentService, 'getPaymentDetail')
        .mockResolvedValue({
            error_schema: {
                error_code: 'X-Y-ZZZ',
                fatal_error_flag: false,
                message: 'Sukses'
            },
            output_schema: {
                amount: 265000,
                merchant_name: 'Kopi Kenangan',
                remaining_time: 300,
                transaction_date: 1594721163000,
                transaction_id: '20200715001',
                phone_number: '081234567890',
                status: PaymentStatus.Unprocessed
            }
        });

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

    renderWithRouterMatch(Payment, {
        route: '/id/payment/AA86C0C3F230638AE05400144FFBD319',
        path: '/id/payment/:paymentId'
    });

    await waitForElement(() => screen.getByTestId('loader-wrapper'));

    //#region Confirmation (removed)
    // screen.getByRole('heading', { name: /konfirmasi pembayaran/i });
    // screen.getByText(/kopi kenangan/i);
    // screen.getByText(/no. transaksi #20200715001/i);
    // screen.getByText(/14 Juli 2020 17:06:03/i);

    // screen.getByRole('button', { name: /batal/i });

    // fireEvent.click(screen.getByRole('button', { name: /lanjut/i }));
    //#endregion

    //#region PIN Verification

    screen.getByRole('heading', { name: /konfirmasi pembayaran/i });
    screen.getByText(/kopi kenangan/i);
    screen.getByText(/no. transaksi #20200715001/i);
    screen.getByText(/14 Juli 2020 17:06:03/i);

    screen.getByText(/masukkan pin sakuku/i);

    const $inputs = screen.getAllByTestId('input');

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

    screen.getByRole('button', { name: /batal/i });

    fireEvent.click(screen.getByRole('button', { name: /konfirmasi/i }));

    await waitForElement(() => screen.getByTestId('loader-wrapper'));

    expect(OBMService.encryptPIN)
        .toHaveBeenCalledWith(
            'AA86C0C3F230638AE05400144FFBD319',
            '081234567890',
            '123456'
        );

    expect(PaymentService.executePayment)
        .toHaveBeenCalledWith('AA86C0C3F230638AE05400144FFBD319', {
            encoding: 'p-string-result',
            epin: 'c-string-result',
            session_id: 'session-id',
            random_number: 'random-number'
        });
    //#endregion

    //#region Emit Completed
    expect(window.opener.postMessage).toHaveBeenCalledWith('Completed', '*');
    //#endregion
});

it(`should be able to cancel the transaction`, async () => {
    // @ts-ignore
    window.opener = {
        postMessage: jest.fn()
    }

    // mock service, return value xyz
    jest.spyOn(PaymentService, 'getPaymentDetail')
        .mockResolvedValue({
            error_schema: {
                error_code: 'X-Y-ZZZ',
                fatal_error_flag: false,
                message: 'Sukses'
            },
            output_schema: {
                amount: 265000,
                merchant_name: 'Kopi Kenangan',
                remaining_time: 300,
                transaction_date: 1594721163000,
                transaction_id: '20200715001',
                phone_number: '081234567890',
                status: PaymentStatus.Unprocessed
            }
        });

    renderWithRouterMatch(Payment, {
        route: '/id/payment/AA86C0C3F230638AE05400144FFBD319',
        path: '/id/payment/:paymentId'
    });

    await waitForElement(() => screen.getByTestId('loader-wrapper'));

    const $cancelBtn = screen.getByRole('button', { name: /batal/i });
    fireEvent.click($cancelBtn);

    expect(window.opener.postMessage).toHaveBeenCalledWith('Failed', '*');
});
