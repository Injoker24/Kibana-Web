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
      <Route render={() => <Redirect to={`/dashboard`} />} />
    </Switch>
  );
};

export default DashboardRouter;
