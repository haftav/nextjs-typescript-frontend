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

export interface SkillLevel {
  value: number;
  defaultTitle: string;
}

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
