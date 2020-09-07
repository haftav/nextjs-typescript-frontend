import React, {FunctionComponent, useState} from 'react';
import {
  Collapse,
  Button,
  Box,
  Divider,
  Badge,
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
import {Song, SkillLevelTitles} from '../models';

interface SongUpdaterParams {
  songName?: string;
  artist?: string;
  skillLevel?: number;
  id: number;
}

const updateSong = (params: SongUpdaterParams) => {
  const {songName, artist, skillLevel, id} = params;
  const requestBody: SongUpdaterParams = {id};

  if (songName) requestBody.songName = songName;
  if (artist) requestBody.artist = artist;
  if (skillLevel) requestBody.skillLevel = skillLevel;

  return makeProtectedRequest('PUT', `/songs/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  }).then((data) => data.song);
};

interface Props {
  song: Song;
}

const SongCard: FunctionComponent<Props> = ({song}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toast = useToast();

  const [mutate] = useMutation(updateSong, {
    onMutate: (params) => {
      // optimistically update songs
      queryCache.cancelQueries('songs');

      const previousSongs: Song[] = queryCache.getQueryData('songs');

      queryCache.setQueryData('songs', (oldData: Song[]) => {
        const {songName, artist, skillLevel, id} = params;
        const index = oldData.findIndex((el) => el.id === id);
        if (index < 0) return oldData;
        const songToUpdate = {...oldData[index]};
        if (songName) songToUpdate.songName = songName;
        if (artist) songToUpdate.artist = artist;
        if (skillLevel) {
          songToUpdate.skill.value = skillLevel;
          songToUpdate.skill.defaultTitle = SkillLevelTitles[skillLevel];
        }
        return [...oldData.slice(0, index), songToUpdate, ...oldData.slice(index + 1)];
      });

      // rollback function if update isn't successful
      return () => queryCache.setQueryData('songs', previousSongs);
    },
    onError: (err, newTodo, rollback: () => void) => {
      toast({
        title: 'An error occurred.',
        description: 'Unable to update skill level.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return rollback();
    },
    onSettled: () => {
      queryCache.invalidateQueries('songs');
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

    mutate(songData);
  };

  return (
    <PseudoBox
      maxW="3xl"
      my={5}
      mx="auto"
      position="relative"
      borderWidth="1px"
      rounded="lg"
      onClick={handleClick}
      _hover={{cursor: 'pointer'}}
    >
      <Box mb={5} p="15px 15px 0px 15px">
        <Heading as="h2" fontSize={['md', 'lg']} textAlign="left" maxW="80%">
          {song.songName}
        </Heading>
        <Text fontSize="md" textAlign="left" maxW="80%">
          {song.artist}
        </Text>
        <Box position="absolute" top="15px" right="15px" w="auto" h="auto">
          <Badge fontSize={['10px', '12px']}>{song.skill.defaultTitle}</Badge>
        </Box>
        <SkillLevel mt="15px" rating={song.skill.value} />
      </Box>
      <Collapse
        as={Flex}
        isOpen={isOpen}
        pt="15px"
        pb="15px"
        justifyContent="space-around"
        onClick={(e) => e.stopPropagation()}
      >
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
    </PseudoBox>
  );
};

export default SongCard;
