import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

const DashboardRouter = () => {
  return (
    <Switch>
      <Route
        exact
        path={`*/test`}
        render={() => <>Test</>}
      />

      <Route render={() => <Redirect to={`/not-found`} />} />
    </Switch>
  );
};

export default DashboardRouter;
