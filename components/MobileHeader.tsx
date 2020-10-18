import React, {useState, useRef} from 'react';
import {
  Box,
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/core';

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
    <Box height="75px" display={['block', 'block', 'none']} pos="relative">
      <Flex
        h="50px"
        w="50px"
        pos="absolute"
        right="20px"
        top="20px"
        justify="center"
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
          <DrawerHeader height="75px">Create your account</DrawerHeader>

          <DrawerBody>lalala</DrawerBody>

          <DrawerFooter>
            <Button color="blue" isDisabled>Log Out</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MobileHeader;
