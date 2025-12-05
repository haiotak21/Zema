
import React from 'react';
import { Song, Playlist } from '../types';
import { ArrowLeft, Play, Music } from 'lucide-react';
import { SongCard } from '../components/SongCard';

interface ViewAllProps {
  title: string;
  type: 'song' | 'playlist';
  items: (Song | Playlist)[];
  onBack: () => void;
  onPlay: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  downloadedSongs: Set<string>;
  activeDownloads?: Record<string, number>;
  onToggleDownload: (song: Song) => void;
  onSongClick: (song: Song) => void;
  onPlaylistClick: (playlist: Playlist) => void;
  onMoreOptions?: (item: any, e: React.MouseEvent) => void;
}

export const ViewAll: React.FC<ViewAllProps> = ({
  title,
  type,
  items,
  onBack,
  onPlay,
  currentSong,
  isPlaying,
  downloadedSongs,
  activeDownloads,
  onToggleDownload,
  onSongClick,
  onPlaylistClick,
  onMoreOptions
}) => {
  
  return (
    <div className="min-h-screen bg-white dark:bg-black pb-40 animate-in fade-in slide-in-from-right-8 z-50 absolute inset-0 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 transition-colors">
            <div className="flex items-center gap-4 p-4 md:p-6 max-w-7xl mx-auto">
                <button onClick={onBack} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-900 dark:text-white">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{title}</h1>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
            {type === 'song' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {(items as Song[]).map(song => (
                        <SongCard 
                            key={song.id} 
                            song={song} 
                            onPlay={onPlay}
                            isPlaying={isPlaying}
                            isCurrent={currentSong?.id === song.id}
                            isDownloaded={downloadedSongs.has(song.id)}
                            downloadProgress={activeDownloads ? activeDownloads[song.id] : 0}
                            onToggleDownload={onToggleDownload}
                            onClick={onSongClick}
                            onMoreOptions={(s, e) => onMoreOptions && onMoreOptions(s, e)}
                        />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {(items as Playlist[]).map((playlist, idx) => (
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
                                
                                {/* Hover Play Button for Playlist */}
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-rose-600 rounded-full p-3 text-white shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <Play size={20} fill="currentColor" className="ml-1" />
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-bold text-zinc-900 dark:text-white truncate text-lg">{playlist.title}</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">{playlist.description || `${playlist.songCount} Songs`}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};
