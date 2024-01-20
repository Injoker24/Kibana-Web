import React from 'react';

import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { ActivityStatus } from 'enums';

import {
    Payment,
    PaymentSuccess,
    PaymentError,
    PaymentClosed
} from '.';

const PaymentRouter = () => {
    return (
        <Switch>
            <Route exact
                path={`*/success`}
                render={({ location: { state } }) =>
                    <PaymentSuccess {...state} />
                }
            />

            <Route exact
                path={`*/error`}
                render={({ location: { state } }) =>
                    <PaymentError {...state} />
                }
            />

            <Route exact
                path={`*/completed`}
                render={() => <PaymentClosed type={ActivityStatus.Completed} />}
            />

            <Route exact
                path={`*/failed`}
                render={() => <PaymentClosed type={ActivityStatus.Failed} />}
            />

            <Route exact
                path={`*/:paymentId([A-Za-z0-9]{32})`}
                component={Payment}
            />

            <Route render={() => <Redirect to={`/not-found`} />} />

        </Switch>
    );
};

export default PaymentRouter;