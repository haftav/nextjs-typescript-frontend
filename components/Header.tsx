import React, {useState} from 'react';
import Link from 'next/link';
import {Flex, Box, Button, Text, Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/core';
import {signOut} from 'next-auth/client';

import Session from 'components/Session';
import {Session as SessionModel} from 'models';
import CreateModal from './CreateModal';

const ProfileLink = () => (
  <Box marginLeft="45px">
    <Link href="profile">
      <a>
        <Text fontSize="sm">Profile</Text>
      </a>
    </Link>
  </Box>
);

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

interface CreateMenuProps {
  toggleModal: () => void;
}

const CreateMenu: React.FunctionComponent<CreateMenuProps> = ({toggleModal}) => {
  return (
    <Box marginLeft="25px">
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          fontSize="sm"
          /* @ts-expect-error */
          rightIcon="chevron-down"
        >
          Create
        </MenuButton>
        <MenuList minW="150px" placement="bottom-start">
          <MenuItem onClick={toggleModal}>Song</MenuItem>
          <MenuItem>List</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

interface HeaderProps {
  session: SessionModel;
  loading: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = ({session, loading}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    return setModalOpen((prevState) => !prevState);
  };

  return (
    <Session session={session} loading={loading}>
      <CreateModal isOpen={modalOpen} closeModal={toggleModal} />
      <Flex justify="center" align="center" position="relative" height="100px">
        <Box position="absolute" left="25px">
          <Flex align="center">
            <Link href="/">
              <a>
                <Box>
                  <Text fontSize="2xl" fontWeight="bold">
                    My Application
                  </Text>
                </Box>
              </a>
            </Link>
            <Session.LoggedIn>
              <ProfileLink />
            </Session.LoggedIn>
            <Session.LoggedIn>
              <CreateMenu toggleModal={toggleModal} />
            </Session.LoggedIn>
          </Flex>
        </Box>
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
