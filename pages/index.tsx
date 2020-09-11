import React, {FunctionComponent} from 'react';
import {signIn, useSession} from 'next-auth/client';

import Layout from '../components/Layout';

const LandingPage: FunctionComponent<{}> = () => {
  const [session] = useSession();

  return (
    <Layout>
      <div>
        <h1>Welcome to my dope app</h1>
        {session ? <h2>You are logged in as {session.user.name}</h2> : null}
      </div>
    </Layout>
  );
};

export default LandingPage;
