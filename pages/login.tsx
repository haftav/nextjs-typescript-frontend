import React, {useState} from 'react';
import {signIn} from 'next-auth/client';
import {FormControl, FormLabel, Input, Button, Box, Heading} from '@chakra-ui/core';
import {string, object, number} from 'yup';

import Layout from 'components/Layout';

const formSchema = object().shape({
  username: number().required().max(15),
  password: number().required().max(60),
});

interface FormErrors {
  username?: boolean;
  password?: boolean;
}

const Login = () => {
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO -> sanitize inputs

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    // try {
    //   const valid = await formSchema.validate(body, {strict: true});
    // } catch (err) {
    //   console.error(err);
    // }

    return signIn('credentials', {
      ...body,
      callbackUrl: 'http://localhost:3000/profile',
    });
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
