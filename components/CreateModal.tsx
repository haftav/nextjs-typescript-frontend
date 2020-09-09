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
  FormErrorMessage,
  Input,
  Button,
  Text,
  useToast,
} from '@chakra-ui/core';
import {useMutation, queryCache} from 'react-query';
import {useFormik} from 'formik';
import {string, object} from 'yup';
import {makeProtectedRequest} from 'utils/http';

const FormSchema = object({
  songName: string().max(200).required(),
  artist: string().max(100).required(),
});

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

  const formik = useFormik({
    initialValues: {
      songName: '',
      artist: '',
    },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      const songData = {
        songName: values.songName,
        artist: values.artist,
        skillLevel,
      };

      await mutate({songData});
    },
  });

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
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            m="auto"
            textAlign="left"
            isInvalid={formik.errors.songName && formik.touched.songName}
          >
            <FormLabel htmlFor="songName">Song Name</FormLabel>
            <Input
              ref={initialRef}
              type="text"
              id="songName"
              name="songName"
              size="sm"
              value={formik.values.songName}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.songName}</FormErrorMessage>
          </FormControl>
          <FormControl
            m="25px auto"
            textAlign="left"
            isInvalid={formik.errors.artist && formik.touched.artist}
          >
            <FormLabel htmlFor="artist">Artist Name</FormLabel>
            <Input
              type="text"
              id="artist"
              name="artist"
              size="sm"
              value={formik.values.artist}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.artist}</FormErrorMessage>
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
            <Button color="gray" size="md" textAlign="center" variant="ghost" onClick={closeModal}>
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
