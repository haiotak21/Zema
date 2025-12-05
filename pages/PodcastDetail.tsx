
import React, { useState } from 'react';
import { Song, Podcast } from '../types';
import { Play, Pause, MoreHorizontal, ArrowLeft, Clock, Share2, Plus, ArrowDownCircle, CheckCircle, Smartphone } from 'lucide-react';
import { Button } from '../components/Button';

interface PodcastDetailProps {
  podcast: Podcast;
  episodes: Song[];
  onBack: () => void;
  onPlayEpisode: (episode: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  onShare?: () => void;
}

export const PodcastDetail: React.FC<PodcastDetailProps> = ({
  podcast,
  episodes,
  onBack,
  onPlayEpisode,
  currentSong,
  isPlaying,
  onShare
}) => {
    const [autoDownload, setAutoDownload] = useState(false);
    
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        return `${mins} min`;
    };

    const formatDate = (index: number) => {
        const date = new Date();
        date.setDate(date.getDate() - (index * 7)); // Mock dates
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black pb-40 animate-in fade-in slide-in-from-right-8 z-50 absolute inset-0 overflow-y-auto">
            {/* Header with blurred backdrop */}
            <div className="relative h-[45vh] min-h-[400px] w-full overflow-hidden bg-zinc-900">
                <div 
                    className="absolute inset-0 bg-cover bg-center blur-3xl opacity-50 scale-110"
                    style={{ backgroundImage: `url(${podcast.coverUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-white dark:to-black" />
                
                {/* Navbar */}
                <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-20">
                    <button onClick={onBack} className="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex gap-2">
                        <button 
                            onClick={onShare}
                            className="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10"
                        >
                            <Share2 size={24} />
                        </button>
                        <button className="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10">
                            <MoreHorizontal size={24} />
                        </button>
                    </div>
                </div>

                {/* Podcast Info */}
                <div className="absolute bottom-10 left-0 right-0 px-4 md:px-8 z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-8">
                    <div className="h-56 w-56 shadow-2xl shadow-black/50 rounded-xl overflow-hidden flex-shrink-0 border-2 border-white/10">
                         <img src={podcast.coverUrl} alt={podcast.title} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-md tracking-tight">{podcast.title}</h1>
                        <p className="text-xl text-zinc-200 font-medium">Hosted by {podcast.host}</p>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                             <Button className="rounded-full px-8 h-12 font-bold text-base">
                                 Follow
                             </Button>
                             <span className="text-zinc-300 text-sm font-medium px-3 py-1 bg-white/10 rounded-full border border-white/10 backdrop-blur-sm">
                                {podcast.category}
                             </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Episodes List */}
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">All Episodes</h2>
                            <span className="text-zinc-500 font-medium">{episodes.length} episodes</span>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/30 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Auto-Download New Episodes</span>
                            </div>
                            <button 
                                onClick={() => setAutoDownload(!autoDownload)}
                                className={`w-11 h-6 rounded-full transition-colors relative ${autoDownload ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                            >
                                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transition-transform ${autoDownload ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {episodes.map((episode, index) => {
                                const isThisPlaying = currentSong?.id === episode.id && isPlaying;
                                const progress = Math.random() * 100; // Mock progress
                                const isFinished = progress > 90;

                                return (
                                    <div 
                                        key={episode.id} 
                                        className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer"
                                        onClick={() => onPlayEpisode(episode)}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="h-16 w-16 rounded-lg bg-zinc-200 dark:bg-zinc-800 overflow-hidden flex-shrink-0 relative">
                                                <img src={podcast.coverUrl} className="w-full h-full object-cover opacity-90" />
                                                <div className={`absolute inset-0 flex items-center justify-center bg-black/20 ${isThisPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                                                    {isThisPlaying ? <Pause size={24} className="text-white fill-white"/> : <Play size={24} className="text-white fill-white"/>}
                                                </div>
                                                {/* Progress Bar Overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                                                    <div className={`h-full ${isFinished ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${progress}%` }}></div>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <h3 className={`font-bold text-lg mb-1 truncate ${isThisPlaying ? 'text-rose-600 dark:text-rose-500' : 'text-zinc-900 dark:text-white'}`}>
                                                        {episode.title}
                                                    </h3>
                                                    {isFinished && <CheckCircle size={16} className="text-emerald-500" />}
                                                </div>
                                                <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 mb-3">
                                                    Episode description goes here. This is a brief summary of what you can expect in this episode of {podcast.title}.
                                                </p>
                                                <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
                                                    <span className="flex items-center gap-1"><Clock size={12}/> {formatDuration(episode.duration)}</span>
                                                    <span>•</span>
                                                    <span>{formatDate(index)}</span>
                                                    {index === 0 && <span className="text-rose-500 font-bold px-1.5 py-0.5 bg-rose-100 dark:bg-rose-900/30 rounded">NEW</span>}
                                                    
                                                    <div className="flex-1"></div>
                                                    <button className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors" onClick={(e) => e.stopPropagation()}>
                                                        <Plus size={16} />
                                                    </button>
                                                    <button className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors" onClick={(e) => e.stopPropagation()}>
                                                        <ArrowDownCircle size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="lg:w-80 space-y-6">
                        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                            <h3 className="font-bold text-zinc-900 dark:text-white mb-3">About</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Join {podcast.host} as they dive deep into {podcast.category}. 
                                New episodes every week covering the latest trends, stories, and insights from Ethiopia and beyond.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
