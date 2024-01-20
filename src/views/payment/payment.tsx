import React, {
    ReactElement
} from 'react';

import {
    Redirect,
    useParams,
    useHistory
} from 'react-router-dom';

import {
    Modal,
    Button
} from 'react-bootstrap';

import {
    currentLanguage
} from 'storages';

import {
    PaymentTransaction
} from 'models';

import {
    PageWrapper,
    PageHeader,
    Loader
} from 'shared/components';

import {
    // Confirmation,
    Verification
} from './components';

import {
    PaymentService
} from 'services';

import PaymentError from './payment-error';
import { PaymentStatus } from 'enums';

type ErrorState = {
    isFatalError: boolean;
    content: string;
}

const Payment: React.FC<any> =
    () => {
        const { paymentId } = useParams<{ paymentId: string }>();
        const history = useHistory();

        const [isLoading, setIsLoading] = React.useState(false);
        const [transactionData, setTransactionData] = React.useState<PaymentTransaction>();
        const [error, setError] = React.useState<ErrorState>();

        const requestCountdownTimerRef = React.useRef(0);

        const [errorModal, setErrorModal] = React.useState<{ children: ReactElement | string, onClose: () => void } | null>();

        //#region Exit
        const handleExitApplication = () => {
            clearInterval(requestCountdownTimerRef.current);

            // new tab
            if (window.opener) {
                window.opener.postMessage('Failed', '*');
                return;
            }

            // iframe
            try {
                console.log(window.parent.location.href);
            } catch (error) {
                window.parent.postMessage('Failed', '*');
                return;
            }

            // webview
            window.location.href = `/${currentLanguage.get()}/payment/failed`;
        };

        const handleSuccessVerification = () => {
            clearInterval(requestCountdownTimerRef.current);

            // new tab
            if (window.opener) {
                window.opener.postMessage('Completed', '*');
                return;
            }

            // iframe
            try {
                console.log(window.parent.location.href);
            } catch (error) {
                window.parent.postMessage('Completed', '*');
                return;
            }

            // webview
            window.location.href = `/${currentLanguage.get()}/payment/completed`;
        };
        //#endregion

        //#region Error Modal
        // populate error content
        const handleErrorModal = React.useCallback(({
            isFatalError = false,
            content,
            onClose
        }: {
            isFatalError: boolean,
            content: string,
            onClose?: Function
        }) => {
            if (isFatalError === true) {
                clearInterval(requestCountdownTimerRef.current);
            }

            setErrorModal({
                children: content,
                onClose: () => {
                    if (isFatalError === true) {
                        handleExitApplication();
                        return;
                    }

                    setErrorModal(null);

                    if (onClose) {
                        onClose();
                    }
                }
            });
        }, []);
        //#endregion

        //#region Get Detail
        React.useEffect(() => {
            const getTransactionDetail = async (paymentId: string) => {
                try {
                    setIsLoading(true);

                    const { output_schema } = await PaymentService.getPaymentDetail(paymentId);

                    setIsLoading(false);

                    setTransactionData(output_schema);

                    //#region Start the countdown timer
                    let timeLeft = output_schema.remaining_time;

                    requestCountdownTimerRef.current = window.setInterval(() => {
                        timeLeft--;

                        // console.log(`Request will expired in: ${timeLeft}s`);

                        if (timeLeft <= 0) {
                            handleErrorModal({
                                isFatalError: true,
                                content: 'Pembayaran telah melebihi batas waktu yang ditentukan. Ulangi pembayaran.'
                            });
                        }
                    }, 1000);
                    //#endregion

                    //#region Check payment status
                    if (output_schema.status !== PaymentStatus.Unprocessed) {
                        if (output_schema.status === PaymentStatus.Success) {
                            handleSuccessVerification();
                            return;
                        } else if (output_schema.status === PaymentStatus.Failed) {
                            handleExitApplication();
                            return;
                        }
                    }
                    //#endregion
                } catch (error) {
                    setIsLoading(false);

                    const {
                        data: { error_schema }
                    } = error;

                    setError({
                        isFatalError: error_schema.fatal_error_flag === true,
                        content: error_schema.message
                    });
                }
            };

            getTransactionDetail(paymentId);
        }, [history, paymentId, handleErrorModal]);
        //#endregion

        if (error) {
            if (error.isFatalError === true) {
                clearInterval(requestCountdownTimerRef.current);

                return <Redirect to={{
                    pathname: `/${currentLanguage.get()}/payment/error`,
                    state: {
                        merchantName: transactionData?.merchant_name,
                        isFatal: true,
                        content: error.content
                    }
                }} />
            }

            return (
                <PaymentError
                    merchantName={transactionData?.merchant_name}
                    isFatal={error.isFatalError}
                    content={error.content}
                />
            );
        }

        return (<>
            {errorModal &&
                <Modal show={true}
                    centered={true}>
                    <Modal.Body className="text-center">
                        {errorModal.children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            type="button"
                            block={true}
                            onClick={errorModal?.onClose}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            }

            {isLoading && <Loader type="absolute" />}

            <PageWrapper className="text-center">
                <PageHeader />

                {transactionData && <>
                    <Verification
                        paymentId={paymentId}
                        transactionData={transactionData}
                        onSubmit={handleSuccessVerification}
                        onCancel={handleExitApplication}
                        onError={handleErrorModal}
                    />
                </>}
            </PageWrapper>
        </>);
    };

export default Payment;