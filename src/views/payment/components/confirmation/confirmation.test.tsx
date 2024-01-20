import React from 'react';

import {
    cleanup,
    render,
    fireEvent,
    screen
} from '@testing-library/react';

import Confirmation from './confirmation';

let handleNextMock: () => void,
    handleCancelMock: () => void;

beforeEach(() => {
    handleNextMock = jest.fn();
    handleCancelMock = jest.fn();
});

afterEach(cleanup);

it(`should render the payment information, next and cancel button,
    and should emit event on button clicked`, () => {
    render(
        <Confirmation
            merchantName={'KUDA TERBANG'}
            transactionId={'INV20200527-1125'}
            transactionDate={1577415411}
            amount={150000}
            onNext={handleNextMock}
            onCancel={handleCancelMock} />
    );

    // heading
    screen.getByText(/konfirmasi pembayaran/i);

    screen.getByText(/kuda terbang/i);
    screen.getByText(/INV20200527-1125/i);
    screen.getByText(/19 Januari 1970 13:10:15/i);
    screen.getByText('150.000');

    // buttons
    fireEvent.click(screen.getByText(/lanjut/i));
    expect(handleNextMock).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText(/batal/i));
    expect(handleCancelMock).toHaveBeenCalledTimes(1);
});