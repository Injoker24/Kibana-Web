import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { AccountMyProfile, AccountOtherProfile } from './pages';
import { ProtectedRoute } from 'shared/components';

interface otherProfileStateWrapper {
  status: string;
  prevPath: string;
  transactionId?: string;
}

const AccountRouter = () => {
  return (
    <Switch>
      <Route
        exact
        path={'/account/profile/:userId'}
        render={({ location: { state } }) => (
          <AccountOtherProfile
            {...(state as otherProfileStateWrapper)}
            key={Date.now()}
          />
        )}
      />

      <Route
        exact
        path={'/account/my/profile'}
        render={() => (
          <ProtectedRoute>
            <AccountMyProfile key={Date.now()} />
          </ProtectedRoute>
        )}
      />

      <Route render={() => <Redirect to={`/dashboard`} />} />
    </Switch>
  );
};

export default AccountRouter;
