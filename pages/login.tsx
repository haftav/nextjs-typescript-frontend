import React, {FunctionComponent} from 'react';
import {signIn, getSession} from 'next-auth/client';

import Layout from 'components/Layout';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    signIn('credentials', {...body, callbackUrl: 'http://localhost:3000/profile'});
  };

  return (
    <Layout>
      <div>
        <h1>Welcome to my dope app</h1>
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
