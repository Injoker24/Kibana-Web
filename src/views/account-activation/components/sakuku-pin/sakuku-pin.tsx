import React from 'react';

import {
    Button,
} from 'react-bootstrap';

import {
    PageWrapper,
    PageHeader,
    PageBody,
    PageActions,
    OtpInput,
    Loader,
} from 'shared/components';

import {
    AccountActivationService,
    OBMService
} from 'services';

interface Props {
    requestId: string,
    birthDate: string,
    phoneNumber: string,
    chainingId: string,
    onError: (data: {
        isFatalError: boolean,
        content: string
    }) => void,
    onSubmit: () => void
};

const SakukuPIN: React.FC<Props> =
    ({
        requestId,
        birthDate,
        phoneNumber,
        chainingId,
        onError,
        onSubmit
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

            setIsLoading(true);
            setErrorMessage('');

            try {
                const {
                    encoding,
                    encryptedPIN,
                    sessionId,
                    randomNumber
                } = await OBMService.encryptPIN(requestId, phoneNumber, pin);

                await AccountActivationService.activateExistingUser(requestId, {
                    chaining_id: chainingId,
                    birth_date: birthDate,
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
        }
        return (
            <PageWrapper>
                <PageHeader title="Aktivasi" />
                <form onSubmit={handleSubmit}>
                    {isLoading && <Loader type="absolute" />}
                    <PageBody>
                        <p>Masukkan PIN Sakuku</p>

                        <OtpInput value={pin}
                            length={6}
                            secure={true}
                            autoFocus={true}
                            className="mb-3"
                            onChange={(value) => setPin(value)} />

                        {errorMessage &&
                            <span className="text-danger d-block">
                                {errorMessage}
                            </span>
                        }
                    </PageBody>
                    <PageActions>
                        <Button type="submit"
                            block={true}
                            variant="primary"
                            disabled={pin.length !== 6}>
                            LANJUT
                        </Button>
                    </PageActions>
                </form>
            </PageWrapper>
        );
    }

export default SakukuPIN;