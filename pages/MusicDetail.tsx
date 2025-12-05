
import React from 'react';
import { Song } from '../types';
import { Play, Pause, Download, Heart, Share2, ArrowLeft, Mic2, MoreHorizontal, Check, Disc, Clock } from 'lucide-react';
import { Button } from '../components/Button';
import { CommentsSection } from '../components/CommentsSection';

interface MusicDetailProps {
  song: Song;
  onBack: () => void;
  onPlay: (song: Song) => void;
  isPlaying: boolean;
  isCurrent: boolean;
  isDownloaded: boolean;
  downloadProgress?: number;
  onToggleDownload: (song: Song) => void;
  similarSongs: Song[];
  onSongClick: (song: Song) => void;
  onShare?: () => void;
}

export const MusicDetail: React.FC<MusicDetailProps> = ({
  song,
  onBack,
  onPlay,
  isPlaying,
  isCurrent,
  isDownloaded,
  downloadProgress,
  onToggleDownload,
  similarSongs,
  onSongClick,
  onShare
}) => {
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}m ${secs}s`;
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black pb-40 animate-in fade-in slide-in-from-right-8 z-50 absolute inset-0 overflow-y-auto">
            {/* Header with blurred backdrop */}
            <div className="relative h-[40vh] min-h-[350px] w-full overflow-hidden bg-zinc-900">
                <div 
                    className="absolute inset-0 bg-cover bg-center blur-3xl opacity-60 dark:opacity-40 scale-110 transition-all duration-700"
                    style={{ backgroundImage: `url(${song.coverUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white dark:to-black" />
                
                {/* Navbar */}
                <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-20">
                    <button onClick={onBack} className="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10">
                        <ArrowLeft size={24} />
                    </button>
                    <button className="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10">
                        <MoreHorizontal size={24} />
                    </button>
                </div>

                {/* Main Content Overlay */}
                <div className="absolute -bottom-12 left-0 right-0 px-4 md:px-8 z-10 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 max-w-7xl mx-auto">
                    {/* Cover Art */}
                    <div className="relative group shrink-0">
                         <img 
                            src={song.coverUrl} 
                            alt={song.title} 
                            className="w-48 h-48 md:w-64 md:h-64 rounded-2xl shadow-2xl object-cover border-4 border-white dark:border-zinc-900 shadow-black/50"
                         />
                         {isCurrent && isPlaying && (
                             <div className="absolute inset-4 rounded-xl flex items-center justify-center">
                                 <span className="flex gap-1">
                                     <span className="w-1.5 h-8 bg-rose-500 rounded-full animate-[bounce_1s_infinite]"></span>
                                     <span className="w-1.5 h-12 bg-rose-500 rounded-full animate-[bounce_1.2s_infinite]"></span>
                                     <span className="w-1.5 h-6 bg-rose-500 rounded-full animate-[bounce_0.8s_infinite]"></span>
                                 </span>
                             </div>
                         )}
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 text-center md:text-left mb-6 md:mb-6 space-y-3">
                        <div>
                             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-rose-900/20">
                                <Disc size={12} /> {song.genre}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight drop-shadow-sm">{song.title}</h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-zinc-600 dark:text-zinc-300 text-base md:text-lg">
                            <span className="font-bold text-zinc-900 dark:text-white">{song.artist}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                            <span>{song.album}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                            <span className="flex items-center gap-1"><Clock size={14} /> {formatDuration(song.duration)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 md:pt-20">
                
                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-12 border-b border-zinc-100 dark:border-zinc-800 pb-8">
                     <button 
                        onClick={() => onPlay(song)}
                        className="h-14 w-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-rose-500/30"
                     >
                         {isPlaying && isCurrent ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                     </button>
                     
                     <Button 
                        variant="secondary" 
                        className={`h-12 rounded-full px-6 gap-2 border font-semibold ${isDownloaded ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20' : 'hover:border-zinc-300 dark:hover:border-zinc-600'}`}
                        onClick={() => onToggleDownload(song)}
                     >
                        {isDownloaded ? <Check size={18} strokeWidth={3} /> : <Download size={18} />}
                        {isDownloaded ? 'Downloaded' : 'Download'}
                     </Button>

                     <Button variant="secondary" className="h-12 w-12 rounded-full p-0 flex items-center justify-center hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-900/20">
                        <Heart size={20} />
                     </Button>
                     
                     <Button 
                        variant="secondary" 
                        onClick={onShare}
                        className="h-12 w-12 rounded-full p-0 flex items-center justify-center"
                     >
                        <Share2 size={20} />
                     </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Col: Lyrics & Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Lyrics Card */}
                        <div className="bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800/50">
                             <div className="flex items-center justify-between mb-8">
                                 <div className="flex items-center gap-3">
                                     <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg text-rose-600 dark:text-rose-500">
                                        <Mic2 size={24} />
                                     </div>
                                     <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Lyrics</h3>
                                 </div>
                             </div>
                             
                             {song.lyrics && song.lyrics.length > 0 ? (
                                 <div className="space-y-6 text-xl md:text-2xl text-zinc-500 dark:text-zinc-500 leading-relaxed font-semibold">
                                     {song.lyrics.map((line, i) => (
                                         <p key={i} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-default duration-300">{line.text}</p>
                                     ))}
                                     <p className="text-sm text-zinc-400 font-normal italic pt-4">Lyrics provided by Zema Community</p>
                                 </div>
                             ) : (
                                 <div className="text-center py-16 text-zinc-500 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                                     <Mic2 size={48} className="mx-auto mb-4 opacity-20" />
                                     <p className="font-medium">No lyrics available for this track yet.</p>
                                     <Button variant="ghost" size="sm" className="mt-4 text-rose-500">Contribute Lyrics</Button>
                                 </div>
                             )}
                        </div>

                        {/* Comments Section */}
                        <CommentsSection />
                    </div>

                    {/* Right Col: Artist & Similar */}
                    <div className="space-y-8">
                        {/* Artist Card */}
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-zinc-900 dark:text-white">Artist</h3>
                                <Button variant="ghost" size="sm" className="text-rose-600 h-8">View Profile</Button>
                            </div>
                            
                            <div className="flex flex-col items-center text-center">
                                <div className="h-24 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden mb-4 ring-4 ring-zinc-50 dark:ring-zinc-800">
                                     <img src={`https://picsum.photos/seed/${song.artist}/200`} alt={song.artist} className="w-full h-full object-cover" />
                                </div>
                                <h4 className="font-bold text-xl text-zinc-900 dark:text-white mb-1">{song.artist}</h4>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">1.2M Monthly Listeners</p>
                                <div className="mt-4 flex gap-2 w-full">
                                    <Button variant="secondary" className="flex-1 h-9 text-xs">Follow</Button>
                                    <Button variant="secondary" className="flex-1 h-9 text-xs">Radio</Button>
                                </div>
                            </div>
                        </div>

                        {/* Similar Songs */}
                        <div>
                             <h3 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                                <Disc size={18} /> You Might Also Like
                             </h3>
                             <div className="space-y-2">
                                 {similarSongs.slice(0, 5).map(s => (
                                     <div 
                                        key={s.id} 
                                        onClick={() => onSongClick(s)} 
                                        className="flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 rounded-xl cursor-pointer group transition-all duration-200"
                                     >
                                         <div className="relative h-14 w-14 flex-shrink-0 rounded-lg overflow-hidden">
                                             <img src={s.coverUrl} className="w-full h-full object-cover" />
                                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                 <Play size={20} className="text-white fill-white"/>
                                              </div>
                                         </div>
                                         <div className="min-w-0 flex-1">
                                             <h5 className="font-bold text-zinc-900 dark:text-white truncate text-sm group-hover:text-rose-600 dark:group-hover:text-rose-500 transition-colors">{s.title}</h5>
                                             <p className="text-xs text-zinc-500 truncate">{s.artist}</p>
                                         </div>
                                         <div className="text-xs text-zinc-400 font-medium">
                                             {formatDuration(s.duration)}
                                         </div>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
