import React from 'react';

import {
    Redirect,
    useParams,
    Switch,
    Route,
    useHistory,
    useRouteMatch
} from 'react-router-dom';

import {
    Modal,
    Button
} from 'react-bootstrap';

import {
    currentLanguage
} from 'storages';

import {
    QRISType, QRISTipType, PaymentStatus
} from 'enums';

import {
    QRISPaymentTransaction
} from 'models';

import {
    QRISPaymentService
} from 'services';

import {
    PageWrapper,
    PageHeader,
    Loader
} from 'shared/components';

import {
    Payment,
    Confirmation,
    Verification,
    Pending
} from './components';

import {
    QRISPaymentError
} from '.';

type ErrorState = {
    isFatalError: boolean;
    content: string;
}

const QRISPayment: React.FC<any> =
    () => {
        const history = useHistory();
        const { path, url } = useRouteMatch();

        const { paymentId } = useParams<{ paymentId: string }>();
        const [isLoading, setIsLoading] = React.useState(false);
        const [transactionData, setTransactionData] = React.useState<QRISPaymentTransaction>();
        const [error, setError] = React.useState<ErrorState>();

        const requestCountdownTimerRef = React.useRef(0);
        const [errorModal, setErrorModal] = React.useState<{ children: React.ReactElement | string, onClose: () => void } | null>();
        const [isPaymentSkipped, setIsPaymentSkipped] = React.useState<boolean>(false);

        //#region Exit
        const exitApplication = () => {
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
            window.location.href = `/${currentLanguage.get()}/qris-payment/failed`;
        };

        const redirectToSuccess = () => {
            if (transactionData) {
                clearInterval(requestCountdownTimerRef.current);

                history.replace(`/${currentLanguage.get()}/qris-payment/success`, {
                    copartName: transactionData.copart_name,
                    merchantName: transactionData.merchant_name,
                    transactionId: transactionData.transaction_id,
                    transactionDate: transactionData.transaction_date,
                    amount: transactionData.amount,
                    tip: transactionData.tip
                });
            }
        }
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
                        exitApplication();
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

                    const { output_schema } = await QRISPaymentService.getPaymentDetail(paymentId);

                    setIsLoading(false);

                    /** [2022-JUN-08] QRIS amount should be rounded down. -THI */
                    output_schema.amount = Math.floor(output_schema.amount);

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
                        if (output_schema.status === PaymentStatus.Pending) {
                            history.replace(`${url}/pending`);
                        } else if (output_schema.status === PaymentStatus.Success) {
                            clearInterval(requestCountdownTimerRef.current);

                            history.replace(`/${currentLanguage.get()}/qris-payment/success`, {
                                merchantName: output_schema.merchant_name,
                                transactionId: output_schema.transaction_id,
                                transactionDate: output_schema.transaction_date,
                                amount: output_schema.amount,
                                tip: output_schema.tip
                            });
                        } else if (output_schema.status === PaymentStatus.Failed) {
                            setError({
                                isFatalError: true,
                                content: 'Transaksi tidak berhasil dilakukan' // TODO: Ini apa message nya
                            });
                        } else {
                            console.error(`Invalid Payment Status: ${output_schema.status}`);
                        }

                        return;
                    }
                    //#endregion

                    //#region Tip options
                    const { qr_type, tip } = output_schema;
                    if (qr_type === QRISType.Dynamic
                        && (!tip || tip.type === QRISTipType.Mandatory)) {
                        history.replace(`${url}/confirmation`);
                    } else {
                        history.replace(`${url}/payment`);
                    }

                    const paymentSkipped = qr_type === QRISType.Dynamic && (!tip || tip.type === QRISTipType.Mandatory);
                    setIsPaymentSkipped(paymentSkipped);

                    history.replace(paymentSkipped ? `${url}/confirmation` : `${url}/payment`);
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
        }, [history, paymentId, url, handleErrorModal]);
        //#endregion

        //#region Payment
        const handleSubmitPayment = (data: QRISPaymentTransaction) => {
            setTransactionData(data);

            // go to Confirmation
            history.push('confirmation');
        };

        const handleCancelPayment = () => {
            exitApplication();
        };
        //#endregion

        //#region Confirmation
        const handleSubmitConfirmation = () => {
            // go to Verification
            history.push('verification');
        };

        const handleCancelConfirmation = () => exitApplication();
        //#endregion

        //#region Verification
        const handleSubmitVerification = () => {
            redirectToSuccess();
        }

        const handleCancelVerification = () => exitApplication();

        const handleCheckStatus = () => {
            history.push('pending');
        };

        const handlePaymentAmountLimitExceeded = () => {
            // Normalnya ini akan ke /payment
            history.replace(isPaymentSkipped ? `${url}/confirmation` : `${url}/payment`);
        };
        //#endregion

        //#region Check Status
        const handleCheckStatusResult = (status: PaymentStatus) => {
            if (status === PaymentStatus.Unprocessed) {
                history.push('verification'); // TODO: Cek status sukses, transaksinya unprocessed (00). Lanjut pembayaran lagi?
            } else if (status === PaymentStatus.Success) {
                redirectToSuccess();
            } else if (status === PaymentStatus.Failed) {
                setError({
                    isFatalError: true,
                    content: 'Transaksi tidak berhasil dilakukan' // TODO: Cek status sukses, tetapi transaksi gagal. Messagenya mau apa?
                });
            } else if (status === PaymentStatus.Pending) {
                return;
            } else {
                console.error(`Invalid Payment Status: ${status}`);
            }
        };
        //#endregion

        if (error) {
            if (error.isFatalError === true) {
                clearInterval(requestCountdownTimerRef.current);

                return <Redirect to={{
                    pathname: `/${currentLanguage.get()}/qris-payment/error`,
                    state: {
                        merchantName: transactionData?.copart_name,
                        isFatal: true,
                        content: error.content
                    }
                }} />
            }

            return (
                <QRISPaymentError
                    copartName={transactionData?.copart_name}
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

                {transactionData &&
                    <Switch>
                        <Route exact path={`${path}/payment`}>
                            <Payment
                                paymentData={transactionData}
                                onSubmit={handleSubmitPayment}
                                onCancel={handleCancelPayment}
                            />
                        </Route>
                        <Route exact path={`${path}/confirmation`}>
                            <Confirmation
                                paymentData={transactionData}
                                onNext={handleSubmitConfirmation}
                                onCancel={handleCancelConfirmation}
                            />
                        </Route>
                        <Route exact path={`${path}/verification`}>
                            <Verification
                                paymentId={paymentId}
                                transactionData={transactionData}
                                onSubmit={handleSubmitVerification}
                                onCancel={handleCancelVerification}
                                onError={handleErrorModal}
                                onCheckStatus={handleCheckStatus}
                                onPaymentAmountLimitExceeded={handlePaymentAmountLimitExceeded}
                            />
                        </Route>
                        <Route exact path={`${path}/pending`}>
                            <Pending
                                paymentId={paymentId}
                                transactionDate={transactionData.transaction_date}
                                copartName={transactionData.copart_name}
                                onSubmit={handleCheckStatusResult}
                                onError={handleErrorModal}
                                onExit={exitApplication}
                            />
                        </Route>
                    </Switch>
                }
            </PageWrapper>
        </>);
    };

export default QRISPayment;