import React from 'react';

import {
    PageWrapper,
    PageHeader,
    Loader
} from 'shared/components';

import {
    AccountActivationService,
    OBMService
} from 'services';

import UserInformation from './user-information';
import PINInformation from './pin-information';

enum VerificationSteps {
    Information,
    PIN,
};

interface Props {
    requestId: string,
    phoneNumber: string,
    birthDate: string,
    chainingId: string,
    onError: (data: {
        isFatalError: boolean,
        content: string
    }) => void,
    onSubmit: () => void
};

const Registration: React.FC<Props> =
    ({
        requestId,
        phoneNumber,
        birthDate,
        chainingId,
        onError,
        onSubmit
    }) => {
        const [currentStep, setCurrentStep] = React.useState(0);
        const [isLoading, setIsLoading] = React.useState(false);
        const [formData, setFormData] = React.useState<any>();

        const toNextStep =
            () => {
                if (currentStep === 1) {
                    onSubmit();
                    return;
                }
                setCurrentStep(step => step + 1);
            };

        const handleSubmitUserInformation =
            ({ name, email }: { name: string, email: string }) => {
                setFormData({
                    name,
                    email
                });

                toNextStep();
            };

        const handleSubmitPINVerification =
            async (pin: string) => {

                if (isLoading) {
                    return false;
                }

                setIsLoading(true);

                try {
                    const {
                        encoding,
                        encryptedPIN,
                        sessionId,
                        randomNumber
                    } = await OBMService.encryptPIN(requestId, phoneNumber, pin);

                    await AccountActivationService.createNewUser(requestId, {
                        chaining_id: chainingId,
                        birth_date: birthDate,
                        customer_name: formData.name,
                        email: formData.email,
                        encoding: encoding,
                        epin: encryptedPIN,
                        session_id: sessionId,
                        random_number: randomNumber,
                    });

                    setIsLoading(false);

                    toNextStep();
                } catch (error) {
                    setIsLoading(false);

                    const {
                        // status,
                        data: { error_schema }
                    } = error;

                    // 500
                    onError({
                        isFatalError: error_schema.fatal_error_flag === true,
                        content: error_schema.message
                    });
                }
            }

        return (<>
            {isLoading && <Loader type="absolute" />}
            <PageWrapper>
                <PageHeader title="Registrasi" />

                {currentStep === VerificationSteps.Information &&
                    <UserInformation
                        onSubmit={handleSubmitUserInformation} />
                }

                {currentStep === VerificationSteps.PIN &&
                    <PINInformation
                        onSubmit={handleSubmitPINVerification} />
                }
            </PageWrapper>
        </>);
    }

export default Registration;