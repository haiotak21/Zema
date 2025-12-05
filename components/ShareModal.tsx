
import React, { useState } from 'react';
import { X, Copy, Check, Twitter, Facebook, Mail, MessageCircle, Send, Link as LinkIcon } from 'lucide-react';
import { Song, Album, Playlist } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Song | Album | Playlist | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, item }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Determine content details
  const title = item ? (item as any).title : "Zema Music";
  const subtitle = item ? ((item as Song).artist || (item as Album).artist || ((item as Playlist).songCount ? `${(item as Playlist).songCount} Songs` : '')) : "Ethiopian Streaming Platform";
  const coverUrl = item ? (item as any).coverUrl : "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop";
  const type = item ? (item as any).artist ? 'Song' : (item as any).year ? 'Album' : 'Playlist' : 'App';

  // Construct URL (in a real app, this would be a deep link)
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://zema-music.com';
  const shareText = `Check out ${title} on Zema!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { 
      name: 'Twitter', 
      icon: <Twitter size={22} />, 
      color: 'bg-[#1DA1F2]', 
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}` 
    },
    { 
      name: 'Facebook', 
      icon: <Facebook size={22} />, 
      color: 'bg-[#4267B2]', 
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` 
    },
    { 
      name: 'Telegram', 
      icon: <Send size={22} />, 
      color: 'bg-[#0088cc]', 
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}` 
    },
    { 
      name: 'WhatsApp', 
      icon: <MessageCircle size={22} />, 
      color: 'bg-[#25D366]', 
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}` 
    },
    { 
      name: 'Email', 
      icon: <Mail size={22} />, 
      color: 'bg-zinc-500', 
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}` 
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Content - Bottom Sheet on Mobile, Centered on Desktop */}
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-t-2xl sm:rounded-2xl shadow-2xl border-t sm:border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300">
        
        {/* Handle Bar for Mobile */}
        <div className="w-12 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-auto mt-3 mb-1 sm:hidden"></div>

        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800">
          <div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Share</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Spread the music</p>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-950/30 flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="inline-block px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-[10px] font-bold text-zinc-600 dark:text-zinc-300 mb-1 uppercase tracking-wider">
                    {type}
                </div>
                <h4 className="font-bold text-zinc-900 dark:text-white truncate">{title}</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{subtitle}</p>
            </div>
        </div>

        {/* Social Grid */}
        <div className="p-6 pb-2">
            <div className="flex justify-between sm:justify-center gap-4 overflow-x-auto pb-4 sm:pb-0 scrollbar-hide">
                {socialLinks.map((link) => (
                    <div key={link.name} className="flex flex-col items-center gap-2 flex-shrink-0">
                        <a 
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 active:scale-95 transition-transform ${link.color}`}
                            title={`Share to ${link.name}`}
                            onClick={onClose}
                        >
                            {link.icon}
                        </a>
                        <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">{link.name}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Copy Link Section */}
        <div className="p-6 pt-2">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-100 dark:bg-black/50 border border-zinc-200 dark:border-zinc-800">
                <div className="p-2.5 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                    <LinkIcon size={18} className="text-zinc-500 dark:text-zinc-300" />
                </div>
                <div className="flex-1 min-w-0 px-1">
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium mb-0.5">Page Link</p>
                    <p className="text-sm text-zinc-900 dark:text-zinc-200 truncate font-mono select-all">{shareUrl}</p>
                </div>
                <button 
                    onClick={handleCopy}
                    className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                        copied 
                        ? 'bg-emerald-500 text-white shadow-lg' 
                        : 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:opacity-90'
                    }`}
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};
