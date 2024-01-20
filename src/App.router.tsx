import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { currentLanguage } from './storages';
import { AccountActivationV2Router } from './views/account-activation-v2';
import { Page404 } from 'views/pages';

const AppRouter: React.FC<any> = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/:lang(en|id)/**"
          render={(props) => {
            const params = props.match.params;
            currentLanguage.set(params.lang);

            return (
              <>
                <Switch>
                  <Route
                    exact
                    path={`*/account-activation/v2/*`}
                  >
                    <AccountActivationV2Router />
                  </Route>

                  <Route render={() => <Redirect to={'not-found'} />} />
                </Switch>
              </>
            );
          }}
        ></Route>

        <Route
          path="/status"
          exact
          render={() => <>Version: ee4525f2-1249-11ed-861d-0242ac120002</>}
        />

        <Route component={Page404} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
