import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import Newtask from './components/Newtask';
import { startAddTask, startEditTask, startSetTasks } from './actions/tasks';
import uuid from 'uuid';
import moment from 'moment';
import './playground/rrule-try';


const store = configureStore();

const task = {
  title : 'Task1',
  startDate : moment().valueOf(),
  startTime : moment().valueOf(),
  endTime : moment().valueOf(),
  endDate : moment().valueOf(),
  isRecurrence : false,
  freq : 1,
  byDay : [1],
  interval : 1,
  freqId : 0,
  note : 'Note 1'
};


const task1 = {
  title : 'Edited Task',
  startDate : moment().valueOf(),
  startTime : moment().valueOf(),
  endTime : moment().valueOf(),
  endDate : moment().valueOf(),
  isRecurrence : false,
  freq : 1,
  byDay : [1],
  interval : 1,
  freqId : 0,
  note : 'Note 1'
};

// store.dispatch(startAddTask(task));
// store.dispatch(startAddTask(task1));

//store.dispatch(startEditTask('f4292e7d-0a07-4dab-a0c3-5dcb3c7c007b', task1));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

store.subscribe(() => {
  const state = store.getState();
  //console.log('from store subscribe', state);
})

ReactDOM.render(<LoadingPage />, document.getElementById('app'));
// store.dispatch(startSetTasks()).then(() => {
//   renderApp();
// });

store.dispatch(startSetTasks()).then(() => {
  renderApp();
});


// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     store.dispatch(login(user.uid));
//     renderApp();
//     if (history.location.pathname === '/') {
//       history.push('/dashboard');
//     }
//   } else {
//     store.dispatch(logout());
//     renderApp();
//     history.push('/');
//   }
// });
