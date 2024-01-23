import React, { useEffect, useState } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './login';
import { getLocalStorage } from 'utils';

const LoginRouter = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(getLocalStorage("token"));
  }, []);

  return (
    <Switch>
      { !token &&
        <Route
          exact
          path={'/login'}
          render={(props) => <Login {...props} key={Date.now()}/>}
        />
      }

      <Route render={() => <Redirect to={`/dashboard`} />} />
    </Switch>
  );
};

export default LoginRouter;
