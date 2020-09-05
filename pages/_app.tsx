import {ThemeProvider, ColorModeProvider, CSSReset} from '@chakra-ui/core';
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
          <ColorModeProvider value="dark">
            <CSSReset />
            <Component {...pageProps} />
          </ColorModeProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryConfigProvider>
    </Provider>
  );
}

export default MyApp;
