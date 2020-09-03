import React from 'react';
import {css} from '@emotion/core';

import Header from './Header';

const mainContent = css`
  text-align: center;
  padding: 25px;
`;

const Layout = ({children}) => {
  return (
    <>
      <Header />
      <div css={mainContent}>{children}</div>
    </>
  );
};

export default Layout;
