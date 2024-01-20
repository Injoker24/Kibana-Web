import React from 'react';

import {
    Button
} from 'react-bootstrap';

import {
    PageBody,
    PageActions
} from 'shared/components';

import {
    PaymentInformation,
    PaymentAmount
} from '..';

type ConfirmationProps = {
    merchantName: string,
    transactionId: string,
    transactionDate: string | number,
    amount: number,
    onNext: () => void,
    onCancel: () => void
};

const Confirmation: React.FC<ConfirmationProps> =
    ({
        merchantName,
        transactionId,
        transactionDate,
        amount,
        onNext,
        onCancel
    }) => {
        return (<>
            <PageBody>
                <h5 className="font-weight-bold mb-5">Konfirmasi Pembayaran</h5>

                <PaymentInformation
                    merchantName={merchantName}
                    transactionId={transactionId}
                    transactionDate={transactionDate}
                />

                <PaymentAmount
                    amount={amount}
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