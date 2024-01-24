import React, { PropsWithChildren } from 'react';
import { Spinner } from 'react-bootstrap';

type LoaderProps = {
  type: 'absolute' | 'fixed' | 'inline';
};

const Loader: React.FC<PropsWithChildren<LoaderProps>> = ({
  type,
  children,
}: PropsWithChildren<LoaderProps>) => {
  return (
    <div className={['loader-wrapper', type].join(' ')}>
      <div className="loader">
        <Spinner
          animation="grow"
          className="text-primary"
        />
        <p className="text-muted">{children}</p>
      </div>
    </div>
  );
};

export default Loader;
