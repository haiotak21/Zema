
import React from 'react';
import { Play, Pause, Download, Check, ArrowDownCircle, MoreHorizontal, Trash2 } from 'lucide-react';
import { Song } from '../types';

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  isCurrent: boolean;
  isDownloaded?: boolean;
  downloadProgress?: number; // 0 to 100
  onPlay: (song: Song) => void;
  onToggleDownload?: (song: Song) => void;
  onClick?: (song: Song) => void;
  onMoreOptions?: (song: Song, e: React.MouseEvent) => void;
}

export const SongCard: React.FC<SongCardProps> = ({ 
  song, 
  isPlaying, 
  isCurrent, 
  isDownloaded, 
  downloadProgress,
  onPlay, 
  onToggleDownload,
  onClick,
  onMoreOptions
}) => {
  const isDownloading = downloadProgress !== undefined && downloadProgress < 100 && downloadProgress >= 0;
  
  // Radius for the circle (size 24 viewBox)
  const radius = 9;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - ((downloadProgress || 0) / 100) * circumference;

  return (
    <div 
        className="group relative bg-white dark:bg-zinc-900/50 p-3 rounded-xl transition-all duration-300 ease-out border border-zinc-200 dark:border-transparent hover:border-zinc-300 dark:hover:border-zinc-700/50 shadow-sm hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 cursor-pointer flex flex-col gap-3"
        onClick={() => onClick && onClick(song)}
    >
      {/* Cover Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md bg-zinc-200 dark:bg-zinc-800">
        <img 
          src={song.coverUrl} 
          alt={song.title} 
          className={`object-cover w-full h-full transition-transform duration-500 ${isPlaying && isCurrent ? 'scale-105' : 'group-hover:scale-105'}`}
        />
        
        {/* Play Button Overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
             <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onPlay(song);
                }}
                className={`p-3 rounded-full text-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center ${isCurrent ? 'bg-rose-600' : 'bg-rose-600 hover:bg-rose-500'}`}
            >
                {isCurrent && isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>
        </div>

         {/* Download Button - Top Right */}
        {onToggleDownload && (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isDownloading) {
                        onToggleDownload(song);
                    }
                }}
                className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center 
                  ${isDownloaded 
                    ? 'bg-emerald-500 text-white shadow-lg scale-100 opacity-100 hover:bg-red-500' 
                    : isDownloading 
                        ? 'bg-black/80 text-white scale-100 opacity-100 cursor-default' 
                        : 'bg-black/40 text-zinc-200 opacity-0 group-hover:opacity-100 hover:bg-black/60 scale-90 group-hover:scale-100'
                  }`}
                title={isDownloaded ? "Remove Download" : isDownloading ? `Downloading ${Math.round(downloadProgress || 0)}%` : "Download"}
                disabled={isDownloading}
            >
                {isDownloaded ? (
                   <div className="relative w-4 h-4">
                       <Check size={16} strokeWidth={3} className="absolute inset-0 transition-opacity duration-200 opacity-100 hover:opacity-0" />
                       <Trash2 size={16} strokeWidth={2} className="absolute inset-0 transition-opacity duration-200 opacity-0 hover:opacity-100" />
                   </div>
                ) : isDownloading ? (
                   <div className="relative w-5 h-5">
                       {/* Circular Progress */}
                       <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 24 24">
                          <circle
                            className="text-zinc-600"
                            strokeWidth="3"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx="12"
                            cy="12"
                          />
                          <circle
                            className="text-rose-500 transition-all duration-300 ease-linear"
                            strokeWidth="3"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx="12"
                            cy="12"
                          />
                       </svg>
                   </div>
                ) : (
                  <Download size={16} />
                )}
            </button>
        )}
      </div>

      {/* Song Info */}
      <div className="relative flex-1 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className={`font-semibold text-base truncate ${isCurrent ? 'text-rose-600 dark:text-rose-500' : 'text-zinc-900 dark:text-white'}`}>
                        {song.title}
                    </h3>
                    {/* Explicit Badge */}
                    {song.isExplicit && (
                        <span 
                            className="flex-shrink-0 flex items-center justify-center h-4 w-4 rounded-[3px] bg-zinc-200 dark:bg-zinc-700 text-[9px] font-bold text-zinc-600 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-600 cursor-help" 
                            title="Explicit Content"
                        >
                            E
                        </span>
                    )}
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs truncate">{song.artist}</p>
              </div>
              
              {/* More Options Button */}
              {onMoreOptions && (
                  <button 
                    className="p-1 -mr-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => onMoreOptions(song, e)}
                  >
                      <MoreHorizontal size={18} />
                  </button>
              )}
          </div>
          
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/50 min-h-[24px]">
               <span className="text-zinc-500 dark:text-zinc-600 text-[10px] uppercase tracking-wider font-medium truncate pr-2">{song.genre}</span>
               
               {/* Offline Indicator Badge */}
               {isDownloaded && (
                 <div className="flex-shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-100/50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 animate-in fade-in" title="Downloaded for Offline Playback">
                     <ArrowDownCircle size={10} fill="currentColor" className="opacity-80" />
                     <span className="text-[9px] font-bold">Offline</span>
                 </div>
              )}
          </div>
      </div>
    </div>
  );
};
