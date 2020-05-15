import React, {FunctionComponent, useEffect, useState, useContext} from 'react';
import fetch from 'isomorphic-fetch';

import {AuthContext} from './_app';

const Profile: FunctionComponent<{}> = () => {
  const {user, token} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3030/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return;
      }
      console.log('SUCCESS!');
      const data = await response.json();
      console.log(data);

      if (!data) {
        console.log('Not allowed');
      }

      return data;
    };

    fetchData();
  }, []);
  return <div>{user.username}</div>;
};

export default Profile;
