import React, { useState, useEffect, Fragment, useRef  } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import axios from './middlewares/axios';

import LoginPage from './components/loginPage/LoginPage';
import HomePage from './components/homePage/HomePage';
import PersonalPage from './components/personalPage/PersonalPage';
import ErrorPage from './components/ErrorPage';
import SettingPage from './components/personalPage/SettingPage';
import NavBar from './components/layout/NavBar';
import FriendRequestList from './components/friend/FriendRequestList'

import PublicRoute from './middlewares/PublicRoute';
import PrivateRoute from './middlewares/PrivateRoute';
import { getToken, setUserSession, removeUserSession } from './middlewares/common';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
// import socketIOClient from "socket.io-client";

// const host = "http://localhost:8080";
function App() {
  // const [authLoading, setAuthLoading] = useState(0);

  // useEffect(() => {
  //   const token = getToken();
  //   if (!token) {
  //     return;
  //   }
  // })
  // const socketRef = useRef();
  // useEffect(() => {
  //   socketRef.current = socketIOClient.connect(host)
  // }, []);
  return (
    <div className='App'>
      <BrowserRouter>
        <Fragment>
          <div>
            {/* <div className='header'>
              <NavLink to='/' className={({ isActive }) => (isActive ? 'active-style' : 'none')}>Home Page /</NavLink>
              <NavLink to='/login' className={({ isActive }) => (isActive ? 'active-style' : 'none')}>Login Page /</NavLink>
              <NavLink to='/personal' className={({ isActive }) => (isActive ? 'active-style' : 'none')}>Personal Page</NavLink>
            </div> */}
            <div className='content'>
              <Routes>
              
                <Route element={<PublicRoute />}>
                  {/* <Route path='/login' element={<> <NavBar/> <HomePage /> </>} /> */}
                  <Route path='/login' element={<LoginPage />} />
                </Route>

                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path='/personal/*' element={<PersonalPage />}></Route>
                  <Route path='/account/:id/setting' element={<SettingPage/>}> </Route> 
                  <Route path='/friendrequests/' element={<FriendRequestList/>}> </Route> 
                </Route>

                <Route path='*' element={<ErrorPage />} />
              </Routes>
            </div>
          </div>
        </Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;
