import React from 'react';
import NumberFormat from 'react-number-format';

interface Props {
    value: number | string,
    [key: string]: any
}
const CurrencyValue: React.FC<Props> = (props: Props) => {
    return (
        <NumberFormat
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            decimalScale={0}
            {...props}
        />);
};

export default CurrencyValue;