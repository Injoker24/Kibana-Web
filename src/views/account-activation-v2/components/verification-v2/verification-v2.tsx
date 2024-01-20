import React from 'react';

import { PageWrapper, PageHeader, Loader } from 'shared/components';

import { AccountActivationV2Service } from 'services';

import { useMutation } from 'react-query';
import {
  BirthDateDataWrapper,
  ErrorWrapperV2,
  ModalErrorWrapperV2,
  VerificationDataWrapper,
} from 'models';
import BirthDateVerificationV2 from './birth-date-verification-v2';
import OTPVerificationV2 from './otp-verification-v2';

enum VerificationSteps {
  Information,
  OTPInput,
}

interface Props {
  requestId: string;
  verificationCode: string;
  phoneNumber: string;
  onError: (data: ModalErrorWrapperV2) => void;
  onSubmit: (data: VerificationDataWrapper) => void;
}

const VerificationV2: React.FC<Props> = ({
  requestId,
  phoneNumber,
  verificationCode,
  onError,
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [birthDate, setBirthDate] = React.useState<BirthDateDataWrapper>();
  const [otpTimeout, setOtpTimeout] = React.useState<number>(0);

  const toNextStep = () => {
    if (currentStep !== 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const { isLoading: isLoadingGenerateOTP, mutate: mutateGenerateOTP } = useMutation<
    {},
    ErrorWrapperV2
  >(
    ['account-activation-generate-otp-v2', requestId, verificationCode],
    async () =>
      await AccountActivationV2Service.generateOTP({
        requestId,
        verificationCode,
      }),
    {
      onSuccess: () => {
        setOtpTimeout(60);
        toNextStep();
      },
      onError: (error) => {
        // Handle Fatal and Non Fatal Error
        onError({
          shouldExit: error.shouldExit,
          message: error.message,
        });
      },
    },
  );

  const toPreviousStep = () => {
    if (currentStep !== 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const handleSubmitBirthDate = (birthDate: BirthDateDataWrapper) => {
    if (isLoadingGenerateOTP) {
      return false;
    }
    setBirthDate(birthDate);
    mutateGenerateOTP();
  };

  const handleSubmitOTPVerification = (data: { isRegistered: boolean }) => {
    onSubmit({
      birthDate: birthDate?.formattedValue || '',
      isRegistered: data.isRegistered,
    });
  };

  const handleResendCode = () => {
    mutateGenerateOTP();
  };

  return (
    <>
      {isLoadingGenerateOTP && <Loader type="absolute" />}

      <PageWrapper>
        <PageHeader title="Aktivasi" />

        {currentStep === VerificationSteps.Information && (
          <>
            <BirthDateVerificationV2
              value={birthDate?.value}
              phoneNumber={phoneNumber}
              onSubmit={handleSubmitBirthDate}
            />
          </>
        )}

        {currentStep === VerificationSteps.OTPInput && (
          <>
            <OTPVerificationV2
              requestId={requestId}
              verificationCode={verificationCode}
              birthDate={birthDate?.formattedValue || ''}
              phoneNumber={phoneNumber}
              otpTimeout={otpTimeout}
              toPreviousStep={toPreviousStep}
              onSubmit={handleSubmitOTPVerification}
              onResendOTP={handleResendCode}
              onError={onError}
            />
          </>
        )}
      </PageWrapper>
    </>
  );
};

export default VerificationV2;
