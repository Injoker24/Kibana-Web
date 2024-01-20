import React from 'react';
import { createMemoryHistory } from 'history';
import PaymentRouter from './payment.router';

import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

// it(`should render Pending page`, () => {
//     const history = createMemoryHistory();
//     history.push('/pending');

//     render(
//         <Router history={history}>
//             <PaymentRouter />
//         </Router>
//     );

//     screen.getByText(/transaksi sedang diproses/i);
// });

it(`should render Success page`, () => {
    const history = createMemoryHistory();
    history.push('/success', {
        merchantName: 'KUDA TERBANG',
        transactionId: 'INV20200528-1422',
        transactionDate: 1590650620000,
        amount: 3000
    });

    render(
        <Router history={history}>
            <PaymentRouter />
        </Router>
    );

    screen.getAllByText(/kuda terbang/i);
    screen.getByText(/28 Mei 2020 14:23:40/i);
    screen.getByText(/no. transaksi #INV20200528-1422/i);
    screen.getByText(/3.000/i);
});