import React from 'react';
import {useSession} from 'next-auth/client';
import {Box, BoxProps} from '@chakra-ui/core';

import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  fullScreen?: boolean;
}

const Layout = ({children, fullScreen}: LayoutProps) => {
  const [session, loading] = useSession();

  const wrapperProps: BoxProps = {
    minH: '568px',
  };
  if (fullScreen) {
    wrapperProps.height = '100vh';
    wrapperProps.overflow = 'hidden';
  }
  return (
    <Box {...wrapperProps}>
      <Header session={session} loading={loading} />
      <Box padding={['25px 25px', '25px 50px']} textAlign="center" overflow="hidden">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
