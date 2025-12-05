
import React from 'react';
import { Song, Album } from '../types';
import { Play, Pause, Clock, Heart, MoreHorizontal, ArrowLeft, Shuffle, Disc, Download, Share2 } from 'lucide-react';
import { Button } from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

interface AlbumDetailProps {
  album: Album;
  songs: Song[];
  onBack: () => void;
  onPlaySong: (song: Song) => void;
  onPlayAlbum: () => void;
  currentSong: Song | null;
  isPlaying: boolean;
  onShare?: () => void;
  onMoreOptions?: (song: Song, e: React.MouseEvent) => void;
}

export const AlbumDetail: React.FC<AlbumDetailProps> = ({
  album,
  songs,
  onBack,
  onPlaySong,
  onPlayAlbum,
  currentSong,
  isPlaying,
  onShare,
  onMoreOptions
}) => {
    const { t } = useLanguage();
    
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
            <div className="relative h-[45vh] min-h-[340px] w-full overflow-hidden bg-zinc-900">
                <div 
                    className="absolute inset-0 bg-cover bg-center blur-3xl opacity-50 scale-110 transition-all duration-700"
                    style={{ backgroundImage: `url(${album.coverUrl})` }}
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

                {/* Album Info */}
                <div className="absolute bottom-8 left-0 right-0 px-4 md:px-8 z-10 flex flex-col md:flex-row items-end gap-6 md:gap-8 max-w-7xl mx-auto">
                    <div className="h-48 w-48 md:h-60 md:w-60 shadow-2xl shadow-black/50 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                         <img src={album.coverUrl} alt={album.title} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 text-center md:text-left space-y-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-white/90 shadow-sm">Album</span>
                        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-md tracking-tight">{album.title}</h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-white/90 text-sm font-medium pt-2">
                             <div className="h-6 w-6 rounded-full bg-zinc-800 border border-white/20 flex items-center justify-center overflow-hidden">
                                 <img src={album.coverUrl} className="w-full h-full object-cover opacity-80" />
                             </div>
                             <span className="font-bold hover:underline cursor-pointer">{album.artist}</span>
                             <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                             <span>{album.year}</span>
                             <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                             <span>{songs.length} {t('songs')}, <span className="text-white/70">{formatTotalDuration(totalDuration)}</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions & List */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
                
                {/* Controls - Mobile Responsive Wrap */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-6">
                    {/* Big Shuffle Play Button */}
                    <button 
                        onClick={onPlayAlbum}
                        className="h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
                    >
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                        <span className="uppercase tracking-widest text-sm">{t('shuffle_play')}</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <button className="p-3 rounded-full text-zinc-400 hover:text-rose-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" title="Save to Library">
                            <Heart size={24} />
                        </button>
                        <button className="p-3 rounded-full text-zinc-400 hover:text-emerald-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" title="Download">
                            <Download size={24} />
                        </button>
                        <button 
                            onClick={onShare}
                            className="p-3 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" 
                            title="Share"
                        >
                            <Share2 size={24} />
                        </button>
                        <button className="p-3 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors md:hidden">
                            <MoreHorizontal size={24} />
                        </button>
                    </div>
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
                    {songs.map((song, index) => (
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
                                <div className="min-w-0">
                                    <p className={`font-medium truncate ${currentSong?.id === song.id ? 'text-rose-600 dark:text-rose-500' : 'text-zinc-900 dark:text-white'}`}>{song.title}</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate md:hidden">{song.artist}</p>
                                </div>
                            </div>

                            <div className="hidden md:flex items-center text-sm text-zinc-500 dark:text-zinc-400 truncate hover:text-zinc-900 dark:hover:text-white transition-colors">
                                {song.artist}
                            </div>

                            <div className="flex items-center justify-end gap-3 text-sm text-zinc-500 font-mono">
                                <Heart size={16} className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-rose-500 transition-all mr-2" />
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
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
                    <p>{new Date().getFullYear()} {album.artist}. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};
