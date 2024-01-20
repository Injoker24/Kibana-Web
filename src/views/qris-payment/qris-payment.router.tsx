import React from 'react';

import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { ActivityStatus } from 'enums';

import {
    QRISPayment,
    QRISPaymentSuccess,
    QRISPaymentError,
    QRISPaymentClosed
} from '.';


const QRISPaymentRouter = () => {
    return (
        <Switch>

            <Route exact
                path={`*/success`}
                render={({ location: { state } }) =>
                    <QRISPaymentSuccess {...state} />
                }
            />

            <Route exact
                path={`*/error`}
                render={({ location: { state } }) =>
                    <QRISPaymentError {...state} />
                }
            />

            <Route exact path={`*/completed`}>
                <QRISPaymentClosed type={ActivityStatus.Completed} />
            </Route>

            <Route exact path={`*/failed`}>
                <QRISPaymentClosed type={ActivityStatus.Failed} />
            </Route>

            <Route path={`*/:paymentId([A-Za-z0-9]{32})`}>
                <QRISPayment />
            </Route>

            <Route render={() => <Redirect to={`/not-found`} />} />
        </Switch>
    );
};

export default QRISPaymentRouter;