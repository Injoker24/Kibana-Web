import React, {
    useState
} from 'react';

import { Button } from 'react-bootstrap';
import { ErrorCode, QRISTipAmountType } from 'enums';
import { QRISPaymentTransaction } from 'models';

import {
    QRISPaymentService,
    OBMService
} from 'services';

import {
    OtpInput,
    PageBody,
    PageActions,
    Loader
} from 'shared/components';

interface Props {
    paymentId: string,
    transactionData: QRISPaymentTransaction,
    onSubmit: () => void,
    onCancel: () => void,
    onError: (data: {
        isFatalError: boolean,
        content: string,
        onClose?: Function
    }) => void,
    onCheckStatus: () => void,
    onPaymentAmountLimitExceeded: () => void
};

const Verification: React.FC<Props> =
    ({
        paymentId,
        transactionData,
        onSubmit,
        onCancel,
        onError,
        onCheckStatus,
        onPaymentAmountLimitExceeded
    }) => {
        const [isLoading, setIsLoading] = React.useState<boolean>(false);
        const [pin, setPin] = useState<string>('');
        const [errorMessage, setErrorMessage] = React.useState<string>('');

        const isFormValid = () => pin.length === 6;

        const handleSubmit = async (e: any) => {
            e.preventDefault();

            if (!isFormValid() || isLoading) {
                return false;
            }

            setIsLoading(true);
            setErrorMessage('');

            try {
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

                //#region 20210504-Calculate percentage-typed tips amount to absolute-typed
                let tipAmount = 0;
                if (transactionData.tip) {
                    if (transactionData.tip.amount_type === QRISTipAmountType.Percentage) {
                        tipAmount = Math.floor((transactionData.tip.amount / 100) * transactionData.amount);
                    } else {
                        tipAmount = transactionData.tip.amount;
                    }
                }
                //#endregion

                await QRISPaymentService.executePayment(paymentId, {
                    encoding: encoding,
                    epin: encryptedPIN,
                    session_id: sessionId,
                    random_number: randomNumber,
                    amount: transactionData.amount,
                    tip_amount: tipAmount
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

                /** Should redirect to payment input */
                if (error_schema.error_code === ErrorCode.PaymentAmountLimitExceeded) {
                    onError({
                        isFatalError: false,
                        content: error_schema.message,
                        onClose: onPaymentAmountLimitExceeded
                    });
                    return;
                }

                /** Should redirect to check status */
                if (error_schema.error_code === ErrorCode.GatewayTimeout
                    || error_schema.error_code === ErrorCode.PaymentExist
                    || error_schema.error_code === ErrorCode.ClientConnectionTimeout
                    || error_schema.error_code === ErrorCode.CardlessConnectionTimeout) {
                    onCheckStatus();
                    return;
                }

                if (status === 400) {
                    setErrorMessage(error_schema.message);
                    return;
                }

                onError({
                    isFatalError: false,
                    content: error_schema.message
                });

                return;
            }
        };

        return (<form onSubmit={handleSubmit}>
            {isLoading && <Loader type="absolute" />}

            <PageBody>
                <p>Masukkan PIN Sakuku</p>

                <OtpInput value={pin}
                    length={6}
                    secure={true}
                    autoFocus={true}
                    className="mb-3 justify-content-center"
                    onChange={(value) => setPin(value)} />

                {errorMessage &&
                    <span className="text-danger d-block">
                        {errorMessage}
                    </span>
                }
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