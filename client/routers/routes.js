import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

// Import custom components
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import MainLayout from '../components/common/layout/MainLayout';
import NotFound from '../components/error/NotFound';
import {
  AdminDashboardPage,
  AdminOperatorsPage,
  AdminUsersPage,
} from '../components/busgo/AdminPages';
import {
  CheckoutPassengersPage,
  CheckoutPaymentPage,
  LoginPage,
  MyTicketsPage,
  RegisterPage,
  TicketDetailPage,
  TripDetailPage,
  TripsPage,
} from '../components/busgo/CustomerPages';
import {
  OperatorBookingsPage,
  OperatorBusesPage,
  OperatorBusSeatsPage,
  OperatorDashboardPage,
  OperatorRefundsPage,
  OperatorReviewsPage,
  OperatorRoutesPage,
  OperatorStationsPage,
  OperatorTripDetailPage,
  OperatorTripsPage,
} from '../components/busgo/OperatorPages';

const AsyncBusGoPage = loadable(() => import('../components/busgo/BusGoPage'));
const AsyncDashboard = loadable(() => import('../containers/dashboard/DashboardContainer'));

const Router = () => (
  <Fragment>
    <Switch>
      <PublicRoute exact path="/" component={AsyncBusGoPage} />
      <PublicRoute exact path="/login" component={LoginPage} />
      <PublicRoute exact path="/register" component={RegisterPage} />
      <Route exact path="/signup" render={() => <Redirect to="/register" />} />
      <PublicRoute exact path="/trips" component={TripsPage} />
      <PublicRoute exact path="/trips/:id" component={TripDetailPage} />
      <PublicRoute exact path="/checkout/passengers" component={CheckoutPassengersPage} />
      <PublicRoute exact path="/checkout/payment" component={CheckoutPaymentPage} />
      <PublicRoute exact path="/my-tickets" component={MyTicketsPage} />
      <PublicRoute exact path="/tickets/:code" component={TicketDetailPage} />

      <PublicRoute exact path="/operator/dashboard" component={OperatorDashboardPage} />
      <PublicRoute exact path="/operator/routes" component={OperatorRoutesPage} />
      <PublicRoute exact path="/operator/stations" component={OperatorStationsPage} />
      <PublicRoute exact path="/operator/buses" component={OperatorBusesPage} />
      <PublicRoute exact path="/operator/buses/:id/seats" component={OperatorBusSeatsPage} />
      <PublicRoute exact path="/operator/trips" component={OperatorTripsPage} />
      <PublicRoute exact path="/operator/trips/:id" component={OperatorTripDetailPage} />
      <PublicRoute exact path="/operator/bookings" component={OperatorBookingsPage} />
      <PublicRoute exact path="/operator/refunds" component={OperatorRefundsPage} />
      <PublicRoute exact path="/operator/reviews" component={OperatorReviewsPage} />

      <PublicRoute exact path="/admin/dashboard" component={AdminDashboardPage} />
      <PublicRoute exact path="/admin/users" component={AdminUsersPage} />
      <PublicRoute exact path="/admin/operators" component={AdminOperatorsPage} />

      <PrivateRoute exact path="/dashboard" layout={MainLayout} component={AsyncDashboard} />

      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Router;
