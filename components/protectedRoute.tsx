import React, {useContext, useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {AuthContext} from '../pages/_app';

const protectedRoute = (Component) => {
  return function WithAuth() {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const {user, token} = useContext(AuthContext);

    useEffect(() => {
      if (!user || !token) {
        router.push('/');
        return;
      }
      setLoading(false);
    }, []);

    return loading ? null : <Component />;
  };
};

export default protectedRoute;
