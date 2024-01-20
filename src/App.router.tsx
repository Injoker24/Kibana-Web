import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { DashboardRouter } from 'views/dashboard';
import { Page404 } from 'views/pages';

const AppRouter: React.FC<any> = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={`/dashboard/*`}
        >
          <DashboardRouter />
        </Route>

        <Route
          exact
          path="/version"
          render={() => <>Version: 1.0.0</>}
        />

        <Route render={() => <Redirect to={'not-found'} />} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
