import React, { useEffect, useState } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { getLocalStorage } from 'utils';
import { TaskCategoryList } from './pages';

interface categoryListStateWrapper {
  stateName: string;
  stateId: string;
}

interface searchStateWrapper {
  stateCategories: string[];
}

const TaskRouter = () => {
  // const [token, setToken] = useState();

  // useEffect(() => {
  //   setToken(getLocalStorage('token'));
  // }, []);

  return (
    <Switch>
      <Route
        exact
        path={'/task/category'}
        render={({ location: { state } }) => (
          <TaskCategoryList
            {...(state as categoryListStateWrapper)}
            key={Date.now()}
          />
        )}
      />

      <Route render={() => <Redirect to={`/dashboard`} />} />
    </Switch>
  );
};

export default TaskRouter;
