import React from 'react';

import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { ActivityStatus } from 'enums';

import {
    AccountActivation,
    AccountActivationSuccess,
    AccountActivationError,
    AccountActivationClosed
} from '.';

const AccountActivationRouter = () => {

    return (
        <Switch>
            <Route exact
                path={`*/success`}
                render={({ location: { state } }) =>
                    <AccountActivationSuccess {...state} />
                } />

            <Route exact
                path={`*/error`}
                render={({ location: { state } }) =>
                    <AccountActivationError {...state} />
                } />

            <Route exact
                path={`*/completed`}
                render={() => <AccountActivationClosed type={ActivityStatus.Completed} />}
            />

            <Route exact
                path={`*/failed`}
                render={() => <AccountActivationClosed type={ActivityStatus.Failed} />}
            />

            <Route exact
                path={`*/:requestId([A-Za-z0-9]{32})`}
                component={AccountActivation}
            />

            <Route render={() => <Redirect to={`/not-found`} />} />
        </Switch>
    );
};

export default AccountActivationRouter;