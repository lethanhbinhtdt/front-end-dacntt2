import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCookieToken } from './common';

import NavBar from '../components/layout/NavBar';

const PrivateRoute = (props) => {
    const {currUserInfo} = props
    // const [currentUserIdState, setCurrentUserId] = useState()
    const auth = getCookieToken(); // determine if authorized, from context or however you're doing it
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    //-- Only PrivateRoute has NavBar
    // useEffect(()=>{
    //     console.log("currentUserIdState", currentUserIdState)
    //     currentUserId(currentUserIdState)
    // }, [currentUserIdState])
    //  currentUserIdState)
    return auth ?  <><NavBar currUserInfo = {currUserInfo} /> <Outlet /></>: <Navigate to="/login" />;
}
export default PrivateRoute;