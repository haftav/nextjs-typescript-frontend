import React, {FunctionComponent} from 'react';
import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/client';
import {useQuery} from 'react-query';

import Layout from '../components/Layout';
import SongCard from '../components/SongCard';
import {Song} from '../models';

type Session = {user: {name: string}} | null;

interface Props {
  session: Session;
}

const Profile: FunctionComponent<Props> = () => {
  const [session, loadingSession] = useSession();
  console.log(session, loadingSession);
  const router = useRouter();
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

  if (!loadingSession && !session) {
    console.log('here');
    router.push('/');
    return null;
  }

  if (loadingSession) {
    return null;
  }

  const renderSongs = () => {
    const {user} = session;
    console.log(songs);

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

  return <Layout>{renderContent()}</Layout>;
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const session = await getSession(ctx);
//   console.log('PROFILE SESSION:', session);

//   if (!session) {
//     console.log('NO SESSION. REDIRECTING');
//     ctx.res.writeHead(302, {
//       Location: '/',
//     });
//     ctx.res.end();
//   }

//   return {props: {session}};
// };

export default Profile;
