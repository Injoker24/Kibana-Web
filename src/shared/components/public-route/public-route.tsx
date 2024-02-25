import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getLocalStorage } from 'utils';

type Props = {
  children: any;
};

const PublicRoute: React.FC<Props> = ({ children }: Props) => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    setToken(getLocalStorage('token'));
  }, []);

  return (
    <>
      {token && <Redirect to={'/dashboard'} />}
      {!token && children}
    </>
  );
};

export default PublicRoute;
