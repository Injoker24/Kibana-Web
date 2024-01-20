import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import PaymentSuccess from './payment-success';

function setup() {
    render(
        <PaymentSuccess
            transactionId={'11223344'}
            transactionDate={1590650620000}
            merchantName={'SANDWICH'}
            amount={3000}
        />
    );

    screen.getByRole('img', { name: /sukses/i });
    screen.getByRole('heading', { name: /transaksi anda berhasil!/i })
    screen.getByText(/no. transaksi #11223344/i); // transactionId
    screen.getByText(/28 mei 2020 14:23:40/i); // transactionDate

    return {
        $button: screen.getByRole('button', { name: /kembali ke sandwich/i })
    }
}

it(`should display success page with the given props and do postMessage (opened in new tab)`, () => {
    const { $button } = setup();

    // @ts-ignore
    window.opener = {
        postMessage: jest.fn()
    }

    fireEvent.click($button);

    expect(window.opener.postMessage).toHaveBeenCalledWith('Completed', '*');
});