import React from 'react';
import {Navigate} from 'react-router-dom'

const OAuth2RedirectHandler = () => {
    function getToken() {
        return window.location.href.split('=')[1];
    }
    const sleep = ms => new Promise(r => setTimeout(r, ms));
<<<<<<< HEAD

    const token = getToken()
    if (token) {
        localStorage.removeItem('IsAuth')
        sleep(1000).then(() => {
=======
    const token = getToken()
    if (token) {
        localStorage.removeItem('IsAuth')
         sleep(1000).then(() => {
>>>>>>> 76ec49724f129ef290d5ff030090b2397c5105a4
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
