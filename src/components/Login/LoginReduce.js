import React, { useState, useEffect,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const reduceEmail=(state,action)=>{

    if(action.type === "USER_EMAIL"){
        return {value:action.val, isValid:action.val.includes("@")};
    }
    if(action.type === "INPUT_BLUR"){
        return {value:state.value, isValid:state.value.includes("@")};
    }
    return {value:"", isValid:false}
}
const LoginReduce = (props) => {
//   const [enteredEmail, setEnteredEmail] = useState('');
//   const [emailIsValid, setEmailIsValid] = useState();
    //   as we can see here that we are using State above for getting the value andvalidate the email
    //   so we can use here useReducer() for multiple state usage


    // e.g = const [state,dispatchFn]=useReducer(reduceFn,initialState,initialFn)
    const [emailState,dispatchEmail]=useReducer(reduceEmail,{value:"",isValid:null})

  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type:"USER_EMAIL",val:event.target.value});
    setFormIsValid(
        enteredPassword.trim().length > 6 && event.target.value.includes("@")
    );


  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setFormIsValid(
        event.target.value.trim().length > 6 && emailState.isValid
      );


  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type:"INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LoginReduce;
