import React, { PropsWithChildren } from "react";
import { Spinner } from "react-bootstrap";

type LoaderProps = {
  type: 'absolute' | 'fixed' | 'inline'
};

/**
 * [2022-AUG-02] Focus on button to close virtual keyboard.
 * Expected behavior: Loader shown -> Close Virtual/Soft Keyboard.
 * Why?: Prevent user from multiple submission using keyboard
 */
const Loader: React.FC<PropsWithChildren<LoaderProps>> =
  ({ type, children }: PropsWithChildren<LoaderProps>) => {
    return (
      <div className={['loader-wrapper', type].join(' ')}
        data-testid="loader-wrapper">


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