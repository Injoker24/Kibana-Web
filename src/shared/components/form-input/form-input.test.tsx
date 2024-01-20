import React from 'react';

import FormInput from './form-input';
import { cleanup, render } from '@testing-library/react';

afterEach(cleanup);

it(`given label and input element
    should render label and input element`, () => {

    const { getByText, getByPlaceholderText } = render(
        <FormInput label="username">
            <input type="text"
                name="username"
                placeholder="Placeholder for username" />
        </FormInput>
    );

    getByText(/username/i);
    getByPlaceholderText(/placeholder for username/i);
});

it(`given label, input element, and error message
    should render label, input element, and error message`, () => {

    const { getByText, getByPlaceholderText } = render(
        <FormInput label="username"
            errorMessage="This field is required">
            <input type="text"
                name="username"
                placeholder="Placeholder for username" />
        </FormInput>
    );
    getByText(/username/i);
    getByPlaceholderText(/placeholder for username/i);
    getByText(/this field is required/i);
});


it(`given label, input element, and is in loading state
    should render label, input element, and loading indicator`, () => {

    const { getByText, getByPlaceholderText, getByTestId } = render(
        <FormInput label="username"
            isLoading={true}>
            <input type="text"
                name="username"
                placeholder="Placeholder for username" />
        </FormInput>
    );

    getByText(/username/i);
    getByPlaceholderText(/placeholder for username/i);
    getByTestId(/spinner/i);
});