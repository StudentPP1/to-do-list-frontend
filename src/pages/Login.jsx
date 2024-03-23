import React, {useContext} from 'react';
import Button from '../components/UI/button/Button';
import Input from '../components/UI/input/Input';
import '../styles/Login.css'
import {AuthContext} from "../context";
import UserService from "../API/UserService";

function Login() {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  
  function login(event) {
      var email = event.target[0].value
      var password = event.target[1].value
      event.preventDefault();
      const tokens = UserService.auth(email, password);
      
      console.log("auth", tokens)

      tokens.then((token) => {
        const access_token = token.access_token;
        const refresh_token = token.refresh_token;

        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        setIsAuth(true);
    })
  }


  return (
    <div className="login-page">
      <form onSubmit={login}>
        <Input className="email" placeholder="Enter email"></Input>
        <Input className="password" placeholder="Enter password" type="password"></Input>
        <Button>Log in</Button>
      </form>
    </div>
  );
}

export default Login;
