import {ThemeProvider, CSSReset} from '@chakra-ui/core';
import {ReactQueryDevtools} from 'react-query-devtools';
import {ReactQueryConfigProvider} from 'react-query';
import {Provider} from 'next-auth/client';

import React from 'react';
import {AppProps} from 'next/app';

const queryConfig = {queries: {refetchOnWindowFocus: false}};

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ReactQueryConfigProvider config={queryConfig}>
        <ThemeProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryConfigProvider>
    </Provider>
  );
}

export default MyApp;
