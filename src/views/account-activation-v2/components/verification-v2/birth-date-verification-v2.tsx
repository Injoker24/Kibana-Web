import { BirthDateDataWrapper } from 'models';
import React from 'react';

import { Button } from 'react-bootstrap';

import { PageBody, PageActions, FormInput, DropdownDateSelection } from 'shared/components';

interface Props {
  value?: Date;
  phoneNumber: string;
  onSubmit: (data: BirthDateDataWrapper) => void;
}

const BirthDateVerificationV2: React.FC<Props> = ({ value, phoneNumber, onSubmit }) => {
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [birthDate, setBirthDate] = React.useState<BirthDateDataWrapper>();

  const handleChangeBirthDate = React.useCallback((data: BirthDateDataWrapper) => {
    if (data.value > new Date()) {
      setErrorMessage('Tanggal Lahir tidak valid');
      return;
    }
    setErrorMessage('');
    setBirthDate(data);
  }, []);

  const handleSubmitBirthDate = (e: any) => {
    e.preventDefault();
    if (!birthDate) {
      return;
    }

    onSubmit(birthDate);
  };

  return (
    <form onSubmit={handleSubmitBirthDate}>
      <PageBody>
        <FormInput label="Nomor Handphone">
          <div className="text-primary">{phoneNumber}</div>
        </FormInput>

        <FormInput
          label="Tanggal Lahir"
          errorMessage={errorMessage}
        >
          <DropdownDateSelection
            value={value}
            format={'YYYY-MM-DD'}
            onChange={handleChangeBirthDate}
          />
        </FormInput>
      </PageBody>
      <PageActions>
        <Button
          type="submit"
          block={true}
          variant="primary"
          disabled={!birthDate}
        >
          LANJUT
        </Button>
      </PageActions>
    </form>
  );
};

export default BirthDateVerificationV2;
