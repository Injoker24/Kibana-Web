import React, { useEffect, useState } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './login';
import { getLocalStorage } from 'utils';
import Register from './register';

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
            <Login
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
            <Register
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
