import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getLocalStorage } from 'utils';

type Props = {
  children: any;
};

const ProtectedClientNotFreelancerRoute: React.FC<Props> = ({ children }: Props) => {
  const [token, setToken] = useState<string>('test');
  const [status, setStatus] = useState<string>('client');
  const [isFreelancer, setIsFreelancer] = useState<string>('false');

  useEffect(() => {
    setToken(getLocalStorage('token'));
    setStatus(getLocalStorage('status'));
    setIsFreelancer(getLocalStorage('isFreelancer'));
  }, []);

  return (
    <>
      {!token && <Redirect to={'/auth/login'} />}
      {token && status !== 'client' && <Redirect to={'/dashboard'} />}
      {token && status === 'client' && isFreelancer === 'true' && <Redirect to={'/dashboard'} />}
      {token && status === 'client' && isFreelancer === 'false' && children}
    </>
  );
};

export default ProtectedClientNotFreelancerRoute;
