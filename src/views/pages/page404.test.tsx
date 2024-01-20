import React from 'react';
import { screen, render } from '@testing-library/react';
import Page404 from './page404';

it(`should display 404 page`, () => {
    render(<Page404 />);
    screen.getByText('404');
    screen.getByText(/halaman tidak ditemukan/i);
});