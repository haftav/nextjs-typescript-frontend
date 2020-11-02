import React from 'react';
import {Heading, Box, Link} from '@chakra-ui/core';
import NextLink from 'next/link';

import LandingGradients from 'components/LandingGradients';
import {Session} from 'models';

interface AuthenticatedLandingProps {
  session: Session;
}

const AuthenticatedLanding = ({session}: AuthenticatedLandingProps) => {
  return (
    <Box minH="110vh">
      <LandingGradients />
      <Heading as="h2" pt="3em" mb="1em">
        Welcome back, {session.user.name}!
      </Heading>
      <NextLink href="/profile" as="/profile">
        <Link>
          <Heading as="h3" size="lg" fontWeight="normal">
            Visit Profile
          </Heading>
        </Link>
      </NextLink>
    </Box>
  );
};

export default AuthenticatedLanding;
