import React, {FunctionComponent} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/core';

interface GradientProps {
  rating: number;
}

const Gradient = styled.div<GradientProps>`
  width: calc(100vw - 50px);
  height: 25px;
  border-radius: 10px;
  background: linear-gradient(to right, #3b9cff 0%, #a752ff 33%, #ff9600 66%, #ff4141 100%);
`;

interface Props {
  rating: number;
}

const SkillLevel: FunctionComponent<Props> = ({rating}) => {
  return (
    <div
      css={css`
        width: ${rating * 25}%;
        border-radius: 10px;
        overflow: hidden;
      `}
    >
      <Gradient rating={rating} />
    </div>
  );
};

export default SkillLevel;
