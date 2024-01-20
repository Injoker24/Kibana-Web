import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './dashboard';

const DashboardRouter = () => {
  return (
    <Switch>
      <Route
        exact
        path={'/dashboard'}
        component={Dashboard}
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

      <Route render={() => <Redirect to={`/not-found`} />} />
    </Switch>
  );
};

export default DashboardRouter;
