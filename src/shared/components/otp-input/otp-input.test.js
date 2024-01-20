import React from 'react';
import { render, screen, fireEvent, cleanup, waitForDomChange, waitForElement } from '@testing-library/react';

import OtpInput from './otp-input';

let handleChangeMock;

beforeEach(() => {
    handleChangeMock = jest.fn();
});

afterEach(cleanup);

const setup = (props) => {
    const { container, getAllByTestId, debug } = render(
        <OtpInput
            onChange={handleChangeMock}
            {...props} />
    );

    return {
        container,
        $inputs: getAllByTestId('input'),
        debug
    }
};

it(`should by default render 4 inputs`, () => {
    setup({ value: '' });

    expect(screen.getAllByTestId('input')).toHaveLength(4);
});

it(`given length = 6, should render 6 inputs`, () => {
    setup({ length: 6, value: '' });

    expect(screen.getAllByTestId('input')).toHaveLength(6);
});

it(`given additional class name, should render`, () => {
    const { container } = setup({ length: 6, value: '', className: 'additional-class-name' });

    container.querySelector('.additional-class-name');
});

it(`should emit on change event, and move the active element`, () => {
    const { $inputs } = setup({ value: '', autoFocus: true });

    fireEvent.change($inputs[0], { target: { value: '1' } });

    expect(handleChangeMock).toHaveBeenCalledWith('1');
});

it(`should prevent non-numeric input`, () => {
    const { $inputs } = setup({ value: '' });

    fireEvent.change($inputs[0], { target: { value: 'a' } });

    expect($inputs[0].value).toBe('');
    expect(handleChangeMock).toBeCalledTimes(0);
});