import React from 'react';

import PageWrapper from './page-wrapper';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(cleanup);

it(`should render the given content`, () => {
    render(<PageWrapper><section>some content</section></PageWrapper>);

    screen.getByText(/some content/i);
});

it(`should render the given className`, () => {
    const { container } = render(<PageWrapper className="additional-class"><section>some content</section></PageWrapper>);
    screen.getByText(/some content/i);

    expect(container.querySelector('.additional-class')).toBeTruthy();
});