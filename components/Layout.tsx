import React, {FunctionComponent} from 'react';
import Link from 'next/link';
import {Button} from '@chakra-ui/core';
import {css} from '@emotion/core';
import {signOut} from 'next-auth/client';

const wrapper = css`
  padding: 25px;
  text-align: center;
`;

interface Props {
  session?: {};
}

const Layout: FunctionComponent<Props> = (props) => {
  return (
    <div css={wrapper}>
      <header>
        {props.session ? (
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        ) : (
          ''
        )}

        {props.session ? <Button onClick={signOut}>Log Out</Button> : null}
      </header>
      {props.children}
    </div>
  );
};

export default Layout;
