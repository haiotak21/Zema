
import React from 'react';
import { Podcast } from '../types';
import { Play } from 'lucide-react';

interface PodcastsProps {
    podcasts: Podcast[];
    onPodcastClick: (podcast: Podcast) => void;
    onCategoryClick?: (category: string) => void;
}

const CATEGORIES = [
    { name: 'News', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80' },
    { name: 'Comedy', image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&q=80' },
    { name: 'Education', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80' },
    { name: 'Technology', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80' },
    { name: 'Business', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
    { name: 'Health', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80' },
];

export const Podcasts: React.FC<PodcastsProps> = ({ podcasts, onPodcastClick, onCategoryClick }) => {
    return (
        <div className="space-y-8 pb-48 animate-in fade-in slide-in-from-bottom-4">
             <header className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6 transition-colors">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Podcasts</h1>
                    <p className="text-zinc-500 mt-1">Explore trending shows and episodes.</p>
                </div>
             </header>

             <section>
                 <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Top Shows</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                     {podcasts.map(podcast => (
                         <div 
                            key={podcast.id} 
                            onClick={() => onPodcastClick(podcast)}
                            className="group cursor-pointer p-4 bg-white dark:bg-zinc-900/40 rounded-xl border border-zinc-200 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                         >
                             <div className="relative aspect-square mb-4 rounded-lg overflow-hidden shadow-sm">
                                 <img src={podcast.coverUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={podcast.title} />
                                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                     <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-black">
                                         <Play size={24} fill="currentColor" className="ml-1"/>
                                     </div>
                                 </div>
                             </div>
                             <h3 className="font-bold text-zinc-900 dark:text-white truncate">{podcast.title}</h3>
                             <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Host: {podcast.host}</p>
                             <div className="flex items-center gap-2">
                                 <span className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-400">{podcast.category}</span>
                                 <span className="text-xs text-zinc-400">{podcast.episodes} eps</span>
                             </div>
                         </div>
                     ))}
                 </div>
             </section>

             <section>
                 <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Categories</h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                     {CATEGORIES.map((cat, i) => (
                         <div 
                             key={i} 
                             onClick={() => onCategoryClick && onCategoryClick(cat.name)}
                             className="group h-24 rounded-lg relative overflow-hidden flex items-center justify-center font-bold text-white hover:scale-[1.02] transition-transform cursor-pointer shadow-sm"
                         >
                             <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url(${cat.image})` }}></div>
                             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                             <span className="relative z-10">{cat.name}</span>
                         </div>
                     ))}
                 </div>
             </section>
        </div>
    );
};
