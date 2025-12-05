
import React, { useState } from 'react';
import { Song, Artist, Album } from '../types';
import { Play, Pause, BadgeCheck, MoreHorizontal, ArrowLeft, Shuffle, Users, Radio, Instagram, Twitter, Youtube, Globe, Pin, ExternalLink } from 'lucide-react';
import { Button } from '../components/Button';
import { SongCard } from '../components/SongCard';
import { useLanguage } from '../context/LanguageContext';

interface ArtistDetailProps {
  artist: Artist;
  topSongs: Song[];
  albums: Album[];
  similarArtists: Artist[];
  onBack: () => void;
  onPlaySong: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  onAlbumClick: (album: Album) => void;
  onArtistClick: (artist: Artist) => void;
  onRadioClick?: (artist: Artist) => void;
  onMoreOptions?: (song: Song, e: React.MouseEvent) => void;
}

export const ArtistDetail: React.FC<ArtistDetailProps> = ({
  artist,
  topSongs,
  albums,
  similarArtists,
  onBack,
  onPlaySong,
  currentSong,
  isPlaying,
  onAlbumClick,
  onArtistClick,
  onRadioClick,
  onMoreOptions
}) => {
  const { t } = useLanguage();
  const [isFollowing, setIsFollowing] = useState(false);

  // Fallback to avatar if banner not provided
  const bannerImage = artist.bannerUrl || artist.image;

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-40 animate-in fade-in slide-in-from-right-8 z-50 absolute inset-0 overflow-y-auto">
      
      {/* Hero Header */}
      <div className="relative h-[55vh] min-h-[450px] w-full overflow-hidden">
         <div 
             className="absolute inset-0 bg-cover bg-center"
             style={{ backgroundImage: `url(${bannerImage})` }}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
         
         {/* Navbar */}
         <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-20">
            <button onClick={onBack} className="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10">
                <ArrowLeft size={24} />
            </button>
            <div className="flex gap-2">
                <button className="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10">
                    <ExternalLink size={24} />
                </button>
                <button className="p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10">
                    <MoreHorizontal size={24} />
                </button>
            </div>
         </div>

         <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-7xl mx-auto z-10">
             <div className="flex items-center gap-2 text-white mb-2">
                 {artist.verified && <BadgeCheck className="text-blue-500 fill-blue-500/20" size={24} />}
                 <span className="text-sm font-medium uppercase tracking-widest text-blue-200">Verified Artist</span>
             </div>
             <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white mb-4 drop-shadow-lg tracking-tight">
                 {artist.name}
             </h1>
             <div className="flex items-center gap-6 mb-8 text-zinc-200">
                 <span className="font-medium text-lg">{artist.followers} {t('listeners')}</span>
                 
                 {/* Social Links if available */}
                 <div className="flex gap-4">
                     {artist.socialLinks?.instagram && <a href={artist.socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Instagram size={20} /></a>}
                     {artist.socialLinks?.twitter && <a href={artist.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Twitter size={20} /></a>}
                     {artist.socialLinks?.youtube && <a href={artist.socialLinks.youtube} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Youtube size={20} /></a>}
                     {artist.socialLinks?.website && <a href={artist.socialLinks.website} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Globe size={20} /></a>}
                 </div>
             </div>

             <div className="flex gap-4">
                 <button className="h-14 w-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all">
                     <Play size={28} fill="currentColor" className="ml-1" />
                 </button>
                 <Button 
                    variant="secondary" 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`h-14 rounded-full px-8 bg-transparent text-white border-white hover:bg-white/10 font-bold tracking-wide ${isFollowing ? 'bg-white/10' : ''}`}
                 >
                     {isFollowing ? t('following') : t('follow')}
                 </Button>
                 <Button 
                    variant="secondary" 
                    onClick={() => onRadioClick && onRadioClick(artist)}
                    className="h-14 w-14 rounded-full p-0 flex items-center justify-center bg-transparent text-white border-white hover:bg-white/10 font-bold tracking-wide"
                    title="Start Radio"
                 >
                     <Radio size={24} />
                 </Button>
             </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
          
          {/* Artist Pick / Pinned */}
          {artist.pinnedSongId && (
              <section>
                  <div className="flex items-center gap-2 mb-4">
                      <Pin size={16} className="text-zinc-500 fill-zinc-500" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Artist Pick</h3>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl flex items-center gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition cursor-pointer">
                      <img src={topSongs[0].coverUrl} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                          <h4 className="font-bold text-zinc-900 dark:text-white">{topSongs[0].title}</h4>
                          <p className="text-sm text-zinc-500">Latest Release</p>
                      </div>
                  </div>
              </section>
          )}

          {/* Popular Songs */}
          <section>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Popular</h2>
              <div className="space-y-1">
                  {topSongs.map((song, index) => (
                      <div 
                        key={song.id}
                        onClick={() => onPlaySong(song)}
                        className={`flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900/50 group cursor-pointer transition-colors ${currentSong?.id === song.id ? 'bg-zinc-100 dark:bg-zinc-900/80' : ''}`}
                      >
                          <span className="w-6 text-center text-zinc-500 font-medium text-sm">{index + 1}</span>
                          <div className="relative h-12 w-12 flex-shrink-0">
                               <img src={song.coverUrl} className="w-full h-full object-cover rounded shadow-sm" alt={song.title} />
                               <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${currentSong?.id === song.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                   {currentSong?.id === song.id && isPlaying ? <Pause size={20} className="text-white fill-white"/> : <Play size={20} className="text-white fill-white"/>}
                               </div>
                          </div>
                          <div className="flex-1 min-w-0">
                              <h3 className={`font-medium truncate ${currentSong?.id === song.id ? 'text-rose-600 dark:text-rose-500' : 'text-zinc-900 dark:text-white'}`}>{song.title}</h3>
                              <p className="text-xs text-zinc-500 truncate">{song.album}</p>
                          </div>
                          <div className="text-zinc-500 text-sm font-medium tabular-nums">
                              {Math.floor(song.duration / 60)}:{String(Math.floor(song.duration % 60)).padStart(2, '0')}
                          </div>
                          {onMoreOptions && (
                              <button 
                                  className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-all rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800" 
                                  onClick={(e) => onMoreOptions(song, e)}
                              >
                                  <MoreHorizontal size={16} />
                              </button>
                          )}
                      </div>
                  ))}
              </div>
          </section>

          {/* Discography */}
          <section>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Discography</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {albums.map(album => (
                      <div 
                         key={album.id}
                         onClick={() => onAlbumClick(album)}
                         className="p-4 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition cursor-pointer group"
                      >
                          <div className="relative aspect-square mb-3 overflow-hidden rounded-lg shadow-sm">
                              <img src={album.coverUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={album.title} />
                          </div>
                          <h3 className="font-semibold text-zinc-900 dark:text-white truncate">{album.title}</h3>
                          <p className="text-sm text-zinc-500">{album.year} • Album</p>
                      </div>
                  ))}
              </div>
          </section>

          {/* About */}
          <section className="relative rounded-2xl overflow-hidden bg-zinc-900 h-80 group cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${artist.image})` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 max-w-3xl">
                  <h2 className="text-3xl font-bold text-white mb-4">About</h2>
                  <p className="text-lg text-zinc-200 line-clamp-3 mb-2">{artist.bio}</p>
              </div>
          </section>

          {/* Fans Also Like */}
          <section>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Fans Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {similarArtists.map(sa => (
                      <div 
                        key={sa.id} 
                        onClick={() => onArtistClick(sa)}
                        className="flex flex-col items-center text-center group cursor-pointer"
                      >
                          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 shadow-lg">
                              <img src={sa.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={sa.name} />
                          </div>
                          <h3 className="font-bold text-zinc-900 dark:text-white hover:underline">{sa.name}</h3>
                          <p className="text-sm text-zinc-500">Artist</p>
                      </div>
                  ))}
              </div>
          </section>
      </div>
    </div>
  );
};
