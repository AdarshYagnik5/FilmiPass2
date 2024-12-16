import { Route, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import Movies from './modules/Movies/Movies';
import Login from './modules/Login/Login';
import SignUp from './modules/signup/SignUp';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/movies" />} />
      <Route path="/">
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        {/* Additional auth routes can go here */}
        <Route path="*" element={<Movies/>} />
      </Route>
    </>
  )
);
