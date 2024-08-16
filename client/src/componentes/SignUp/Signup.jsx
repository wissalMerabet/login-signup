import React, { useState } from 'react';
import Styles from './Signup.module.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export const Signup = () => {
  const api = "http://localhost:3000";

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  


  

  function createUser(e) {
    e.preventDefault(); 
    Axios.post(`${api}/signUp`, { name, email, password })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <div className={Styles.Signup}>
      <h1>Sign Up</h1>
      <form>
        <div className={Styles.field}>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <span></span>
          <label>Username</label>
        </div>
        <div className={Styles.field}>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <span></span>
          <label>Email</label>
        </div>
        <div className={Styles.field}>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value="Sign Up" onClick={createUser} />
        <div className={Styles.login}>
          already have an account?<Link className={Styles.btn} to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
