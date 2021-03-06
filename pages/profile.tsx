import React, {FunctionComponent, useState} from 'react';
import {Heading} from '@chakra-ui/core';
import {useQuery} from 'react-query';

import SongCard from 'components/SongCard';
import withAuthLayout from 'components/AuthenticatedLayout';

import {Song} from 'models';
import {makeProtectedRequest} from 'utils/http';

interface QueryPromise {
  cancel?: () => void;
}

const Profile: FunctionComponent<{}> = () => {
  const {status, data: songs} = useQuery<Song[]>(
    'songs',
    () => {
      const controller = new AbortController();
      const signal = controller.signal;
      const promise: Promise<Song[]> & QueryPromise = makeProtectedRequest('GET', '/songs', {
        headers: {
          'Content-Type': 'application/json',
        },
        signal,
      }).then((data) => data.songs);

      promise.cancel = () => {
        return controller.abort();
      };
      return promise;
    },
    {retry: false}
  );

  const renderLoading = () => <div>Loading songs...</div>;

  const renderSongs = () => {
    return (
      <>
        <Heading>Songs</Heading>
        <div>{songs ? songs.map((song) => <SongCard key={song.id} song={song} />) : null}</div>
      </>
    );
  };

  const renderContent = () => {
    if (status === 'loading') {
      return renderLoading();
    } else {
      return renderSongs();
    }
  };

  return renderContent();
};

export default withAuthLayout(Profile);
