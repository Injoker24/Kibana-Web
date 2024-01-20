import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { DashboardRouter } from 'views/dashboard';
import { Page404 } from 'views/pages';

const AppRouter: React.FC<any> = () => {
  return (
    <Router>
      <Switch>
        <Route
          path={'/dashboard'}
        >
          <DashboardRouter />
        </Route>

        <Route
          exact
          path={'/version'}
          render={() => <>Version: 1.0.0</>}
        />
        
        <Route component={Page404} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
