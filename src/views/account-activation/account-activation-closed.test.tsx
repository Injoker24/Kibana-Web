import React from 'react';
import { screen, render } from '@testing-library/react';
import { ActivityStatus } from 'enums';
import AccountActivationClosed from './account-activation-closed';

it(`should display closing page with success state`, () => {
    render(<AccountActivationClosed type={ActivityStatus.Completed} />);
    screen.getByAltText(/sukses/i);
    screen.getByText(/silakan tutup halaman ini/i);
});

it(`should display closing page with failed state`, () => {
    render(<AccountActivationClosed type={ActivityStatus.Failed} />);
    screen.getByAltText(/gagal/i);
    screen.getByText(/silakan tutup halaman ini/i);
});