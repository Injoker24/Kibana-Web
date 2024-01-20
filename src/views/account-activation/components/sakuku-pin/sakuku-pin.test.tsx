import React from 'react';
import { render, screen, fireEvent, cleanup, waitForElement } from '@testing-library/react';
import { AccountActivationService, OBMService } from 'services';
import SakukuPIN from './sakuku-pin';

let handleSubmitMock: () => void,
    handleErrorMock: () => void;

beforeEach(() => {
    handleSubmitMock = jest.fn();
    handleErrorMock = jest.fn();
});

afterEach(cleanup);

it(`should display 6 password-type input, and disabled button`, () => {
    render(
        <SakukuPIN
            requestId="REQUEST_ID"
            birthDate={'2016-04-02'}
            phoneNumber={'081234567890'}
            chainingId={'CHAINING_ID'}
            onError={handleErrorMock}
            onSubmit={handleSubmitMock} />
    );

    // title
    screen.getByText(/aktivasi/i);

    // message
    screen.getByText(/masukkan pin sakuku/i);

    // 6 input
    const $inputs = screen.getAllByTestId('input');
    expect($inputs.length).toBe(6);
    // expect($inputs[0]).toHaveAttribute('type', 'password');
    expect($inputs[0]).toHaveClass('secure-input');

    // autofocus on first input
    expect(document.activeElement).toBe($inputs[0]);

    // submit button
    const $submitBtn = screen.getByText(/lanjut/i);
    expect($submitBtn).toBeDisabled();

    fireEvent.click($submitBtn);
    expect(handleSubmitMock).not.toHaveBeenCalled();
});

it(`should be able to proceed when input was completed.
    pin should be encrypted via OBMService`, async () => {

    jest.spyOn(OBMService, 'encryptPIN')
        .mockResolvedValueOnce({
            encoding: 'p-string-result',
            encryptedPIN: 'c-string-result',
            sessionId: 'session-id',
            randomNumber: 'random-number'
        });

    jest.spyOn(AccountActivationService, 'activateExistingUser')
        .mockResolvedValueOnce({
            error_schema: {
                error_code: 'X-Y-ZZZ',
                fatal_error_flag: false,
                message: 'Sukses'
            },
            output_schema: {
                status: 'Success'
            }
        });

    render(
        <SakukuPIN
            requestId="REQUEST_ID"
            birthDate={'2016-04-02'}
            phoneNumber={'081234567890'}
            chainingId={'CHAINING_ID'}
            onError={handleErrorMock}
            onSubmit={handleSubmitMock} />
    );

    // complete all inputs. Note: the active element will be automatically selected
    fireEvent.input(document.activeElement, { target: { value: '1' } });
    fireEvent.input(document.activeElement, { target: { value: '2' } });
    fireEvent.input(document.activeElement, { target: { value: '3' } });
    fireEvent.input(document.activeElement, { target: { value: '4' } });
    fireEvent.input(document.activeElement, { target: { value: '5' } });
    fireEvent.input(document.activeElement, { target: { value: '6' } });

    // submit button should be enabled
    const $submitBtn = screen.getByText(/lanjut/i);
    expect($submitBtn).not.toBeDisabled();

    // click submit
    fireEvent.click($submitBtn);

    // loader should be shown
    await waitForElement(() => screen.getByTestId('loader-wrapper'));

    expect(OBMService.encryptPIN)
        .toHaveBeenCalledWith('REQUEST_ID', '081234567890', '123456');

    expect(AccountActivationService.activateExistingUser).toHaveBeenCalledWith('REQUEST_ID', {
        birth_date: '2016-04-02',
        epin: 'c-string-result',
        encoding: 'p-string-result',
        session_id: 'session-id',
        chaining_id: 'CHAINING_ID',
        random_number: 'random-number'
    });

    // loader should be removed
    expect(screen.queryByTestId('loader-wrapper')).toBeNull();

    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
});