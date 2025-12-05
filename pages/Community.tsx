
import React, { useState, useRef, useEffect } from 'react';
import { Users, MessageCircle, Send, Heart, Music, User } from 'lucide-react';
import { Button } from '../components/Button';

// Mock Friend Activity
const MOCK_ACTIVITY = [
    { id: 1, user: 'Selaham', action: 'is listening to', target: 'Roots of Azmari', time: '2m ago', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Selaham' },
    { id: 2, user: 'Dawit K.', action: 'liked', target: 'Ethio-Jazz Classics', time: '15m ago', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dawit' },
    { id: 3, user: 'Helen B.', action: 'created playlist', target: 'Summer Vibes 24', time: '1h ago', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Helen' },
    { id: 4, user: 'Yonas', action: 'shared', target: 'Tizita (Remix)', time: '3h ago', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yonas' },
];

// Mock Chat Messages
const MOCK_MESSAGES = [
    { id: '1', user: 'Selaham', text: 'Has anyone heard the new Rophnan album yet?', time: '10:30 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Selaham' },
    { id: '2', user: 'Dawit K.', text: 'Yes! Track 3 is absolute fire 🔥', time: '10:32 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dawit' },
    { id: '3', user: 'Helen B.', text: 'I need to check it out. Is it more electronic or traditional?', time: '10:35 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Helen' },
];

export const Community: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'feed' | 'chat'>('feed');
    const [chatMessages, setChatMessages] = useState(MOCK_MESSAGES);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            id: Date.now().toString(),
            user: 'You',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            avatar: '' // Will use fallback placeholder
        };

        setChatMessages([...chatMessages, msg]);
        setNewMessage('');
    };

    useEffect(() => {
        if (activeTab === 'chat') {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages, activeTab]);

    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-260px)] md:h-[calc(100vh-220px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 px-4 md:px-0 mt-4 md:mt-0 mb-20">
            <header className="mb-4 md:mb-6 flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        <Users size={28} className="text-rose-600 md:w-8 md:h-8" /> Community
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm md:text-base">Connect with other music lovers.</p>
                </div>
                
                <div className="bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg flex gap-1">
                    <button 
                        onClick={() => setActiveTab('feed')}
                        className={`px-3 md:px-4 py-1.5 rounded-md text-xs md:text-sm font-medium transition-colors ${activeTab === 'feed' ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
                    >
                        Feed
                    </button>
                    <button 
                        onClick={() => setActiveTab('chat')}
                        className={`px-3 md:px-4 py-1.5 rounded-md text-xs md:text-sm font-medium transition-colors ${activeTab === 'chat' ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
                    >
                        Chat
                    </button>
                </div>
            </header>

            <div className="flex-1 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm flex flex-col min-h-0 relative">
                
                {/* === ACTIVITY FEED === */}
                {activeTab === 'feed' && (
                    <div className="p-4 md:p-6 overflow-y-auto space-y-4 md:space-y-6 pb-24 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
                        <h3 className="font-bold text-zinc-900 dark:text-white mb-2 md:mb-4">Live Updates</h3>
                        {MOCK_ACTIVITY.map((activity, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                                <div className="relative">
                                    <img src={activity.image} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900" alt={activity.user} />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center border border-white dark:border-zinc-900">
                                        {activity.action.includes('listening') && <Music size={10} className="text-blue-500" />}
                                        {activity.action.includes('liked') && <Heart size={10} className="text-rose-500" />}
                                        {activity.action.includes('playlist') && <Users size={10} className="text-emerald-500" />}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-zinc-800 dark:text-zinc-200 text-sm">
                                        <span className="font-bold hover:underline cursor-pointer">{activity.user}</span> 
                                        <span className="text-zinc-500 dark:text-zinc-400"> {activity.action} </span>
                                        <span className="font-bold hover:underline cursor-pointer text-rose-600 dark:text-rose-500">{activity.target}</span>
                                    </p>
                                    <p className="text-xs text-zinc-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                        
                        <div className="text-center py-8">
                            <p className="text-zinc-500 text-sm">That's all for now!</p>
                        </div>
                    </div>
                )}

                {/* === GLOBAL CHAT === */}
                {activeTab === 'chat' && (
                    <div className="flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
                            {chatMessages.map((msg) => (
                                <div key={msg.id} className={`flex gap-3 ${msg.user === 'You' ? 'flex-row-reverse' : ''}`}>
                                    {msg.avatar ? (
                                        <img src={msg.avatar} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-rose-600 flex items-center justify-center text-white text-xs font-bold">
                                            YOU
                                        </div>
                                    )}
                                    <div className={`flex flex-col max-w-[75%] ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="text-xs font-bold text-zinc-900 dark:text-white">{msg.user}</span>
                                            <span className="text-[10px] text-zinc-500">{msg.time}</span>
                                        </div>
                                        <div className={`px-3 py-2 md:px-4 md:py-2.5 rounded-2xl text-sm ${
                                            msg.user === 'You' 
                                            ? 'bg-rose-600 text-white rounded-tr-none' 
                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none'
                                        }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-3 md:p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                            <form onSubmit={handleSendMessage} className="flex gap-2 md:gap-3">
                                <input 
                                    type="text" 
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="flex-1 bg-zinc-100 dark:bg-zinc-900 border-none rounded-full px-4 py-2.5 md:py-3 text-sm focus:ring-2 focus:ring-rose-500 outline-none text-zinc-900 dark:text-white placeholder-zinc-500"
                                    placeholder="Type a message..."
                                />
                                <button 
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="p-2.5 md:p-3 bg-rose-600 text-white rounded-full hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Space at the bottom */}
            <div className="h-6"></div> 
        </div>
    );
};
