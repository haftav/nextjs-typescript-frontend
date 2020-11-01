import React from 'react';
import {Box, Button, Flex, Heading} from '@chakra-ui/core';
import Image from 'next/image';

const Landing = () => {
  return (
    <Box>
      <Flex h="auto">
        <Box
          border="1px solid red"
          p="2em"
          flex="3 1 20em"
          textAlign={['center', 'center', 'left']}
        >
          <Heading
            as="h1"
            size="2xl"
            m={['2em auto 1.5em', '2em auto 1.5em', '2em 2em 1.5em 0.5em']}
            w={['90%']}
          >
            Track your musical progress.
          </Heading>
          <Flex
            flexDir={['column', 'row']}
            justify={['center', 'center', 'flex-start']}
            align={['center']}
          >
            <Button m={['0.8em', '1.2em', '1.5em']} size="lg" d={['inline-block']} width="150px">
              Get Started
            </Button>
            <Button size="lg" d={['inline-block']} width="150px">
              Log In
            </Button>
          </Flex>
        </Box>
        <Box display={['none', 'none', 'block']} border="1px solid blue" flex="2 5 auto">
          <Box w={['150px', '150px', '200px', '200px']} pl="2em" mt="2em">
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
    </Box>
  );
};

export default Landing;
