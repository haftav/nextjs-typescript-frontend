import React from 'react';
import withAuth from './withAuth';
import Layout from './Layout';

// Ensure Layout is always rendered even when inner component is not authenticated
const withAuthLayout = (Component) => {
  const AuthenticatedComponent = withAuth(Component);
  return function WithAuthLayout() {
    return (
      <Layout>
        <AuthenticatedComponent />
      </Layout>
    );
  };
};

export default withAuthLayout;
