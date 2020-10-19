import React, {useState, useRef} from 'react';
import {
  Box,
  Flex,
  Button,
  Divider,
  Drawer,
  Text,
  Link as ChakraLink,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
} from '@chakra-ui/core';
import Link from 'next/link';
import {signOut} from 'next-auth/client';

import Session from './Session';
import {Session as SessionModel} from 'models';

const MenuIcon = () => (
  <svg fill="#CBD5E0" width="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MobileHeader = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const btnRef = useRef();

  const closeMenu = (): void => {
    setMenuOpen(false);
  };

  return (
    <Box height="75px" display={['block', 'block', 'none']} pos="relative" overflow="auto">
      <Link href="/">
        <a>
          <Box m="20px 20px">
            <Text fontSize="2xl" fontWeight="bold">
              My Application
            </Text>
          </Box>
        </a>
      </Link>
      <Flex
        h="50px"
        w="50px"
        pos="absolute"
        right="20px"
        top="20px"
        justify="flex-start"
        align="center"
      >
        <Button
          onClick={() => setMenuOpen((prevState) => !prevState)}
          ref={btnRef}
          rounded="md"
          w="100%"
          h="100%"
        >
          <MenuIcon />
        </Button>
      </Flex>
      <Drawer isOpen={isMenuOpen} placement="right" onClose={closeMenu} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton h="50px" w="50px" top="20px" right="20px" />
          <DrawerHeader height="75px">
            <Link href="/">
              <a>
                <Heading>Songstack</Heading>
              </a>
            </Link>
          </DrawerHeader>
          <DrawerBody>
            <Session.LoggedOut>
              <Link href="/login">
                <a>
                  <Button variant="solid" w="100%" h="50px" fontSize="1.2em" m="10px auto">
                    Log In
                  </Button>
                </a>
              </Link>
            </Session.LoggedOut>
            <Session.LoggedOut>
              <Link href="/register">
                <a>
                  <Button variant="solid" w="100%" h="50px" fontSize="1.2em" m="10px auto">
                    Sign Up
                  </Button>
                </a>
              </Link>
            </Session.LoggedOut>
            <Session.LoggedIn>
              {(loadedSession: SessionModel) => (
                <>
                  <Heading as="h2" size="lg" fontWeight="400" marginY="15px">
                    Welcome back, {loadedSession.user.name}!
                  </Heading>
                  <Divider />
                  <Link href="profile">
                    <a>
                      <Text fontSize="1.2em" fontWeight="bold" marginY="15px">
                        Profile
                      </Text>
                    </a>
                  </Link>
                </>
              )}
            </Session.LoggedIn>
          </DrawerBody>
          <DrawerFooter>
            <Session.LoggedIn>
              <Button
                variant="outline"
                w="100%"
                h="50px"
                m="10px auto"
                fontSize="1.2em"
                onClick={() => signOut({callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL})}
              >
                Log Out
              </Button>
            </Session.LoggedIn>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MobileHeader;
