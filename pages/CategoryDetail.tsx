
import React from 'react';
import { Song, Playlist } from '../types';
import { ArrowLeft, Play } from 'lucide-react';
import { SongCard } from '../components/SongCard';

interface CategoryDetailProps {
  category: string; // e.g. "Chill", "Workout"
  songs: Song[];
  playlists: Playlist[];
  onBack: () => void;
  onPlay: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  downloadedSongs: Set<string>;
  activeDownloads?: Record<string, number>;
  onToggleDownload: (song: Song) => void;
  onSongClick: (song: Song) => void;
  onPlaylistClick?: (playlist: Playlist) => void;
  onMoreOptions?: (song: Song, e: React.MouseEvent) => void;
}

export const CategoryDetail: React.FC<CategoryDetailProps> = ({
  category,
  songs,
  playlists,
  onBack,
  onPlay,
  currentSong,
  isPlaying,
  downloadedSongs,
  activeDownloads,
  onToggleDownload,
  onSongClick,
  onPlaylistClick,
  onMoreOptions
}) => {
  
  // Dynamic gradient based on category name length (pseudo-random)
  const colors = [
      'from-blue-600 to-purple-900',
      'from-emerald-600 to-teal-900',
      'from-rose-600 to-orange-900',
      'from-amber-500 to-red-900',
      'from-pink-600 to-rose-900'
  ];
  const bgGradient = colors[category.length % colors.length];

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-40 animate-in fade-in slide-in-from-right-8 z-50 absolute inset-0 overflow-y-auto">
        {/* Header */}
        <div className={`relative h-[35vh] min-h-[250px] w-full bg-gradient-to-br ${bgGradient}`}>
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 z-20">
                <button onClick={onBack} className="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10">
                    <ArrowLeft size={24} />
                </button>
            </div>
            <div className="absolute inset-0 flex items-end p-8 max-w-7xl mx-auto">
                <div>
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 block">Mood & Genre</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white">{category}</h1>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-12">
            
            {/* Featured Playlists */}
            <section>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">{category} Mixes</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {playlists.map((playlist, idx) => (
                        <div 
                            key={playlist.id}
                            onClick={() => onPlaylistClick && onPlaylistClick(playlist)}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-square mb-3 overflow-hidden rounded-xl shadow-lg">
                                <img src={playlist.coverUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={playlist.title} />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play size={32} className="text-white fill-white drop-shadow-lg" />
                                </div>
                                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-bold uppercase">
                                    {category} Mix {idx + 1}
                                </div>
                            </div>
                            <h3 className="font-bold text-zinc-900 dark:text-white truncate">{playlist.title}</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">By Zema Editors</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Top Songs for this Mood */}
            <section>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Top Tracks</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {songs.slice(0, 10).map(song => (
                        <SongCard 
                            key={song.id} 
                            song={song} 
                            onPlay={onPlay}
                            isPlaying={isPlaying}
                            isCurrent={currentSong?.id === song.id}
                            isDownloaded={downloadedSongs.has(song.id)}
                            downloadProgress={activeDownloads ? activeDownloads[song.id] : 0}
                            onToggleDownload={onToggleDownload}
                            onClick={onSongClick}
                            onMoreOptions={onMoreOptions}
                        />
                    ))}
                </div>
            </section>
        </div>
    </div>
  );
};
