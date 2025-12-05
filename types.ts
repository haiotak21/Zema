
export enum UserRole {
  LISTENER = 'LISTENER',
  ARTIST = 'ARTIST',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isVerified?: boolean;
  // Artist specific fields
  stageName?: string;
  bio?: string;
  primaryGenre?: string;
  bannerUrl?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    website?: string;
  };
  // Listener specific fields
  favoriteGenres?: string[];
  followingArtists?: string[];
  followingPlaylists?: string[];
  followingUsers?: string[];
  followers?: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'album_release' | 'playlist_update' | 'system' | 'artist_update';
  date: string;
  isRead: boolean;
  image?: string;
  link?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number; // in seconds
  genre: string;
  url: string; // audio source
  lyrics?: LyricLine[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DRAFT' | 'SCHEDULED';
  // New Analytics & Metadata fields
  releaseDate?: string;
  isrc?: string;
  isExplicit?: boolean;
  streams?: number;
  earnings?: number;
}

export interface LyricLine {
  time: number; // seconds
  text: string;
}

export interface Playlist {
  id: string;
  title: string;
  coverUrl: string;
  songCount: number;
  description?: string;
  owner?: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  followers: string;
  bio?: string;
  verified?: boolean;
  bannerUrl?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    website?: string;
  };
  pinnedSongId?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  year: string;
}

export interface Podcast {
  id: string;
  title: string;
  host: string;
  coverUrl: string;
  category: string;
  episodes: number;
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number; // current time in seconds
  volume: number;
  isDataSaver: boolean;
  isLyricsOpen: boolean;
}
