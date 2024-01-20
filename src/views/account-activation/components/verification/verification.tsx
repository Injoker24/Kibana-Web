import React from 'react';

import {
    PageWrapper,
    PageHeader,
    Loader,
} from 'shared/components';

import {
    AccountActivationService
} from 'services';

import BirthDateVerification from './birth-date-verification';
import OTPVerification from './otp-verification';

enum VerificationSteps {
    Information,
    OTPInput,
};

interface Props {
    requestId: string;
    merchantId: string;
    phoneNumber: string;
    onError: (data: {
        isFatalError: boolean,
        content: string,
        onClose?: Function
    }) => void,
    onSubmit: (data: {
        birth_date: string,
        is_registered: boolean,
        chaining_id: string
    }) => void;
};

const Verification: React.FC<Props> =
    ({
        requestId,
        merchantId,
        phoneNumber,
        onError,
        onSubmit
    }) => {
        const [currentStep, setCurrentStep] = React.useState(0);

        const [isLoading, setIsLoading] = React.useState<boolean>(false);
        const [birthDate, setBirthDate] = React.useState<{ value: Date, formattedValue: string }>();
        const [otpTimeout, setOtpTimeout] = React.useState<number>(0);

        const toNextStep = () => {
            if (currentStep !== 1) {
                setCurrentStep(step => step + 1);
            }
        };

        /**
         * Go to previous step. If it was already the first step, consider it as cancel registration.
         */
        const toPreviousStep = () => {
            if (currentStep !== 0) {
                setCurrentStep(step => step - 1);
            }
        };

        /** @private */
        const generateOTP = async () => {
            try {
                await AccountActivationService.generateOTP(requestId, {
                    merchant_id: merchantId,
                    phone_number: phoneNumber
                });

                setOtpTimeout(60);
            } catch (error) {
                throw error;
            }
        };

        const handleSubmitBirthDate = async (birthDate: { value: Date, formattedValue: string }) => {
            if (isLoading) {
                return false;
            }

            try {
                setIsLoading(true);
                setBirthDate(birthDate);
                await generateOTP();
                // setOtpCode('');
                setIsLoading(false);

                toNextStep();
            } catch (error) {
                setIsLoading(false);

                const {
                    // status,
                    data: { error_schema }
                } = error;

                // if (status === 400) {
                //     setErrors({ birthDate: error_schema.message });
                //     return;
                // }

                // 500
                onError({
                    isFatalError: error_schema.fatal_error_flag === true,
                    content: error_schema.message
                });
            }
        };

        const handleSubmitOTPVerification = (data: {
            chaining_id: string,
            is_registered: boolean
        }) => {
            onSubmit({
                birth_date: birthDate?.formattedValue || '',
                is_registered: data.is_registered,
                chaining_id: data.chaining_id
            });
        };

        const handleResendCode = async () => {
            try {
                setIsLoading(true);

                await generateOTP();

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);

                const {
                    data: { error_schema }
                } = error;

                // 500
                onError({
                    isFatalError: error_schema.fatal_error_flag === true,
                    content: error_schema.message
                });
            }

        };

        return (<>
            {isLoading && <Loader type="absolute" />}

            <PageWrapper>
                <PageHeader title="Aktivasi" />

                {currentStep === VerificationSteps.Information && <>
                    <BirthDateVerification
                        value={birthDate?.value}
                        phoneNumber={phoneNumber}
                        onSubmit={handleSubmitBirthDate}
                    />
                </>}

                {currentStep === VerificationSteps.OTPInput && <>
                    <OTPVerification
                        requestId={requestId}
                        merchantId={merchantId}
                        birthDate={birthDate?.formattedValue || ''}
                        phoneNumber={phoneNumber}
                        otpTimeout={otpTimeout}

                        toPreviousStep={toPreviousStep}
                        onSubmit={handleSubmitOTPVerification}
                        onResendOTP={handleResendCode}
                        onError={onError}
                    />
                </>}
            </PageWrapper>
        </>);
    }

export default Verification;