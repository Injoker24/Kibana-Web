import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import OtpSingleInput from './otp-single-input';

let handleChangeMock;

beforeEach(() => {
    handleChangeMock = jest.fn();
});

afterEach(cleanup);

const setup = (props) => {
    const { container, getByTestId } = render(
        // <OtpSingleInput
        //     index={0}
        //     value={'0'}
        //     focused={false}
        //     onChange={handleChangeMock}
        //     onKeyDown={handleKeyDownMock}
        //     onInput={handleInputMock}
        //     onPaste={handlePasteMock}
        //     onInputFocus={handleInputFocus}
        //     autoFocus={false}
        //     disabled={false}
        //     secure={true}
        //     data-test-id="input"
        //     className="additional-class" />

        <OtpSingleInput
            index={0}
            value={'0'}
            {...props}
            data-testid="otp-single-input"
            onChange={handleChangeMock} />
    );

    return {
        handleChangeMock,
        container,
        $input: getByTestId('otp-single-input')
    };
};

it(`should render input with 0 value`, () => {
    const { $input } = setup();

    expect($input.value).toBe('0');
    expect($input).toHaveAttribute('type', 'tel');
});

it(`should render a secure input`, () => {
    const { $input } = setup({ secure: true });

    // expect($input).toHaveAttribute('type', 'password');
    expect($input).toHaveClass('secure-input');
});

it(`should emit event on change`, () => {
    const { $input } = setup({ secure: true });
    fireEvent.change($input, {
        target: { value: 2 }
    });

    expect(handleChangeMock).toHaveBeenCalledTimes(1);
});

it(`should render a disabled input`, () => {
    const { $input } = setup({ disabled: true });
    expect($input).toHaveAttribute('disabled');
});

it(`should render the given className`, () => {
    const { container } = setup({ className: 'additional-input-class-name' });
    expect(container.querySelector('.additional-input-class-name')).toBeTruthy();
});
