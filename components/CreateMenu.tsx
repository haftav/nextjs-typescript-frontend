import React from 'react';
import {Box, Menu, MenuButton, Button, MenuList, MenuItem} from '@chakra-ui/core';

interface CreateMenuProps {
  toggleModal: () => void;
  segment: 'desktop' | 'mobile';
}

const CreateMenu = ({toggleModal, segment}: CreateMenuProps) => {
  if (segment === 'mobile') {
    return (
      <Box w="100%">
        <Menu>
          <MenuButton
            as={Button}
            width="100%"
            size="md"
            fontSize="lg"
            /* @ts-expect-error */
            rightIcon="chevron-down"
          >
            Create
          </MenuButton>
          <MenuList w="100%" minW="auto" placement="bottom" fontSize="lg">
            <MenuItem onClick={toggleModal} height="50px">
              Song
            </MenuItem>
            <MenuItem height="50px">List</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    );
  }
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

export default CreateMenu;
