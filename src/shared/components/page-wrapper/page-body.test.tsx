import React from 'react';

import PageBody from './page-body';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(cleanup);

it(`should render the given content`, () => {
    render(<PageBody><section>some content</section></PageBody>);

    screen.getByText(/some content/i);
});

it(`should render the given className`, () => {
    const { container } = render(<PageBody className="additional-class"><section>some content</section></PageBody>);
    screen.getByText(/some content/i);

    expect(container.querySelector('.additional-class')).toBeTruthy();
});