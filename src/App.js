import './styles/nullstyle.css'
import './styles/App.css';
import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import {AuthContext} from "./context";

function App() {
  const [isLoading, setLoading] = useState(true);

  if (!localStorage.getItem('activeMenu')) {
    localStorage.setItem('activeMenu', "1")
  }

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
    if (localStorage.getItem('refresh_token')) {
      if (isTokenExpired(localStorage.getItem('refresh_token'))) {
        console.log('Refresh token expired');
        localStorage.setItem('IsAuth', "0");
      }
      else {
        console.log('Refresh token not expired');
        localStorage.setItem('IsAuth', "1");
      }
    }
    else {
      console.log('Refresh token does not exist');
      localStorage.setItem('IsAuth', "0");
    }
    }, [])

  console.log(localStorage.getItem('IsAuth'));

  return (
    <AuthContext.Provider value={{
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
