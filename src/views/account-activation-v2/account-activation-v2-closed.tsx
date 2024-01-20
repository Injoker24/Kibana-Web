import React from 'react';
import { Image } from 'react-bootstrap';
import { PageWrapper, PageHeader, PageBody } from 'shared/components';
import { iconSuccess, iconGeneralError } from 'images';
import { ActivityStatus } from 'enums';

interface Props {
  type: ActivityStatus;
}
const AccountActivationV2Closed: React.FC<Props> = ({ type }) => {
  return (
    <>
      <PageWrapper className="text-center">
        <PageHeader />
        <PageBody>
          <div className="mb-4">
            {type === ActivityStatus.Completed && (
              <Image
                src={iconSuccess}
                className="animated zoomIn"
                alt="Sukses"
                title="Sukses"
              />
            )}

            {type === ActivityStatus.Failed && (
              <Image
                src={iconGeneralError}
                className="animated zoomIn"
                alt="Gagal"
                title="Gagal"
              />
            )}
          </div>

          <p>Silakan tutup halaman ini</p>
        </PageBody>
      </PageWrapper>
    </>
  );
};

export default AccountActivationV2Closed;
