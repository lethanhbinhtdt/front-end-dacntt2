import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCookieToken } from './common';

import NavBar from '../components/layout/NavBar';

const PrivateRoute = () => {
    const auth = getCookieToken(); // determine if authorized, from context or however you're doing it
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    //-- Only PrivateRoute has NavBar
    return auth ?  <><NavBar /> <Outlet /></>: <Navigate to="/login" />;
}
export default PrivateRoute;