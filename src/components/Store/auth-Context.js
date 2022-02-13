import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogIn: () => {},
    onLogOut: () => {}
});

export const AuthContextProvider = props => { 
    const [isLoggedIn, setIsloggedIn] = useState(false);

    useEffect(() => {
        const loggedInInformation = localStorage.getItem("isLoggedIn")
        if (loggedInInformation === "1") {
            setIsloggedIn(true);
        }
      }, []);

    const handleLogIn = (email, pass) => {
        console.log("OK")
        localStorage.setItem("isLoggedIn", "1");
        setIsloggedIn(true);
    };

    const handleLogOut = () => {
        localStorage.removeItem("isLoggedIn")
        setIsloggedIn(false);
    };
    
    return <AuthContext.Provider value={
        {isLoggedIn:isLoggedIn,
        onLogIn:handleLogIn,
        onLogOut:handleLogOut
    }
    }>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;