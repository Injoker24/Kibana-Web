import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { DashboardIndex } from './pages';

const DashboardRouter = () => {
  return (
    <Switch>
      <Route
        exact
        path={'/dashboard'}
        render={(props) => (
          <DashboardIndex
            {...props}
            key={Date.now()}
          />
        )}
      />

      <Route
        exact
        path={`/dashboard/test`}
        render={() => <>Test</>}
      />

      <Route
        exact
        path={`/dashboard/test2`}
        render={() => <>Test 2</>}
      />

      <Route render={() => <Redirect to={`/dashboard`} />} />
    </Switch>
  );
};

export default DashboardRouter;
