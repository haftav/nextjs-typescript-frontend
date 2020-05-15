import {ThemeProvider, CSSReset} from '@chakra-ui/core';

import React, {useState} from 'react';
import {AppProps} from 'next/app';

export const AuthContext = React.createContext({
  user: null,
  setUser: null,
  token: null,
  setToken: null,
});

function MyApp({Component, pageProps}: AppProps) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState({});
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      <ThemeProvider>
        {/* <CSSReset /> */}
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default MyApp;
