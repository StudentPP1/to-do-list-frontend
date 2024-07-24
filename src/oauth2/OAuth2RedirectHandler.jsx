import React, {useContext, useEffect} from 'react';
import {Navigate} from 'react-router-dom'
import {AuthContext} from "../context";

const OAuth2RedirectHandler = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    function getToken() {
        return window.location.href.split('=')[1];
    }

    const token = getToken();
    console.log("token: ", token);

    useEffect(() => {
        return <Navigate to="/Today" replace />
    }, [isAuth]);

    if (token) {
        localStorage.setItem('refreshToken', token);
        setIsAuth(true)
    } else {
        return <Navigate to="/login" replace />
    }


}

export default OAuth2RedirectHandler;