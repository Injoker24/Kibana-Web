import React from 'react';

import MonthSelection from './month-selection';

import {
    cleanup,
    render,
    fireEvent,
    screen
} from '@testing-library/react';

let onChangeMock: (value: number) => void;

beforeEach(() => {
    onChangeMock = jest.fn();
});

afterEach(cleanup);

it(`should render placeholder value`, () => {
    render(
        <MonthSelection value={-1}
            onChange={onChangeMock} />
    );

    screen.getByDisplayValue(/Bulan/i);
});

it(`should render drop down with the given value
    and should render the value when changed`, () => {

    render(
        <MonthSelection
            value={3}
            onChange={onChangeMock} />
    );

    // the given value on props
    screen.getByDisplayValue(/april/i);

    fireEvent.change(screen.getByTestId('select-month'), {
        target: { value: 4 }
    });

    expect(onChangeMock)
        .toHaveBeenCalledTimes(1);

    expect(onChangeMock)
        .toHaveBeenCalledWith(4);

    // the updated value
    screen.getByDisplayValue(/mei/i);
});