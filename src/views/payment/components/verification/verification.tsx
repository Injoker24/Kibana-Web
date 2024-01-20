import React from 'react';

import {
    Button
} from 'react-bootstrap';

import {
    OtpInput,
    PageBody,
    PageActions,
    Loader
} from 'shared/components';

import {
    PaymentTransaction
} from 'models';

import {
    PaymentService,
    OBMService
} from 'services';

import {
    PaymentInformation,
    PaymentAmount
} from '..';

interface Props {
    paymentId: string,
    transactionData: PaymentTransaction,
    onSubmit: () => void,
    onCancel: () => void,
    onError: (data: {
        isFatalError: boolean,
        content: string
    }) => void
}

const Verification: React.FC<Props> =
    ({
        paymentId,
        transactionData,
        onSubmit,
        onCancel,
        onError
    }) => {
        const [isLoading, setIsLoading] = React.useState<boolean>(false);
        const [pin, setPin] = React.useState<string>('');
        const [errorMessage, setErrorMessage] = React.useState<string>('');

        const isFormValid = () => pin.length === 6;

        const handleSubmit = async (e: any) => {
            e.preventDefault();

            if (!isFormValid() || isLoading) {
                return false;
            }

            try {
                setIsLoading(true);
                setErrorMessage('');

                const {
                    encoding,
                    encryptedPIN,
                    sessionId,
                    randomNumber
                } = await OBMService.encryptPIN(
                    paymentId,
                    transactionData.phone_number,
                    pin
                );

                await PaymentService.executePayment(paymentId, {
                    encoding: encoding,
                    epin: encryptedPIN,
                    session_id: sessionId,
                    random_number: randomNumber
                });

                setIsLoading(false);

                onSubmit();
            } catch (error) {
                setIsLoading(false);

                const {
                    status,
                    data: { error_schema }
                } = error;

                if (error_schema.fatal_error_flag === true) {
                    onError({
                        isFatalError: true,
                        content: error_schema.message
                    });
                    return;
                }

                if (status === 400) {
                    setErrorMessage(error_schema.message);
                    return;
                }

                // 500
                onError({
                    isFatalError: false,
                    content: error_schema.message
                });
            }
        };

        return (<form onSubmit={handleSubmit}>
            {isLoading && <Loader type="absolute" />}

            <PageBody>
                <h5 className="font-weight-bold mb-4">Konfirmasi Pembayaran</h5>

                <PaymentInformation
                    merchantName={transactionData.merchant_name}
                    transactionId={transactionData.transaction_id}
                    transactionDate={transactionData.transaction_date}
                />

                <PaymentAmount
                    amount={transactionData.amount}
                />

                <section className="mt-4">
                    <p>Masukkan PIN Sakuku</p>

                    <OtpInput value={pin}
                        length={6}
                        secure={true}
                        autoFocus={true}
                        className="mb-3 justify-content-center"
                        onChange={(value) => setPin(value)}
                    />

                    {errorMessage &&
                        <span className="text-danger d-block">
                            {errorMessage}
                        </span>
                    }
                </section>

            </PageBody>

            <PageActions>
                <Button type="submit"
                    variant="primary"
                    block={true}
                    disabled={!isFormValid()}>
                    KONFIRMASI
                </Button>

                <Button type="button"
                    variant="outline-primary"
                    block={true}
                    onClick={onCancel}>
                    BATAL
                </Button>
            </PageActions>
        </form>);
    };

export default Verification;