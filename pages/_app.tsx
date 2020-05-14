import {ThemeProvider, CSSReset} from '@chakra-ui/core';

import React from 'react';
import {AppProps} from 'next/app';

export const AuthContext = React.createContext({});

function MyApp({Component, pageProps}: AppProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {},
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
