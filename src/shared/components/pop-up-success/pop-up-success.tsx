import React, { useState } from 'react';
import Popup from 'reactjs-popup';

type Props = {
  onClose?: () => void;
  message: string;
};

const PopUpSuccess: React.FC<Props> = ({ onClose, message }: Props) => {
  const [open, setOpen] = useState(true);
  return (
    <Popup
      open={open}
      closeOnDocumentClick={false}
      className="popup-error"
    >
      <div className="flex-centered flex-column">
        <h4 className="mb-4 text-center">{message}</h4>
        {!onClose && (
          <div
            className="btn btn-primary w-100"
            onClick={() => setOpen(false)}
          >
            OK
          </div>
        )}
        {onClose && (
          <div
            className="btn btn-primary w-100"
            onClick={onClose}
          >
            OK
          </div>
        )}
      </div>
    </Popup>
  );
};

export default PopUpSuccess;
