import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './login';

const LoginRouter = () => {
  return (
    <Switch>
      <Route
        exact
        path={'/login'}
        component={Login}
      />

      <Route render={() => <Redirect to={`/dashboard`} />} />
    </Switch>
  );
};

export default LoginRouter;
