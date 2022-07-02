import React, { useState, useEffect, Fragment, useContext } from 'react';
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
import { BASE_URL } from './middlewares/constant';

// import io from "socket.io-client";

// const socket = io.connect(BASE_URL);
import {SocketContext, socket} from './middlewares/socket';

function App() {
  const [userId, setUserId] = useState()
  const [numberNotiRealTime, setNumberNotiRealTime] = useState(0)

  useEffect(()=>{
    console.log("userId hahaha", userId)
  }, [userId])

  // const socketio = useContext(SocketContext);

  // useEffect(() => {
  //   if (userId) {
  //     socketio.emit("newUser", userId);
  //   }
    // socketio.on("receiveMessageNoti", (data) => {
    //   setSocketData(data)
    //   setNumberNotiRealTime(numberNotiRealTime+1)
    // });
    
    // socketio.on('receiveMessageLike', data=>{
    //   setSocketData(data)
    //   setNumberNotiRealTime(numberNotiRealTime+1)
    // })
    
    // socketio.on('receiveMessageShare', data=>{
    //   setSocketData(data)
    //   setNumberNotiRealTime(numberNotiRealTime+1)
    // })

  // }, [socketio, userId, numberNotiRealTime]);

  useEffect(() => {
    // socketRef.current = socketIOClient.connect(host)
  }, []);
  return (
    <SocketContext.Provider value={socket}>
    <div className='App'>
 
      <BrowserRouter>
        <Fragment>
          <div>
            <div className='content'>
              <Routes>

                <Route element={<PublicRoute />}>
                  <Route path='/login' element={<LoginPage />} />
                </Route>

                <Route element={<PrivateRoute setCurrentUserId={setUserId} />}>
                  <Route path="/" element={<HomePage numberNoti={numberNotiRealTime}/>} />
                  <Route path='/personal/:id/*' element={<PersonalPage numberNoti={numberNotiRealTime}/>}></Route>
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
    </SocketContext.Provider>
  );
}

export default App;
