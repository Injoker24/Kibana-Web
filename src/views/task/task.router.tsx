import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import {
  TaskCategoryList,
  TaskSearch,
  TaskDetail,
  TaskOwned,
  TaskHistory,
  TaskOwnedDetail,
  TaskHistoryDetail,
  CreateTask,
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

interface ownedTaskDetailStateWrapper {
  transactionId?: string;
}

interface taskHistoryDetailStateWrapper {
  transactionId?: string;
}

const TaskRouter = () => {
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

      <Route
        exact
        path={'/task/owned'}
        render={() => (
          <ProtectedClientRoute>
            <TaskOwned key={Date.now()} />
          </ProtectedClientRoute>
        )}
      />

      <Route
        exact
        path={'/task/owned/:taskId'}
        render={({ location: { state } }) => (
          <ProtectedClientRoute>
            <TaskOwnedDetail
              {...(state as ownedTaskDetailStateWrapper)}
              key={Date.now()}
            />
          </ProtectedClientRoute>
        )}
      />

      <Route
        exact
        path={'/task/history'}
        render={() => (
          <ProtectedFreelancerRoute>
            <TaskHistory key={Date.now()} />
          </ProtectedFreelancerRoute>
        )}
      />

      <Route
        exact
        path={'/task/history/:taskId'}
        render={({ location: { state } }) => (
          <ProtectedFreelancerRoute>
            <TaskHistoryDetail
              {...(state as taskHistoryDetailStateWrapper)}
              key={Date.now()}
            />
          </ProtectedFreelancerRoute>
        )}
      />

      <Route
        exact
        path={'/task/create'}
        render={() => (
          <ProtectedClientRoute>
            <CreateTask key={Date.now()} />
          </ProtectedClientRoute>
        )}
      />

      <Route
        exact
        path={'/task/:taskId'}
        render={({ location: { state } }) => (
          <TaskDetail
            {...(state as detailStateWrapper)}
            key={Date.now()}
          />
        )}
      />

      <Route render={() => <Redirect to={`/dashboard`} />} />
    </Switch>
  );
};

export default TaskRouter;
