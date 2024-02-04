import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { getLocalStorage } from 'utils';

type Props = {
  message: string;
};

const TitleBanner: React.FC<Props> = ({ message }: Props) => {
  const [status, setStatus] = useState();

  useEffect(() => {
    setStatus(getLocalStorage('status'));
  }, []);

  return (
    <Row className="justify-content-center my-5">
      <div className="col-10">
        <div
          className={
            'flex-centered text-light p-4 py-5 rounded text-center ' +
            (status === 'freelancer' ? 'bg-secondary-dark' : 'bg-primary-dark')
          }
        >
          <h2 className="mb-0">{message}</h2>
        </div>
      </div>
    </Row>
  );
};

export default TitleBanner;
