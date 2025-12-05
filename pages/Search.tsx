
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search as SearchIcon, X, Music, Disc, PlayCircle, Download, Check, Mic, Clock, ArrowUpLeft, MoreHorizontal } from 'lucide-react';
import { Song, Playlist, Artist, Album } from '../types';

interface SearchProps {
  songs: Song[];
  playlists: Playlist[];
  artists: Artist[];
  albums: Album[];
  onPlay: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  downloadedSongs: Set<string>;
  activeDownloads?: Record<string, number>;
  onToggleDownload: (song: Song) => void;
  onPlaylistClick?: (playlist: Playlist) => void;
  onSongClick: (song: Song) => void;
  onArtistClick: (artist: Artist) => void;
  onAlbumClick: (album: Album) => void;
  onMoreOptions?: (song: Song, e: React.MouseEvent) => void;
  initialCategory?: string;
}

const CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'songs', label: 'Songs' },
    { id: 'artists', label: 'Artists' },
    { id: 'albums', label: 'Albums' },
    { id: 'playlists', label: 'Playlists' },
];

const SUGGESTIONS = [
    "Aster Aweke", "Rophnan", "Tizita", "Ethio-Jazz", "Gigi", "Teddy Afro", "Oldies"
];

export const Search: React.FC<SearchProps> = ({ 
    songs, 
    playlists,
    artists,
    albums,
    onPlay, 
    currentSong, 
    isPlaying, 
    downloadedSongs, 
    activeDownloads = {}, 
    onToggleDownload,
    onPlaylistClick,
    onSongClick,
    onArtistClick,
    onAlbumClick,
    onMoreOptions,
    initialCategory = 'all'
}) => {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    
    // Update active category if initialCategory changes (e.g. re-navigation)
    useEffect(() => {
        setActiveCategory(initialCategory);
    }, [initialCategory]);
    
    // Voice Search State
    const [isVoiceOverlayOpen, setIsVoiceOverlayOpen] = useState(false);
    const [listeningStatus, setListeningStatus] = useState<'listening' | 'identifying' | 'found' | 'error'>('listening');
    const [listeningText, setListeningText] = useState("Listening...");
    
    const [recentSearches, setRecentSearches] = useState<string[]>(['Rophnan', 'Ethio-Jazz', 'Tizita']);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (q: string) => {
        setQuery(q);
        setShowSuggestions(false);
        if (q.trim() && !recentSearches.includes(q)) {
            setRecentSearches(prev => [q, ...prev].slice(0, 5));
        }
    };

    const startVoiceSearch = (e?: React.MouseEvent) => {
        if(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsVoiceOverlayOpen(true);
        setListeningStatus('listening');
        setListeningText("Listening...");

        // Simulate voice recognition logic
        if ('webkitSpeechRecognition' in window) {
            const recognition = new (window as any).webkitSpeechRecognition();
            recognition.lang = 'en-US'; 
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => {
                setListeningStatus('listening');
            };

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setListeningStatus('found');
                setListeningText("Found it!");
                
                setTimeout(() => {
                    handleSearch(transcript);
                    setIsVoiceOverlayOpen(false);
                }, 1000);
            };

            recognition.onerror = (event: any) => {
                setListeningStatus('error');
                setListeningText("Didn't catch that. Try again.");
            };

            recognition.onend = () => {
                // If ended without result manually handled
            };

            recognition.start();
        } else {
            // Fallback simulation
            setTimeout(() => {
                setListeningStatus('identifying');
                setListeningText("Identifying...");
            }, 2000);

            setTimeout(() => {
                setListeningStatus('found');
                setListeningText("Found it!");
                const demoQuery = "Tizita";
                
                setTimeout(() => {
                    handleSearch(demoQuery);
                    setIsVoiceOverlayOpen(false);
                }, 1000);
            }, 4000);
        }
    };

    const closeVoiceOverlay = () => {
        setIsVoiceOverlayOpen(false);
        setListeningStatus('listening'); 
    };

    const removeRecent = (item: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setRecentSearches(prev => prev.filter(i => i !== item));
    };

    const filteredSuggestions = useMemo(() => {
        if (!query) return [];
        return SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase()));
    }, [query]);

    const filteredSongs = useMemo(() => {
        if (query) {
            const lowerQuery = query.toLowerCase();
            return songs.filter(s => 
                s.title.toLowerCase().includes(lowerQuery) || 
                s.artist.toLowerCase().includes(lowerQuery) ||
                s.genre.toLowerCase().includes(lowerQuery)
            );
        }
        return activeCategory === 'songs' ? songs : [];
    }, [query, songs, activeCategory]);

    const filteredArtists = useMemo(() => {
        if (query) {
             return artists.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));
        }
        return activeCategory === 'artists' ? artists : [];
    }, [query, artists, activeCategory]);

    const filteredAlbums = useMemo(() => {
        if (query) {
             return albums.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.artist.toLowerCase().includes(query.toLowerCase()));
        }
        return activeCategory === 'albums' ? albums : [];
    }, [query, albums, activeCategory]);

    const filteredPlaylists = useMemo(() => {
        if (query) {
            return playlists.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
        }
        return activeCategory === 'playlists' ? playlists : [];
    }, [query, playlists, activeCategory]);

    const hasResults = filteredSongs.length > 0 || filteredArtists.length > 0 || filteredAlbums.length > 0 || filteredPlaylists.length > 0;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 min-h-screen">
            
            {/* Shazam-style Voice Modal (Not Full Screen) */}
            {isVoiceOverlayOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={closeVoiceOverlay}></div>
                    
                    {/* Modal Content */}
                    <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
                        {/* Gradient Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-rose-500/10 blur-3xl pointer-events-none rounded-full"></div>

                        <button 
                            onClick={closeVoiceOverlay} 
                            className="absolute top-4 right-4 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-zinc-400 hover:text-white transition-colors z-20"
                        >
                            <X size={20} />
                        </button>

                        {/* Visuals */}
                        <div className="relative my-8">
                             {/* Ripples */}
                             {(listeningStatus === 'listening' || listeningStatus === 'identifying') && (
                                <>
                                    <div className="absolute inset-0 bg-rose-500 rounded-full animate-ping opacity-20 duration-1000"></div>
                                    <div className="absolute inset-[-12px] bg-rose-500 rounded-full animate-ping opacity-10 duration-[2000ms] delay-300"></div>
                                    <div className="absolute inset-[-24px] bg-rose-500 rounded-full animate-ping opacity-5 duration-[3000ms] delay-500"></div>
                                </>
                             )}
                             
                             {/* Central Circle */}
                             <div className={`w-32 h-32 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 ${
                                 listeningStatus === 'found' ? 'bg-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.6)]' : 'bg-gradient-to-br from-rose-500 to-purple-600 shadow-[0_0_40px_rgba(225,29,72,0.6)]'
                             }`}>
                                 {listeningStatus === 'found' ? (
                                     <Check size={48} className="text-white animate-in zoom-in spin-in-12 duration-500" />
                                 ) : (
                                     <Mic size={48} className="text-white animate-pulse" />
                                 )}
                             </div>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2 text-center animate-pulse">{listeningText}</h2>
                        <p className="text-zinc-400 text-sm text-center font-medium">Sing, hum, or say a song name</p>
                    </div>
                </div>
            )}

            {/* Search Header */}
            <div className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-xl pb-4 pt-2 -mx-4 px-4 md:-mx-8 md:px-8 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
                <div className="relative mb-4">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" size={20} />
                    <input 
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter') handleSearch(query);
                        }}
                        placeholder="What do you want to listen to?"
                        className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full py-3.5 pl-12 pr-24 text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                        autoFocus
                    />
                    
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                        {query && (
                            <button 
                                onClick={() => setQuery('')}
                                className="p-1 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                            >
                                <X size={16} />
                            </button>
                        )}
                        <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700"></div>
                        <button 
                            type="button"
                            onMouseDown={(e) => e.preventDefault()} // Prevent input blur on click
                            onClick={startVoiceSearch}
                            className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all hover:scale-110 active:scale-95"
                            title="Search with Voice"
                        >
                            <Mic size={20} />
                        </button>
                    </div>
                </div>

                {/* Filter Chips - Always Visible */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                                activeCategory === cat.id 
                                ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white' 
                                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Suggestions Dropdown / Recent Searches */}
            {showSuggestions && !query && recentSearches.length > 0 && (
                <div>
                    <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 mb-3 px-2">Recent Searches</h3>
                    <div className="space-y-1">
                        {recentSearches.map(item => (
                            <div 
                                key={item} 
                                onClick={() => handleSearch(item)}
                                className="flex items-center justify-between p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg cursor-pointer group"
                            >
                                <div className="flex items-center gap-3">
                                    <Clock size={16} className="text-zinc-400" />
                                    <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
                                </div>
                                <button onClick={(e) => removeRecent(item, e)} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showSuggestions && query && filteredSuggestions.length > 0 && (
                <div>
                    <div className="space-y-1">
                        {filteredSuggestions.map(item => (
                            <div 
                                key={item} 
                                onClick={() => handleSearch(item)}
                                className="flex items-center gap-3 p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg cursor-pointer"
                            >
                                <SearchIcon size={16} className="text-zinc-400" />
                                <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Results */}
            {!query && activeCategory === 'all' && !showSuggestions ? (
                <div className="py-6">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Browse All</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {['Pop', 'Ethio-Jazz', 'Traditional', 'Gospel', 'Hip Hop', 'Reggae', 'Instrumental', 'Amapiano', 'R&B', 'Rock'].map((genre, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => handleSearch(genre)}
                                className="aspect-square rounded-xl p-4 font-bold text-xl relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform text-white shadow-sm"
                                style={{ backgroundColor: `hsl(${idx * 36}, 70%, 40%)` }}
                            >
                                <span className="relative z-10">{genre}</span>
                                <Music className="absolute -bottom-2 -right-2 text-black/20 rotate-12" size={80} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : !hasResults && query ? (
                <div className="text-center py-20 text-zinc-500">
                    <p className="text-lg">No results found {query ? `for "${query}"` : 'in this category'}</p>
                    <p className="text-sm">Please try a different spelling or keyword.</p>
                </div>
            ) : (
                <div className="space-y-8" onClick={() => setShowSuggestions(false)}>
                    
                    {/* Top Result (only for 'all' view with query) */}
                    {activeCategory === 'all' && query && (filteredSongs.length > 0 || filteredArtists.length > 0) && (
                         <section>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Top Result</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredArtists.length > 0 && query.length > 3 ? (
                                    <div 
                                      onClick={() => onArtistClick(filteredArtists[0])}
                                      className="bg-white dark:bg-zinc-900 p-6 rounded-2xl flex items-center gap-6 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition cursor-pointer group border border-zinc-200 dark:border-zinc-800"
                                    >
                                         <img src={filteredArtists[0].image} className="w-24 h-24 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform" alt={filteredArtists[0].name} />
                                         <div>
                                             <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">{filteredArtists[0].name}</h3>
                                             <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 dark:bg-black/40 text-xs font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-300">Artist</div>
                                         </div>
                                    </div>
                                ) : filteredSongs.length > 0 && (
                                    <div 
                                        onClick={() => onSongClick(filteredSongs[0])}
                                        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl flex items-center gap-6 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition cursor-pointer group relative border border-zinc-200 dark:border-zinc-800"
                                    >
                                        <img src={filteredSongs[0].coverUrl} className="w-24 h-24 rounded shadow-lg group-hover:scale-105 transition-transform" alt={filteredSongs[0].title} />
                                        <div>
                                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">{filteredSongs[0].title}</h3>
                                            <p className="text-zinc-500 dark:text-zinc-400 mb-2">{filteredSongs[0].artist}</p>
                                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 dark:bg-black/40 text-xs font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-300">Song</div>
                                        </div>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); onPlay(filteredSongs[0]); }}>
                                             <PlayCircle size={48} className="text-rose-600 dark:text-rose-500 fill-white dark:fill-black" />
                                        </div>
                                    </div>
                                )}
                            </div>
                         </section>
                    )}

                    {/* Songs */}
                    {(activeCategory === 'all' || activeCategory === 'songs') && filteredSongs.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Songs</h2>
                            <div className="space-y-1">
                                {filteredSongs.slice(0, activeCategory === 'all' ? 4 : undefined).map(song => {
                                    const isDownloading = activeDownloads[song.id] !== undefined;
                                    const isDownloaded = downloadedSongs.has(song.id);
                                    
                                    return (
                                     <div 
                                        key={song.id} 
                                        className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 group transition-colors cursor-pointer"
                                        onClick={() => onSongClick(song)}
                                     >
                                         <div className="flex items-center gap-4 flex-1">
                                             <div className="relative w-12 h-12 flex-shrink-0 cursor-pointer" onClick={(e) => { e.stopPropagation(); onPlay(song); }}>
                                                 <img src={song.coverUrl} className="w-full h-full object-cover rounded shadow-sm" alt={song.title} />
                                                 <div className={`absolute inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center transition-opacity ${currentSong?.id === song.id && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                                     <PlayCircle size={24} className="text-white" />
                                                 </div>
                                             </div>
                                             <div>
                                                 <p className={`font-medium ${currentSong?.id === song.id ? 'text-rose-600 dark:text-rose-500' : 'text-zinc-900 dark:text-white'}`}>{song.title}</p>
                                                 <p className="text-sm text-zinc-500 dark:text-zinc-400">{song.artist}</p>
                                             </div>
                                         </div>
                                         <div className="flex items-center">
                                            <button 
                                                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-3"
                                                onClick={(e) => { e.stopPropagation(); onToggleDownload(song); }}
                                                disabled={isDownloading}
                                            >
                                                {isDownloaded ? (
                                                    <Check className="text-emerald-500" size={20} />
                                                ) : isDownloading ? (
                                                    <span className="text-xs text-zinc-500">{Math.round(activeDownloads[song.id] || 0)}%</span>
                                                ) : (
                                                    <Download size={20} />
                                                )}
                                            </button>
                                            {onMoreOptions && (
                                                <button 
                                                    className="p-3 text-zinc-400 hover:text-zinc-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={(e) => onMoreOptions(song, e)}
                                                >
                                                    <MoreHorizontal size={20} />
                                                </button>
                                            )}
                                         </div>
                                     </div>
                                )})}
                            </div>
                        </section>
                    )}

                    {/* Artists */}
                    {(activeCategory === 'all' || activeCategory === 'artists') && filteredArtists.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Artists</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {filteredArtists.slice(0, activeCategory === 'all' ? 5 : undefined).map(artist => (
                                    <div 
                                      key={artist.id} 
                                      onClick={() => onArtistClick(artist)}
                                      className="flex flex-col items-center text-center group cursor-pointer p-4 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                                    >
                                        <img src={artist.image} className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg group-hover:scale-105 transition-transform" alt={artist.name} />
                                        <h3 className="font-bold text-zinc-900 dark:text-white truncate w-full">{artist.name}</h3>
                                        <p className="text-sm text-zinc-500">Artist</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Albums */}
                     {(activeCategory === 'all' || activeCategory === 'albums') && filteredAlbums.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Albums</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {filteredAlbums.slice(0, activeCategory === 'all' ? 5 : undefined).map(album => (
                                    <div 
                                      key={album.id} 
                                      onClick={() => onAlbumClick(album)}
                                      className="p-4 bg-zinc-100 dark:bg-zinc-900/40 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition cursor-pointer group"
                                    >
                                        <div className="relative aspect-square mb-3 overflow-hidden rounded-md shadow-md">
                                            <img src={album.coverUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={album.title} />
                                        </div>
                                        <h3 className="font-semibold text-zinc-900 dark:text-white truncate">{album.title}</h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{album.artist} • {album.year}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    
                     {/* Playlists */}
                     {(activeCategory === 'all' || activeCategory === 'playlists') && filteredPlaylists.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Playlists</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {filteredPlaylists.slice(0, activeCategory === 'all' ? 5 : undefined).map(playlist => (
                                    <div 
                                        key={playlist.id} 
                                        onClick={() => onPlaylistClick?.(playlist)}
                                        className="p-4 bg-zinc-100 dark:bg-zinc-900/40 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition cursor-pointer group"
                                    >
                                        <div className="relative aspect-square mb-3 overflow-hidden rounded-md shadow-md">
                                            <img src={playlist.coverUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={playlist.title} />
                                        </div>
                                        <h3 className="font-semibold text-zinc-900 dark:text-white truncate">{playlist.title}</h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{playlist.songCount} Songs</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            )}
        </div>
    );
};
