import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthLogin, AuthRegister, AuthRegisterFreelancer } from './pages';
import { ProtectedClientNotFreelancerRoute, PublicRoute } from 'shared/components';

const AuthRouter = () => {
  return (
    <Switch>
      <Route
        exact
        path={'/auth/login'}
        render={() => (
          <PublicRoute>
            <AuthLogin key={Date.now()} />
          </PublicRoute>
        )}
      />

      <Route
        exact
        path={'/auth/register'}
        render={() => (
          <PublicRoute>
            <AuthRegister key={Date.now()} />
          </PublicRoute>
        )}
      />

      <Route
        exact
        path={'/auth/register/freelancer'}
        render={() => (
          <ProtectedClientNotFreelancerRoute>
            <AuthRegisterFreelancer key={Date.now()} />
          </ProtectedClientNotFreelancerRoute>
        )}
      />

      <Route render={() => <Redirect to={`/dashboard`} />} />
    </Switch>
  );
};

export default AuthRouter;
