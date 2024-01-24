import React from 'react';

type Props = {
  onRetry: () => void;
  message: string;
};

const InlineRetryError: React.FC<Props> = ({ onRetry, message }: Props) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h4 className="mb-3">{message}</h4>
      <div
        onClick={onRetry}
        className="btn btn-outline-primary"
      >
        Coba Lagi
      </div>
    </div>
  );
};

export default InlineRetryError;
