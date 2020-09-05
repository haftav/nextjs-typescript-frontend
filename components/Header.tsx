import React, {FunctionComponent} from 'react';
import Link from 'next/link';
import {Flex, Box, Button, Text} from '@chakra-ui/core';
import {useSession} from 'next-auth/client';
import {signOut} from 'next-auth/client';

// IDEA -> use compound component to control view states for menu buttons

const ProfileLink = ({session, loading}) => {
  if (!loading && session) {
    return (
      <Link href="profile">
        <a>
          <Box>
            <Text>Profile</Text>
          </Box>
        </a>
      </Link>
    );
  }
  if (!loading && !session) {
    return null;
  }

  // update w/ skeleton
  return null;
};

const LoginLink = ({session, loading}) => {
  if (!loading && !session) {
    return (
      <Link href="/login">
        <a>
          <Button variant="outline" w="100px" m="0px 10px">
            Log In
          </Button>
        </a>
      </Link>
    );
  }

  return null;
};

const RegisterLink = ({session, loading}) => {
  if (!loading && !session) {
    return (
      <Link href="/register">
        <a>
          <Button variant="outline" w="100px" m="0px 10px">
            Sign Up
          </Button>
        </a>
      </Link>
    );
  }

  return null;
};

const LogoutLink = ({session, loading}) => {
  if (!loading && session) {
    return (
      <Button
        variant="outline"
        w="100px"
        m="0px 10px"
        onClick={() => signOut({callbackUrl: 'http://localhost:3000/'})}
      >
        Log Out
      </Button>
    );
  }

  return null;
};

const Header = () => {
  const [session, loading] = useSession();

  return (
    <Flex
      fontSize="2xl"
      fontWeight="bold"
      justify="center"
      align="center"
      position="relative"
      height="100px"
    >
      <Box position="absolute" left="25px">
        <Link href="/">
          <a>
            <Box>
              <Text>My Application</Text>
            </Box>
          </a>
        </Link>
      </Box>
      <ProfileLink session={session} loading={loading} />
      <Flex position="absolute" right="25px" align="center">
        <LoginLink session={session} loading={loading} />
        <RegisterLink session={session} loading={loading} />
        <LogoutLink session={session} loading={loading} />
        <Flex
          fontSize="8px"
          flexDir="column"
          align="center"
          justify="center"
          border="1px solid rgba(255,255,255,0.16)"
          borderRadius="0.25rem"
          padding="5px"
          height="50px"
        >
          <Box>|</Box>
          <Box>-</Box>
          <Box>O</Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
