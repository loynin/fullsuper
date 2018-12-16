import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import tasksReducer from '../reducers/tasks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      tasks: tasksReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
