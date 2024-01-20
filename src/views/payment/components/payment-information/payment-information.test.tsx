import React from 'react';

import {
    render,
    screen
} from '@testing-library/react';

import PaymentInformation from './payment-information';

it(`should render the given merchant name and the given information`, () => {
    render(
        <PaymentInformation
            merchantName="KUDA RENANG"
            transactionId="123456"
            transactionDate={1577415411}
        />
    );

    screen.getByText(/kuda renang/i);
    screen.getByText(/no. transaksi #123456/i);
    screen.getByText(/19 Januari 1970 13:10:15/i);
});