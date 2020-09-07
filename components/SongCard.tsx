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
  useToast,
} from '@chakra-ui/core';
import {useMutation, queryCache} from 'react-query';
import {makeProtectedRequest} from 'utils/http';

import SkillLevel from './SkillLevel';
import {Song, SkillLevel as SkillLevelInterface} from '../models';

interface SongUpdaterParams {
  songData: {
    id: number;
    songName?: string;
    artist?: string;
    userId?: number;
    skill?: SkillLevelInterface;
  };
}
const updateSong = (params: SongUpdaterParams) => {
  const {songData} = params;
  return makeProtectedRequest('PUT', `/songs/${songData.id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(songData),
  }).then((data) => data);
};

interface Props {
  song: Song;
}

const SongCard: FunctionComponent<Props> = ({song}) => {
  console.log(song.skill);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toast = useToast();
  const [mutate] = useMutation(updateSong, {
    onSuccess: () => {
      queryCache.invalidateQueries('songs');
    },
    onError: () => {
      toast({
        title: 'An error occurred.',
        description: 'Unable to update skill level.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleClick = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  const handleButtonClick = (skillLevel: number) => () => {
    const songData = {
      id: song.id,
      skillLevel,
    };
    mutate({songData});
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
      <PseudoBox as="button" w="100%" h="40px" _hover={{cursor: 'pointer'}} onClick={handleClick}>
        <Icon
          name="chevron-down"
          size="40px"
          color="#b3b3b3"
          transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
        />
      </PseudoBox>
      <Collapse as={Flex} isOpen={isOpen} pt="15px" pb="15px" justifyContent="space-around">
        <Button size="sm" w={150} onClick={handleButtonClick(1)}>
          Beginner
        </Button>
        <Button size="sm" w={150} onClick={handleButtonClick(2)}>
          Intermediate
        </Button>
        <Button size="sm" w={150} onClick={handleButtonClick(3)}>
          Advanced
        </Button>
        <Button size="sm" w={150} onClick={handleButtonClick(4)}>
          Expert
        </Button>
      </Collapse>
    </Box>
  );
};

export default SongCard;
