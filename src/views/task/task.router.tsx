import React, { useEffect, useState } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { getLocalStorage } from 'utils';
import { TaskCategoryList } from './pages';
import TaskSearch from './pages/task-search';

interface categoryListStateWrapper {
  stateName: string;
  stateId: string;
}

interface searchStateWrapper {
  stateCategories: string[];
}

const TaskRouter = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(getLocalStorage('token'));
  }, []);

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

      <Route
        exact
        path={'/task/search'}
        render={({ location: { state } }) => (
          <TaskSearch
            {...(state as searchStateWrapper)}
            key={Date.now()}
          />
        )}
      />

      <Route render={() => <Redirect to={`/dashboard`} />} />
    </Switch>
  );
};

export default TaskRouter;
