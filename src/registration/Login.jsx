import React, { useState } from 'react';
import Button from '../components/UI/button/Button';
import Input from '../components/UI/input/Input';
import '../styles/Login.css'
import google_logo from "../images/google.jpg"
import github_logo from "../images/github.png"
import UserService from "../API/UserService";

function Login() {
    const [login, setLogin] = useState(false);

    function register(event) {
        let username;
        let email;
        let password;

        if (login === false) {
            username = event.target[0].value
            email = event.target[1].value
            password = event.target[2].value
        } else {
            email = event.target[1].value
            password = event.target[2].value
        }

        if (login === true) {
            UserService.auth(email, password)
                .then((token) => {
                    if (token.access_token != null) {
                        localStorage.clear()
                        sessionStorage.setItem('access_token', token.access_token)
                        sessionStorage.setItem('IsAuth', '1')
                        const sleep = ms => new Promise(r => setTimeout(r, ms));
                        sleep(1000).then(() => {
                            window.location.href = "/Today";
                        })
                    }
                    else {
                        alert("You haven't account yet, please register!")
                        setLogin(!login);
                        event.target[1].value = ''
                        event.target[2].value = ''
                        localStorage.setItem('IsAuth', "0");
                    }
                });
        }
        else {
            UserService.register(username, email, password)
                .then((r) => {
                    if (r == null) {
                        alert("You have an account, please auth!")
                        event.target[0].value = ''
                        event.target[1].value = ''
                        event.target[2].value = ''
                        setLogin(!login);
                    }
                    else {
                        localStorage.setItem("code", r);
                        localStorage.setItem("typeCode", "activate-account");
                        window.location.href = "/code";
                    }
                })
        }
    }

    function google(event) {
        event.preventDefault();
        UserService.google();
    }

    function github(event) {
        event.preventDefault();
        UserService.github();
    }

    return (
        <div className="App">
            <div className="register-container">

                <form className="register-form" onSubmit={(event) => {
                    event.preventDefault();
                    register(event)
                }}>

                    <div className={`item ${login === true ? 'open' : ''}`}>
                        <Input
                            type={login ? "hidden" : "text"}
                            placeholder="Enter username"
                        />
                    </div>

                    <Input type="email" placeholder="Enter email" />
                    <Input type="password" placeholder="Enter password" />

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setLogin(!login)
                        }}
                        className="redirect-link">
                        {
                            !login ? "Already has account?" : "Register now"
                        }
                    </button>

                    <Button>
                        <span className="register-span">
                            {
                                !login ? "Register" : "Login"
                            }
                        </span>
                    </Button>

                    <a href="/reset-password" className={`forgot-password ${!login === true ? 'open' : ''}`}>
                        Forgot password?
                    </a>
                </form>

                <div className="oauth2-container">
                    <div className="middle-text-container">
                        <span className="line"></span>
                        <span className="middle-text">OR</span>
                        <span className="line"></span>
                    </div>

                    <div className="oauth2-link-container">
                        <div className="link-container" onClick={(event) => google(event)}>
                            <img className="logo" src={google_logo} alt="" />
                        </div>
                        <div className="link-container" onClick={(event) => github(event)}>
                            <img className="logo" src={github_logo} alt="" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;
