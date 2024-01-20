import React from 'react';

import {
    QRISPaymentTransactionTip
} from 'models';

import {
    CurrencyValue
} from 'shared/components';

import {
    QRISTipAmountType
} from 'enums';

import NumberFormat from 'react-number-format';

type PaymentAmountProps = {
    amount: number,
    tip?: QRISPaymentTransactionTip
};

const PaymentAmount: React.FC<PaymentAmountProps> =
    ({
        amount,
        tip
    }) => {
        const tipAmount =
            tip
                ? tip.amount_type === QRISTipAmountType.Percentage
                    ? (tip.amount / 100) * amount
                    : tip.amount
                : 0;

        // Regulasi QRIS, tidak ada desimal (pembulatan ke bawah)
        const totalAmount = Math.floor(amount + tipAmount);

        return (<>
            <section className="text-center">
                {tip && tip.amount > 0 && <>
                    <span>Nominal</span>
                    <h6 className="text-primary">
                        <CurrencyValue value={amount} />
                    </h6>

                    <span>Tips</span>
                    <h6 className="text-primary">
                        {tip.amount_type === QRISTipAmountType.Percentage && <>
                            <NumberFormat
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                decimalScale={2}
                                value={tip.amount || 0}
                                suffix={'%'}
                            />
                        </>}
                        {tip.amount_type === QRISTipAmountType.Absolute && <>
                            <CurrencyValue value={tip.amount || 0} />
                        </>}
                    </h6>
                </>}

                <span>Total Pembayaran</span>
                <h3 className="font-weight-semibold text-primary">
                    <CurrencyValue value={totalAmount} />
                </h3>
            </section>
        </>);
    };

export default PaymentAmount;