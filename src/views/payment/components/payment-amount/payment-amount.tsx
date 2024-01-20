import React from 'react';

import { CurrencyValue } from 'shared/components';

type PaymentAmountProps = {
    amount: number
};

const PaymentAmount: React.FC<PaymentAmountProps> =
    ({
        amount
    }) => {
        return (<>
            <section className="text-center">
                <span>Total Pembayaran</span>
                <h3 className="font-weight-semibold text-primary">
                    <CurrencyValue value={amount} />
                </h3>
            </section>
        </>);
    };

export default PaymentAmount;