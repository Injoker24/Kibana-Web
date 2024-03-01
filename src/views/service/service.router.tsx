import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { ServiceCategoryList, ServiceDetail, ServiceHistory, ServiceSearch } from './pages';
import { ProtectedClientRoute } from 'shared/components';

interface categoryListStateWrapper {
  stateName: string;
  stateId: string;
}

interface searchStateWrapper {
  stateCategories: string[];
}

interface detailStateWrapper {
  prevPath: string;
}

const ServiceRouter = () => {
  return (
    <Switch>
      <Route
        exact
        path={'/service/category'}
        render={({ location: { state } }) => (
          <ServiceCategoryList
            {...(state as categoryListStateWrapper)}
            key={Date.now()}
          />
        )}
      />

      <Route
        exact
        path={'/service/search'}
        render={({ location: { state } }) => (
          <ServiceSearch
            {...(state as searchStateWrapper)}
            key={Date.now()}
          />
        )}
      />

      <Route
        exact
        path={'/service/history'}
        render={() => (
          <ProtectedClientRoute>
            <ServiceHistory key={Date.now()} />
          </ProtectedClientRoute>
        )}
      />

      <Route
        exact
        path={'/service/:serviceId'}
        render={({ location: { state } }) => (
          <ServiceDetail
            {...(state as detailStateWrapper)}
            key={Date.now()}
          />
        )}
      />

      <Route render={() => <Redirect to={`/dashboard`} />} />
    </Switch>
  );
};

export default ServiceRouter;
