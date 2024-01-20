import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import PaymentError from './payment-error';

it(`given not fatal error,
    should render error image, message, and button reload`, () => {

    // @ts-ignore
    window.location.reload = jest.fn();

    render(
        <PaymentError
            isFatal={false}
            content={'SOME MESSAGE'}
            merchantName={'MERCHANT NAME'}
        />);

    screen.getByRole('img', { name: /gagal/i });
    screen.getByText(/some message/i);

    const $btn = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click($btn);
    expect(window.location.reload).toHaveBeenCalledTimes(1);
});

it(`given fatal error,
    should render error image, message, and button exit (opened in new tab / iframe)`, () => {

    // @ts-ignore
    window.opener = {
        postMessage: jest.fn()
    }

    render(<PaymentError
        isFatal={true}
        content={'SOME MESSAGE'}
        merchantName={'MERCHANT NAME'}
    />);

    screen.getByRole('img', { name: /gagal/i });
    screen.getByText(/some message/i);

    const $btn = screen.getByRole('button', { name: /kembali ke merchant name/i });
    fireEvent.click($btn);
    expect(window.opener.postMessage).toHaveBeenCalledWith('Failed', '*');
});

it(`given fatal error,
    should render error image, message, and button exit (opened as webview)`, () => {

    // @ts-ignore
    window.opener = {
        postMessage: jest.fn()
    }

    render(<PaymentError
        isFatal={true}
        content={'SOME MESSAGE'}
        merchantName={'MERCHANT NAME'}
    />);

    screen.getByRole('img', { name: /gagal/i });
    screen.getByText(/some message/i);

    const $btn = screen.getByRole('button', { name: /kembali ke merchant name/i });
    fireEvent.click($btn);
    expect(window.opener.postMessage).toHaveBeenCalledWith('Failed', '*');
});