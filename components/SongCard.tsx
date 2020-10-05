import React, {FunctionComponent, useState} from 'react';
import {
  Collapse,
  Button,
  Box,
  Badge,
  Heading,
  Flex,
  PseudoBox,
  Text,
  useToast,
} from '@chakra-ui/core';
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
  isOpen: boolean;
  setOpenCard: (isCurrentlyOpen: boolean) => void;
}

const SongCard: FunctionComponent<Props> = ({song, isOpen, setOpenCard}) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
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
    onSettled: () => {
      queryCache.invalidateQueries('songs');
    },
  });

  const handleClick = (): void => {
    // setIsOpen((prevState) => !prevState);
    setOpenCard(isOpen);
  };

  // close over skillLevel argument for use in event handler
  const handleButtonClick = (skillLevel: number) => () => {
    const songData = {
      id: song.id,
      skillLevel,
    };

    mutate(songData);
  };

  const handleButtonColor = (level) => {
    if (song.skill.value === level) {
      return 'green';
    }

    return 'gray';
  };

  const toggleEditing = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsEditing((prevState) => !prevState);
  };

  return (
    <PseudoBox
      role="group"
      maxW="3xl"
      my={5}
      mx="auto"
      position="relative"
      borderWidth="1px"
      rounded="lg"
      onClick={handleClick}
      _hover={{cursor: 'pointer'}}
    >
      <Button
        w="10px"
        h="35px"
        variant="ghost"
        size="sm"
        fontSize="2xl"
        pos="absolute"
        right="-40px"
        top="50%"
        pl="0px"
        pr="0px"
        minW="25px"
        transform="translateY(-50%)"
        zIndex={15}
        onClick={toggleEditing}
      >
        &#8942;
      </Button>
      <Box mb={5} p="15px 15px 0px 15px">
        <Heading as="h2" fontSize={['md', 'lg']} textAlign="left" maxW="80%">
          {song.songName}
        </Heading>
        <Text fontSize="md" textAlign="left" maxW="80%">
          {song.artist}
        </Text>
        <Box position="absolute" top="15px" right="15px" w="auto" h="auto">
          <Box opacity={1} pos="absolute" right="0">
            <Badge fontSize={['10px', '12px']}>{song.skill.defaultTitle}</Badge>
          </Box>
        </Box>
        <SkillLevel mt="15px" rating={song.skill.value as Rating} />
      </Box>
      <Collapse
        as={Flex}
        isOpen={isOpen}
        pt="15px"
        pb="15px"
        justifyContent="space-around"
        flexDir={['row']}
        flexWrap="wrap"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          size="sm"
          w={150}
          m={['10px auto', '0px']}
          variantColor={handleButtonColor(1)}
          onClick={handleButtonClick(1)}
        >
          Beginner
        </Button>
        <Button
          size="sm"
          w={150}
          m={['10px auto', '0px']}
          variantColor={handleButtonColor(2)}
          onClick={handleButtonClick(2)}
        >
          Intermediate
        </Button>
        <Button
          size="sm"
          w={150}
          m={['10px auto', '0px']}
          variantColor={handleButtonColor(3)}
          onClick={handleButtonClick(3)}
        >
          Advanced
        </Button>
        <Button
          size="sm"
          w={150}
          m={['10px auto', '0px']}
          variantColor={handleButtonColor(4)}
          onClick={handleButtonClick(4)}
        >
          Expert
        </Button>
      </Collapse>
      <EditModal isOpen={isEditing} closeModal={toggleEditing} initialData={song} />
    </PseudoBox>
  );
};

export default SongCard;
