import React, {FunctionComponent} from 'react';
import {BoxProps, Box} from '@chakra-ui/core';
import {css} from '@emotion/core';

import Gradient from './Gradient';

interface GradientProps {
  rating: number;
}

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
