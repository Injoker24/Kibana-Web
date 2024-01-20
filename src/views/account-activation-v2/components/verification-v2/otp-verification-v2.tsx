import { NonFatalErrorCodeV2 } from 'enums';
import { AccountActivationV2VerifyOTPOutput, ErrorWrapperV2, ModalErrorWrapperV2 } from 'models';
import React from 'react';

import { Button } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { AccountActivationV2Service } from 'services';

import { PageBody, PageActions, OtpInput, Loader } from 'shared/components';

interface Props {
  requestId: string;
  verificationCode: string;
  birthDate: string;
  otpTimeout: number;
  phoneNumber: string;
  toPreviousStep: () => void;
  onSubmit: (data: { isRegistered: boolean }) => void;
  onResendOTP: () => void;
  onError: (data: ModalErrorWrapperV2) => void;
}

const OTPVerificationV2: React.FC<Props> = ({
  requestId,
  verificationCode,
  birthDate,
  otpTimeout,
  phoneNumber,
  toPreviousStep,
  onSubmit,
  onResendOTP,
  onError,
}) => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [otpCode, setOtpCode] = React.useState('');
  const [otpTimer, setOtpTimer] = React.useState<number>(otpTimeout);

  const { isLoading: isLoadingVerifyOTP, mutate: mutateVerifyOTP } = useMutation<
    AccountActivationV2VerifyOTPOutput,
    ErrorWrapperV2
  >(
    ['account-activation-verify-otp-v2', requestId, verificationCode, otpCode, birthDate],
    async () =>
      await AccountActivationV2Service.verifyOTP({
        requestId,
        verificationCode,
        otpCode,
        birthDate,
      }),
    {
      onSuccess: (result) => {
        onSubmit({
          isRegistered: result.isRegistered,
        });
      },
      onError: (error) => {
        // Should Resend OTP ECB-2-308
        if (error.code === NonFatalErrorCodeV2.ShouldResendOTP) {
          onError({
            shouldExit: error.shouldExit,
            message: error.message,
            onClose: () => setOtpTimer(0),
          });
          return;
        }

        // Invalid Date of Birth ECB-2-304 and Unmapped Error ECB-3-999
        const shouldReinputDOB = [
          String(NonFatalErrorCodeV2.InvalidDOB),
          String(NonFatalErrorCodeV2.UnmappedError),
        ].includes(error.code);

        if (shouldReinputDOB) {
          onError({
            shouldExit: error.shouldExit,
            message: error.message,
            onClose: toPreviousStep,
          });
          return;
        }

        // Invalid OTP ECB-3-304
        if (error.code === NonFatalErrorCodeV2.InvalidOTP) {
          setErrorMessage(error.message);
          return;
        }

        // Handle Fatal and Non Fatal Error
        onError({
          shouldExit: error.shouldExit,
          message: error.message,
        });
      },
    },
  );

  //#region Timer for OTP
  let intervalRef = React.useRef<any>();

  function useInterval(callback: Function) {
    const savedCallback = React.useRef<Function>(() => {});

    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

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
      setOtpTimer(otpTimer - 1);
    }
  });
  //#endregion

  const handleChangeOTP = (value: string) => setOtpCode(value);

  const handleSubmitOTP = (e: any) => {
    e.preventDefault();

    if (isLoadingVerifyOTP) {
      return false;
    }

    mutateVerifyOTP();
  };

  const handleResendOTP = () => {
    setOtpCode('');
    onResendOTP();
    setOtpTimer(otpTimeout);
  };

  return (
    <form onSubmit={handleSubmitOTP}>
      {isLoadingVerifyOTP && <Loader type="absolute" />}

      <PageBody>
        <p>
          BCA telah mengirim SMS berisi 6 digit Kode Verifikasi ke Nomor Handphone{' '}
          <b>{phoneNumber}</b>.
        </p>

        <OtpInput
          value={otpCode}
          length={6}
          autoFocus={true}
          onChange={handleChangeOTP}
        />

        {errorMessage && <span className="text-danger d-block">{errorMessage}</span>}
      </PageBody>
      <PageActions>
        <Button
          type="submit"
          block={true}
          variant="primary"
          className="mb-2"
          disabled={otpCode.length !== 6}
        >
          KONFIRMASI
        </Button>
        <Button
          type="button"
          block={true}
          variant="outline-primary"
          disabled={otpTimer !== 0}
          onClick={handleResendOTP}
        >
          KIRIM ULANG KODE {otpTimer > 0 && <>({otpTimer})</>}
        </Button>
      </PageActions>
    </form>
  );
};

export default OTPVerificationV2;
