import React from 'react';
import {Box} from '@chakra-ui/core';

import Gradient from 'components/Gradient';

const LandingGradients = () => {
  return (
    <Box
      position="relative"
      right="-400px"
      top={['100px', '50px', '-50px', '-150px']}
      transform="rotate(21deg)"
      transformOrigin="right center"
      opacity={0.9}
    >
      <Gradient
        rating={1}
        id="gradient-1"
        fadeIn
        customStyle={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '400vh',
          height: 20,
          transform: 'rotate(-55deg)',
          transformOrigin: 'right center',
          borderRadius: 10,
        }}
      />
      <Gradient
        rating={2}
        id="gradient-2"
        fadeIn
        customStyle={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '400vh',
          height: 20,
          transform: 'rotate(-60deg)',
          transformOrigin: 'right center',
          borderRadius: 10,
        }}
      />
      <Gradient
        rating={3}
        id="gradient-3"
        fadeIn
        customStyle={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '400vh',
          height: 20,
          transform: 'rotate(-65deg)',
          transformOrigin: 'right center',
          borderRadius: 10,
        }}
      />
      <Gradient
        rating={4}
        id="gradient-4"
        fadeIn
        customStyle={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '400vh',
          height: 20,
          transform: 'rotate(-70deg)',
          transformOrigin: 'right center',
          borderRadius: 10,
        }}
      />
    </Box>
  );
};

export default LandingGradients;
