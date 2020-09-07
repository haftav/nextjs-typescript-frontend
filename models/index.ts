export interface User {
  id: number;
  username: string;
}

export interface Song {
  id: number;
  songName: string;
  artist: string;
  userId?: number;
  skill: SkillLevel;
}

type SkillLevelTitle = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface SkillLevel {
  value: number;
  defaultTitle: SkillLevelTitle;
}

export const SkillLevelTitles = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
  4: 'Expert',
};

interface SessionUser {
  email: null;
  image: null;
  name: string;
}

export interface LoadedSession {
  expires: string;
  user: SessionUser;
}

export type Session = LoadedSession | undefined | null;
