import React, { ReactElement } from 'react';

import { Modal, Button } from 'react-bootstrap';

import {
    Redirect, useParams
} from 'react-router-dom';

import {
    currentLanguage
} from 'storages';

import {
    AccountActivationService
} from 'services';

import {
    AccountActivationRequestDetail
} from 'models';

import {
    Onboarding,
    Registration,
    SakukuPIN,
    Verification,
    Deeplink,
} from './components';

import {
    Loader
} from 'shared/components';

import AccountActivationError from './account-activation-error';

enum AccountActivationSteps {
    Deeplink,
    Onboarding,
    Verification,
    RegisterOrPIN,
    Success,
}

type ErrorState = {
    isFatalError: boolean;
    content: string;
}

const AccountActivation: React.FC =
    () => {
        const { requestId } = useParams<{ requestId: string }>();

        const [isLoading, setIsLoading] = React.useState(false);
        const [requestData, setRequestData] = React.useState<AccountActivationRequestDetail>();
        const [error, setError] = React.useState<ErrorState>();

        const requestCountdownTimerRef = React.useRef(0);

        const [currentStep, setCurrentStep] = React.useState(-1);

        const [verificationData, setVerificationData] = React.useState<{ birth_date: string, is_registered: boolean, chaining_id: string } | undefined>();

        const [errorModal, setErrorModal] = React.useState<{ children: ReactElement | string, onClose: () => void } | null>();

        //#region Wizard Stepper
        const toNextStep = () => {
            if (currentStep + 1 === AccountActivationSteps.Success) {
                clearInterval(requestCountdownTimerRef.current);
            }
            setCurrentStep(step => step + 1);
        };

        /**
         * Go to previous step. If it was already the first step, consider it as cancel registration.
         */
        // const toPreviousStep = () => {
        //     if (currentStep === 0) {
        //         // setError({
        //         //     isRecoverable: false,
        //         //     content: 'Proses dibatalkan'
        //         // });
        //     }
        //     setCurrentStep(step => step - 1);
        // };
        //#endregion

        //#region Exit
        const handleExitApplication = () => {
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
            window.location.href = `/${currentLanguage.get()}/account-activation/failed`;
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

        //#region Get Request Detail
        React.useEffect(() => {
            const getRequestDetail = async (requestId: string) => {
                setIsLoading(true);

                try {
                    const { output_schema } = await AccountActivationService.getRequestDetail(requestId);

                    setIsLoading(false);

                    setRequestData(output_schema);

                    setCurrentStep(
                        output_schema.is_deeplink
                            ? AccountActivationSteps.Deeplink
                            : AccountActivationSteps.Onboarding
                    );

                    let timeLeft = output_schema.remaining_time;

                    requestCountdownTimerRef.current = window.setInterval(() => {
                        timeLeft--;

                        // console.log(`Request will expired in: ${timeLeft}s`);

                        if (timeLeft <= 0) {
                            handleErrorModal({
                                isFatalError: true,
                                content: 'Aktivasi Sakuku telah melebihi batas waktu yang ditentukan. Ulangi Aktivasi Sakuku.'
                            });
                        }
                    }, 1000);
                } catch (error) {
                    const {
                        data: { error_schema }
                    } = error;

                    setError({
                        isFatalError: error_schema.fatal_error_flag === true,
                        content: error_schema.message
                    });
                } finally {
                    setIsLoading(false);
                }

            };

            getRequestDetail(requestId);
        }, [requestId, handleErrorModal]);
        //#endregion

        const handleSubmitVerification = (
            data: {
                birth_date: string,
                is_registered: boolean,
                chaining_id: string
            }
        ) => {
            setVerificationData({
                birth_date: data.birth_date,
                is_registered: data.is_registered,
                chaining_id: data.chaining_id
            });
            toNextStep();
        };

        const handleSubmitSakukuPIN = () => {
            toNextStep();
        };

        const handleSubmitRegistration = () => {
            toNextStep();
        };

        if (error) {
            if (error.isFatalError === true) {
                clearInterval(requestCountdownTimerRef.current);

                return <Redirect to={{
                    pathname: `/${currentLanguage.get()}/account-activation/error`,
                    state: {
                        merchantName: requestData?.merchant_name,
                        isFatal: true,
                        content: error.content
                    }
                }} />
            }

            return (
                <AccountActivationError
                    merchantName={requestData?.merchant_name}
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

            {requestData && <>
                {currentStep === AccountActivationSteps.Deeplink &&
                    <Deeplink
                        merchantName={requestData.merchant_name}
                        phoneNumber={requestData.phone_number}
                        iosAppStoreId={requestData.ios_appstore_id || ''}
                        minAndroidVersion={requestData.min_android_version || ''}
                        onError={handleErrorModal}
                    />
                }

                {currentStep === AccountActivationSteps.Onboarding &&
                    <Onboarding
                        merchantName={requestData.merchant_name}
                        phoneNumber={requestData.phone_number}
                        companyCode={requestData.merchant_id}
                        onError={handleErrorModal}
                        onNext={toNextStep}
                    />
                }
                {currentStep === AccountActivationSteps.Verification &&
                    <Verification
                        requestId={requestId}
                        merchantId={requestData.merchant_id}
                        phoneNumber={requestData.phone_number}
                        onError={handleErrorModal}
                        onSubmit={handleSubmitVerification}
                    />
                }

                {currentStep === AccountActivationSteps.RegisterOrPIN && <>
                    {verificationData && verificationData.is_registered === true
                        && <SakukuPIN
                            requestId={requestId}
                            phoneNumber={requestData.phone_number}
                            chainingId={verificationData.chaining_id}
                            birthDate={verificationData.birth_date}
                            onError={handleErrorModal}
                            onSubmit={handleSubmitSakukuPIN}
                        />
                    }
                    {verificationData && verificationData.is_registered === false
                        && <Registration
                            requestId={requestId}
                            phoneNumber={requestData.phone_number}
                            chainingId={verificationData.chaining_id}
                            birthDate={verificationData.birth_date}
                            onError={handleErrorModal}
                            onSubmit={handleSubmitRegistration}
                        />
                    }
                </>}

                {currentStep === AccountActivationSteps.Success &&
                    <Redirect
                        to={{
                            pathname: `/${currentLanguage.get()}/account-activation/success`,
                            state: {
                                merchantName: requestData.merchant_name,
                                phoneNumber: requestData.phone_number
                            }
                        }} />
                }
            </>}
        </>);
    };

export default AccountActivation;