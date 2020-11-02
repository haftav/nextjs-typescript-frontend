import React from 'react';
import {Flex, Box, Text, Button} from '@chakra-ui/core';
import Link from 'next/link';
import {signOut} from 'next-auth/client';

import Session from './Session';
import CreateMenu from './CreateMenu';
import {Session as SessionModel} from 'models';

const ProfileLink = () => (
  <Box marginLeft="45px">
    <Link href="profile">
      <a>
        <Text fontSize="sm" fontWeight="bold">
          Profile
        </Text>
      </a>
    </Link>
  </Box>
);

const LoginLink = () => (
  <Link href="/login">
    <a tabIndex={-1}>
      <Button variant="outline" w="100px" m="0px 10px">
        Log In
      </Button>
    </a>
  </Link>
);

const RegisterLink = () => (
  <Link href="/register">
    <a tabIndex={-1}>
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
    onClick={() => signOut({callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL})}
  >
    Log Out
  </Button>
);

interface DesktopHeaderProps {
  toggleModal: () => void;
}

const DesktopHeader = ({toggleModal}: DesktopHeaderProps) => {
  return (
    <Flex
      justify="center"
      align="center"
      position="relative"
      height="100px"
      display={['none', 'none', 'flex']}
    >
      <Box position="absolute" left="25px">
        <Flex align="center">
          <Link href="/">
            <a>
              <Text fontSize="2xl" fontWeight="bold">
                Songstack
              </Text>
            </a>
          </Link>
          <Session.LoggedIn>
            <ProfileLink />
          </Session.LoggedIn>
          <Session.LoggedIn>
            <CreateMenu toggleModal={toggleModal} segment="desktop" />
          </Session.LoggedIn>
        </Flex>
      </Box>
      <Flex position="absolute" right="25px" align="center">
        <Session.LoggedOut>
          <RegisterLink />
        </Session.LoggedOut>
        <Session.LoggedOut>
          <LoginLink />
        </Session.LoggedOut>
        <Session.LoggedIn>
          {(loadedSession: SessionModel) => (
            <Text fontSize="sm" mr="10px">
              {loadedSession.user.name}
            </Text>
          )}
        </Session.LoggedIn>
        <Session.LoggedIn>
          <LogoutLink />
        </Session.LoggedIn>
      </Flex>
    </Flex>
  );
};

export default DesktopHeader;
