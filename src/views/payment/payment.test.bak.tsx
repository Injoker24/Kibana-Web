import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent, waitForElement } from '@testing-library/react';

import Payment from './payment';
import { PaymentService } from 'services';

/** Should be put on test-utils? */
function renderWithRouter(
    ui: {},
    {
        //@ts-ignore
        route = '/12345678901234567890123456789012',
        history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
) {
    return {
        ...render(<Router history={history}>{ui}</Router>),
        history,
    }
}

it(`should be able to pay`, async () => {
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
                transaction_id: '1234123',
                phone_number: '081234567890'
            }
        });

    const { history } = renderWithRouter(<Payment />);

    expect(PaymentService.getPaymentDetail)
        .toHaveBeenCalledWith('12345678901234567890123456789012');

    await waitForElement(() => {

    });

    //#region Confirmation
    screen.getByText(/kodaline music store/i);
    //etc. 
    screen.getByText('2.500.000');

    fireEvent.click(screen.getByText(/lanjut/i));
    //#endregion

    //#region Verification
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

    // submit
    expect(screen.getByText(/konfirmasi/i)).toBeEnabled();
    fireEvent.click(screen.getByText(/konfirmasi/i));
    //#endregion

    expect(history.location.pathname).toEqual('/id/payment/success');
});

it(`should be able to cancel the transaction`, () => {
    // mock service, return value xyz

    render(<Payment />);

    //#region Confirmation
    screen.getByText(/konfirmasi pembayaran/i);
    fireEvent.click(screen.getByText(/lanjut/i));
    //#endregion

    //#region Verification, then press Back button
    screen.getByText(/masukkan pin sakuku/i);
    fireEvent.click(screen.getByText(/batal/i));
    //#endregion

    screen.getByText(/konfirmasi pembayaran/i);
});