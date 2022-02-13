import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../Store/auth-Context';


const reduceEmail = (state, action) => {

  if (action.type === "USER_EMAIL") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false }
}
const reducePass = (state, action) => {
  if (action.type === "USER_PASS") {
    return { value: action.val, isValid: action.val.length > 6 }
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.length > 6 }
  }
  return { value: "", isValid: null }
}
const LoginReduce = (props) => {

  //   as we can see here that we are using State above for getting the value andvalidate the email
  //   so we can use here useReducer() for multiple state usage


  // e.g = const [state,dispatchFn]=useReducer(reduceFn,initialState,initialFn)
  const [emailState, dispatchEmail] = useReducer(reduceEmail, { value: "", isValid: null })
  const [passState, dispatchPass] = useReducer(reducePass, { value: "", isValid: null })
  const [formIsValid, setFormIsValid] = useState(false);
  const authCtx = useContext(AuthContext);

  const { isValid: emailValidation } = emailState;
  const { isValid: pasValidation } = passState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Confirm Form Validation 🚗🚗🚗🚗")
      setFormIsValid(emailValidation && pasValidation)
    }, 500)
    return () => {
      console.log("CleanUp 🕸🕸🕸🕸🕸")
      clearTimeout(identifier);
    }
  }, [emailValidation, pasValidation])


  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_EMAIL", val: event.target.value });
    // setFormIsValid(
    //   passState.isValid && event.target.value.includes("@")
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPass({ type: "USER_PASS", val: event.target.value })
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );


  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" })
  };

  const validatePasswordHandler = () => {
    dispatchPass({ type: "INPUT_BLUR" })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogIn(emailState.value, passState.value);
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
          className={`${classes.control} ${passState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
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