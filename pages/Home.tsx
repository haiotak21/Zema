
import React from 'react';
import { Song, Playlist } from '../types';
import { SongCard } from '../components/SongCard';
import { Play, Laptop, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HomeProps {
  songs: Song[];
  playlists: Playlist[];
  onPlay: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  downloadedSongs: Set<string>;
  activeDownloads?: Record<string, number>;
  onToggleDownload: (song: Song) => void;
  onSongClick: (song: Song) => void;
  onPlaylistClick?: (playlist: Playlist) => void;
  onCategoryClick?: (category: string) => void;
  onDailyMixClick?: (id: string) => void;
  onWrappedClick?: () => void;
  onMoreOptions?: (song: Song, e: React.MouseEvent) => void;
  onViewAll?: (section: string) => void;
}

export const Home: React.FC<HomeProps> = ({ 
  songs, 
  playlists, 
  onPlay, 
  currentSong, 
  isPlaying, 
  downloadedSongs, 
  activeDownloads = {},
  onToggleDownload,
  onSongClick,
  onPlaylistClick,
  onCategoryClick,
  onDailyMixClick,
  onWrappedClick,
  onMoreOptions,
  onViewAll
}) => {
  const { t } = useLanguage();
  
  // Smart Greeting Logic
  const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return t('greeting_morning');
      if (hour < 18) return t('greeting_afternoon');
      return t('greeting_evening');
  };

  // Mock "Continue Listening" Data
  const continueListening = songs.slice(0, 3).map((s, i) => ({
      ...s,
      progress: 30 + (i * 20) // Simulated progress
  }));

  // Moods with Background Images
  const MOODS = [
      { name: "Chill", image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&q=80" },
      { name: "Workout", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" },
      { name: "Focus", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80" },
      { name: "Party", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80" },
      { name: "Romance", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&q=80" },
  ];

  return (
    <div className="space-y-10 pb-8">
      
      {/* Time-Based Greeting & Personalization */}
      <section className="pt-2">
          <div className="flex justify-between items-end mb-6">
             <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">{getGreeting()}</h2>
          </div>
          
          {/* Wrapped Banner - Seasonal */}
          {onWrappedClick && (
              <div 
                onClick={onWrappedClick}
                className="mb-8 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 rounded-2xl p-6 text-white cursor-pointer relative overflow-hidden group shadow-lg hover:shadow-xl transition-all"
              >
                  <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="text-yellow-300" />
                          <span className="font-bold tracking-wider uppercase text-sm">Year in Review</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black mb-2">{t('wrapped_banner')}</h3>
                      <p className="opacity-90">{t('wrapped_subtitle')}</p>
                  </div>
                  <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/10 skew-x-12 transform translate-x-10 group-hover:translate-x-0 transition-transform duration-500"></div>
              </div>
          )}
          
          {/* Continue Listening Row */}
          <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">{t('continue_listening')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {continueListening.map(song => (
                  <div 
                    key={`cont-${song.id}`}
                    className="flex items-center gap-3 p-2 pr-4 bg-zinc-100 dark:bg-zinc-900/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg group cursor-pointer transition-colors"
                    onClick={() => onPlay(song)}
                  >
                      <div className="relative w-14 h-14 flex-shrink-0">
                          <img src={song.coverUrl} className="w-full h-full object-cover rounded-md" />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                              <Play size={20} fill="currentColor" className="text-white" />
                          </div>
                      </div>
                      <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-zinc-900 dark:text-white truncate text-sm">{song.title}</h4>
                          <p className="text-xs text-zinc-500 truncate mb-1.5">{song.artist}</p>
                          
                          {/* Progress Bar */}
                          <div className="w-full h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full overflow-hidden">
                              <div className="h-full bg-rose-500 rounded-full" style={{ width: `${song.progress || 0}%` }}></div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* Multi-Device Banner */}
      <section className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-2xl p-6 flex items-center justify-between text-white shadow-lg overflow-hidden relative">
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-10 translate-y-10">
              <Laptop size={120} />
          </div>
          <div className="relative z-10">
              <h3 className="font-bold text-lg mb-1 flex items-center gap-2"><Laptop size={20} /> Continue on Web Player</h3>
              <p className="text-indigo-200 text-sm mb-4 max-w-md">You were listening to <strong>Tizita</strong> on your iPhone. Pick up right where you left off.</p>
              <button className="bg-white text-indigo-900 px-4 py-2 rounded-full text-xs font-bold hover:bg-indigo-50 transition-colors">
                  Resume Playback
              </button>
          </div>
      </section>

      {/* Your Daily Mixes */}
      <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Your Daily Mixes</h2>
            {onViewAll && (
                <button 
                    onClick={() => onViewAll('mixes')}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-white cursor-pointer transition-colors"
                >
                    View All
                </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map(i => (
                  <div 
                    key={i} 
                    onClick={() => onDailyMixClick && onDailyMixClick(`Daily Mix ${i}`)}
                    className="group cursor-pointer p-3 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-transparent rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                  >
                      {/* Image Card instead of gradient */}
                      <div className="relative aspect-square mb-3 rounded-lg shadow-sm overflow-hidden group-hover:shadow-md transition-shadow">
                          <img 
                            src={`https://picsum.photos/seed/daily${i}/300/300`} 
                            alt={`Daily Mix ${i}`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          
                          {/* Logo Overlay */}
                          <div className="absolute top-2 left-2">
                              <div className="w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center">
                                  <span className="text-[10px] font-bold text-white">Z</span>
                              </div>
                          </div>

                          {/* Hover Play */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center text-white shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                  <Play size={24} fill="currentColor" className="ml-1" />
                              </div>
                          </div>
                      </div>
                      
                      <h3 className="font-bold text-zinc-900 dark:text-white text-sm">Daily Mix {i}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">Made for you based on your recent listening.</p>
                  </div>
              ))}
          </div>
      </section>

      {/* Mood Mixes */}
      <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{t('mood_mixes')}</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {MOODS.map((mood) => (
                  <div 
                    key={mood.name}
                    onClick={() => onCategoryClick && onCategoryClick(mood.name)}
                    className="min-w-[160px] h-28 rounded-xl relative overflow-hidden cursor-pointer group shadow-md"
                  >
                      {/* Background Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                        style={{ backgroundImage: `url(${mood.image})` }}
                      ></div>
                      {/* Gradient Overlay for Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      
                      <div className="absolute bottom-3 left-3">
                          <span className="font-bold text-white text-lg drop-shadow-md">{mood.name}</span>
                          <div className="h-1 w-8 bg-rose-500 rounded-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* Hero / Trending Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('trending')}</h2>
          {onViewAll && (
              <button 
                onClick={() => onViewAll('trending')}
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-white cursor-pointer transition-colors"
              >
                  View All
              </button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {songs.slice(0, 5).map(song => (
            <SongCard 
              key={song.id} 
              song={song} 
              onPlay={onPlay}
              isPlaying={isPlaying}
              isCurrent={currentSong?.id === song.id}
              isDownloaded={downloadedSongs.has(song.id)}
              downloadProgress={activeDownloads[song.id]}
              onToggleDownload={onToggleDownload}
              onClick={onSongClick}
              onMoreOptions={onMoreOptions}
            />
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('made_for_you')}</h2>
            {onViewAll && (
                <button 
                    onClick={() => onViewAll('made_for_you')}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-white cursor-pointer transition-colors"
                >
                    View All
                </button>
            )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map(playlist => (
            <div 
                key={playlist.id} 
                onClick={() => onPlaylistClick && onPlaylistClick(playlist)}
                className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-transparent p-4 rounded-xl hover:shadow-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition cursor-pointer group"
            >
              <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-md shadow-sm">
                  <img src={playlist.coverUrl} alt={playlist.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {/* Hover Play Button for Playlist */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-rose-600 rounded-full p-3 text-white shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <Play size={20} fill="currentColor" className="ml-1" />
                      </div>
                  </div>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white truncate">{playlist.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{playlist.songCount} {t('songs')}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
