import React, {FunctionComponent, useState} from 'react';
import {Button, Box, Badge, Heading, Text, useToast, Flex, IconButton} from '@chakra-ui/core';
import {useMutation, queryCache} from 'react-query';
import {makeProtectedRequest} from 'utils/http';

import SkillLevel from './SkillLevel';
import EditModal from './EditModal';

import {Rating, Song, SkillLevelTitles} from '../models';

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
  const [isEditing, setIsEditing] = useState(false);
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
        const songToUpdate = {...oldData[index], skill: {...oldData[index].skill}};
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
  });

  const handleButtonClick = (type: 'decrease' | 'increase') => () => {
    const songData = {
      id: song.id,
      skillLevel: song.skill.value += type === 'decrease' ? -1 : 1,
    };

    mutate(songData);
  };

  const toggleEditing = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsEditing((prevState) => !prevState);
  };

  return (
    <Box maxW="3xl" my={5} mx="auto" position="relative" borderWidth="1px" rounded="lg">
      <Box p="15px 15px 0px 15px">
        <Flex justify="space-between">
          <Heading display="block" as="h2" fontSize={['md', 'lg']} textAlign="left" maxW="80%">
            {song.songName}
          </Heading>
          <Box ml=".5em">
            <Badge fontSize={['10px', '12px']}>{song.skill.defaultTitle}</Badge>
          </Box>
        </Flex>
        <Text fontSize="md" textAlign="left" maxW="80%" lineHeight="1em" mt=".2em">
          {song.artist}
        </Text>
        <Flex justify="space-between" align="center">
          <IconButton
            icon="chevron-left"
            size="sm"
            fontSize="2em"
            h="2rem"
            variant="ghost"
            aria-label="Decrease skill level"
            isDisabled={song.skill.value === 1}
            onClick={handleButtonClick('decrease')}
          >
            Left
          </IconButton>
          <Box w="100%" px=".5em">
            <SkillLevel my="1.5em" rating={song.skill.value as Rating} />
          </Box>
          <IconButton
            icon="chevron-right"
            size="sm"
            fontSize="2em"
            h="2rem"
            variant="ghost"
            aria-label="Increase skill level"
            isDisabled={song.skill.value === 4}
            onClick={handleButtonClick('increase')}
          >
            Right
          </IconButton>
        </Flex>
      </Box>
      <EditModal isOpen={isEditing} closeModal={toggleEditing} initialData={song} />
      <Box textAlign="left" p="0 1em 1em">
        <Button h="2em" size="sm" onClick={toggleEditing}>
          Edit
        </Button>
      </Box>
    </Box>
  );
};

export default SongCard;
