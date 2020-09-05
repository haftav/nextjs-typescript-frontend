import React, {FunctionComponent} from 'react';
import {signIn, getSession} from 'next-auth/client';
import {FormControl, FormLabel, Input, Button, Box, Heading} from '@chakra-ui/core';

import Layout from 'components/Layout';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    signIn('credentials', {...body, callbackUrl: 'http://localhost:3000/profile'});
  };

  return (
    <Layout>
      <Box maxW="sm" m="auto">
        <Heading as="h2">Login</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl m="25px auto" textAlign="left">
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input type="text" id="username" />
          </FormControl>
          <FormControl m="25px auto" textAlign="left">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input type="password" id="password" />
          </FormControl>
          <Button m="auto" textAlign="center" type="submit">
            Login
          </Button>
        </form>
      </Box>
    </Layout>
  );
};

export default Login;
