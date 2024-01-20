import React from 'react';

import YearSelection from './year-selection';

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
        <YearSelection value={-1}
            onChange={onChangeMock} />
    );

    screen.getByDisplayValue(/Tahun/i);
});

it(`should render dropdown list with available years (100),
    and automatically selected the given value
    and should emit on change value`, () => {

    render(
        <YearSelection
            value={1991}
            onChange={onChangeMock} />
    );

    expect(screen.queryAllByTestId('select-year-option')).toHaveLength(101);

    screen.getByDisplayValue(/1991/i);

    fireEvent.change(screen.getByTestId('select-year'), {
        target: { value: 1998 }
    });

    expect(onChangeMock)
        .toHaveBeenCalledTimes(1);

    expect(onChangeMock)
        .toHaveBeenCalledWith(1998);

    screen.getByDisplayValue(/1998/i);
});