import React, {
  useState
} from 'react';

import {
  Button
} from 'react-bootstrap';

import NumberFormat, { NumberFormatValues } from 'react-number-format';

import {
  QRISPaymentTransaction
} from 'models';

import {
  PageBody,
  PageActions,
  FormInput,
  CurrencyValue
} from 'shared/components';

import {
  PaymentInformation
} from '..';

import {
  QRISType,
  QRISTipType,
  QRISTipAmountType
} from 'enums';

type PaymentProps = {
  paymentData: QRISPaymentTransaction,
  onSubmit: (data: QRISPaymentTransaction) => void,
  onCancel: () => void
};

const Payment: React.FC<PaymentProps> =
  ({
    paymentData,
    onSubmit,
    onCancel
  }) => {
    const [amount, setAmount] = useState<number | undefined>(
      paymentData.amount !== 0
        ? paymentData.amount
        : undefined);
    const [tipAmount, setTipAmount] = useState<number | undefined>(
      paymentData.tip?.amount !== 0
        ? paymentData.tip?.amount
        : undefined);

    const isValidForm =
      (): boolean => {
        let isValid = true;

        if (paymentData.qr_type === QRISType.Static) {
          isValid = isValid && (amount !== undefined && amount > 0);
        }

        return isValid;
      };

    const handleSubmit = (e: any) => {
      e.preventDefault();

      if (!isValidForm()) {
        return false;
      }

      const data = { ...paymentData };
      data.amount = amount || 0;
      if (data.tip) {
        data.tip.amount = tipAmount || 0;
      }
      onSubmit(data);
    };

    return (<form onSubmit={handleSubmit}>
      <PageBody>
        <h5 className="font-weight-bold mb-5">Pembayaran QRIS</h5>

        <PaymentInformation
          merchantName={paymentData.merchant_name}
          transactionId={paymentData.transaction_id}
          transactionDate={paymentData.transaction_date}
        />

        {paymentData.qr_type === QRISType.Dynamic && <>
          <span>Nominal</span>
          <h6 className="text-primary">
            <CurrencyValue value={paymentData.amount} />
          </h6>
        </>}

        {paymentData.qr_type === QRISType.Static && <>
          <FormInput label="Input Nominal">
            <NumberFormat name="amount"
              value={amount}
              onValueChange={(e) => setAmount(+e.value)}

              className="form-control text-center"
              placeholder="Isi Jumlah Nominal"
              autoComplete="off"
              autoFocus={true}
              thousandSeparator={'.'}
              decimalSeparator={' '}
              decimalScale={0}
              allowLeadingZeros={false}
              allowNegative={false}
            />
          </FormInput>
        </>}

        {paymentData.tip && <>
          {paymentData.tip.type === QRISTipType.Optional && <>
            <FormInput label="Input Tips">
              {paymentData.tip.amount_type === QRISTipAmountType.Absolute && <>
                <NumberFormat name="tip_amount"
                  value={tipAmount}
                  onValueChange={(e) => setTipAmount(+e.value)}

                  className="form-control text-center"
                  placeholder="Isi Jumlah Nominal"
                  autoComplete="off"
                  thousandSeparator={'.'}
                  decimalSeparator={' '}
                  decimalScale={0}
                  allowLeadingZeros={false}
                  allowNegative={false}
                />
              </>}

              {paymentData.tip.amount_type === QRISTipAmountType.Percentage && <>
                <NumberFormat name="tip_amount"
                  value={tipAmount}
                  onValueChange={(e) => setTipAmount(+e.value)}

                  className="form-control text-center"
                  placeholder="Isi Jumlah Nominal"
                  autoComplete="off"
                  decimalSeparator={','}
                  decimalScale={2}
                  allowLeadingZeros={false}
                  allowNegative={false}
                  isAllowed={(values: NumberFormatValues) => {
                    const { floatValue } = values;
                    if (!floatValue) return true; // Undefined (or empty) is allowed
                    return floatValue >= 0 && floatValue <= 100
                  }}
                  suffix="%"
                />
              </>}
            </FormInput>
          </>}

          {paymentData.tip.type === QRISTipType.Mandatory && <>
            <span>Tips</span>
            <h6 className="text-primary">
              {paymentData.tip.amount_type === QRISTipAmountType.Percentage && <>
                <NumberFormat
                  displayType={'text'}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  decimalScale={2}
                  value={paymentData.tip.amount || 0}
                  suffix={'%'}
                />
              </>}
              {paymentData.tip.amount_type === QRISTipAmountType.Absolute && <>
                <CurrencyValue value={paymentData.tip.amount || 0} />
              </>}
            </h6>
          </>}
        </>}
      </PageBody>
      <PageActions>
        <Button type="submit"
          variant="primary"
          block={true}
          disabled={!isValidForm()}>
          LANJUT
        </Button>

        <Button type="button"
          variant="outline-primary"
          block={true}
          onClick={onCancel}>
          BATAL
        </Button>
      </PageActions>
    </form>);
  };

export default Payment