import React, {FunctionComponent} from 'react';
import {css} from '@emotion/core';

import SkillLevel from './SkillLevel';
import {Song} from '../models';

interface Props {
  song: Song;
}

const card = css`
  width: 80%;
  height: 100px;
  padding: 20px 25px 20px 25px;
  border: 1px solid #e4e4e4;
  border-radius: 35px;
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  box-shadow: 1px 4px 15px -11px #626262;

  .card-heading {
  }

  h2 {
    margin: 0px 0px 5px 0px;
    text-align: left;
    font-family: 'Montserrat';
  }

  h3 {
    margin: 0px 0px 5px 0px;
    text-align: left;
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 18px;
  }
`;

const SongCard: FunctionComponent<Props> = ({song}) => {
  return (
    <div css={card}>
      <div className='card-heading'>
        <h2>{song.songName}</h2>
        <h3>{song.artist}</h3>
      </div>
      <SkillLevel rating={song.skill.value} />
    </div>
  );
};

export default SongCard;
