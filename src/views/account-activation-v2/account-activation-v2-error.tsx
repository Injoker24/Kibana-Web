import React from 'react';

import { PageWrapper, PageHeader, PageBody, PageActions } from 'shared/components';

import { Image, Button } from 'react-bootstrap';

import { iconGeneralError } from 'images';

import { currentLanguage } from 'storages';

const AccountActivationV2Error = ({ shouldExit = false, message }: any) => {
  const handleReloadPage = () => window.location.reload();

  const handleExitApplication = () => {
    // new tab
    if (window.opener) {
      window.opener.postMessage('Failed', '*');
      return;
    }

    // iframe
    try {
      console.log(window.parent.location.href);
    } catch (error) {
      window.parent.postMessage('Failed', '*');
      return;
    }

    // webview
    window.location.href = `/${currentLanguage.get()}/account-activation/v2/failed`;
  };

  return (
    <>
      <PageWrapper className="text-center">
        <PageHeader />
        <PageBody>
          <div className="mb-4">
            <Image
              src={iconGeneralError}
              className="animated zoomIn"
              alt="Gagal"
              title="Gagal"
            />
          </div>
          {message}
        </PageBody>
        <PageActions>
          {shouldExit === true ? (
            <Button
              type="button"
              block={true}
              variant="primary"
              onClick={handleExitApplication}
            >
              KEMBALI KE MERCHANT
            </Button>
          ) : (
            <Button
              type="button"
              block={true}
              variant="primary"
              onClick={handleReloadPage}
            >
              REFRESH
            </Button>
          )}
        </PageActions>
      </PageWrapper>
    </>
  );
};

export default AccountActivationV2Error;
