import React, {FunctionComponent} from 'react';
import {useSession} from 'next-auth/client';
import {useQuery} from 'react-query';

import SongCard from '../components/SongCard';
import {Song} from '../models';
import withAuthLayout from 'components/AuthenticatedLayout';

const Profile: FunctionComponent<{}> = () => {
  const [session] = useSession();
  const {status, data: songs} = useQuery<Song[]>(
    'songs',
    () => {
      return fetch('/api/songs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((data) => data.songs);
    },
    {retry: false}
  );

  const renderSongs = () => {
    const {user} = session;

    return (
      <>
        <h1>{user.name}</h1>
        <div>{songs ? songs.map((song) => <SongCard key={song.id} song={song} />) : null}</div>
      </>
    );
  };

  const renderLoading = () => <div>Loading songs...</div>;

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
