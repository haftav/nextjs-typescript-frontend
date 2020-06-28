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
