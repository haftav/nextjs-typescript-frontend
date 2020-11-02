import React from 'react';
import {GetServerSideProps} from 'next';
import {getSession} from 'next-auth/client';

import Layout from 'components/Layout';
import Landing from 'components/Landing';
import AuthenticatedLanding from 'components/AuthenticatedLanding';
import {Session} from 'models';

interface LandingPageProps {
  session: Session;
}

const LandingPage = ({session}: LandingPageProps) => {
  return (
    <Layout fullScreen>{session ? <AuthenticatedLanding session={session} /> : <Landing />}</Layout>
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
