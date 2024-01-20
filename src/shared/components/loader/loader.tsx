import React, { PropsWithChildren } from "react";
import { Spinner } from "react-bootstrap";

type LoaderProps = {
  type: 'absolute' | 'fixed' | 'inline'
};

const Loader: React.FC<PropsWithChildren<LoaderProps>> =
  ({ type, children }: PropsWithChildren<LoaderProps>) => {
    return (
      <div className={['loader-wrapper', type].join(' ')}>
        <div className="loader">
          <button type="button"
            autoFocus
            className="btn btn-link shadow-none">
            <Spinner animation="grow"
              className="text-primary" />
          </button>

          <p className="text-muted">
            {children}
          </p>
        </div>
      </div>
    );
  }

export default Loader;