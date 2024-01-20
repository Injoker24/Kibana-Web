import React from 'react';

import FormInputLoader from './form-input-loader';
import { render } from '@testing-library/react';

it(`should display border-type loader`, () => {
    const { getByTestId } = render(<FormInputLoader />)
    getByTestId('spinner');
});