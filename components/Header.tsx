import React, {FunctionComponent} from 'react';
import {Flex, Box, Button, Text} from '@chakra-ui/core';

const Header = () => {
  return (
    <Flex fontSize="2xl" fontWeight="bold" justify="space-between" align="center">
      <Box>
        <Text>My Application</Text>
      </Box>
      <Flex>
        <Button variant="outline" w="100px" m="0px 10px">
          Log In
        </Button>
        <Button variant="outline" w="100px" m="0px 10px">
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
