import React, {FunctionComponent} from 'react';
import {BoxProps, Box} from '@chakra-ui/core';
import styled from '@emotion/styled';
import {css} from '@emotion/core';

interface GradientProps {
  rating: number;
}

const Gradient = styled.div<GradientProps>`
  height: 25px;
  width: calc(100vw - 50px);
  border-radius: 10px;
  background: linear-gradient(to right, #3b9cff 0%, #a752ff 33%, #ff9600 66%, #ff4141 100%);
`;

interface Props extends BoxProps {
  rating: number;
}

const SkillLevel: FunctionComponent<Props> = ({rating, ...rest}) => {
  return (
    <Box
      css={css`
        width: ${rating * 25}%;
        border-radius: 10px;
        overflow: hidden;
      `}
      {...rest}
    >
      <Gradient rating={rating} />
    </Box>
  );
};

export default SkillLevel;
