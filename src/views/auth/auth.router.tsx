import React, { useEffect, useState } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthLogin, AuthRegister } from './pages';
import { getLocalStorage } from 'utils';

const AuthRouter = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(getLocalStorage('token'));
  }, []);

  return (
    <Switch>
      {!token && (
        <Route
          exact
          path={'/auth/login'}
          render={(props) => (
            <AuthLogin
              {...props}
              key={Date.now()}
            />
          )}
        />
      )}
      {!token && (
        <Route
          exact
          path={'/auth/register'}
          render={(props) => (
            <AuthRegister
              {...props}
              key={Date.now()}
            />
          )}
        />
      )}
      <Route render={() => <Redirect to={`/dashboard`} />} />
    </Switch>
  );
};

export default AuthRouter;
