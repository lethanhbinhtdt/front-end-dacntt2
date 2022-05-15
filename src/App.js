import React from 'react';
import {BrowserRouter,Routes,  Route} from "react-router-dom";
import LoginPage from './components/login/LoginPage'
import RegisterPage from './components/login/RegisterPage'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
