import React, {FunctionComponent, useEffect, useState, useContext} from 'react';
import fetch from 'isomorphic-fetch';

import {AuthContext} from './_app';
import withAuth from '../components/withAuth';
import Layout from '../components/Layout';
import SkillLevel from '../components/SkillLevel';

const Profile: FunctionComponent<{}> = () => {
  const {user, token} = useContext(AuthContext);
  const [songs, updateSongs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3030/api/songs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return;
      }
      const {status, data} = await response.json();
      if (!status || status !== 'success') {
        return;
      }

      updateSongs(data.songs);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <h1>{user.username}</h1>
      <div>
        {loading
          ? '...loading'
          : songs.map((song) => (
              <div key={song.id}>
                <h2>{song.songName}</h2>
                <SkillLevel rating={song.skill.value} />
              </div>
            ))}
      </div>
    </Layout>
  );
};

export default withAuth(Profile);

// useEffect(() => {
//   const fetchData = async () => {
//     const response = await fetch('http://localhost:3030/api/user', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response.ok) {
//       return;
//     }
//     console.log('SUCCESS!');
//     const data = await response.json();
//     console.log(data);

//     if (!data) {
//       console.log('Not allowed');
//     }

//     return data;
//   };

//   fetchData();
// }, []);
