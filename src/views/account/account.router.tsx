import React, { useEffect, useState } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { getLocalStorage } from 'utils';
import { AccountOtherProfile } from './pages';

interface otherProfileStateWrapper {
  status: string;
  prevPath: string;
}

const AccountRouter = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(getLocalStorage('token'));
  }, []);

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

      <Route render={() => <Redirect to={`/dashboard`} />} />
    </Switch>
  );
};

export default AccountRouter;
