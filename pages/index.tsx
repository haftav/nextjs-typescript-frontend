import React, {FunctionComponent} from 'react';
import {GetServerSideProps} from 'next';
import {signIn, getSession} from 'next-auth/client';

import Layout from '../components/Layout';

type Session = {user: {name: string}} | null;

interface Props {
  session: Session;
}

const LandingPage: FunctionComponent<Props> = ({session}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    signIn('credentials', body);
  };

  console.log('SESSION:', session);

  return (
    <Layout session={session}>
      <div>
        <h1>Welcome to my dope app</h1>
        {session ? <h2>You are logged in as {session.user.name}</h2> : null}
        {!session ? (
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
        ) : null}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  console.log('session', session);

  return {props: {session}};
};

export default LandingPage;
