import React, {FunctionComponent, useEffect, useState, useContext} from 'react';
import {useQuery} from 'react-query';

import {AuthContext} from './_app';
import withAuth from '../components/withAuth';
import Layout from '../components/Layout';
import SongCard from '../components/SongCard';
import {Song} from '../models';

const Profile: FunctionComponent<{}> = () => {
  const {user, token} = useContext(AuthContext);

  const {status, data: songs} = useQuery<Song[]>(
    'songs',
    () => {
      return fetch('http://localhost:3030/api/songs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((res) => res.data.songs);
    },
    {retry: false}
  );

  console.log(status);

  if (status === 'error') {
    return <Layout>An error occurred loading your songs.</Layout>;
  }

  if (status === 'loading') {
    return <Layout>Loading songs...</Layout>;
  }

  return (
    <Layout>
      <h1>{user.username}</h1>
      <div>
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </Layout>
  );
};

export default withAuth(Profile);
