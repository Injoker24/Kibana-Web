import React from 'react';

type Props = {
  onClick: () => void;
  message: string;
};

const InlineRetryError: React.FC<Props> = ({ onClick, message }: Props) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h4 className="mb-3">{message}</h4>
      <button
        onClick={onClick}
        className="btn btn-outline-primary"
      >
        Coba Lagi
      </button>
    </div>
  );
};

export default InlineRetryError;
