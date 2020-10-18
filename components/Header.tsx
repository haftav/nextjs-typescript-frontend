import React, {useState} from 'react';
import Link from 'next/link';
import {Flex, Box, Button, Text} from '@chakra-ui/core';
import {signOut} from 'next-auth/client';

import Session from 'components/Session';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
import {Session as SessionModel} from 'models';
import CreateMenu from './CreateMenu';
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
    onClick={() => signOut({callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL})}
  >
    Log Out
  </Button>
);

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
      <DesktopHeader toggleModal={toggleModal} />
      <MobileHeader />
    </Session>
  );
};

export default Header;
