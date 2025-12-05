import React from 'react';
import { Playlist } from '../types';
import { Plus, Music } from 'lucide-react';

interface MyPlaylistsProps {
  playlists: Playlist[];
  onPlaylistClick: (playlist: Playlist) => void;
  onCreateClick: () => void;
}

export const MyPlaylists: React.FC<MyPlaylistsProps> = ({ playlists, onPlaylistClick, onCreateClick }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <header className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6 transition-colors">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Your Playlists</h1>
          <p className="text-zinc-500 mt-1">Collections you've created and saved.</p>
        </div>
        <button 
            onClick={onCreateClick}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-rose-600/20"
        >
            <Plus size={20} />
            <span className="hidden sm:inline">Create Playlist</span>
        </button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* Create New Card */}
          <div 
            onClick={onCreateClick}
            className="aspect-square bg-zinc-100 dark:bg-zinc-900 border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-500 hover:border-rose-500 hover:text-rose-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 cursor-pointer transition-all group"
          >
               <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                   <Plus size={24} />
               </div>
               <span className="font-medium">Create New</span>
          </div>

          {playlists.map(playlist => (
            <div 
                key={playlist.id} 
                onClick={() => onPlaylistClick(playlist)}
                className="group cursor-pointer p-4 bg-white dark:bg-zinc-900/40 rounded-xl border border-zinc-200 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all hover:shadow-lg"
            >
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg shadow-sm bg-zinc-200 dark:bg-zinc-800">
                    {playlist.coverUrl ? (
                        <img src={playlist.coverUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={playlist.title} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Music size={40} className="text-zinc-400" />
                        </div>
                    )}
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-white truncate text-lg">{playlist.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{playlist.songCount} Songs</p>
            </div>
          ))}
      </div>
    </div>
  );
};