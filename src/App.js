import './styles/nullstyle.css'
import './styles/App.css';
import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import {AuthContext} from "./context";
import UserService from './API/UserService';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const isTokenExpired = (token) => {        
    const decode = JSON.parse(atob(token.split('.')[1]));
    if (decode.exp * 1000 < new Date().getTime()) {
        console.log('Time Expired');
        return true
    }
    else {
      console.log('Time is not expired');
      return false
    }
};

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      if (isTokenExpired(localStorage.getItem('access_token'))) {
        setIsAuth(false); 
      }
      else {
        setIsAuth(true); 
      }
      }
    else {
      setIsAuth(false); 
    }
    } , [])

  if (!localStorage.getItem('activeMenu')) {
    localStorage.setItem('activeMenu', 2) 
  }
  
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading,
      setLoading
    }}>
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
