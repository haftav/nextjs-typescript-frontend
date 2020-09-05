import React, {useContext, useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/client';

const withAuth = (Component) => {
  return function WithAuth() {
    const [session, loading] = useSession();
    const router = useRouter();

    if (!loading && !session) {
      router.push('/');
      return null;
    }
    return session ? <Component /> : null;
  };
};

export default withAuth;
