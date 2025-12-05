
import React, { useState } from 'react';
import { Bell, Music, Disc, Info, Check, Users, Mic2, X, Calendar, Trash2, ExternalLink, ArrowRight } from 'lucide-react';
import { Notification, Album, Playlist, Podcast, Artist } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/Button';
import { MOCK_ALBUMS, MOCK_PLAYLISTS, MOCK_PODCASTS, MOCK_ARTISTS } from '../constants';

interface NotificationsProps {
    onViewAlbum?: (album: Album) => void;
    onViewPlaylist?: (playlist: Playlist) => void;
    onViewPodcast?: (podcast: Podcast) => void;
    onViewArtist?: (artist: Artist) => void;
}

// Extended Mock Data with Target IDs
const INITIAL_NOTIFICATIONS: (Notification & { category: 'music' | 'social' | 'podcast' | 'system', targetType?: 'album' | 'playlist' | 'podcast' | 'artist', targetId?: string })[] = [
    {
        id: '1',
        title: 'New Album from Rophnan',
        message: 'Sidist (VI) is out now. Listen to the latest tracks directly on Zema. This album features a fusion of traditional Ethiopian sounds with modern electronic beats.',
        type: 'album_release',
        category: 'music',
        date: '2 hours ago',
        isRead: false,
        image: 'https://picsum.photos/200?random=21',
        targetType: 'album',
        targetId: '2' // Proxy to Teddy Afro album for demo
    },
    {
        id: '2',
        title: 'Selaham started following you',
        message: 'Follow them back to see their playlists and listening activity. Connect with friends to discover new music together.',
        type: 'system',
        category: 'social',
        date: '5 hours ago',
        isRead: false,
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Selaham',
        targetType: 'artist',
        targetId: '1'
    },
    {
        id: '3',
        title: 'Playlist Updated',
        message: '10 new songs added to "Addis Top 50". Check out the fresh hits dominating the charts this week.',
        type: 'playlist_update',
        category: 'music',
        date: 'Yesterday',
        isRead: true,
        image: 'https://picsum.photos/200?random=10',
        targetType: 'playlist',
        targetId: '1'
    },
    {
        id: '4',
        title: 'New Episode: Tech Talk',
        message: 'Ep 43: The Future of Fintech in Ethiopia is live. Join the conversation about digital payments and innovation.',
        type: 'system',
        category: 'podcast',
        date: 'Yesterday',
        isRead: true,
        image: 'https://picsum.photos/200?random=50',
        targetType: 'podcast',
        targetId: '1'
    },
    {
        id: '5',
        title: 'Welcome to Zema!',
        message: 'Thanks for joining. Start by following your favorite artists, creating playlists, and exploring our curated collections.',
        type: 'system',
        category: 'system',
        date: '3 days ago',
        isRead: true
    }
];

export const Notifications: React.FC<NotificationsProps> = ({ 
    onViewAlbum, 
    onViewPlaylist, 
    onViewPodcast, 
    onViewArtist 
}) => {
    const { t } = useLanguage();
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
    const [filter, setFilter] = useState<'all' | 'music' | 'social' | 'podcast'>('all');
    const [selectedNotification, setSelectedNotification] = useState<typeof INITIAL_NOTIFICATIONS[0] | null>(null);

    const filteredNotifications = notifications.filter(n => filter === 'all' || n.category === filter);

    const getIcon = (type: string, category: string) => {
        if (category === 'social') return <Users size={20} className="text-purple-500" />;
        if (category === 'podcast') return <Mic2 size={20} className="text-orange-500" />;
        switch(type) {
            case 'album_release': return <Disc size={20} className="text-rose-500" />;
            case 'playlist_update': return <Music size={20} className="text-blue-500" />;
            case 'system': return <Info size={20} className="text-zinc-500" />;
            default: return <Bell size={20} className="text-rose-500" />;
        }
    };

    const handleDelete = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
        if (selectedNotification?.id === id) {
            setSelectedNotification(null);
        }
    };

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const handleViewDetails = () => {
        if (!selectedNotification) return;

        const { targetType, targetId } = selectedNotification;

        if (targetType === 'album' && onViewAlbum) {
            const album = MOCK_ALBUMS.find(a => a.id === targetId) || MOCK_ALBUMS[0];
            onViewAlbum(album);
        } else if (targetType === 'playlist' && onViewPlaylist) {
            const playlist = MOCK_PLAYLISTS.find(p => p.id === targetId) || MOCK_PLAYLISTS[0];
            onViewPlaylist(playlist);
        } else if (targetType === 'podcast' && onViewPodcast) {
            const podcast = MOCK_PODCASTS.find(p => p.id === targetId) || MOCK_PODCASTS[0];
            onViewPodcast(podcast);
        } else if (targetType === 'artist' && onViewArtist) {
            const artist = MOCK_ARTISTS.find(a => a.id === targetId) || MOCK_ARTISTS[0];
            onViewArtist(artist);
        } else {
            // Fallback
            alert("This is a system notification. No specific page to view.");
        }
        
        setSelectedNotification(null);
    };

    return (
        <div className="max-w-4xl mx-auto pb-48 animate-in fade-in slide-in-from-bottom-4">
            <header className="mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{t('notifications')}</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">Stay updated with your favorite artists and friends.</p>
                </div>
                <button 
                    onClick={markAllRead}
                    className="text-sm font-medium text-rose-600 dark:text-rose-500 hover:underline"
                >
                    Mark all as read
                </button>
            </header>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {['all', 'music', 'podcast', 'social'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors border ${
                            filter === f 
                            ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white' 
                            : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map(notif => (
                        <div 
                            key={notif.id} 
                            onClick={() => {
                                // Mark as read on click
                                setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
                                setSelectedNotification(notif);
                            }}
                            className={`p-4 rounded-xl border transition-all hover:shadow-md flex gap-4 cursor-pointer group ${
                                notif.isRead 
                                    ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800' 
                                    : 'bg-rose-50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/20'
                            }`}
                        >
                            <div className="relative flex-shrink-0">
                                {notif.image ? (
                                    <img src={notif.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                                ) : (
                                    <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                        {getIcon(notif.type, notif.category)}
                                    </div>
                                )}
                                {!notif.isRead && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
                                )}
                                {notif.category === 'social' && notif.image && (
                                    <div className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full p-0.5 border-2 border-white dark:border-zinc-900">
                                        <Users size={10} className="text-white" />
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className={`font-semibold text-sm mb-1 truncate pr-2 ${notif.isRead ? 'text-zinc-900 dark:text-white' : 'text-zinc-900 dark:text-white'}`}>
                                        {notif.title}
                                    </h3>
                                    <span className="text-xs text-zinc-500 whitespace-nowrap group-hover:hidden">{notif.date}</span>
                                    <ArrowRight size={16} className="text-zinc-400 hidden group-hover:block" />
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                                    {notif.message}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 text-zinc-500">
                        <p>No notifications in this category.</p>
                    </div>
                )}
            </div>

            {/* Detail Popup Modal */}
            {selectedNotification && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" 
                        onClick={() => setSelectedNotification(null)}
                    />
                    <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
                        
                        {/* Header Image/Icon */}
                        <div className="h-32 w-full bg-zinc-100 dark:bg-zinc-950/50 relative flex items-center justify-center overflow-hidden">
                            {selectedNotification.image ? (
                                <>
                                    <div className="absolute inset-0 bg-cover bg-center blur-xl opacity-50 scale-110" style={{ backgroundImage: `url(${selectedNotification.image})` }}></div>
                                    <img src={selectedNotification.image} className="h-20 w-20 rounded-xl shadow-lg relative z-10 object-cover" />
                                </>
                            ) : (
                                <div className="h-16 w-16 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center shadow-lg relative z-10">
                                    {getIcon(selectedNotification.type, selectedNotification.category)}
                                </div>
                            )}
                            <button 
                                onClick={() => setSelectedNotification(null)}
                                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors z-20 backdrop-blur-sm"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 overflow-y-auto">
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                    selectedNotification.category === 'music' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                    selectedNotification.category === 'social' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                                    selectedNotification.category === 'podcast' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                    'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                                }`}>
                                    {selectedNotification.category}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-zinc-500 font-medium">
                                    <Calendar size={12} /> {selectedNotification.date}
                                </span>
                            </div>

                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 leading-snug">
                                {selectedNotification.title}
                            </h2>
                            
                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm mb-6">
                                {selectedNotification.message}
                            </p>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 flex gap-3">
                            <Button 
                                variant="secondary" 
                                className="flex-1 text-red-500 hover:text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20"
                                onClick={() => handleDelete(selectedNotification.id)}
                            >
                                <Trash2 size={16} className="mr-2" /> Delete
                            </Button>
                            
                            {selectedNotification.targetType ? (
                                <Button 
                                    className="flex-[2]"
                                    onClick={handleViewDetails}
                                >
                                    View Details <ExternalLink size={16} className="ml-2" />
                                </Button>
                            ) : (
                                <Button className="flex-[2]" disabled>
                                    View Details
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
