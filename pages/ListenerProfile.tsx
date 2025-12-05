import React, { useState, useRef } from 'react';
import { User } from '../types';
import { Music, User as UserIcon, Heart, Calendar, MapPin, Shield, Camera, History, PlayCircle, ListPlus, Clock, Settings, Users, Check } from 'lucide-react';
import { Button } from '../components/Button';

interface ListenerProfileProps {
  user: User;
  onUpdateProfile?: (updatedUser: User) => void;
}

// Mock Activity Data for prototype
const MOCK_ACTIVITY = [
    { id: 1, type: 'played', title: 'Tizita', subtitle: 'Aster Aweke', time: '2 mins ago', image: 'https://picsum.photos/200?random=1' },
    { id: 2, type: 'liked', title: 'Gue', subtitle: 'Gigi', time: '2 hours ago', image: 'https://picsum.photos/200?random=3' },
    { id: 3, type: 'playlist', title: 'Sunday Vibes', subtitle: 'Created new playlist', time: '1 day ago', image: 'https://picsum.photos/200?random=12' },
    { id: 4, type: 'played', title: 'Yene Konjo', subtitle: 'Teddy Afro', time: '2 days ago', image: 'https://picsum.photos/200?random=2' },
    { id: 5, type: 'liked', title: 'Roots of Azmari', subtitle: 'Album', time: '3 days ago', image: 'https://picsum.photos/200?random=5' },
];

const MOCK_FOLLOWING = [
    { id: 'a1', name: 'Aster Aweke', avatar: 'https://picsum.photos/200?random=1', type: 'Artist' },
    { id: 'a2', name: 'Teddy Afro', avatar: 'https://picsum.photos/200?random=2', type: 'Artist' },
    { id: 'u1', name: 'Selaham', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Selaham', type: 'User' },
    { id: 'u2', name: 'Dawit K.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dawit', type: 'User' },
];

const MOCK_FOLLOWERS = [
    { id: 'u3', name: 'Helen B.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Helen', type: 'User' },
    { id: 'u4', name: 'Kalkidan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kalkidan', type: 'User' },
    { id: 'u5', name: 'Yonas', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yonas', type: 'User' },
];

const UserListItem: React.FC<{ item: any }> = ({ item }) => {
    const [isFollowing, setIsFollowing] = useState(true);
    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <div className="flex items-center gap-4">
                <img src={item.avatar} className={`w-12 h-12 object-cover ${item.type === 'Artist' ? 'rounded-full' : 'rounded-full'}`} alt={item.name} />
                <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white">{item.name}</h4>
                    <p className="text-xs text-zinc-500">{item.type}</p>
                </div>
            </div>
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                  isFollowing 
                  ? 'border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:border-red-500 hover:text-red-500'
                  : 'bg-rose-600 border-rose-600 text-white hover:bg-rose-700'
              }`}
            >
                {isFollowing ? 'Following' : 'Follow'}
            </button>
        </div>
    );
}

export const ListenerProfile: React.FC<ListenerProfileProps> = ({ user, onUpdateProfile }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'following' | 'followers'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
      if (onUpdateProfile) {
          onUpdateProfile({
              ...user,
              name: editedName,
              avatar: avatarPreview
          });
      }
      setIsEditing(false);
  };

  const handleCancel = () => {
      setEditedName(user.name);
      setAvatarPreview(user.avatar);
      setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8">
      {/* Header Profile Card */}
      <div className="bg-gradient-to-r from-zinc-100 to-white border-zinc-200 dark:from-zinc-900 dark:to-zinc-950 rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-8 border dark:border-zinc-800 relative overflow-hidden transition-colors">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 dark:bg-rose-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10 group">
             <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white dark:bg-zinc-800 p-1 shadow-2xl ring-4 ring-zinc-200 dark:ring-zinc-800 relative overflow-hidden">
                {avatarPreview ? (
                    <img src={avatarPreview} alt={editedName} className="w-full h-full object-cover rounded-full" />
                ) : (
                    <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                        <UserIcon size={48} className="text-zinc-400 dark:text-zinc-500" />
                    </div>
                )}
                
                {isEditing && (
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Camera className="text-white mb-1" size={24} />
                        <span className="text-xs text-white font-medium">Change</span>
                    </div>
                )}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleAvatarChange}
                />
             </div>
        </div>
        
        <div className="text-center md:text-left flex-1 py-2 z-10 w-full relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-500 text-xs font-medium mb-4 border border-rose-500/20">
                <Shield size={12} /> Listener Account
            </div>
            
            {isEditing ? (
                <div className="mb-2">
                    <input 
                        type="text" 
                        value={editedName} 
                        onChange={(e) => setEditedName(e.target.value)}
                        className="bg-white dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-3xl md:text-4xl font-bold rounded-lg px-3 py-1 w-full md:w-auto focus:outline-none focus:border-rose-500"
                    />
                </div>
            ) : (
                <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">{user.name}</h1>
            )}
            
            <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-6">Music Enthusiast &bull; Zema Member</p>

            <div className="flex justify-center md:justify-start gap-6 text-sm">
                <button 
                    onClick={() => setActiveTab('following')}
                    className={`flex items-center gap-2 hover:text-rose-500 transition-colors ${activeTab === 'following' ? 'text-rose-500 font-bold' : 'text-zinc-500 dark:text-zinc-400'}`}
                >
                    <span className="font-bold text-zinc-900 dark:text-white text-lg">{MOCK_FOLLOWING.length}</span> Following
                </button>
                <button 
                    onClick={() => setActiveTab('followers')}
                    className={`flex items-center gap-2 hover:text-rose-500 transition-colors ${activeTab === 'followers' ? 'text-rose-500 font-bold' : 'text-zinc-500 dark:text-zinc-400'}`}
                >
                    <span className="font-bold text-zinc-900 dark:text-white text-lg">{MOCK_FOLLOWERS.length}</span> Followers
                </button>
            </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'border-rose-500 text-rose-500' : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}
          >
              Overview
          </button>
          <button 
            onClick={() => setActiveTab('following')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'following' ? 'border-rose-500 text-rose-500' : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}
          >
              Following
          </button>
          <button 
            onClick={() => setActiveTab('followers')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'followers' ? 'border-rose-500 text-rose-500' : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}
          >
              Followers
          </button>
      </div>

      {/* Overview Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Main Column */}
            <div className="md:col-span-2 space-y-6">
                
                {/* Favorite Genres */}
                <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm dark:shadow-none">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                        <Heart size={20} className="text-rose-600 dark:text-rose-500" /> Favorite Genres
                    </h3>
                    
                    {user.favoriteGenres && user.favoriteGenres.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {user.favoriteGenres.map((genre) => (
                                <div key={genre} className="px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center gap-3 group hover:border-rose-500/50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-500 group-hover:scale-110 transition-transform">
                                        <Music size={16} />
                                    </div>
                                    <span className="font-medium text-zinc-700 dark:text-zinc-200">{genre}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-lg">
                            <Music size={32} className="mx-auto text-zinc-400 dark:text-zinc-600 mb-2" />
                            <p className="text-zinc-500">No favorite genres selected yet.</p>
                        </div>
                    )}
                </div>

                {/* Recent Activity Feed */}
                <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm dark:shadow-none">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                        <History size={20} className="text-rose-600 dark:text-rose-500" /> Recent Activity
                    </h3>
                    
                    <div className="space-y-1">
                        {MOCK_ACTIVITY.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors group cursor-default">
                                {/* Activity Icon/Image */}
                                <div className="relative h-12 w-12 flex-shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md shadow-sm" />
                                    <div className="absolute -bottom-1 -right-1 bg-white dark:bg-zinc-950 rounded-full p-0.5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                        {item.type === 'played' && <PlayCircle size={14} className="text-emerald-500 fill-white dark:fill-black" />}
                                        {item.type === 'liked' && <Heart size={14} className="text-rose-500 fill-white dark:fill-black" />}
                                        {item.type === 'playlist' && <ListPlus size={14} className="text-blue-500" />}
                                    </div>
                                </div>
                                
                                {/* Text Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                                        {item.type === 'played' && <span className="text-zinc-500 dark:text-zinc-400 font-normal">Played </span>}
                                        {item.type === 'liked' && <span className="text-zinc-500 dark:text-zinc-400 font-normal">Liked </span>}
                                        {item.type === 'playlist' && <span className="text-zinc-500 dark:text-zinc-400 font-normal">Created </span>}
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-zinc-500 truncate">{item.subtitle}</p>
                                </div>

                                {/* Timestamp */}
                                <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                                    <Clock size={12} />
                                    {item.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Account Details Side Panel */}
            <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 h-fit shadow-sm dark:shadow-none">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Account Overview</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                        <div className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                            <Calendar size={14} />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs uppercase tracking-wider text-zinc-500">Joined</p>
                            <p className="text-sm text-zinc-900 dark:text-white">October 2023</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                        <div className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                            <MapPin size={14} />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs uppercase tracking-wider text-zinc-500">Region</p>
                            <p className="text-sm text-zinc-900 dark:text-white">Ethiopia</p>
                        </div>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800">
                        {isEditing ? (
                            <div className="flex gap-2">
                                <Button size="sm" variant="secondary" onClick={handleCancel} className="flex-1">
                                    Cancel
                                </Button>
                                <Button size="sm" onClick={handleSave} className="flex-1">
                                    Save
                                </Button>
                            </div>
                        ) : (
                            <Button 
                                className="w-full" 
                                variant="secondary"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Following List */}
      {activeTab === 'following' && (
          <div className="animate-in fade-in slide-in-from-right-4 space-y-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Following</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_FOLLOWING.map(item => (
                      <UserListItem key={item.id} item={item} />
                  ))}
              </div>
          </div>
      )}

      {/* Followers List */}
      {activeTab === 'followers' && (
          <div className="animate-in fade-in slide-in-from-right-4 space-y-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Followers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_FOLLOWERS.map(item => (
                      <UserListItem key={item.id} item={item} />
                  ))}
              </div>
          </div>
      )}

    </div>
  );
};