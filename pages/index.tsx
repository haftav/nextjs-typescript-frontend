import React, {FunctionComponent} from 'react';
import {css} from '@emotion/core';

const wrapper = css`
  background-color: red;
  height: 100vh;
  width: 100%;
`;

const HomePage: FunctionComponent<{}> = () => {
  return <div css={wrapper}>Landing Page</div>;
};

export default HomePage;
