import React, {FunctionComponent, useContext, useState} from 'react';
import fetch from 'isomorphic-fetch';

import {AuthContext} from './_app';
import Layout from '../components/Layout';

const LandingPage: FunctionComponent<{}> = () => {
  const [error, setError] = useState(null);
  const {user, setUser, token, setToken} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    const response = await fetch('http://localhost:3030/api/user/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return setError('Error logging in');
    }

    const {data} = await response.json();

    if (error) {
      setError(null);
    }

    setToken(data.accessToken);
    setUser(data.user);
    console.log(data);
  };

  return (
    <Layout>
      <div>
        <h1>Welcome to my dope app</h1>
        {error && <h2>There was an error</h2>}
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username</label>
            <input type='text' name='username' />
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' />
            <button type='submit'>Login</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch('http://localhost:3030/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  console.log(data);
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default LandingPage;
