import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Onboarding from './onboarding';

let handleNextMock: () => void;

beforeEach(() => {
    handleNextMock = jest.fn();
});

afterEach(cleanup);

it(`on initial load, should render onboarding message, checkbox, and disabled button.`, () => {
    const { debug } = render(
        <Onboarding
            merchantName={'MTIX'}
            onNext={handleNextMock} />
    );

    screen.getByRole('heading', { name: /mtix/i });
    screen.getByLabelText(/saya menyetujui/i);

    const $tncLink = screen.getByRole('link', { name: /ketentuan sakuku/i });
    expect($tncLink).toHaveAttribute('href', 'https://bca.co.id/sakuku/tc');

    const $submitBtn = screen.getByRole('button', { name: /aktivasi sekarang/i });
    expect($submitBtn).toBeDisabled();

    fireEvent.click($submitBtn);
    expect(handleNextMock).not.toHaveBeenCalled();
});

it(`should be able to proceed when user has agreed the terms and conditions`, () => {
    render(
        <Onboarding
            merchantName={'MTIX'}
            onNext={handleNextMock} />
    );

    fireEvent.click(screen.getByLabelText(/saya menyetujui/i)); // checkbox

    const $submitBtn = screen.getByRole('button', { name: /aktivasi sekarang/i });
    expect($submitBtn).not.toBeDisabled();

    fireEvent.click($submitBtn);
    expect(handleNextMock).toHaveBeenCalledTimes(1); // event emitted
});