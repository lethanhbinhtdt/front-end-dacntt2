import React, { useState, useEffect, Fragment, useRef } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import axios from './middlewares/axios';

import LoginPage from './components/loginPage/LoginPage';
import HomePage from './components/homePage/HomePage';
import PersonalPage from './components/personalPage/PersonalPage';
import ErrorPage from './components/ErrorPage';
import SettingPage from './components/personalPage/SettingPage';
import NavBar from './components/layout/NavBar';
import FriendRequestList from './components/friend/FriendRequestList'
import FindFriend from './components/friend/FindFriend';
import PublicRoute from './middlewares/PublicRoute';
import PrivateRoute from './middlewares/PrivateRoute';
import { getToken, setUserSession, removeUserSession } from './middlewares/common';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import io from "socket.io-client";
import { BASE_URL } from './middlewares/constant';
const socket = io.connect(BASE_URL);

function App() {
  const [userId, setUserId] = useState()
  const [numberNotiRealTime, setNumberNotiRealTime] = useState(0)
  const [socketdata, setSocketData] = useState() // dùng để show message 


  useEffect(() => {
    console.log("duwx lieuj rnoti dau ",numberNotiRealTime)
    if (userId) {
      socket.emit("newUser", userId);
    }
    socket.on("receiveMessageNoti", (data) => {
      console.log("duwx lieuj rnoti",numberNotiRealTime, data)
      setSocketData(data)
      setNumberNotiRealTime(numberNotiRealTime+1)
    });

    // socket.on("receive_message", (data) => {
    //   console.log("dataatatataatatatatat", data)
    //   setSocketData(data)
    // });
  }, [socket, userId, numberNotiRealTime]);
  console.log("duwx lieuj realtime", numberNotiRealTime)
  // const socketRef = useRef();
  // useEffect(() => {
  //   // socketRef.current = socketIOClient.connect(host)
  // }, []);
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

                <Route element={<PrivateRoute currentUserId={setUserId} />}>
                  <Route path="/" element={<HomePage numberNoti={numberNotiRealTime}/>} />
                  <Route path='/personal/*' element={<PersonalPage />}></Route>
                  <Route path='/account/:id/setting' element={<SettingPage />}> </Route>
                  <Route path='/friendrequests/' element={<FriendRequestList />}> </Route>
                  <Route path='/search/' element={<FindFriend />}> </Route>
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
