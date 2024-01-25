import React, { useEffect, useState } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { getLocalStorage } from 'utils';
import { ServiceCategoryList } from './pages';

const ServiceRouter = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(getLocalStorage('token'));
  }, []);

  return (
    <Switch>
      <Route
        exact
        path={'/service/category'}
        render={(props) => (
          <ServiceCategoryList
            {...props}
            key={Date.now()}
          />
        )}
      />

      <Route render={() => <Redirect to={`/dashboard`} />} />
    </Switch>
  );
};

export default ServiceRouter;
