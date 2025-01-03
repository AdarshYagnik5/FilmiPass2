import { Route, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import Movies from './modules/Movies/Movies';
import Login from './modules/Login/Login';
import SignUp from './modules/signup/SignUp';
import Layout from './components/Layout/Layout';
import ScreenTime from './modules/ScreenTime/ScreenTime';
import Seats from './modules/Seats/Seats';
import ConfirmBooking from './modules/Booking/ConfirmBooking';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route element={<Layout />}>
      <Route path="/" element={<Navigate to="/movies" />} />
      <Route path="movies" element={<Movies/>} />
      <Route path="screen-time" element={<ScreenTime/>} />
      <Route path="seats" element={<Seats/>} />
      <Route path="confirm-seats" element={<ConfirmBooking/>} />
      </Route>
      <Route path="/">
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        {/* Additional auth routes can go here */}
      </Route>
    </>
  )
);
