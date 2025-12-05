
import React from 'react';
import { Song } from '../types';
import { Play, Pause, Clock, Heart, MoreHorizontal, ArrowLeft, Shuffle } from 'lucide-react';

interface LikedSongsProps {
  songs: Song[];
  onBack: () => void;
  onPlaySong: (song: Song) => void;
  onPlayAll: () => void;
  currentSong: Song | null;
  isPlaying: boolean;
  onMoreOptions?: (song: Song, e: React.MouseEvent) => void;
}

export const LikedSongs: React.FC<LikedSongsProps> = ({
  songs,
  onBack,
  onPlaySong,
  onPlayAll,
  currentSong,
  isPlaying,
  onMoreOptions
}) => {
    
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black pb-32 animate-in fade-in slide-in-from-right-8 z-50 absolute inset-0 overflow-y-auto">
            {/* Header Gradient */}
            <div className="relative h-[40vh] min-h-[300px] w-full bg-gradient-to-b from-purple-700 to-purple-900/50">
                
                {/* Navbar */}
                <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-20">
                    <button onClick={onBack} className="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10">
                        <ArrowLeft size={24} />
                    </button>
                    <button className="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10">
                        <MoreHorizontal size={24} />
                    </button>
                </div>

                {/* Info */}
                <div className="absolute bottom-8 left-0 right-0 px-4 md:px-8 z-10 flex flex-col md:flex-row items-end gap-6 md:gap-8 max-w-7xl mx-auto">
                    <div className="h-48 w-48 md:h-60 md:w-60 shadow-2xl shadow-black/40 rounded-lg bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center flex-shrink-0">
                         <Heart size={80} fill="currentColor" className="text-white" />
                    </div>
                    
                    <div className="flex-1 text-center md:text-left space-y-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-white/90 shadow-sm">Playlist</span>
                        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-md tracking-tight">Liked Songs</h1>
                        <p className="text-white/80 font-medium">Your personal collection of favorites.</p>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-white/90 text-sm font-medium pt-2">
                             <span className="font-bold">You</span>
                             <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                             <span>{songs.length} songs</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
                
                {/* Controls */}
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={onPlayAll}
                        className="h-14 w-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all"
                    >
                        {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                    </button>
                    <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-2">
                        <Shuffle size={24} />
                    </button>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-[16px_1fr_auto_auto] md:grid-cols-[16px_4fr_3fr_1fr_auto] gap-4 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-500 mb-2 sticky top-0 bg-white dark:bg-black z-10">
                    <div>#</div>
                    <div>Title</div>
                    <div className="hidden md:block">Album</div>
                    <div className="text-right"><Clock size={16} className="inline" /></div>
                    <div className="w-8"></div>
                </div>

                {/* Songs List */}
                <div className="space-y-1">
                    {songs.length > 0 ? songs.map((song, index) => (
                        <div 
                            key={song.id} 
                            onClick={() => onPlaySong(song)}
                            className={`grid grid-cols-[16px_1fr_auto_auto] md:grid-cols-[16px_4fr_3fr_1fr_auto] gap-4 px-4 py-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900/60 cursor-pointer group transition-colors items-center ${currentSong?.id === song.id ? 'bg-zinc-100 dark:bg-zinc-900' : ''}`}
                        >
                            <div className="text-sm text-zinc-500 font-medium tabular-nums flex items-center justify-center">
                                <span className={`group-hover:hidden ${currentSong?.id === song.id ? 'text-rose-600 dark:text-rose-500' : ''}`}>
                                    {currentSong?.id === song.id ? <div className="w-3 h-3 bg-rose-600 rounded-full animate-pulse" /> : index + 1}
                                </span>
                                <Play size={12} className="hidden group-hover:block text-zinc-900 dark:text-white" fill="currentColor" />
                            </div>
                            
                            <div className="flex items-center gap-3 min-w-0">
                                <img src={song.coverUrl} alt="" className="h-10 w-10 rounded object-cover shadow-sm bg-zinc-200 dark:bg-zinc-800" />
                                <div className="min-w-0">
                                    <p className={`font-medium truncate ${currentSong?.id === song.id ? 'text-rose-600 dark:text-rose-500' : 'text-zinc-900 dark:text-white'}`}>{song.title}</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate md:hidden">{song.artist}</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate hidden md:block group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{song.artist}</p>
                                </div>
                            </div>

                            <div className="hidden md:flex items-center text-sm text-zinc-500 dark:text-zinc-400 truncate">
                                {song.album}
                            </div>

                            <div className="flex items-center justify-end gap-3 text-sm text-zinc-500 font-mono">
                                <Heart size={16} className="text-rose-500 fill-rose-500" />
                                {formatDuration(song.duration)}
                            </div>

                            <div className="flex justify-end">
                                {onMoreOptions && (
                                    <button 
                                        className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-all rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800" 
                                        onClick={(e) => onMoreOptions(song, e)}
                                    >
                                        <MoreHorizontal size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20 text-zinc-500">
                            <Heart size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="text-lg font-medium">Songs you like will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
