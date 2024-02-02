import React from 'react';
import { Row } from 'react-bootstrap';

type Props = {
  message: string;
};

const InfoBox: React.FC<Props> = ({ message }: Props) => {
  return (
    <div className="d-flex align-items-center info-box">
      <p className="mb-0">{message}</p>
    </div>
  );
};

export default InfoBox;
