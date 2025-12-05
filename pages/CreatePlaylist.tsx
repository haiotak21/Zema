import React, { useState, useRef } from 'react';
import { Song, Playlist } from '../types';
import { Camera, Search, Plus, X, Music, Check, ArrowLeft, Users } from 'lucide-react';
import { Button } from '../components/Button';

interface CreatePlaylistProps {
  allSongs: Song[];
  onSave: (title: string, description: string, coverUrl: string | undefined, selectedSongs: Song[]) => void;
  onCancel: () => void;
}

export const CreatePlaylist: React.FC<CreatePlaylistProps> = ({ allSongs, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCollaborative, setIsCollaborative] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setCoverPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const toggleSongSelection = (song: Song) => {
      setSelectedSongs(prev => {
          if (prev.find(s => s.id === song.id)) {
              return prev.filter(s => s.id !== song.id);
          }
          return [...prev, song];
      });
  };

  const filteredSongs = allSongs.filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
      if (!title.trim()) return;
      onSave(title, description, coverPreview || undefined, selectedSongs);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-32 animate-in fade-in slide-in-from-bottom-8 z-50 absolute inset-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
            <header className="flex items-center gap-4 mb-8">
                <button onClick={onCancel} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-600 dark:text-zinc-400">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Create Playlist</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                {/* Cover Image */}
                <div className="md:col-span-1">
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square bg-zinc-100 dark:bg-zinc-900 border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-rose-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all group relative overflow-hidden"
                    >
                        {coverPreview ? (
                            <>
                                <img src={coverPreview} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="text-white" size={32} />
                                </div>
                            </>
                        ) : (
                            <>
                                <Music className="text-zinc-300 dark:text-zinc-700 mb-3" size={48} />
                                <span className="text-sm text-zinc-500 font-medium">Upload Cover</span>
                            </>
                        )}
                        <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleCoverSelect} />
                    </div>
                </div>

                {/* Details Form */}
                <div className="md:col-span-2 space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Name</label>
                        <input 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 transition-colors text-lg font-medium placeholder-zinc-400"
                            placeholder="My Playlist #1"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Description</label>
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-24 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 transition-colors resize-none placeholder-zinc-400"
                            placeholder="Give your playlist a catchy description..."
                        />
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer" onClick={() => setIsCollaborative(!isCollaborative)}>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isCollaborative ? 'bg-rose-600 border-rose-600' : 'border-zinc-400'}`}>
                            {isCollaborative && <Check size={14} className="text-white" />}
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-zinc-900 dark:text-white flex items-center gap-2">
                                Collaborative <Users size={14} className="text-zinc-500" />
                            </p>
                            <p className="text-xs text-zinc-500">Allow friends to add songs to this playlist.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Song Selection */}
            <div className="space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Add Songs</h2>
                    <div className="text-sm text-zinc-500">{selectedSongs.length} selected</div>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-full py-3 pl-12 pr-4 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                        placeholder="Search for songs..."
                    />
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                    {filteredSongs.map(song => {
                        const isSelected = selectedSongs.some(s => s.id === song.id);
                        return (
                            <div 
                                key={song.id}
                                onClick={() => toggleSongSelection(song)}
                                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                                    isSelected 
                                    ? 'bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-900/30' 
                                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-900 border border-transparent'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <img src={song.coverUrl} className="w-10 h-10 rounded object-cover" />
                                    <div>
                                        <p className={`font-medium text-sm ${isSelected ? 'text-rose-700 dark:text-rose-400' : 'text-zinc-900 dark:text-white'}`}>{song.title}</p>
                                        <p className="text-xs text-zinc-500">{song.artist}</p>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                                    isSelected 
                                    ? 'bg-rose-600 border-rose-600 text-white' 
                                    : 'border-zinc-300 dark:border-zinc-600'
                                }`}>
                                    {isSelected ? <Check size={14} /> : <Plus size={14} className="text-zinc-400" />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-black p-4 border-t border-zinc-200 dark:border-zinc-800 mt-8 flex justify-end gap-3">
                <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button onClick={handleSave} disabled={!title.trim()}>Create Playlist</Button>
            </div>
        </div>
    </div>
  );
};