import React from "react";
import {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
const initialValue = {
  username:'',
  password:'',
}

const Login = () => {
  const [value, setValue]= useState(initialValue);
  const {push} = useHistory();
  const handleChange = (e) => {
    setValue({...value,[e.target.name]:e.target.value})
    console.log(value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post('http://localhost:5000/api/login',value)
    .then((res)=> {
      // console.log(res);
      localStorage.setItem('token', res.data.payload)
      push('/bubblepage');
    })
    .catch((err)=>{
      console.log(err);
    })

  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
          <input 
          type='text' 
          name='username' 
          placeholder='Username'
          onChange= {handleChange}
          /> 
          
        </label>
        <br/>
        <label htmlFor='password'>
          <input
          type='password'
          name='password'
          placeholder='Password'
          onChange= {handleChange}
          />
        </label>
        <br/>
        <button>Log In!</button>
      </form>
    </>
  );
};

export default Login;
