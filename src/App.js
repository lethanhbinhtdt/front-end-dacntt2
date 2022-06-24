import React, { useState, useEffect, Fragment } from 'react';
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

function App() {
  // const [authLoading, setAuthLoading] = useState(0);

  // useEffect(() => {
  //   const token = getToken();
  //   if (!token) {
  //     return;
  //   }
  // })

  return (
    <div className='App'>
      <BrowserRouter>
        <Fragment>
          <div>
            <div className='content'>
              <Routes>
              
                <Route element={<PublicRoute />}>
                  <Route path='/login' element={<LoginPage />} />
                </Route>

                <Route element={<PrivateRoute />}>
                  <Route path='/' element={<HomePage />} />
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
