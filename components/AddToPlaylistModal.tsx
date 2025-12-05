import React from 'react';
import { X, Plus, Music } from 'lucide-react';
import { Playlist } from '../types';

interface AddToPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlists: Playlist[];
  onSelectPlaylist: (playlistId: string) => void;
  onCreateNew: () => void;
}

export const AddToPlaylistModal: React.FC<AddToPlaylistModalProps> = ({
  isOpen,
  onClose,
  playlists,
  onSelectPlaylist,
  onCreateNew
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="font-bold text-zinc-900 dark:text-white">Add to Playlist</h3>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          <button 
            onClick={onCreateNew}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left group"
          >
            <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 group-hover:text-rose-500 transition-colors">
              <Plus size={24} />
            </div>
            <span className="font-medium text-zinc-900 dark:text-white">New Playlist</span>
          </button>
          
          <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2 mx-3" />
          
          {playlists.length > 0 ? (
            playlists.map(playlist => (
                <button
                key={playlist.id}
                onClick={() => onSelectPlaylist(playlist.id)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left"
                >
                <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                    {playlist.coverUrl ? (
                        <img src={playlist.coverUrl} className="w-full h-full object-cover" alt={playlist.title} />
                    ) : (
                        <Music className="m-auto mt-3 text-zinc-400" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-zinc-900 dark:text-white truncate">{playlist.title}</p>
                    <p className="text-xs text-zinc-500">{playlist.songCount} songs</p>
                </div>
                </button>
            ))
          ) : (
              <p className="text-center text-sm text-zinc-500 py-4">No playlists yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};