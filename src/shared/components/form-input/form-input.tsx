import React, { ReactElement, PropsWithChildren } from 'react';

import { Form } from 'react-bootstrap';

type FormInputProps = {
  label?: string;
  labelFor?: string;
  errorMessage?: ReactElement | string;
  isLoading?: boolean;
};

const FormInput: React.FC<PropsWithChildren<FormInputProps>> = ({
  children,
  label,
  labelFor,
  errorMessage,
}: PropsWithChildren<FormInputProps>): ReactElement => {
  return (
    <Form.Group>
      {label && <Form.Label htmlFor={labelFor}>{label}</Form.Label>}
      {children}
      {errorMessage && (
        <Form.Control.Feedback
          type="invalid"
          className="animated fadeInDown"
        >
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default FormInput;
