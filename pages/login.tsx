import React from 'react';
import {signIn} from 'next-auth/client';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  Heading,
} from '@chakra-ui/core';
import {string, object} from 'yup';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';

import Layout from 'components/Layout';

// I think there may be a way to extend an interface when making schema (or vice versa)
const FormSchema = object().shape({
  username: string().required('Required'),
  password: string().required('Required'),
});

const Login = () => {
  const router = useRouter();
  const {error} = router.query;

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      const body = {
        username: values.username,
        password: values.password,
      };

      return signIn('credentials', {
        ...body,
        callbackUrl: 'http://localhost:3000/profile',
      });
    },
  });

  return (
    <Layout>
      <Box maxW="sm" m="auto">
        <Heading as="h2">Login</Heading>
        {error ? (
          <Heading as="h3" size="sm" mt={5}>
            Please enter a valid username and password.
          </Heading>
        ) : (
          ''
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            m="25px auto"
            textAlign="left"
            isInvalid={formik.errors.username && formik.touched.username}
          >
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              type="text"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
          </FormControl>
          <FormControl
            m="25px auto"
            textAlign="left"
            isInvalid={formik.errors.password && formik.touched.password}
          >
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
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
