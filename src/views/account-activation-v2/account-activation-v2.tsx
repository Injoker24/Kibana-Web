import React, { useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { Redirect, useParams } from 'react-router-dom';

import { currentLanguage } from 'storages';

import { AccountActivationV2Service } from 'services';

import {
  AccountActivationV2RequestDetailOutput,
  ErrorWrapperV2,
  ModalErrorWrapperV2,
  VerificationDataWrapper,
} from 'models';

import { OnboardingV2, RegistrationV2, SakukuPINV2, VerificationV2 } from './components';
import AccountActivationV2Error from './account-activation-v2-error';

import { Loader } from 'shared/components';

import { useQuery } from 'react-query';
import { getUrlParameter } from 'utils';

enum AccountActivationSteps {
  Onboarding,
  Verification,
  RegisterOrPIN,
}

const AccountActivationV2: React.FC = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const verificationCode = getUrlParameter('verification') || '';
  const [errorModal, setErrorModal] = React.useState<ModalErrorWrapperV2>();
  const [error, setError] = React.useState<ErrorWrapperV2>();
  const requestCountdownTimerRef = React.useRef(0);
  const [currentStep, setCurrentStep] = React.useState(-1);
  const [verificationData, setVerificationData] = React.useState<VerificationDataWrapper>();

  //#region Wizard Stepper
  const toNextStep = () => {
    setCurrentStep((step) => step + 1);
  };

  //#region Exit
  const handleExitApplication = () => {
    // New Tab
    if (window.opener) {
      window.opener.postMessage('Failed', '*');
      return;
    }

    // IFrame
    try {
      console.log(window.parent.location.href);
    } catch (error) {
      window.parent.postMessage('Failed', '*');
      return;
    }

    // Webview
    window.location.href = `/${currentLanguage.get()}/account-activation/v2/failed`;
  };
  //#endregion

  //#region Error Modal
  const handleErrorModal = useCallback((data: ModalErrorWrapperV2) => {
    if (data.shouldExit) {
      clearInterval(requestCountdownTimerRef.current);
    }

    setErrorModal({
      message: data.message,
      shouldExit: data.shouldExit,
      onClose: () => {
        // Fatal Error
        if (data.shouldExit) {
          handleExitApplication();
          return;
        }

        // Non Fatal Error
        setErrorModal(undefined);

        if (data.onClose) {
          data.onClose();
        }
      },
    });
  }, []);
  //#endregion

  //#region Error Page
  const handleErrorPage = (error: ErrorWrapperV2) => {
    setError(error);
  };
  //#endregion

  //#region Get Request Detail
  const { data: requestData, isLoading } = useQuery<
    AccountActivationV2RequestDetailOutput,
    ErrorWrapperV2
  >(
    ['account-activation-request-detail-v2', requestId, verificationCode],
    async () => await AccountActivationV2Service.getRequestDetail(requestId, verificationCode),
    {
      onSuccess: (result) => {
        setCurrentStep(AccountActivationSteps.Onboarding);

        let timeLeft = result.remainingTime;

        requestCountdownTimerRef.current = window.setInterval(() => {
          timeLeft--;

          if (timeLeft <= 0) {
            handleErrorModal({
              shouldExit: true,
              message:
                'Aktivasi Sakuku telah melebihi batas waktu yang ditentukan. Ulangi Aktivasi Sakuku.',
            });
          }
        }, 1000);
      },
      onError: (error) => {
        setError(error);
      },
    },
  );
  //#endregion

  const handleSubmitVerification = (data: VerificationDataWrapper) => {
    setVerificationData({
      birthDate: data.birthDate,
      isRegistered: data.isRegistered,
    });
    toNextStep();
  };

  const handleSubmitSakukuPIN = (redirectUrl: string) => {
    clearInterval(requestCountdownTimerRef.current);
    window.location.href = redirectUrl;
  };

  const handleSubmitRegistration = (redirectUrl: string) => {
    clearInterval(requestCountdownTimerRef.current);
    window.location.href = redirectUrl;
  };

  if (error) {
    // Fatal Error
    if (error.shouldExit) {
      clearInterval(requestCountdownTimerRef.current);
      return (
        <Redirect
          to={{
            pathname: `/${currentLanguage.get()}/account-activation/v2/error`,
            state: {
              shouldExit: error.shouldExit,
              message: error.message,
            },
          }}
        />
      );
    }

    // Non Fatal Error
    return (
      <AccountActivationV2Error
        shouldExit={error.shouldExit}
        message={error.message}
      />
    );
  }

  return (
    <>
      {errorModal && (
        <Modal
          show={true}
          centered={true}
        >
          <Modal.Body className="text-center">{errorModal.message}</Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              block={true}
              onClick={errorModal?.onClose}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {isLoading && <Loader type="absolute" />}

      {requestData && (
        <>
          {currentStep === AccountActivationSteps.Onboarding && (
            <OnboardingV2
              requestId={requestId}
              verificationCode={verificationCode}
              onNext={toNextStep}
              onError={handleErrorModal}
            />
          )}
          {currentStep === AccountActivationSteps.Verification && (
            <VerificationV2
              requestId={requestId}
              verificationCode={verificationCode}
              phoneNumber={requestData.phoneNumber}
              onError={handleErrorModal}
              onSubmit={handleSubmitVerification}
            />
          )}

          {currentStep === AccountActivationSteps.RegisterOrPIN && (
            <>
              {verificationData && verificationData.isRegistered === true && (
                <SakukuPINV2
                  requestId={requestId}
                  verificationCode={verificationCode}
                  birthDate={verificationData.birthDate}
                  onError={handleErrorModal}
                  onSubmit={handleSubmitSakukuPIN}
                />
              )}
              {verificationData && verificationData.isRegistered === false && (
                <RegistrationV2
                  requestId={requestId}
                  verificationCode={verificationCode}
                  birthDate={verificationData.birthDate}
                  onError={handleErrorModal}
                  onSubmit={handleSubmitRegistration}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default AccountActivationV2;
