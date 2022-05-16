import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import axios from './middlewares/axios';

import LoginPage from './components/login/LoginPage';
import HomePage from './components/network/HomePage';
import PersonalPage from './components/network/PersonalPage';

import PublicRoute from './middlewares/PublicRoute';
import PrivateRoute from './middlewares/PrivateRoute';
import { getToken, setUserSession, removeUserSession } from './middlewares/common';

import './App.css';

function App() {
  // const [authLoading, setAuthLoading] = useState(0);

  // useEffect(() => {
  //   const token = getToken();
  //   if (!token) {
  //     return;
  //   }
  // })

  return (
    <div className="App">
      <BrowserRouter>
        <Fragment>
          <div>
            <div className="header">
              <NavLink to="/" className={({ isActive }) => (isActive ? "active-style" : 'none')}>Home Page /</NavLink>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "active-style" : 'none')}>Login Page /</NavLink>
              <NavLink to="/personal" className={({ isActive }) => (isActive ? "active-style" : 'none')}>Personal Page</NavLink>
            </div>
            <div className="content">
              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route element={<PublicRoute />}>
                  <Route path='/login' element={<LoginPage />} />
                </Route>

                <Route element={<PrivateRoute />}>
                  <Route path='/personal' element={<PersonalPage />} />
                  <Route path='/personal2' element={<PersonalPage />} />
                </Route>
              </Routes>
            </div>
          </div>
        </Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;
