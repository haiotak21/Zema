import React from 'react';
import { Share2, Play, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Song, Artist } from '../types';
import { MOCK_SONGS, MOCK_ARTISTS } from '../constants';

interface WrappedProps {
    onBack: () => void;
}

export const Wrapped: React.FC<WrappedProps> = ({ onBack }) => {
    const { t } = useLanguage();

    const topSongs = MOCK_SONGS.slice(0, 5);
    const topArtist = MOCK_ARTISTS[0];

    return (
        <div className="min-h-screen bg-black text-white pb-20 animate-in fade-in slide-in-from-bottom-8 overflow-hidden font-sans">
            
            {/* Nav */}
            <div className="fixed top-0 left-0 right-0 p-4 z-50 flex justify-between items-center">
                <button onClick={onBack} className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors flex items-center gap-2 px-4">
                    <Share2 size={18} />
                    <span className="text-sm font-bold">{t('share_stats')}</span>
                </button>
            </div>

            {/* Background Animations */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-rose-600 rounded-full blur-[150px] opacity-40 animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-blue-600 rounded-full blur-[150px] opacity-40 animate-pulse delay-1000"></div>
                <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[150px] opacity-30"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto pt-24 px-6 space-y-16">
                
                {/* Intro Card */}
                <div className="text-center space-y-4 py-10">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 drop-shadow-lg">
                        {t('wrapped_banner')}
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-300 font-medium">{t('wrapped_subtitle')}</p>
                </div>

                {/* Minutes Listened */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center transform hover:scale-[1.02] transition-transform duration-500">
                    <p className="text-lg font-medium text-rose-300 uppercase tracking-widest mb-2">{t('minutes_listened')}</p>
                    <div className="text-7xl md:text-9xl font-black text-white tabular-nums tracking-tight">
                        24,582
                    </div>
                    <p className="text-zinc-400 mt-4">That's like flying from Addis to Toronto <span className="text-white font-bold">18 times</span>!</p>
                </div>

                {/* Top Artist */}
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[url('https://picsum.photos/800/800?random=1')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    <div className="relative p-8 md:p-12 flex flex-col items-center text-center">
                        <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-6">#1 Artist</span>
                        <div className="w-40 h-40 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden mb-6">
                            <img src={topArtist.image} className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-2">{topArtist.name}</h2>
                        <p className="text-xl text-zinc-300">Top Genre: {topArtist.bio?.split(' ')[0] || 'Ethio-Jazz'}</p>
                        <div className="mt-8 text-sm font-medium text-zinc-400">You are in the top 0.5% of listeners!</div>
                    </div>
                </div>

                {/* Top Songs List */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/5 rounded-3xl p-8">
                    <h2 className="text-3xl font-bold mb-8 text-center">{t('top_songs')}</h2>
                    <div className="space-y-4">
                        {topSongs.map((song, idx) => (
                            <div key={song.id} className="flex items-center gap-4 group p-2 rounded-xl hover:bg-white/5 transition-colors">
                                <span className="text-4xl font-black text-white/20 w-12 text-center group-hover:text-rose-500 transition-colors">{idx + 1}</span>
                                <img src={song.coverUrl} className="w-14 h-14 rounded-lg shadow-lg" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-lg truncate text-white">{song.title}</h3>
                                    <p className="text-zinc-400">{song.artist}</p>
                                </div>
                                <div className="p-2 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play size={20} fill="currentColor" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Logo */}
                <div className="text-center pb-8 opacity-50">
                    <p className="text-sm font-bold tracking-widest uppercase">Zema Wrapped 2024</p>
                </div>

            </div>
        </div>
    );
};