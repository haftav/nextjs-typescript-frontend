import React from 'react';
import {useSession} from 'next-auth/client';
import {Box} from '@chakra-ui/core';

import Header from './Header';

const Layout = ({children}) => {
  const [session, loading] = useSession();
  return (
    <>
      <Header session={session} loading={loading} />
      <Box padding={['25px 25px', '25px 50px']} textAlign="center">
        {children}
      </Box>
    </>
  );
};

export default Layout;
