import React, {FunctionComponent, useContext, useState} from 'react';
import fetch from 'isomorphic-fetch';

import {AuthContext} from './_app';
import Layout from '../components/Layout';
import withAuth from '../components/withAuth';

const LandingPage: FunctionComponent<{}> = () => {
  const [error, setError] = useState(null);
  const {user, setUser, token, setToken} = useContext(AuthContext);

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    const response = await fetch('http://localhost:3030/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setError('Error logging in');
      return;
    }

    const {data} = await response.json();

    if (error) {
      setError(null);
    }

    setToken(data.accessToken);
    setUser(data.user);
  };

  return (
    <Layout>
      <div>
        <h1>Welcome to my dope app</h1>
        {error && <h2>There was an error</h2>}
        {user ? <h2>You are logged in as {user.username}</h2> : null}
        {!user && (
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
        )}
      </div>
    </Layout>
  );
};

export default withAuth(LandingPage, {
  shouldRedirect: false,
});
