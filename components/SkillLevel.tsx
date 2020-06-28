import React, {FunctionComponent} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/core';

const calculateGradient = (rating: number) => {
  switch (rating) {
    case 1:
      return '25%';
    case 2:
      return '50%';
    case 3:
      return '75%';
    case 4:
      return 'to right, #3b9cff 0%, #a752ff 50%, #f7a024 100%';
    default:
      return '0%';
  }
};

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
