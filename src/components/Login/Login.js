import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity 🚓🚓🚓🚗")
      setFormIsValid(
        enteredPassword.trim().length > 6 && enteredEmail.includes('@')
      );

    }, 500);
    /*
    here we can do also many thing to execute or modify 
    oue code to run as we need on every changes on dependecies
    */
    return () => {
      clearTimeout(identifier);
      console.log("Clean Up function 🚗🚗🚗🚗")
    }
  }, [enteredPassword, enteredEmail]);

  // useEffect(()=>{

  // console.log("Runs after this component exicutes first time ~ INITIAL 🚓🚓🚓🚗 ")
  
  // return ()=>{
  //   console.log("Effect cleanup wwhich should first after this component first executes also this useEffect's callBack executes! 🚗🚗🚗🚗")
  // }
  // },[enteredEmail])
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);


  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);


  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
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

export default Login;
