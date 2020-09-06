import React, {useRef, useState} from 'react';
import {
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
} from '@chakra-ui/core';
import {useMutation, queryCache} from 'react-query';
import {makeProtectedRequest} from 'utils/http';

const createSong = ({songData}) => {
  return makeProtectedRequest('POST', '/songs', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(songData),
  }).then((data) => data);
};

interface ContentContainerProps {
  initialRef: React.Ref<HTMLInputElement>;
  closeModal: () => void;
}

const ContentContainer: React.FunctionComponent<ContentContainerProps> = ({
  initialRef,
  closeModal,
}) => {
  const [skillLevel, setSkillLevel] = useState<number>(1);
  const toast = useToast();
  const [mutate, {status}] = useMutation(createSong, {
    onSuccess: () => {
      queryCache.invalidateQueries('songs');
      toast({
        title: 'Song created!',
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
      closeModal();
    },
    onError: () => {
      toast({
        title: 'An error occurred.',
        description: 'Unable to create new song.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO -> sanitize inputs
    const songData = {
      songName: e.currentTarget.songName.value,
      artist: e.currentTarget.artistName.value,
      skillLevel,
    };

    await mutate({songData});
  };

  const skillLevelSetter = (level) => () => setSkillLevel(level);

  const handleButtonColor = (level) => {
    if (skillLevel === level) {
      return 'green';
    }

    return 'gray';
  };

  return (
    <ModalContent rounded="md">
      <ModalHeader>Create new song</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb="6">
        <form onSubmit={handleSubmit}>
          <FormControl m="auto" textAlign="left">
            <FormLabel htmlFor="songName">Song Name</FormLabel>
            <Input ref={initialRef} type="text" id="songName" size="sm" />
          </FormControl>
          <FormControl m="25px auto" textAlign="left">
            <FormLabel htmlFor="artistName">Artist Name</FormLabel>
            <Input type="text" id="artistName" size="sm" />
          </FormControl>
          <Box m="25px auto">
            <Text pb="4px" fontWeight="medium">
              Skill Level
            </Text>
            <Flex justifyContent="space-between">
              <Button
                variantColor={handleButtonColor(1)}
                w="110px"
                size="sm"
                onClick={skillLevelSetter(1)}
              >
                Beginner
              </Button>
              <Button
                variantColor={handleButtonColor(2)}
                w="110px"
                size="sm"
                onClick={skillLevelSetter(2)}
              >
                Intermediate
              </Button>
              <Button
                variantColor={handleButtonColor(3)}
                w="110px"
                size="sm"
                onClick={skillLevelSetter(3)}
              >
                Advanced
              </Button>
              <Button
                variantColor={handleButtonColor(4)}
                w="110px"
                size="sm"
                onClick={skillLevelSetter(4)}
              >
                Expert
              </Button>
            </Flex>
          </Box>
          <Flex justify="flex-end">
            <Button
              isLoading={status === 'loading'}
              variantColor="blue"
              size="md"
              textAlign="center"
              mr="10px"
              type="submit"
            >
              Create
            </Button>
            <Button color="gray" size="md" textAlign="center" variant="ghost">
              Cancel
            </Button>
          </Flex>
        </form>
      </ModalBody>
    </ModalContent>
  );
};

interface CreateModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CreateModal: React.FunctionComponent<CreateModalProps> = ({isOpen, closeModal}) => {
  const initialRef = useRef();

  // TODO -> use loading prop to pass to button
  return (
    <Modal size="lg" isOpen={isOpen} onClose={closeModal} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ContentContainer closeModal={closeModal} initialRef={initialRef} />
    </Modal>
  );
};

export default CreateModal;
