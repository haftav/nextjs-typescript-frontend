import React, {FunctionComponent} from 'react';
import {Button, Box, Input, FormControl, FormLabel, Heading} from '@chakra-ui/core';
import {useMutation} from 'react-query';
import {signIn} from 'next-auth/client';
import Layout from '../components/Layout';

const createUser = ({userData}) => {
  return fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then((data) => data);
};

const Register: FunctionComponent<{}> = (props) => {
  const [mutate, {status, data, error}] = useMutation(createUser, {throwOnError: true});
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    try {
      await mutate({userData});
      return signIn('credentials', {...userData, callbackUrl: 'http://localhost:3000/profile'});
    } catch (err) {
      console.log('unable to sign in.');
      console.error(error);
    }
  };
  return (
    <Layout>
      <Box maxW="sm" m="auto">
      <Heading as="h2">Register</Heading>
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

export default Register;
