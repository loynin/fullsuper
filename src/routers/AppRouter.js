import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Newtask from '../components/Newtask';
import EditTask from '../components/EditTask';
import Header from '../components/Header';
import CalendarView from '../components/CalendarView';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header/>
      <Switch>
        <PublicRoute path="/" component={DashboardPage}  exact={true} />
        <PublicRoute path="/new" component={Newtask}  exact={true} />
        <PublicRoute path="/calendar" component={CalendarView}  />
        <PublicRoute path="/edit/:id" component={EditTask}  exact={true} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
