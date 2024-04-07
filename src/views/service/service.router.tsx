import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import {
  CreateService,
  ServiceCategoryList,
  ServiceDetail,
  ServiceHistory,
  ServiceHistoryDetail,
  ServiceOrderDetail,
  ServiceOwned,
  ServiceOwnedDetail,
  ServiceRequirement,
  ServiceSearch,
} from './pages';
import { ProtectedClientRoute, ProtectedFreelancerRoute } from 'shared/components';

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

interface historyDetailStateWrapper {
  status: string;
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
        path={'/service/owned'}
        render={() => (
          <ProtectedFreelancerRoute>
            <ServiceOwned key={Date.now()} />
          </ProtectedFreelancerRoute>
        )}
      />

      <Route
        exact
        path={'/service/owned/:serviceId'}
        render={() => (
          <ProtectedFreelancerRoute>
            <ServiceOwnedDetail key={Date.now()} />
          </ProtectedFreelancerRoute>
        )}
      />

      <Route
        exact
        path={'/service/orders/:transactionId'}
        render={() => (
          <ProtectedFreelancerRoute>
            <ServiceOrderDetail key={Date.now()} />
          </ProtectedFreelancerRoute>
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
        path={'/service/history/:transactionId'}
        render={({ location: { state } }) => (
          <ProtectedClientRoute>
            <ServiceHistoryDetail
              {...(state as historyDetailStateWrapper)}
              key={Date.now()}
            />
          </ProtectedClientRoute>
        )}
      />

      <Route
        exact
        path={'/service/create'}
        render={() => (
          <ProtectedFreelancerRoute>
            <CreateService key={Date.now()} />
          </ProtectedFreelancerRoute>
        )}
      />

      <Route
        exact
        path={'/service/requirement/:transactionId'}
        render={() => (
          <ProtectedClientRoute>
            <ServiceRequirement key={Date.now()} />
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
