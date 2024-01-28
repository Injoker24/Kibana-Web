import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { DashboardRouter } from 'views/dashboard';
import { AuthRouter } from 'views/auth';
import { ServiceRouter } from 'views/service';
import { TaskRouter } from 'views/task';

const AppRouter: React.FC<any> = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/dashboard'}>
          <DashboardRouter />
        </Route>

        <Route path={'/auth'}>
          <AuthRouter />
        </Route>

        <Route path={'/service'}>
          <ServiceRouter />
        </Route>

        <Route path={'/task'}>
          <TaskRouter />
        </Route>

        <Route
          exact
          path={'/version'}
          render={() => <>Version: 1.0.0</>}
        />

        <Route render={() => <Redirect to={`/dashboard`} />} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
