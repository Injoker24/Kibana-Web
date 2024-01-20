import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';

import { PageWrapper, PageHeader, PageBody, PageActions, Loader } from 'shared/components';
import {
  AccountActivationV2InquiryRiplayOutput,
  ErrorWrapperV2,
  ModalErrorWrapperV2,
} from 'models';
import { useQuery } from 'react-query';
import { AccountActivationV2Service } from 'services';

type OnboardingProps = {
  requestId: string;
  verificationCode: string;
  onError: (data: ModalErrorWrapperV2) => void;
  onNext: () => void;
};

const OnboardingV2: React.FC<OnboardingProps> = ({
  requestId,
  verificationCode,
  onError,
  onNext,
}) => {
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [isRead, setIsRead] = useState<boolean>(false);
  const [isConsent, setIsConsent] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery<
    AccountActivationV2InquiryRiplayOutput,
    ErrorWrapperV2
  >(
    ['account-activation-inquiry-riplay-v2'],
    async () => await AccountActivationV2Service.inquiryRiplay(requestId, verificationCode),
    {
      onError: (error) => {
        // Handle Fatal and Non Fatal Error
        onError({
          message: error.message,
          shouldExit: error.shouldExit,
          onClose: () => {
            if (!error.shouldExit) {
              refetch();
            }
          },
        });
      },
    },
  );

  const handleSubmitUser = () => {
    onNext();
  };

  return (
    <>
      <PageWrapper>
        <PageHeader title="Aktivasi" />
        <PageBody className="py-0 overflow-hidden d-flex flex-column">
          {isLoading && <Loader type="absolute" />}
          {data && (
            <iframe
              className="border-0 w-100 h-100 text-justify mb-3"
              srcDoc={data.riplayDocument}
              title="riplayDoc"
            />
          )}
        </PageBody>
        <PageActions>
          <Form.Group>
            <Form.Check
              id="isRead"
              name="isRead"
              custom
              type="checkbox"
              label={<>Saya telah membaca, memahami, dan menyetujui Informasi di atas.</>}
              checked={isRead}
              onChange={(e: any) => setIsRead(e.target.checked)}
            />
            <Form.Check
              id="isAgree"
              name="isAgree"
              custom
              type="checkbox"
              label={
                <>
                  Saya menyetujui&nbsp;
                  <a
                    href="https://www.bca.co.id/syarat-dan-ketentuan/sakuku"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ketentuan Sakuku
                  </a>
                  &nbsp;yang berlaku.
                </>
              }
              checked={isAgree}
              onChange={(e: any) => setIsAgree(e.target.checked)}
            />
            <Form.Check
              id="isConsent"
              name="isConsent"
              custom
              type="checkbox"
              label={
                <>
                  Saya dengan ini memberikan persetujuan kepada BCA untuk memberikan data saya
                  kepada pihak lain di luar BCA, yang bekerja sama dengan BCA, dalam rangka kegiatan
                  promosi atau tujuan lain.
                </>
              }
              checked={isConsent}
              onChange={(e: any) => setIsConsent(e.target.checked)}
            />
          </Form.Group>
          <Button
            type="button"
            block={true}
            variant="primary"
            onClick={handleSubmitUser}
            disabled={isAgree === false || isRead === false || isConsent === false}
          >
            AKTIVASI SEKARANG
          </Button>
        </PageActions>
      </PageWrapper>
    </>
  );
};

export default OnboardingV2;
