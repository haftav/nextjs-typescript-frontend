import React, {FunctionComponent, useEffect, useState, useContext} from 'react';
import fetch from 'isomorphic-fetch';
import {css} from '@emotion/core';

import {AuthContext} from './_app';
import withAuth from '../components/withAuth';
import Layout from '../components/Layout';
import SkillLevel from '../components/SkillLevel';

const card = css`
  width: 80%;
  margin: 25px auto;
  background: white;
  border: 1px solid #e4e4e4;
  border-radius: 10px;
  padding: 10px 25px 10px 25px;
  box-shadow: 1px 4px 15px -11px #626262;

  h2 {
    margin: 0px 0px 5px 0px;
    text-align: left;
  }
`;

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
              <div key={song.id} css={card}>
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
