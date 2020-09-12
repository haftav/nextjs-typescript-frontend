import React, {useContext, useMemo} from 'react';

import {Session as SessionModel} from 'models';

interface SessionComponentInterface {
  LoggedIn: React.FunctionComponent<{}>;
  LoggedOut: React.FunctionComponent<{}>;
}

interface Props {
  session: SessionModel;
  loading: boolean;
}

const SessionContext = React.createContext<Props | null>(null);

const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('Session compound components cannot be rendered outside the Session component');
  }
  return context;
};

const Session: React.FunctionComponent<Props> & SessionComponentInterface = (props) => {
  const {session, loading} = props;
  const value = useMemo(() => ({session, loading}), [session, loading]);

  return <SessionContext.Provider value={value}>{props.children}</SessionContext.Provider>;
};

const LoggedIn = ({children}) => {
  const {session, loading} = useSessionContext();

  return !loading && session ? children : null;
};

const LoggedOut = ({children}) => {
  const {session, loading} = useSessionContext();

  return !loading && !session ? children : null;
};

Session.LoggedIn = LoggedIn;
Session.LoggedOut = LoggedOut;

export default Session;
