import React from 'react';
import { X, Heart, ListPlus, Share2, Clock, Disc, AlertTriangle } from 'lucide-react';
import { Song, Album, Playlist } from '../types';

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  item: Song | Album | Playlist | null;
  type: 'song' | 'album' | 'playlist';
  isLiked: boolean;
  isListenLater: boolean;
  onToggleLike: () => void;
  onToggleListenLater: () => void;
  onAddToPlaylist: () => void;
  onShare: () => void;
  onReport?: () => void;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
  item,
  type,
  isLiked,
  isListenLater,
  onToggleLike,
  onToggleListenLater,
  onAddToPlaylist,
  onShare,
  onReport
}) => {
  if (!isOpen || !item) return null;

  // Extract common props
  const title = (item as any).title;
  const subtitle = (item as Song).artist || (item as Album).artist || (item as Playlist).songCount + ' Songs';
  const cover = (item as any).coverUrl;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Sheet / Modal */}
      <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200 border border-zinc-200 dark:border-zinc-800">
        
        {/* Header */}
        <div className="flex items-center gap-4 p-4 border-b border-zinc-100 dark:border-zinc-800">
             <img src={cover} className="w-12 h-12 rounded object-cover" alt={title} />
             <div className="flex-1 min-w-0">
                 <h3 className="font-bold text-zinc-900 dark:text-white truncate">{title}</h3>
                 <p className="text-sm text-zinc-500 truncate">{subtitle}</p>
             </div>
             <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-full">
                 <X size={20} />
             </button>
        </div>

        {/* Actions */}
        <div className="p-2 space-y-1">
            <button 
                onClick={() => { onToggleLike(); onClose(); }}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left font-medium text-zinc-700 dark:text-zinc-200"
            >
                <Heart size={20} className={isLiked ? "fill-rose-500 text-rose-500" : ""} />
                {isLiked ? 'Remove from Liked' : 'Like'}
            </button>

            <button 
                onClick={() => { onAddToPlaylist(); onClose(); }}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left font-medium text-zinc-700 dark:text-zinc-200"
            >
                <ListPlus size={20} />
                Add to Playlist
            </button>

            <button 
                onClick={() => { onToggleListenLater(); onClose(); }}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left font-medium text-zinc-700 dark:text-zinc-200"
            >
                <Clock size={20} className={isListenLater ? "fill-blue-500 text-blue-500" : ""} />
                {isListenLater ? 'Remove from Listen Later' : 'Listen Later'}
            </button>
            
            <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1" />

            <button 
                onClick={() => { onShare(); onClose(); }}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left font-medium text-zinc-700 dark:text-zinc-200"
            >
                <Share2 size={20} />
                Share
            </button>
            
            {type === 'song' && (
                 <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left font-medium text-zinc-700 dark:text-zinc-200">
                    <Disc size={20} />
                    View Album
                </button>
            )}

            {onReport && (
                <>
                    <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1" />
                    <button 
                        onClick={() => { onReport(); onClose(); }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left font-medium text-red-600 dark:text-red-500"
                    >
                        <AlertTriangle size={20} />
                        Report
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};