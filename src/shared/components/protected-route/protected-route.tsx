import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getLocalStorage } from 'utils';

type Props = {
  children: any;
};

const ProtectedRoute: React.FC<Props> = ({ children }: Props) => {
  const [token, setToken] = useState<string>('test');

  useEffect(() => {
    setToken(getLocalStorage('token'));
  }, []);

  return (
    <>
      {!token && <Redirect to={'/auth/login'} />}
      {token && children}
    </>
  );
};

export default ProtectedRoute;
