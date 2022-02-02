import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import LoginReduce from './components/Login/LoginReduce';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/Store/auth-Context';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInInformation = localStorage.getItem("isLoggedIn")
    if (loggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, [])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler,
    }}>
      <MainHeader />
      <main>
        {!isLoggedIn && <LoginReduce onLogin={loginHandler} />}
        {isLoggedIn && <Home />}
        {/* <Login onLogin={loginHandler} */}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
