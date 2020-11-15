import React from 'react';
import {ThemeProvider, ColorModeProvider, CSSReset} from '@chakra-ui/core';
import {ReactQueryDevtools} from 'react-query-devtools';
import {ReactQueryConfigProvider} from 'react-query';
import {Provider} from 'next-auth/client';
import {AppProps} from 'next/app';
import Head from 'next/head';

const queryConfig = {queries: {refetchOnWindowFocus: false}};

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <html lang="en" />
        <meta name="Description" content="Keep track of your musical progress."></meta>
        <title>Songstack</title>
      </Head>
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
