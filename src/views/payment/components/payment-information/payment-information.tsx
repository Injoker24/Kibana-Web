import React from 'react';
import { formatDateTime } from 'utils';

interface Props {
    merchantName: string,
    transactionId: string,
    transactionDate: string | number
};

const PaymentInformation: React.FC<Props> =
    ({
        merchantName,
        transactionId,
        transactionDate,
    }) => {
        return (<>
            <section className="text-center mb-4">
                <span>{merchantName}</span>

                <div className="text-muted">
                    <span className="d-block">No. Transaksi #{transactionId}</span>
                    <span className="d-block">{formatDateTime(transactionDate)}</span>
                </div>
            </section>
        </>);
    };

export default PaymentInformation;