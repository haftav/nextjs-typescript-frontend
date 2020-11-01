import React from 'react';
import {GetServerSideProps} from 'next';
import {getSession} from 'next-auth/client';

import Layout from 'components/Layout';
import Landing from 'components/Landing';
import {Session} from 'models';

interface LandingPageProps {
  session: Session;
}

const LandingPage = ({session}: LandingPageProps) => {
  return (
    <Layout>{session ? <h2>You are logged in as {session.user.name}</h2> : <Landing />}</Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};

export default LandingPage;
