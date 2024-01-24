import React, { useState } from 'react';
import Popup from 'reactjs-popup';

type Props = {
  onRetry?: () => void;
  message: string;
};

const PopUpError: React.FC<Props> = ({ onRetry, message }: Props) => {
  const [open, setOpen] = useState(true);
  return (
    <Popup
      open={open}
      closeOnDocumentClick={false}
      className="popup-error"
    >
      <div className="flex-centered flex-column">
        <h4 className="mb-4 text-center">{message}</h4>
        {!onRetry && (
          <div
            className="btn btn-primary w-100"
            onClick={() => setOpen(false)}
          >
            OK
          </div>
        )}
        {onRetry && (
          <div className="d-flex flex-row flex-wrap w-100">
            <div className="col-lg-6 col-12">
              <div
                className="btn btn-primary"
                onClick={() => setOpen(false)}
              >
                Kembali
              </div>
            </div>
            <div className="col-lg-6 col-12 mb-3 mb-lg-0 order-first order-lg-last">
              <div
                className="btn btn-outline-primary"
                onClick={onRetry}
              >
                Coba Lagi
              </div>
            </div>
          </div>
        )}
      </div>
    </Popup>
  );
};

export default PopUpError;
