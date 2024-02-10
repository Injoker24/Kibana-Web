import { IconClose } from 'images';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';

type Props = {
  onSubmit: () => void;
  onCancel: () => void;
  title: string;
  message: string;
};

const PopUpConfirm: React.FC<Props> = ({ onCancel, onSubmit, title, message }: Props) => {
  const [open, setOpen] = useState(true);
  return (
    <Popup
      open={open}
      closeOnDocumentClick={false}
      className="popup-confirm"
    >
      <div className="flex-centered flex-column">
        <div className="flex-centered w-100 justify-content-between mb-4">
          <h3 className="mb-0">{title}</h3>
          <div
            className="cursor-pointer"
            onClick={() => {
              onCancel();
              setOpen(false);
            }}
          >
            <IconClose />
          </div>
        </div>
        <h4
          className="mb-4 text-center"
          dangerouslySetInnerHTML={{ __html: message }}
        ></h4>

        <div className="d-flex flex-row flex-wrap w-100">
          <div className="col-lg-6 col-12">
            <div
              className="btn btn-outline-primary"
              onClick={() => {
                onCancel();
                setOpen(false);
              }}
            >
              Kembali
            </div>
          </div>
          <div className="col-lg-6 col-12 mb-3 mb-lg-0 order-first order-lg-last">
            <div
              className="btn btn-primary"
              onClick={() => {
                onSubmit();
                setOpen(false);
              }}
            >
              Lanjut
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default PopUpConfirm;
