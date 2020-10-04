import React, {FunctionComponent} from 'react';
import {
  Button,
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
} from '@chakra-ui/core';
import {useMutation} from 'react-query';
import {signIn} from 'next-auth/client';
import {useFormik} from 'formik';

import Layout from '../components/Layout';
import {makeRequest} from 'utils/http';
import {string, object} from 'yup';

const createUser = ({userData}) => {
  return makeRequest('POST', '/user/signup', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  }).then((data) => data);
};

const FormSchema = object().shape({
  username: string().required('Required').max(15).min(4),
  password: string().required('Required').max(60).min(4),
});

const Register: FunctionComponent<{}> = () => {
  // TODO -> update mutation logic to use proper callbacks
  const [mutate, {error}] = useMutation(createUser, {
    throwOnError: true,
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      const userData = {
        username: values.username,
        password: values.password,
      };

      try {
        await mutate({userData});
        return signIn('credentials', {
          ...userData,
          callbackUrl: `${process.env.NEXT_PUBLIC_CALLBACK_URL}/profile`,
        });
      } catch (err) {
        console.log('unable to sign in.');
        console.error(error);
      }
    },
  });

  return (
    <Layout>
      <Box maxW="sm" m="auto">
        <Heading as="h2">Register</Heading>
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
            Register
          </Button>
        </form>
      </Box>
    </Layout>
  );
};

export default Register;
