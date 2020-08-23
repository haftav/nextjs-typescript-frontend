import React, {useContext, useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {AuthContext} from '../pages/_app';

interface WithAuthParams {
  shouldRedirect?: boolean;
  redirectPath?: string;
}

// need to update this for server rendering
const withAuth = (
  Component,
  params: WithAuthParams = {shouldRedirect: true, redirectPath: '/'}
) => {
  return function WithAuth() {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const {user, setUser, token, setToken} = useContext(AuthContext);

    useEffect(() => {
      const authenticate = async () => {
        const response = await fetch('http://localhost:3030/api/auth/token', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (params.shouldRedirect) {
            router.push(params.redirectPath);
            return;
          }
          setLoading(false);
          return;
        }

        const {data} = await response.json();

        setToken(data.accessToken);
        setUser(data.user);

        setLoading(false);
      };

      if (!user || !token) {
        // check here to get a new access token if refresh_token exists
        authenticate();
      } else {
        setLoading(false);
      }
    }, []);

    return loading ? null : <Component />;
  };

  // should add getInitialProps implementation to check auth on server first
  // if on server, get data from token endpoint and pass in as prop
  // if on client, pass in data from context if it exists
};

export default withAuth;
