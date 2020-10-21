import React, {useRef} from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/core';

import {makeProtectedRequest} from 'utils/http';
import {queryCache, useMutation} from 'react-query';

interface DeleteSongAlertProps {
  isOpen: boolean;
  onClose: () => void;
  closeModal: () => void;
  songId: number;
}

const deleteSong = ({id}) => {
  return makeProtectedRequest('DELETE', `/songs/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.song);
};

const DeleteSongAlert = ({isOpen, onClose, closeModal, songId}: DeleteSongAlertProps) => {
  const cancelRef = useRef();
  const toast = useToast();

  const [mutate, {status}] = useMutation(deleteSong, {
    onSuccess: () => {
      queryCache.invalidateQueries('songs');
      toast({
        title: 'Song deleted.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'An error occurred.',
        description: 'Unable to delete song.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
    onSettled: () => {
      onClose();
      closeModal();
    }
  });

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    mutate({id: songId});
  };

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Delete Customer
        </AlertDialogHeader>

        <AlertDialogBody>
          Are you sure you want to delete this song? This action cannot be undone.
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button
            isLoading={status === 'loading'}
            variantColor="red"
            onClick={handleDeleteClick}
            ml={3}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSongAlert;
