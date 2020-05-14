import React from 'react';

const Protected = (Component) => {
  class Wrapper extends React.Component {
    componentDidMount() {}
    render() {
      return <Component />;
    }
  }

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }
};

export default Protected;
