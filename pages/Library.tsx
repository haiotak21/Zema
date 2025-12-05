
import React from 'react';
import { Song } from '../types';
import { SongCard } from '../components/SongCard';
import { Clock, Heart, Music2, ListMusic } from 'lucide-react';

interface LibraryProps {
  recentlyPlayed: Song[];
  downloadedSongs: Song[];
  activeDownloads?: Record<string, number>;
  onPlay: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  onToggleDownload: (song: Song) => void;
  onSongClick: (song: Song) => void;
  onLikedSongsClick: () => void;
  onPlaylistsClick: () => void;
  onMoreOptions?: (song: Song, e: React.MouseEvent) => void;
}

export const Library: React.FC<LibraryProps> = ({ 
  recentlyPlayed, 
  downloadedSongs, 
  activeDownloads = {},
  onPlay, 
  currentSong, 
  isPlaying, 
  onToggleDownload,
  onSongClick,
  onLikedSongsClick,
  onPlaylistsClick,
  onMoreOptions
}) => {

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <header className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6 transition-colors">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Your Library</h1>
      </header>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={onLikedSongsClick}
            className="bg-gradient-to-br from-rose-100 to-white dark:from-rose-900/40 dark:to-zinc-900 border border-zinc-200 dark:border-white/5 p-6 rounded-xl group cursor-pointer hover:border-rose-200 dark:hover:border-white/10 transition shadow-sm dark:shadow-none"
          >
              <div className="h-12 w-12 bg-rose-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <Heart fill="currentColor" className="text-white" />
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Liked Songs</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">12 songs</p>
          </div>
          
          <div 
            onClick={onPlaylistsClick}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl group cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition shadow-sm dark:shadow-none"
          >
              <div className="h-12 w-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                  <ListMusic />
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Your Playlists</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">3 playlists</p>
          </div>
      </div>

      {/* Recently Played Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
            <Clock className="text-rose-500" size={24} />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Recently Played</h2>
        </div>
        
        {recentlyPlayed.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {recentlyPlayed.map(song => (
              <SongCard 
                key={song.id} 
                song={song} 
                onPlay={onPlay}
                isPlaying={isPlaying}
                isCurrent={currentSong?.id === song.id}
                isDownloaded={downloadedSongs.some(ds => ds.id === song.id)}
                downloadProgress={activeDownloads[song.id]}
                onToggleDownload={onToggleDownload}
                onClick={onSongClick}
                onMoreOptions={onMoreOptions}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/30 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl">
             <Music2 className="mx-auto text-zinc-400 dark:text-zinc-600 mb-4" size={48} />
             <p className="text-zinc-600 dark:text-zinc-400 text-lg">You haven't played any songs yet.</p>
             <p className="text-zinc-500 text-sm mt-2">Start listening to build your history.</p>
          </div>
        )}
      </section>
    </div>
  );
};
