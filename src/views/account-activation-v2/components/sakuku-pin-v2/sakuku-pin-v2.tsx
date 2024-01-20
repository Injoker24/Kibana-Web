import React from 'react';

import { Button } from 'react-bootstrap';

import {
  PageWrapper,
  PageHeader,
  PageBody,
  PageActions,
  OtpInput,
  Loader,
} from 'shared/components';

import { AccountActivationV2Service } from 'services';
import { AccountActivationV2ExistingUserOutput, ErrorWrapperV2, ModalErrorWrapperV2 } from 'models';
import { useMutation } from 'react-query';
import { NonFatalErrorCodeV2 } from 'enums';

interface Props {
  requestId: string;
  birthDate: string;
  verificationCode: string;
  onError: (data: ModalErrorWrapperV2) => void;
  onSubmit: (redirectUrl: string) => void;
}

const SakukuPINV2: React.FC<Props> = ({
  requestId,
  verificationCode,
  birthDate,
  onError,
  onSubmit,
}) => {
  const [pin, setPin] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const isFormValid = () => pin.length === 6;

  const { isLoading: isLoadingActivateExistingUser, mutate: mutateActivateExistingUser } =
    useMutation<AccountActivationV2ExistingUserOutput, ErrorWrapperV2>(
      ['account-activation-activate-user-v2', requestId, verificationCode, birthDate, pin],
      async () =>
        await AccountActivationV2Service.activateExistingUser(
          requestId,
          verificationCode,
          birthDate,
          pin,
        ),
      {
        onSuccess: (result) => {
          onSubmit(result.redirectUrl);
        },
        onError: (error) => {
          // Invalid PIN ECB-2-201
          if (error.code === NonFatalErrorCodeV2.InvalidPIN) {
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!isFormValid() || isLoadingActivateExistingUser) {
      return false;
    }
    setErrorMessage('');
    mutateActivateExistingUser();
  };

  return (
    <PageWrapper>
      <PageHeader title="Aktivasi" />
      <form onSubmit={handleSubmit}>
        {isLoadingActivateExistingUser && <Loader type="absolute" />}
        <PageBody>
          <p>Masukkan PIN Sakuku</p>

          <OtpInput
            value={pin}
            length={6}
            secure={true}
            autoFocus={true}
            className="mb-3"
            onChange={(value) => setPin(value)}
          />

          {errorMessage && <span className="text-danger d-block">{errorMessage}</span>}
        </PageBody>
        <PageActions>
          <Button
            type="submit"
            block={true}
            variant="primary"
            disabled={pin.length !== 6}
          >
            LANJUT
          </Button>
        </PageActions>
      </form>
    </PageWrapper>
  );
};

export default SakukuPINV2;
