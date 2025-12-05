
import React from 'react';
import { Song } from '../types';
import { Play, Pause, Radio as RadioIcon, MoreHorizontal, ArrowLeft, SkipForward } from 'lucide-react';
import { SongCard } from '../components/SongCard';

interface RadioProps {
  seedType: 'artist' | 'song';
  seedName: string;
  seedCover: string;
  songs: Song[]; // In real app, this would be fetched based on seed
  onBack: () => void;
  onPlay: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  downloadedSongs: Set<string>;
  activeDownloads?: Record<string, number>;
  onToggleDownload: (song: Song) => void;
  onSongClick: (song: Song) => void;
  onMoreOptions?: (song: Song, e: React.MouseEvent) => void;
}

export const Radio: React.FC<RadioProps> = ({
  seedType,
  seedName,
  seedCover,
  songs,
  onBack,
  onPlay,
  currentSong,
  isPlaying,
  downloadedSongs,
  activeDownloads,
  onToggleDownload,
  onSongClick,
  onMoreOptions
}) => {
  // Simulate an "Infinite" list by repeating the songs array
  const radioQueue = [...songs, ...songs, ...songs].sort(() => Math.random() - 0.5);

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-40 animate-in fade-in slide-in-from-right-8 z-50 absolute inset-0 overflow-y-auto">
        {/* Header Gradient */}
        <div className="relative h-[40vh] min-h-[300px] w-full bg-gradient-to-b from-indigo-900 to-black/90">
            <div 
                className="absolute inset-0 bg-cover bg-center blur-3xl opacity-30"
                style={{ backgroundImage: `url(${seedCover})` }}
            />
            
            {/* Navbar */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-20">
                <button onClick={onBack} className="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                    <RadioIcon size={14} className="text-white animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Station</span>
                </div>
                <button className="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10">
                    <MoreHorizontal size={24} />
                </button>
            </div>

            {/* Info */}
            <div className="absolute bottom-8 left-0 right-0 px-4 md:px-8 z-10 flex flex-col items-center text-center">
                <div className="h-40 w-40 rounded-full shadow-2xl shadow-indigo-500/30 overflow-hidden mb-6 border-4 border-white/10">
                        <img src={seedCover} alt={seedName} className="w-full h-full object-cover" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-md tracking-tight mb-2">{seedName} Radio</h1>
                <p className="text-zinc-300 font-medium max-w-lg">
                    Non-stop music based on {seedName}. We've mixed in similar artists and tracks you might love.
                </p>
            </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
            <div className="flex justify-center mb-10">
                <button 
                    onClick={() => onPlay(radioQueue[0])}
                    className="h-14 bg-white text-black hover:bg-zinc-200 rounded-full px-10 font-bold flex items-center gap-3 shadow-xl hover:scale-105 transition-all"
                >
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                    <span className="uppercase tracking-widest text-sm">Start Listening</span>
                </button>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Up Next</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {radioQueue.map((song, i) => (
                        <div key={`${song.id}-${i}`} className="flex items-center gap-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors group">
                            <div 
                                className="relative h-16 w-16 flex-shrink-0 cursor-pointer"
                                onClick={() => onPlay(song)}
                            >
                                <img src={song.coverUrl} className="w-full h-full object-cover rounded-lg" alt={song.title} />
                                <div className={`absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg ${currentSong?.id === song.id ? 'opacity-100' : ''}`}>
                                    <Play size={20} className="text-white fill-white" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0" onClick={() => onSongClick(song)}>
                                <h4 className={`font-bold truncate cursor-pointer ${currentSong?.id === song.id ? 'text-rose-500' : 'text-zinc-900 dark:text-white'}`}>{song.title}</h4>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{song.artist}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-zinc-400 hover:text-rose-500" onClick={() => onToggleDownload(song)}>
                                    {downloadedSongs.has(song.id) ? (
                                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                    ) : (
                                        <SkipForward size={20} />
                                    )}
                                </button>
                                {onMoreOptions && (
                                    <button 
                                        className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                                        onClick={(e) => onMoreOptions(song, e)}
                                    >
                                        <MoreHorizontal size={20} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="py-8 text-center">
                    <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-xs text-zinc-500 mt-2 uppercase tracking-widest">Loading more tracks...</p>
                </div>
            </div>
        </div>
    </div>
  );
};
