import React from 'react';
import {Navigate} from 'react-router-dom'
import {wait} from "@testing-library/user-event/dist/utils";

const OAuth2RedirectHandler = () => {
    function getToken() {
        return window.location.href.split('=')[1];
    }

    const token = getToken()
    if (token) {
        localStorage.removeItem('IsAuth')
        wait(1).then(() => {
            localStorage.setItem('IsAuth', "1");
            localStorage.setItem('refresh_token', token);
            console.log(localStorage.getItem('IsAuth'));
        }).then(() =>
        {
            console.log("redirect");
            window.location.href = "/Today"
        })
    } else {
        return <Navigate to="/login" replace/>
    }
}

export default OAuth2RedirectHandler;