import React from 'react';
import Link from 'next/link';
import {Flex, Box, Button, Text} from '@chakra-ui/core';
import {useSession} from 'next-auth/client';
import {signOut} from 'next-auth/client';

import Session from 'components/Session';

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

const LoginLink = () => (
  <Link href="/login">
    <a>
      <Button variant="outline" w="100px" m="0px 10px">
        Log In
      </Button>
    </a>
  </Link>
);

const RegisterLink = () => (
  <Link href="/register">
    <a>
      <Button variant="outline" w="100px" m="0px 10px">
        Sign Up
      </Button>
    </a>
  </Link>
);

const LogoutLink = () => (
  <Button
    variant="outline"
    w="100px"
    m="0px 10px"
    onClick={() => signOut({callbackUrl: 'http://localhost:3000/'})}
  >
    Log Out
  </Button>
);

const Header: React.FunctionComponent<{}> = () => {
  const [session, loading] = useSession();

  return (
    <Session session={session} loading={loading}>
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
          <Session.LoggedOut>
            <LoginLink />
          </Session.LoggedOut>
          <Session.LoggedOut>
            <RegisterLink />
          </Session.LoggedOut>
          <Session.LoggedIn>
            <LogoutLink />
          </Session.LoggedIn>
        </Flex>
      </Flex>
    </Session>
  );
};

export default Header;
