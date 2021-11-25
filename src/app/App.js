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
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/scheduleBooking">
            <ScheduleBooking />
          </Route>
          <Route exact path="/bookings">
            <Bookings />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route  path="/bookingDetails/:id">
            <BookingDetail />
          </Route>
          <Route exact path="/bookingDetails_acountMan">
            <AcountManBookingDetail />
          </Route>
          <Route exact path="/registerAcoutnMan">
            <RegisterAcoutnMan />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
