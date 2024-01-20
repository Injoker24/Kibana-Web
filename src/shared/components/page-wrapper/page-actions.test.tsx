import React from 'react';

import PageActions from './page-actions';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(cleanup);

it(`should render the given content`, () => {
    render(<PageActions><section>some actions</section></PageActions>);

    screen.getByText(/some actions/i);
});

it(`should render the given className`, () => {
    const { container } = render(<PageActions className="additional-class"><section>some actions</section></PageActions>);
    screen.getByText(/some actions/i);

    expect(container.querySelector('.additional-class')).toBeTruthy();
});