import React from 'react';
import {Box, Menu, MenuButton, Button, MenuList, MenuItem} from '@chakra-ui/core';

interface CreateMenuProps {
  toggleModal: () => void;
}

const CreateMenu = ({toggleModal}: CreateMenuProps) => {
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
