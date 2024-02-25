import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getLocalStorage } from 'utils';

type Props = {
  children: any;
};

const ProtectedClientRoute: React.FC<Props> = ({ children }: Props) => {
  const [token, setToken] = useState<string>('test');
  const [status, setStatus] = useState<string>('client');

  useEffect(() => {
    setToken(getLocalStorage('token'));
    setStatus(getLocalStorage('status'));
  }, []);

  return (
    <>
      {!token && <Redirect to={'/auth/login'} />}
      {token && status !== 'client' && <Redirect to={'/dashboard'} />}
      {token && status === 'client' && children}
    </>
  );
};

export default ProtectedClientRoute;
