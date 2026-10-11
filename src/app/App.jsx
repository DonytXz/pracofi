import { lazy, Suspense } from "react";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import { SessionProvider } from "./SessionContext";
import ProtectedRoute from "./ProtectedRoute";
import ErrorBoundary from "./ErrorBoundary";
import AppShell from "../components/global/AppShell";
import Landing from "../pages/Landing";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ScheduleBooking = lazy(() => import("../pages/ScheduleBooking"));
const Bookings = lazy(() => import("../pages/Bookings"));
const BookingDetail = lazy(() => import("../pages/BookingDetail"));
const Profile = lazy(() => import("../pages/Profile"));
const Users = lazy(() => import("../pages/Users"));
const EditUser = lazy(() => import("../pages/EditUser"));
const BookingsAdmin = lazy(() => import("../pages/BookingsAdmin"));
const EditBookingAdmin = lazy(() => import("../pages/EditBookignAdmin"));
const BookingsAccountant = lazy(() => import("../pages/BookingsAcoutnMan"));
const MyBookingsAccountant = lazy(() => import("../pages/MyBookingsAcoutnMan"));
const AccountantDetail = lazy(() => import("../pages/AcountManBookingDetail"));

export function AppRoutes() {
  return <ErrorBoundary><Suspense fallback={<main className="app-page" role="status">Cargando página…</main>}>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/registerAcoutnMan"><Redirect to="/register?role=CONTADOR" /></Route>
      <ProtectedRoute exact path="/scheduleBooking"><ScheduleBooking /></ProtectedRoute>
      <ProtectedRoute exact path="/bookings" roles={["USER"]}><Bookings /></ProtectedRoute>
      <ProtectedRoute exact path="/bookingDetails/:id" roles={["USER"]}><BookingDetail /></ProtectedRoute>
      <ProtectedRoute exact path="/profile"><Profile /></ProtectedRoute>
      <ProtectedRoute exact path="/users" roles={["ADMIN"]}><Users /></ProtectedRoute>
      <ProtectedRoute exact path="/edit-user/:id" roles={["ADMIN"]}><EditUser /></ProtectedRoute>
      <ProtectedRoute exact path="/bookings-admin" roles={["ADMIN"]}><BookingsAdmin /></ProtectedRoute>
      <ProtectedRoute exact path="/bookingDetailsAdmin/:id" roles={["ADMIN"]}><EditBookingAdmin /></ProtectedRoute>
      <ProtectedRoute exact path="/bookings-acountMan" roles={["CONTADOR"]}><BookingsAccountant /></ProtectedRoute>
      <ProtectedRoute exact path="/my-bookings-acountMan" roles={["CONTADOR"]}><MyBookingsAccountant /></ProtectedRoute>
      <ProtectedRoute exact path="/bookingDetails_acountMan/:id" roles={["CONTADOR"]}><AccountantDetail /></ProtectedRoute>
      <ProtectedRoute exact path="/bookingDetails_acountMan" roles={["CONTADOR"]}><Redirect to="/my-bookings-acountMan" /></ProtectedRoute>
      <Route><AppShell><section className="app-page empty-state">
        <p className="eyebrow">Página no encontrada</p><h1 className="page-title">Este enlace no está disponible</h1>
        <p>Revisa la dirección o vuelve al inicio.</p><Link className="btn btn-primary" to="/">Volver al inicio</Link>
      </section></AppShell></Route>
    </Switch>
  </Suspense></ErrorBoundary>;
}
export default function App() {
  return <BrowserRouter basename={import.meta.env.BASE_URL}><SessionProvider><AppRoutes /></SessionProvider></BrowserRouter>;
}
