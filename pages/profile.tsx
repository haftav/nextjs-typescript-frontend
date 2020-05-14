import React, {FunctionComponent, useEffect, useState, useContext} from 'react';
import fetch from 'isomorphic-fetch';

import {AuthContext} from './_app';

const Profile: FunctionComponent<{}> = () => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3030/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    };

    fetchData();
  }, []);
  return <div>{user.username}</div>;
};

export default Profile;
