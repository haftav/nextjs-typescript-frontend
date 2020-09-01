import {ThemeProvider, CSSReset} from '@chakra-ui/core';
import {ReactQueryDevtools} from 'react-query-devtools';
import {Provider} from 'next-auth/client';

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
  // const [user, setUser] = useState<User>(null);
  // const [token, setToken] = useState<string>(null);

  return (
    <Provider session={pageProps.session}>
      <ThemeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </Provider>
  );
}

export default MyApp;
