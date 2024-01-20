import React from 'react';

import PageHeader from './page-header';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(cleanup);

it(`should render the given title and image with `, () => {
    render(<PageHeader title={'Sample Title'}/>);

    screen.getByText(/sample title/i);

    screen.getByTitle(/sakuku/i);
});