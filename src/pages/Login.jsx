import React, {useContext, useState} from 'react';
import Button from '../components/UI/button/Button';
import Input from '../components/UI/input/Input';
import '../styles/Login.css'
import {AuthContext} from "../context";
import UserService from "../API/UserService";

function Login() {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const [mode, setMode] = useState('Log in');

  function auth(event) {
      var email = event.target[2].value
      var password = event.target[3].value
      var tokens;
      event.preventDefault();

      if (mode === 'Log in') {
        tokens = UserService.auth(email, password)
      }
      else {
        tokens = UserService.register(email, password)
      }
      
      tokens.then((token_list) => {
        if (token_list != null) {
          console.log(mode, tokens)
          const access_token = token_list.access_token;
          const refresh_token = token_list.refresh_token;
  
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('refresh_token', refresh_token)
          setIsAuth(true);
        } else {
          if (mode === 'Log in') setMode('Register')
          else setMode('Log in')
        }
      })
    
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={auth}>
        <div className='mode-table'>
          <button 
          className={`change-mode-button ${'Register' === mode ? 'active' : ''}`} 
          onClick={(e) => {
            e.preventDefault() 
            setMode('Register')
          }}
          >
            Register
          </button>
          <button 
          className={`change-mode-button ${'Log in' === mode ? 'active' : ''}`} 
          onClick={(e) => {
            e.preventDefault() 
            setMode('Log in')
          }}
          >
            Log in
          </button>
        </div>
        <Input className="email" placeholder="Enter email" type="text"></Input>
        <Input className="password" placeholder="Enter password" type="password"></Input>
        <Button className="submit-button">
          {mode}
        </Button>

      </form>
    </div>
  );
}

export default Login;
