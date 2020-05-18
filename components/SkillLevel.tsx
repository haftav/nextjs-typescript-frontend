import React, {FunctionComponent} from 'react';
import Link from 'next/link';
import {css} from '@emotion/core';

const wrapper = css`
  width: 80%;
  height: 50px;
  background: linear-gradient(to right, #3b9cff 0%, #a752ff 50%, #f7a024 100%);
`;

const Layout: FunctionComponent<Props> = (props) => {
  return <div css={wrapper}></div>;
};

interface Props {
  rating: number;
}

export default Layout;
