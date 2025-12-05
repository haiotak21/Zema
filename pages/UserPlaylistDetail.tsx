
import React from 'react';
import { Song, Playlist } from '../types';
import { Play, Pause, Clock, Heart, MoreHorizontal, ArrowLeft, Shuffle, Share2, Trash2, Edit2, Plus, Users } from 'lucide-react';
import { Button } from '../components/Button';

interface UserPlaylistDetailProps {
  playlist: Playlist;
  songs: Song[];
  onBack: () => void;
  onPlaySong: (song: Song) => void;
  onPlayPlaylist: () => void;
  currentSong: Song | null;
  isPlaying: boolean;
  onRemoveSong: (songId: string) => void;
  onDeletePlaylist: () => void;
  onShare?: () => void;
}

export const UserPlaylistDetail: React.FC<UserPlaylistDetailProps> = ({
  playlist,
  songs,
  onBack,
  onPlaySong,
  onPlayPlaylist,
  currentSong,
  isPlaying,
  onRemoveSong,
  onDeletePlaylist,
  onShare
}) => {
    
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const totalDuration = songs.reduce((acc, curr) => acc + curr.duration, 0);
    const formatTotalDuration = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        return hrs > 0 ? `${hrs} hr ${mins} min` : `${mins} min`;
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black pb-40 animate-in fade-in slide-in-from-right-8 z-50 absolute inset-0 overflow-y-auto">
            {/* Header with blurred backdrop */}
            <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden bg-zinc-900">
                <div 
                    className="absolute inset-0 bg-cover bg-center blur-3xl opacity-50 scale-110 transition-all duration-700"
                    style={{ backgroundImage: `url(${playlist.coverUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-white dark:to-black" />
                
                {/* Navbar */}
                <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-20">
                    <button onClick={onBack} className="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10">
                        <ArrowLeft size={24} />
                    </button>
                    <button className="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10">
                        <MoreHorizontal size={24} />
                    </button>
                </div>

                {/* Playlist Info */}
                <div className="absolute bottom-8 left-0 right-0 px-4 md:px-8 z-10 flex flex-col md:flex-row items-end gap-6 md:gap-8 max-w-7xl mx-auto">
                    <div className="h-48 w-48 md:h-60 md:w-60 shadow-2xl shadow-black/50 rounded-lg overflow-hidden flex-shrink-0 relative group cursor-pointer">
                         <img src={playlist.coverUrl} alt={playlist.title} className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <Edit2 className="text-white" size={24} />
                         </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left space-y-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-white/90 shadow-sm">Your Playlist</span>
                        <div className="flex items-center gap-3 justify-center md:justify-start group">
                            <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-md tracking-tight">{playlist.title}</h1>
                            <Edit2 size={20} className="text-white/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-white" />
                        </div>
                        <p className="text-white/80 text-sm md:text-base font-medium drop-shadow-sm max-w-2xl line-clamp-2">
                           Created by You
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-white/90 text-sm font-medium pt-2">
                             <span>{songs.length} songs</span>
                             <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                             <span className="text-white/70">{formatTotalDuration(totalDuration)}</span>
                             {/* Mock collaborative state */}
                             <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                             <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                 <Users size={12} /> Collaborative
                             </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions & List */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
                
                {/* Controls - Mobile Responsive Wrap */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-6">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <button 
                            onClick={onPlayPlaylist}
                            className="h-14 w-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all"
                        >
                            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                        </button>
                        <div className="flex items-center gap-2">
                            <button className="p-3 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" title="Shuffle">
                                <Shuffle size={24} />
                            </button>
                            <button className="p-3 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" title="Add Songs">
                                <Plus size={24} />
                            </button>
                            <button 
                                onClick={onShare}
                                className="p-3 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" 
                                title="Share"
                            >
                                <Share2 size={24} />
                            </button>
                        </div>
                    </div>
                    
                    <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10" onClick={onDeletePlaylist}>
                        <Trash2 size={18} className="mr-2" /> Delete Playlist
                    </Button>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-[16px_1fr_auto_auto] md:grid-cols-[16px_4fr_3fr_1fr_auto] gap-4 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-500 mb-2 sticky top-0 bg-white dark:bg-black z-10">
                    <div className="text-center">#</div>
                    <div>Title</div>
                    <div className="hidden md:block">Artist</div>
                    <div className="text-right"><Clock size={16} className="inline" /></div>
                    <div className="w-8"></div>
                </div>

                {/* Songs List */}
                <div className="space-y-1">
                    {songs.length > 0 ? songs.map((song, index) => (
                        <div 
                            key={`${song.id}-${index}`} 
                            className={`grid grid-cols-[16px_1fr_auto_auto] md:grid-cols-[16px_4fr_3fr_1fr_auto] gap-4 px-4 py-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900/60 group transition-colors items-center ${currentSong?.id === song.id ? 'bg-zinc-100 dark:bg-zinc-900' : ''}`}
                        >
                            <div className="text-sm text-zinc-500 font-medium tabular-nums flex items-center justify-center cursor-pointer" onClick={() => onPlaySong(song)}>
                                <span className={`group-hover:hidden ${currentSong?.id === song.id ? 'text-rose-600 dark:text-rose-500' : ''}`}>
                                    {currentSong?.id === song.id ? <div className="w-3 h-3 bg-rose-600 rounded-full animate-pulse" /> : index + 1}
                                </span>
                                <Play size={12} className="hidden group-hover:block text-zinc-900 dark:text-white" fill="currentColor" />
                            </div>
                            
                            <div className="flex items-center gap-3 min-w-0 cursor-pointer" onClick={() => onPlaySong(song)}>
                                <img src={song.coverUrl} alt="" className="h-10 w-10 rounded object-cover shadow-sm bg-zinc-200 dark:bg-zinc-800" />
                                <div className="min-w-0">
                                    <p className={`font-medium truncate ${currentSong?.id === song.id ? 'text-rose-600 dark:text-rose-500' : 'text-zinc-900 dark:text-white'}`}>{song.title}</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate md:hidden">{song.artist}</p>
                                </div>
                            </div>

                            <div className="hidden md:flex items-center text-sm text-zinc-500 dark:text-zinc-400 truncate cursor-pointer" onClick={() => onPlaySong(song)}>
                                {song.artist}
                            </div>

                            <div className="flex items-center justify-end gap-3 text-sm text-zinc-500 font-mono">
                                {formatDuration(song.duration)}
                            </div>

                            <div className="flex justify-end">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onRemoveSong(song.id); }}
                                    className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                    title="Remove from playlist"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20 text-zinc-500">
                            <p>No songs in this playlist yet.</p>
                            <Button variant="ghost" className="mt-4" onClick={() => {}}>Browse Songs</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
