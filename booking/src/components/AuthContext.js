import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({
  login: (token) => {}
});

export const AuthProvider = (props) => {
  const [email, setEmail] = useState(sessionStorage.getItem('email'));
  const [userDetails, setUserDetails] = useState({});
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));

  const login = (token) => {
    console.log("Received access token:", token);
    sessionStorage.setItem('accessToken', token);
    setAccessToken(token);
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken: accessToken, login: login, logout: logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);