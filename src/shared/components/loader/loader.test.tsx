import React from 'react';

import Loader from './loader';

import {
    render,
    cleanup
} from '@testing-library/react';

afterEach(cleanup);

it(`should display loader with 'absolute' position`, () => {
    const { getByTestId } = render(
        <Loader type="absolute" />
    );

    expect(getByTestId('loader-wrapper'))
        .toHaveClass('absolute');
});

it(`should display loader with 'fixed' position`, () => {
    const { getByTestId } = render(
        <Loader type="fixed" />
    );

    expect(getByTestId('loader-wrapper'))
        .toHaveClass('fixed');
});

it(`should display loader with 'inline' position`, () => {
    const { getByTestId } = render(
        <Loader type="inline" />
    );

    expect(getByTestId('loader-wrapper'))
        .toHaveClass('inline');
});

it(`should display the given message`, () => {
    const { getByText } = render(
        <Loader type="absolute">Please wait</Loader>
    );

    getByText(/please wait/i);
})
