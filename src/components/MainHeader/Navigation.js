import React from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../Store/auth-Context';
const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(data) => {
        return <nav className={classes.nav}>
          <ul>
            {data.isLoggedIn && (
              <li>
                <a href="/">Users</a>
              </li>
            )}
            {data.isLoggedIn && (
              <li>
                <a href="/">Admin</a>
              </li>
            )}
            {data.isLoggedIn && (
              <li>
                <button onClick={props.onLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>

      }}
    </AuthContext.Consumer>
  );
};

export default Navigation;
