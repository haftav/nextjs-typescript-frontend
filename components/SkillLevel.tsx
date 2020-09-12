import React, {FunctionComponent} from 'react';
import {BoxProps, Box} from '@chakra-ui/core';
import {css} from '@emotion/core';

import Gradient from './Gradient';
import {Rating} from 'models';

interface Props extends BoxProps {
  rating: Rating;
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
