import React, {FunctionComponent, useState} from 'react';
import {css} from '@emotion/core';

import SkillLevel from './SkillLevel';
import {Song} from '../models';

interface Props {
  song: Song;
}

const card = css`
  width: 80%;
  height: auto;
  padding: 20px 25px 20px 25px;
  border: 1px solid #e4e4e4;
  border-radius: 35px;
  margin: 25px auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  box-shadow: 1px 4px 15px -11px #626262;
  transition: height 0.1s ease-in-out;

  h2 {
    margin: 0px 0px 5px 0px;
    text-align: left;
    font-family: 'Montserrat';
  }

  h3 {
    margin: 0px 0px 10px 0px;
    text-align: left;
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 18px;
  }

  .bottom {
    width: 100%;
    height: 100px;
    transform: translateY(100px);
    border: 1px solid red;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const SongCard: FunctionComponent<Props> = ({song}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div css={[card]} className={isOpen ? 'card-open' : ''} onClick={handleClick}>
      <div className='card-heading'>
        <h2>{song.songName}</h2>
        <h3>{song.artist}</h3>
      </div>
      <SkillLevel rating={song.skill.value} />
      {isOpen && <div className='bottom'>I am the bottom</div>}
    </div>
  );
};

export default SongCard;
