import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom'
import {AuthContext} from "../context";

const OAuth2RedirectHandler = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    function getToken() {
        return window.location.href.split('=')[1];
    }

    const token = getToken();
    console.log("token: ", token);

    if (token) {
        localStorage.setItem('refreshToken', token);
        setIsAuth(true)
        return <Navigate to="/Today" replace />

    } else {
        return <Navigate to="/login" replace />
    }

}

export default OAuth2RedirectHandler;