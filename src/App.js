import React, {useContext} from 'react';

import Login from './components/Login/Login';
import LoginReduce from './components/Login/LoginReduce';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/Store/auth-Context';
function App() {
const authCtx = useContext(AuthContext);
  return (<>
      <MainHeader />
      <main>
        {!authCtx.isLoggedIn && <LoginReduce />}
        {authCtx.isLoggedIn && <Home />}
        {/* <Login onLogin={loginHandler} */}
      </main>
  </>
  );
}

export default App;
