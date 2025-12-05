import React, { useState } from 'react';
import { Send, User, ThumbsUp, MessageCircle } from 'lucide-react';
import { Button } from './Button';

interface Comment {
    id: string;
    user: string;
    avatar?: string;
    text: string;
    time: string;
    likes: number;
}

const MOCK_COMMENTS: Comment[] = [
    { id: '1', user: 'Selaham', text: 'This track brings back so many memories! The production is top notch.', time: '2 hours ago', likes: 14 },
    { id: '2', user: 'Dawit K.', text: 'Absolutely love the fusion of jazz and traditional instruments here.', time: '5 hours ago', likes: 8 },
    { id: '3', user: 'Helen B.', text: 'Does anyone know the producer on this?', time: '1 day ago', likes: 3 },
];

export const CommentsSection: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            user: 'You',
            text: newComment,
            time: 'Just now',
            likes: 0
        };

        setComments([comment, ...comments]);
        setNewComment('');
    };

    return (
        <div className="bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800/50">
            <div className="flex items-center gap-2 mb-6">
                <MessageCircle size={20} className="text-zinc-500" />
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Comments <span className="text-zinc-500 text-sm font-normal">({comments.length})</span></h3>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white font-bold shrink-0">
                    Y
                </div>
                <div className="flex-1 relative">
                    <input 
                        type="text" 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts..." 
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full py-2.5 pl-4 pr-12 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    />
                    <button 
                        type="submit"
                        disabled={!newComment.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </form>

            {/* List */}
            <div className="space-y-6">
                {comments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                        {comment.avatar ? (
                            <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                                <User size={20} />
                            </div>
                        )}
                        <div className="flex-1">
                            <div className="flex items-baseline justify-between">
                                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{comment.user}</h4>
                                <span className="text-xs text-zinc-500">{comment.time}</span>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">{comment.text}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <button className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    <ThumbsUp size={12} /> {comment.likes}
                                </button>
                                <button className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    Reply
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};