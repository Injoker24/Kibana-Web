import React from 'react';

import DaySelection from './day-selection';

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
        <DaySelection value={-1}
            max={30}
            onChange={onChangeMock} />
    );

    screen.getByDisplayValue(/Tgl/i);
});

it(`should render drop down with the given value
    and should render the value when changed`, () => {

    render(
        <DaySelection
            value={1}
            max={31}
            onChange={onChangeMock} />
    );

    // the given value on props
    screen.getByDisplayValue(/1/i);

    fireEvent.change(screen.getByTestId('select-day'), {
        target: { value: 4 }
    });

    expect(onChangeMock)
        .toHaveBeenCalledTimes(1);

    expect(onChangeMock)
        .toHaveBeenCalledWith(4);

    // the updated value
    screen.getByDisplayValue(/4/i);
});

it(`given default value > max value,
    should automatically selected to the maximum value`, () => {

    render(
        <DaySelection
            value={31}
            max={30}
            onChange={onChangeMock} />
    );

    expect(onChangeMock)
        .toHaveBeenCalledTimes(1);

    expect(onChangeMock)
        .toHaveBeenCalledWith(30);

    screen.getByDisplayValue(/30/i);
});