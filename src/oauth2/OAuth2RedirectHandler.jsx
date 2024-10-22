import React from 'react';
import {Navigate} from 'react-router-dom'

const OAuth2RedirectHandler = () => {
    function getTokens() {
        return window.location.href.split('=').slice(1);
    }

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const tokens = getTokens()
    console.log(tokens)

    if (tokens) {
        localStorage.removeItem('IsAuth')
         sleep(1000).then(() => {
            localStorage.setItem("access_token", tokens[1]);
            localStorage.setItem("refresh_token", tokens[0]);
            localStorage.setItem('IsAuth', "1");
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
