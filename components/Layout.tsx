import React, {FunctionComponent} from 'react';
import Link from 'next/link';
import {css} from '@emotion/core';

interface Props {
  children: any;
}

const wrapper = css`
  padding: 25px;
  text-align: center;
`;

const Layout: FunctionComponent<Props> = (props) => {
  return (
    <div css={wrapper}>
      <header>
        <Link href='/profile'>
          <a>Profile</a>
        </Link>
      </header>
      {props.children}
    </div>
  );
};

export default Layout;
