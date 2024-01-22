import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './login';

const LoginRouter = () => {
  return (
    <Switch>
      <Route
        exact
        path={'/login'}
        render={(props) => <Login {...props} key={Date.now()}/>}
      />

      <Route render={() => <Redirect to={`/dashboard`} />} />
    </Switch>
  );
};

export default LoginRouter;
