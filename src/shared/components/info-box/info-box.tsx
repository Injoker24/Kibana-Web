import React from 'react';

type Props = {
  type?: string;
  message: string;
};

const InfoBox: React.FC<Props> = ({ message, type = 'warning' }: Props) => {
  return (
    <div className={'d-flex align-items-center info-box bg-' + type}>
      <p
        className={'mb-0 ' + (type === 'danger' ? 'text-light' : '')}
        dangerouslySetInnerHTML={{ __html: message }}
      ></p>
    </div>
  );
};

export default InfoBox;
