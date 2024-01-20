import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { ActivityStatus } from 'enums';

import { AccountActivationV2, AccountActivationV2Error, AccountActivationV2Closed } from '.';

interface stateWrapper {
  shouldExit: boolean;
  message: string;
}

const AccountActivationV2Router = () => {
  return (
    <Switch>
      <Route
        exact
        path={`*/error`}
        render={({ location: { state } }) => (
          <AccountActivationV2Error {...(state as stateWrapper)} />
        )}
      />

      <Route
        exact
        path={`*/completed`}
        render={() => <AccountActivationV2Closed type={ActivityStatus.Completed} />}
      />

      <Route
        exact
        path={`*/failed`}
        render={() => <AccountActivationV2Closed type={ActivityStatus.Failed} />}
      />

      <Route
        exact
        path={`*/:requestId`}
        component={AccountActivationV2}
      />

      <Route render={() => <Redirect to={`/not-found`} />} />
    </Switch>
  );
};

export default AccountActivationV2Router;
