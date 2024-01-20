import React from 'react';

import {
    Button,
    Image
} from 'react-bootstrap';

import {
    iconPending
} from 'images';

import {
    PageWrapper,
    PageBody,
    PageActions,
    PageHeader
} from 'shared/components';

interface Props {
    onCheckStatus: () => void
}

const PaymentQRISPending: React.FC<Props> = ({
    onCheckStatus
}) => {
    return (<>
        <PageWrapper className="text-center">
            <PageHeader />
            <PageBody>
                <div className="mb-4">
                    <Image src={iconPending}
                        className="animated zoomIn"
                        alt="Pending"
                        title="Pending" />
                </div>

                <h5 className="font-weight-bold">Transaksi sedang diproses.</h5>
            </PageBody>
            <PageActions>
                <Button type="button"
                    block={true}
                    variant="primary"
                    onClick={() => onCheckStatus()}>
                    CEK STATUS
                </Button>
            </PageActions>
        </PageWrapper>
    </>);
};

export default PaymentQRISPending;