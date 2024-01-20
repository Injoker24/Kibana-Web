import React from 'react';

import { render, screen, fireEvent, waitForElement } from '@testing-library/react';
import Pending from './pending';
import { QRISPaymentService } from 'services';
import { PaymentStatus } from 'enums';

let handleErrorMock: () => void,
    handleExitMock: () => void,
    handleSubmitMock: () => void;

const PAYMENT_ID = '1234567890';
const COPART_NAME = 'KOPI KENANGAN';

const SUCCESS_API_RESPONSE = {
    error_schema: {
        error_code: 'X-Y-ZZZ',
        fatal_error_flag: false,
        message: 'Sukses'
    },
    output_schema: {
        status: PaymentStatus.Success
    }
};

const PENDING_API_RESPONSE = {
    error_schema: {
        error_code: 'X-Y-ZZZ',
        fatal_error_flag: false,
        message: 'Sukses'
    },
    output_schema: {
        status: PaymentStatus.Pending
    }
};

beforeEach(() => {
    handleErrorMock = jest.fn();
    handleExitMock = jest.fn();
    handleSubmitMock = jest.fn();
});

describe('Under Limit', () => {
    function setup() {
        render(
            <Pending
                paymentId={PAYMENT_ID}
                copartName={COPART_NAME}
                onError={handleErrorMock}
                onExit={handleExitMock}
                onSubmit={handleSubmitMock}
            />
        );

        screen.getByRole('img', { name: /pending/i });
        screen.getByRole('heading', { name: /transaksi mengalami gangguan/i });

        return {
            $refreshButton: screen.getByRole('button', { name: /cek status/i })
        }
    }

    it(`given success,
    should emit payment status
    when check status button was clicked`, () => {
        // ARRANGE
        const { $refreshButton } = setup();

        jest.spyOn(QRISPaymentService, 'checkPaymentStatus')
            .mockImplementation((paymentId: string) => {
                return Promise.resolve(SUCCESS_API_RESPONSE);
            });

        // ACT
        fireEvent.click($refreshButton);

        // ASSERT
        expect(QRISPaymentService.checkPaymentStatus).toHaveBeenCalledWith(PAYMENT_ID);
        waitForElement(() => expect(handleSubmitMock).toHaveBeenCalledWith(PaymentStatus.Success));
    });

    it(`given pending,
    should not emit payment status 
    when check status button was clicked`, () => {
        // ARRANGE
        const { $refreshButton } = setup();

        jest.spyOn(QRISPaymentService, 'checkPaymentStatus')
            .mockImplementation((paymentId: string) => {
                return Promise.resolve(PENDING_API_RESPONSE);
            });

        // jest.spyOn(sessionStorage, 'setItem')
        //     .mockReturnValue();

        // ACT
        fireEvent.click($refreshButton);

        // ASSERT
        expect(QRISPaymentService.checkPaymentStatus).toHaveBeenCalledWith(PAYMENT_ID);

        waitForElement(() => {
            expect(handleSubmitMock).not.toHaveBeenCalled();
            expect(sessionStorage.setItem).toHaveBeenCalledWith(PAYMENT_ID, 1);
        });
    });

    it(`given pending (3 times),
    should not emit payment status and display exit button
    when check status button was clicked`, () => {
        // ARRANGE
        const { $refreshButton } = setup();

        jest.spyOn(QRISPaymentService, 'checkPaymentStatus')
            .mockImplementation((paymentId: string) => {
                return Promise.resolve(PENDING_API_RESPONSE);
            });


        //#region Attempt 1
        // ACT
        fireEvent.click($refreshButton);

        // ASSERT
        expect(QRISPaymentService.checkPaymentStatus).toHaveBeenCalledWith(PAYMENT_ID);

        waitForElement(() => {
            expect(handleSubmitMock).not.toHaveBeenCalled();
            expect(sessionStorage.setItem).toHaveBeenCalledWith(PAYMENT_ID, 1);
        });
        //#endregion

        //#region Attempt 2
        // ACT
        fireEvent.click($refreshButton);

        // ASSERT
        expect(QRISPaymentService.checkPaymentStatus).toHaveBeenCalledWith(PAYMENT_ID);

        waitForElement(() => {
            expect(handleSubmitMock).not.toHaveBeenCalled();
            expect(sessionStorage.setItem).toHaveBeenCalledWith(PAYMENT_ID, 2);
        });
        //#endregion

        //#region Attempt 3
        // ACT
        fireEvent.click($refreshButton);

        // ASSERT
        expect(QRISPaymentService.checkPaymentStatus).toHaveBeenCalledWith(PAYMENT_ID);

        waitForElement(() => {
            expect(handleSubmitMock).not.toHaveBeenCalled();
            expect(sessionStorage.setItem).toHaveBeenCalledWith(PAYMENT_ID, 3);

            expect($refreshButton).toBeFalsy();

            screen.getByRole('button', { name: /kembali ke kopi kenangan/i });
        });
        //#endregion
    });
});

describe('Limit exceeded', () => {
    it(`should display exit button when limit exceeded`, () => {
        // ARRANGE
        // @ts-ignore;
        delete window.sessionStorage;

        // @ts-ignore;
        window.sessionStorage = {
            setItem: jest.fn(),
            getItem: jest.fn()
        };
        jest.spyOn(window.sessionStorage, 'getItem').mockReturnValue('3');

        // ACT
        render(
            <Pending
                paymentId={PAYMENT_ID}
                copartName={COPART_NAME}
                onError={handleErrorMock}
                onExit={handleExitMock}
                onSubmit={handleSubmitMock}
            />
        );

        waitForElement(() => {
            const $exitButton = screen.getByRole('button', { name: /kembali ke kopi kenangan/i });

            fireEvent.click($exitButton);

            // ASSERT
            expect(handleExitMock).toHaveBeenCalledTimes(1);
        });
    });
})