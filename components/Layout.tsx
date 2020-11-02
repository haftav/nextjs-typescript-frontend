import React from 'react';
import {useSession} from 'next-auth/client';
import {Box} from '@chakra-ui/core';

import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  const [session, loading] = useSession();
  return (
    <>
      <Header session={session} loading={loading} />
      <Box padding={['25px 25px', '25px 50px']} textAlign="center" overflow="hidden">
        {children}
      </Box>
    </>
  );
};

export default Layout;
