import React from 'react';

import {
    render,
    screen
} from '@testing-library/react';

import PaymentAmount from './payment-amount';

it(`should render the amount`, () => {
    render(<PaymentAmount amount={12345678} />);

    screen.getByText(/total pembayaran/i);
    screen.getByText('12.345.678');
});