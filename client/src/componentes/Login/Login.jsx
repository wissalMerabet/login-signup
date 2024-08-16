import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Styles from './Login.module.css'
import Axios from 'axios';
import {useCookies} from 'react-cookie'

export const Login = () => {
  const api = "http://localhost:3000";
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const [_,setCookie] = useCookies("access cookie");

  const Login = async(e) => {
    e.preventDefault();
    const response = await Axios.post(`${api}/login`, { email, password });
    console.log(response.data.token);
    setCookie("access cookie",response.data.token);
    window.localStorage.setItem("userID" , response.data.userID)
    console.log(response.data);
  }
   
  return (
    
      <div className={Styles.Login}>
        <h1>Login</h1>
        <form className={Styles.form}>
          <div className={Styles.field}>
            <input type="text" onChange={(e) => setEmail(e.target.value)}/>
            <span></span>
            <label htmlFor="">Email</label>
          </div>

          <div className={Styles.field}>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <span></span>
            <label htmlFor="">password</label>
          </div>

          <input type="submit" value="login" onClick={Login} />

          <div className={Styles.signup}>
            Not a member? <Link className={Styles.btn} to="/">Sign-UP</Link>
          </div>
        </form>
        
      </div>
    
  );
}
