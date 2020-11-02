import React from 'react';
import {Box, Button, Flex, Heading} from '@chakra-ui/core';
import Image from 'next/image';
import Link from 'next/link';

import LandingGradients from 'components/LandingGradients';

const Landing = () => {
  return (
    <Box maxW="1500px" w="100%" m="auto" position="relative">
      <LandingGradients />
      <Flex h="auto">
        <Box p={['0', '2em']} flex="5 1 10em" textAlign={['center', 'center', 'left']}>
          <Heading
            as="h1"
            size="2xl"
            mt="2em"
            mb="1.5em"
            mx={['auto', 'auto', '0px']}
            pl={['0', '0', '0.5em']}
            w={['100%', 'auto', '9em', '9em']}
            maxW="15em"
          >
            Track your musical progress.
          </Heading>
          <Flex
            flexDir={['column', 'row']}
            justify={['center', 'center', 'flex-start']}
            align={['center']}
          >
            <Link href="/register">
              <a tabIndex={-1}>
                <Button
                  m={['0.8em', '1.2em', '1.5em']}
                  size="lg"
                  d={['inline-block']}
                  width="150px"
                >
                  Get Started
                </Button>
              </a>
            </Link>
            <Link href="/login">
              <a tabIndex={-1}>
                <Button size="lg" d={['inline-block']} width="150px">
                  Log In
                </Button>
              </a>
            </Link>
          </Flex>
        </Box>
        <Box display={['none', 'none', 'block']} flex="2 5 304px">
          <Box maxW={['150px', '150px', '200px', '200px']} pl="2em" mt="2em">
            <Image
              src="/guitar.png"
              alt="Picture of guitar"
              width={304}
              height={835}
              quality={100}
              loading="eager"
              sizes="200px"
            />
          </Box>
        </Box>
      </Flex>
      <Box h="2000px"></Box>
    </Box>
  );
};

export default Landing;
