import React from 'react';
import {css} from '@emotion/core';
import {useSession} from 'next-auth/client';

import Header from './Header';

const mainContent = css`
  text-align: center;
  padding: 25px;
`;

const Layout = ({children}) => {
  const [session, loading] = useSession();
  return (
    <>
      <Header session={session} loading={loading} />
      <div css={mainContent}>{children}</div>
    </>
  );
};

export default Layout;
