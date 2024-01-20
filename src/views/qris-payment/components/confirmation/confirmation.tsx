import React from 'react';

import {
    Button
} from 'react-bootstrap';

import {
    QRISPaymentTransaction
} from 'models';

import {
    PageBody,
    PageActions
} from 'shared/components';

import {
    PaymentInformation,
    PaymentAmount
} from '..';

type ConfirmationProps = {
    paymentData: QRISPaymentTransaction,
    onNext: () => void,
    onCancel: () => void
};

const Confirmation: React.FC<ConfirmationProps> =
    ({
        paymentData,
        onNext,
        onCancel
    }) => {
        return (<>
            <PageBody>
                <h5 className="font-weight-bold mb-5">Konfirmasi Pembayaran</h5>

                <PaymentInformation
                    merchantName={paymentData.merchant_name}
                    transactionId={paymentData.transaction_id}
                    transactionDate={paymentData.transaction_date}
                />

                <PaymentAmount
                    amount={paymentData.amount}
                    tip={paymentData.tip}
                />
            </PageBody>
            <PageActions>
                <Button type="button"
                    variant="primary"
                    block={true}
                    autoFocus
                    onClick={onNext}>
                    LANJUT
                </Button>

                <Button type="button"
                    variant="outline-primary"
                    block={true}
                    onClick={onCancel}>
                    BATAL
                </Button>
            </PageActions>
        </>);
    };

export default Confirmation