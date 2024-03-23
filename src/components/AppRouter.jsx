import React, { useContext } from "react";
import { Route, Routes} from 'react-router-dom';
import Login from '../pages/Login'
import Done from '../pages/Done'
import Today from '../pages/Today'
import { AuthContext } from "../context";
import Week from "../pages/Week";

const AppRouter = () => {
  const {isAuth} = useContext(AuthContext)

  return (
      <Routes>
        <Route 
        path="/" 
        element={isAuth ? (<Today />) : (<Login />)} />

        <Route 
        path="/Today" 
        element={isAuth ? (<Today />) : (<Login />)} />

        <Route 
        path="/Week" 
        element={isAuth ? (<Week />) : (<Login />)} /> 

        <Route 
        path="/Done" 
        element={isAuth ? (<Done />) : (<Login />)} /> 

        <Route 
        path="/login" 
        element={isAuth ? (<Today />) : (<Login />)} />
      </Routes>
    );
};

export default AppRouter;