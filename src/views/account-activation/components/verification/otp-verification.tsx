import { ErrorCode } from 'enums';
import React from 'react';

import {
    Button
} from 'react-bootstrap';
import { AccountActivationService } from 'services';

import {
    PageBody,
    PageActions,
    OtpInput, Loader
} from 'shared/components';

interface Props {
    requestId: string,
    merchantId: string,
    birthDate: string,

    otpTimeout: number,
    phoneNumber: string,

    toPreviousStep: () => void,
    onSubmit: (data: {
        chaining_id: string,
        is_registered: boolean
    }) => void,
    onResendOTP: () => void,
    onError: (data: {
        isFatalError: boolean,
        content: string,
        onClose?: Function
    }) => void,
}

const OTPVerification: React.FC<Props> = ({
    requestId,
    merchantId,
    birthDate,

    otpTimeout,
    phoneNumber,

    toPreviousStep,
    onSubmit,
    onResendOTP,
    onError
}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const [otpCode, setOtpCode] = React.useState('');
    const [otpTimer, setOtpTimer] = React.useState<number>(otpTimeout);

    //#region Timer for OTP
    let intervalRef = React.useRef<any>();

    function useInterval(callback: Function) {
        const savedCallback = React.useRef<Function>(() => { });

        // Remember the latest callback
        React.useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval
        React.useEffect(() => {
            intervalRef.current = setInterval(() => {
                savedCallback.current();

                if (otpTimer === 0) {
                    clearInterval(intervalRef.current);
                }
            }, 1000);

            return () => clearInterval(intervalRef.current);
        }, []);
    }

    useInterval(() => {
        if (otpTimer > 0) {
            // console.log(otpTimer);
            setOtpTimer(otpTimer - 1);
        }
    });
    //#endregion

    const handleChangeOTP = (value: string) => setOtpCode(value);

    const handleSubmitOTP = async (e: any) => {
        e.preventDefault();

        if (isLoading) {
            return false;
        }

        try {
            setIsLoading(true);

            const { output_schema } = await AccountActivationService.verifyOTP(requestId, {
                merchant_id: merchantId,
                phone_number: phoneNumber,
                birth_date: birthDate,
                otp_code: otpCode
            });

            setIsLoading(false);

            onSubmit({
                chaining_id: output_schema.chaining_id,
                is_registered: output_schema.is_registered
            });
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

            /**
             * Note: Saat ini (25 Sep 2020), Ini http status code 400. Mestinya 500.
             * 3 Jan 2022, Http Status Code sudah 500
             */

            if (error_schema.error_code === ErrorCode.ShouldResendOTP) {
                onError({
                    isFatalError: false,
                    content: error_schema.message,
                    onClose: () => setOtpTimer(0)
                });
                return;
            }


            if (status === 400) {
                // Kalo tanggal lahirnya salah, mundur
                if (error_schema.error_code === ErrorCode.InvalidBirthDate) {
                    onError({
                        isFatalError: false,
                        content: error_schema.message,
                        onClose: toPreviousStep
                    });

                    return;
                }

                setErrorMessage(error_schema.message);
                return;
            }

            if (status === 504) {
                onError({
                    isFatalError: false,
                    content: error_schema.message,
                    onClose: toPreviousStep
                });
                return;
            }
            // 500
            onError({
                isFatalError: false,
                content: error_schema.message
            });
        }
    };

    const handleResendOTP = async () => {
        try {
            setOtpCode('');

            await onResendOTP();

            setOtpTimer(otpTimeout);
        } catch (error) {
            // do nothing
        }
    };

    return (<form onSubmit={handleSubmitOTP}>
        {isLoading && <Loader type="absolute" />}

        <PageBody>
            <p>BCA telah mengirim SMS berisi 6 digit Kode Verifikasi ke Nomor Handphone <b>{phoneNumber}</b>.</p>

            <OtpInput value={otpCode}
                length={6}
                autoFocus={true}
                onChange={handleChangeOTP} />

            {errorMessage &&
                <span className="text-danger d-block">
                    {errorMessage}
                </span>
            }
            {/* <div className="absolute-bottom-center">
                <small className="d-block mb-2">
                    Registrasi ini dikenakan biaya SMS
                </small>
            </div> */}
        </PageBody>
        <PageActions>
            <Button type="submit"
                block={true}
                variant="primary"
                className="mb-2"
                disabled={otpCode.length !== 6}>
                KONFIRMASI
            </Button>
            <Button type="button"
                block={true}
                variant="outline-primary"
                disabled={otpTimer !== 0}
                onClick={handleResendOTP}
            >
                KIRIM ULANG KODE {otpTimer > 0 && <>({otpTimer})</>}
            </Button>
        </PageActions>
    </form>);
};

export default OTPVerification;