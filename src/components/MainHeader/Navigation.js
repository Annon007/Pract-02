import React, { useContext } from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../Store/auth-Context';
const Navigation = (props) => {
  const data = useContext(AuthContext);
  return (<nav className={classes.nav}>
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
          <button onClick={data.onLogOut}>Logout</button>
        </li>
      )}
    </ul>
  </nav>


  );
};

export default Navigation;
