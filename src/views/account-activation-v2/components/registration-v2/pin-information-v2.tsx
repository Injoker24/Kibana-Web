import React from 'react';
import { PageBody, FormInput, PageActions } from 'shared/components';
import { Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';

interface Props {
  onSubmit: (pin: string) => void;
}

const PINInformationV2: React.FC<Props> = ({ onSubmit }) => {
  const { control, errors, formState, handleSubmit, watch } = useForm({
    mode: 'onBlur',
  });

  const submitForm = (formData: any) => {
    onSubmit(formData.pin);
  };

  /** Validasi PIN lemah / mudah ditebak dengan menggunakan deret.
   * Contoh:
   * - 123456 > lemah (interval 1)
   * - 111111 > lemah (interval 1)
   * - 173951 > lemah (interval 6, dengan membuang karakter pertama)
   */
  const isWeakPIN = (value: string): boolean => {
    let isWeak = true;

    const splittedValue = value.split('').map((s) => Number(s)); // splitted to numbers

    let diff = Math.abs(splittedValue[0] - splittedValue[1]);
    if (splittedValue[1] < splittedValue[0]) {
      diff = splittedValue[1] + 10 - splittedValue[0];
    }

    for (let i = 0; i < splittedValue.length; i++) {
      if (i + 1 !== splittedValue.length) {
        const currentPlusDiff = splittedValue[i] + diff;
        const lastCharCurrentPlusDiff = String(currentPlusDiff).slice(-1);

        const matched = String(splittedValue[i + 1]) === lastCharCurrentPlusDiff;

        isWeak = isWeak && matched;

        if (isWeak === false) break;
      }
    }

    return isWeak;
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <PageBody>
        <FormInput
          label="Buat PIN Sakuku"
          labelFor={'pin'}
          errorMessage={errors?.pin?.message}
        >
          <Controller
            as={<NumberFormat />}
            control={control}
            rules={{
              required: {
                value: true,
                message: 'PIN harus diisi',
              },
              minLength: {
                value: 6,
                message: 'PIN harus 6 digit numerik',
              },
              validate: (value) => {
                if (!isWeakPIN(value)) {
                  return true;
                } else {
                  return 'PIN Sakuku mudah ditebak, mohon mencoba kembali';
                }
              },
            }}
            id="pin"
            name="pin"
            type="tel"
            placeholder="6 digit angka"
            maxLength={6}
            className={`form-control secure-input ${
              formState.touched.pin === true && !!errors.pin ? 'is-invalid' : ''
            }`}
            autoComplete={'off'}
          />
        </FormInput>

        <FormInput
          label="Ulangi PIN Sakuku"
          labelFor={'rePin'}
          errorMessage={errors?.rePin?.message}
        >
          <Controller
            as={<NumberFormat />}
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Konfirmasi PIN harus diisi',
              },
              validate: (value) => {
                if (value === watch('pin')) {
                  return true;
                } else {
                  return 'Konfirmasi PIN tidak sesuai';
                }
              },
            }}
            id="rePin"
            name="rePin"
            type="tel"
            placeholder="6 digit angka"
            maxLength={6}
            className={`form-control secure-input ${
              formState.touched.rePin === true && !!errors.rePin ? 'is-invalid' : ''
            }`}
            autoComplete={'off'}
          />
        </FormInput>
      </PageBody>
      <PageActions>
        <Button
          type="submit"
          block={true}
          variant="primary"
        >
          LANJUT
        </Button>
      </PageActions>
    </form>
  );
};

export default PINInformationV2;
