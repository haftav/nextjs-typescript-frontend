import React, {FunctionComponent} from 'react';
import {useSession} from 'next-auth/client';

import Layout from '../components/Layout';

const LandingPage: FunctionComponent<{}> = () => {
  const [session] = useSession();

  return (
    <Layout>
      <div>{session ? <h2>You are logged in as {session.user.name}</h2> : null}</div>
    </Layout>
  );
};

export default LandingPage;
