import React, {FunctionComponent} from 'react';
import {BoxProps, Box} from '@chakra-ui/core';
import {css} from '@emotion/core';

import Gradient from './Gradient';

interface Props extends BoxProps {
  rating: 1 | 2 | 3 | 4;
}

const SkillLevel: FunctionComponent<Props> = ({rating, ...rest}) => {
  return (
    <Box
      data-testid="skill-level"
      css={css`
        width: ${rating * 25}%;
        border-radius: 10px;
        overflow: hidden;
        transition: width 0.2s ease-out;
      `}
      {...rest}
    >
      <Gradient rating={rating} />
    </Box>
  );
};

export default SkillLevel;
