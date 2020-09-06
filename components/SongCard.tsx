import React, {FunctionComponent, useState} from 'react';
import {
  Collapse,
  Button,
  Box,
  Divider,
  Heading,
  Flex,
  Icon,
  PseudoBox,
  Text,
} from '@chakra-ui/core';

import SkillLevel from './SkillLevel';
import {Song} from '../models';

interface Props {
  song: Song;
}

const SongCard: FunctionComponent<Props> = ({song}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <Box maxW="3xl" my={5} mx="auto" borderWidth="1px" rounded="lg">
      <Box mb={5} p="15px 15px 0px 15px">
        <Heading as="h2" size="md" textAlign="left">
          {song.songName}
        </Heading>
        <Text fontSize="md" textAlign="left">
          {song.artist}
        </Text>
        <SkillLevel mt="15px" rating={song.skill.value} />
      </Box>
      <Divider m="25px auto 0px auto" />
      <PseudoBox
        as="button"
        w="100%"
        h="40px"
        _hover={{cursor: 'pointer'}}
        onClick={handleClick}
      >
        <Icon
          name="chevron-down"
          size="40px"
          color="#b3b3b3"
          transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
        />
      </PseudoBox>
      <Collapse
        as={Flex}
        isOpen={isOpen}
        pt="15px"
        pb="15px"
        justifyContent="space-around"
      >
        <Button w={150}>Beginner</Button>
        <Button w={150}>Intermediate</Button>
        <Button w={150}>Advanced</Button>
        <Button w={150}>Expert</Button>
      </Collapse>
    </Box>
  );
};

export default SongCard;
