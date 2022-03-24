import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ScheduleBooking,
  Bookings,
  Profile,
  Landing,
  Login,
  Register,
  BookingDetail,
  AcountManBookingDetail,
  RegisterAcoutnMan,
  Users,
  EditUser,
  BookingsAdmin,
  EditBookignAdmin,
  BookingsAcoutnMan,
  MyBookingsAcoutnMan,
} from "../pages";

function App() {
  return (
    <Router>
      <>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/scheduleBooking">
            <ScheduleBooking />
          </Route>
          <Route path="/bookings">
            <Bookings />
          </Route>
          <Route path="/bookings-admin">
            <BookingsAdmin />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/edit-user/:id">
            <EditUser />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/bookingDetails/:id">
            <BookingDetail />
          </Route>
          <Route path="/bookingDetailsAdmin">
            <EditBookignAdmin />
          </Route>
          <Route path="/bookingDetails_acountMan">
            <AcountManBookingDetail />
          </Route>
          <Route path="/bookings-acountMan">
            <BookingsAcoutnMan />
          </Route>
          <Route path="/my-bookings-acountMan">
            <MyBookingsAcoutnMan />
          </Route>
          <Route path="/registerAcoutnMan">
            <RegisterAcoutnMan />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
