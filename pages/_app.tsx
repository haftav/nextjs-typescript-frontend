import {ThemeProvider, CSSReset} from '@chakra-ui/core';

import React, {Dispatch, SetStateAction, useState} from 'react';
import {AppProps} from 'next/app';

import {User} from '../models';

export const AuthContext = React.createContext<{
  user?: User;
  setUser?: Dispatch<SetStateAction<User>>;
  token?: string;
  setToken?: Dispatch<SetStateAction<string>>;
}>({});

function MyApp({Component, pageProps}: AppProps) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string>(null);
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
