import React, {useState} from 'react';

import Session from 'components/Session';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
import {Session as SessionModel} from 'models';
import CreateModal from './CreateModal';

interface HeaderProps {
  session: SessionModel;
  loading: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = ({session, loading}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    return setModalOpen((prevState) => !prevState);
  };

  return (
    <Session session={session} loading={loading}>
      <CreateModal isOpen={modalOpen} closeModal={toggleModal} />
      <DesktopHeader toggleModal={toggleModal} />
      <MobileHeader toggleModal={toggleModal} />
    </Session>
  );
};

export default Header;
