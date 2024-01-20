import React from 'react';

import { PageWrapper, PageHeader, Loader } from 'shared/components';

import { AccountActivationV2Service } from 'services';

import UserInformationV2 from './user-information-v2';
import PINInformationV2 from './pin-information-v2';
import { useMutation } from 'react-query';
import {
  AccountActivationV2NewUserOutput,
  ErrorWrapperV2,
  ModalErrorWrapperV2,
  NewUserDataWrapper,
} from 'models';

enum VerificationSteps {
  Information,
  PIN,
}

interface Props {
  requestId: string;
  verificationCode: string;
  birthDate: string;
  onError: (data: ModalErrorWrapperV2) => void;
  onSubmit: (redirectUrl: string) => void;
}

const RegistrationV2: React.FC<Props> = ({
  requestId,
  verificationCode,
  birthDate,
  onError,
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [pin, setPin] = React.useState<string>('');
  const [formData, setFormData] = React.useState<NewUserDataWrapper>({
    name: '',
    email: '',
  });

  const toNextStep = () => {
    if (currentStep === 1) {
      return;
    }
    setCurrentStep((step) => step + 1);
  };

  const handleSubmitUserInformation = (data: NewUserDataWrapper) => {
    setFormData(data);
    toNextStep();
  };

  const { isLoading: isLoadingCreateNewUser, mutate: mutateCreateNewUser } = useMutation<
    AccountActivationV2NewUserOutput,
    ErrorWrapperV2
  >(
    ['account-activation-create-user-v2', requestId, verificationCode, formData, birthDate, pin],
    async () =>
      await AccountActivationV2Service.createNewUser(
        requestId,
        verificationCode,
        formData,
        birthDate,
        pin,
      ),
    {
      onSuccess: (result) => {
        onSubmit(result.redirectUrl);
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

  const handleSubmitPINVerification = (pin: string) => {
    if (isLoadingCreateNewUser) {
      return false;
    }
    setPin(pin);
    mutateCreateNewUser();
  };

  return (
    <>
      {isLoadingCreateNewUser && <Loader type="absolute" />}
      <PageWrapper>
        <PageHeader title="Registrasi" />

        {currentStep === VerificationSteps.Information && (
          <UserInformationV2 onSubmit={handleSubmitUserInformation} />
        )}

        {currentStep === VerificationSteps.PIN && (
          <PINInformationV2 onSubmit={handleSubmitPINVerification} />
        )}
      </PageWrapper>
    </>
  );
};

export default RegistrationV2;
