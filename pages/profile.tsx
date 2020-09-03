import React, {FunctionComponent} from 'react';
import {GetServerSideProps} from 'next';
import {getSession} from 'next-auth/client';
import {useQuery} from 'react-query';

import Layout from '../components/Layout';
import SongCard from '../components/SongCard';
import {Song} from '../models';

type Session = {user: {name: string}} | null;

interface Props {
  session: Session;
}

const Profile: FunctionComponent<Props> = ({session}) => {
  const {user} = session;
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

  console.log(status);

  const renderStatus = () => {
    if (status === 'loading') {
      return <div>Loading songs...</div>;
    }
  };

  return (
    <Layout session={session}>
      <h1>{user.name}</h1>
      {renderStatus()}
      <div>{songs ? songs.map((song) => <SongCard key={song.id} song={song} />) : null}</div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  console.log('PROFILE SESSION:', session);

  if (!session) {
    console.log('NO SESSION. REDIRECTING');
    ctx.res.writeHead(302, {
      Location: '/',
    });
    ctx.res.end();
  }

  return {props: {session}};
};

export default Profile;
