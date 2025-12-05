
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Bell, Shield, Smartphone, Zap, ChevronRight, CreditCard, LogOut, Trash2, Volume2, Wifi, Globe, MessageCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

interface SettingsProps {
  user: User;
  onLogout: () => void;
  onDeleteAccount: () => void;
  onNavigateToBilling: () => void;
  onContactSupport: () => void;
  onNavigate: (page: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ 
    user, 
    onLogout, 
    onDeleteAccount, 
    onNavigateToBilling,
    onContactSupport,
    onNavigate
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [streamingQuality, setStreamingQuality] = useState('High');
  const [downloadQuality, setDownloadQuality] = useState('Normal');
  const [autoplay, setAutoplay] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4">
      <header className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{t('settings')}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage your account preferences and subscription.</p>
      </header>

      <div className="space-y-8">
        
        {/* Subscription Card */}
        <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Subscription</h2>
            <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium mb-3">
                            <Zap size={12} className="text-yellow-400 fill-yellow-400" />
                            Current Plan
                        </div>
                        <h3 className="text-3xl font-bold mb-1">Zema Free</h3>
                        <p className="text-zinc-300 text-sm">Ad-supported listening, standard audio quality.</p>
                    </div>
                    <div className="flex flex-col gap-3 min-w-[200px]">
                        <Button className="bg-white text-black hover:bg-zinc-200 border-transparent w-full">
                            Explore Premium
                        </Button>
                        <button 
                            onClick={onNavigateToBilling}
                            className="text-xs text-zinc-400 hover:text-white underline flex items-center justify-center gap-1"
                        >
                            <CreditCard size={12} /> Manage Billing & History
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* Support Section (New) */}
        <section className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80">
                <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <MessageCircle size={18} className="text-blue-500" /> Help & Support
                </h3>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50" onClick={onContactSupport}>
                    <div>
                        <p className="font-medium text-zinc-900 dark:text-white">Contact Support</p>
                        <p className="text-xs text-zinc-500">Need help? Send us a message.</p>
                    </div>
                    <ChevronRight size={16} className="text-zinc-400" />
                </div>
                <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <div>
                        <p className="font-medium text-zinc-900 dark:text-white">FAQs</p>
                        <p className="text-xs text-zinc-500">Common questions answered.</p>
                    </div>
                    <ChevronRight size={16} className="text-zinc-400" />
                </div>
            </div>
        </section>

        {/* Language Settings */}
        <section className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80">
                <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Globe size={18} className="text-purple-500" /> Language & Region
                </h3>
            </div>
            <div className="p-4 flex items-center justify-between">
                <div>
                    <p className="font-medium text-zinc-900 dark:text-white">App Language</p>
                    <p className="text-xs text-zinc-500">Select your preferred language.</p>
                </div>
                <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg text-sm px-3 py-2 text-zinc-900 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none cursor-pointer"
                >
                    <option value="en">English</option>
                    <option value="am">Amharic (አማርኛ)</option>
                </select>
            </div>
        </section>

        {/* Playback Settings */}
        <section className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80">
                <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Volume2 size={18} className="text-rose-500" /> Audio & Playback
                </h3>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                
                {/* Streaming Quality */}
                <div className="p-4 flex items-center justify-between">
                    <div>
                        <p className="font-medium text-zinc-900 dark:text-white">Streaming Quality</p>
                        <p className="text-xs text-zinc-500">Higher quality uses more data.</p>
                    </div>
                    <select 
                        value={streamingQuality}
                        onChange={(e) => setStreamingQuality(e.target.value)}
                        className="bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg text-sm px-3 py-2 text-zinc-900 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none cursor-pointer"
                    >
                        <option>Low (Data Saver)</option>
                        <option>Normal</option>
                        <option>High</option>
                        <option>Lossless</option>
                    </select>
                </div>

                {/* Download Quality */}
                <div className="p-4 flex items-center justify-between">
                    <div>
                        <p className="font-medium text-zinc-900 dark:text-white">Download Quality</p>
                        <p className="text-xs text-zinc-500">Quality for offline playback.</p>
                    </div>
                    <select 
                        value={downloadQuality}
                        onChange={(e) => setDownloadQuality(e.target.value)}
                        className="bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg text-sm px-3 py-2 text-zinc-900 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none cursor-pointer"
                    >
                        <option>Normal</option>
                        <option>High</option>
                        <option>Lossless</option>
                    </select>
                </div>

                {/* Autoplay */}
                <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setAutoplay(!autoplay)}>
                    <div>
                        <p className="font-medium text-zinc-900 dark:text-white">Autoplay</p>
                        <p className="text-xs text-zinc-500">Keep playing similar songs when your music ends.</p>
                    </div>
                    <div className={`w-11 h-6 rounded-full transition-colors relative ${autoplay ? 'bg-rose-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transition-transform ${autoplay ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                </div>
            </div>
        </section>

        {/* Notifications */}
        <section className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80">
                <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Bell size={18} className="text-blue-500" /> Notifications
                </h3>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setPushNotifs(!pushNotifs)}>
                    <div>
                        <p className="font-medium text-zinc-900 dark:text-white">Push Notifications</p>
                        <p className="text-xs text-zinc-500">New releases, playlist updates.</p>
                    </div>
                    <div className={`w-11 h-6 rounded-full transition-colors relative ${pushNotifs ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transition-transform ${pushNotifs ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                </div>
                <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setEmailNotifs(!emailNotifs)}>
                    <div>
                        <p className="font-medium text-zinc-900 dark:text-white">Email Updates</p>
                        <p className="text-xs text-zinc-500">Product news and recommendations.</p>
                    </div>
                    <div className={`w-11 h-6 rounded-full transition-colors relative ${emailNotifs ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transition-transform ${emailNotifs ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                </div>
            </div>
        </section>

        {/* Account & Security */}
        <section className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80">
                <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Shield size={18} className="text-emerald-500" /> Account
                </h3>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                <div className="p-4 flex items-center justify-between">
                    <div>
                        <p className="font-medium text-zinc-900 dark:text-white">Email</p>
                        <p className="text-sm text-zinc-500">{user.role === UserRole.ADMIN ? 'zemasupport@contact.com' : `${user.name.toLowerCase().replace(/\s/g, '')}@example.com`}</p>
                    </div>
                    <Button variant="secondary" size="sm">Change</Button>
                </div>
                <div className="p-4 flex items-center justify-between">
                    <div>
                        <p className="font-medium text-zinc-900 dark:text-white">Password</p>
                        <p className="text-xs text-zinc-500">Last changed 3 months ago</p>
                    </div>
                    <Button variant="secondary" size="sm">Update</Button>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/10 flex items-center justify-between">
                    <div>
                        <p className="font-bold text-red-600 dark:text-red-500">Delete Account</p>
                        <p className="text-xs text-red-500/80">Permanently remove your data.</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30" onClick={onDeleteAccount}>
                        <Trash2 size={16} />
                    </Button>
                </div>
            </div>
        </section>

        <div className="pt-4 flex justify-center">
            <Button variant="secondary" onClick={onLogout} className="w-full sm:w-auto px-8 gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                <LogOut size={18} /> Log Out
            </Button>
        </div>

        <div className="text-center text-xs text-zinc-400 py-4">
            <p>Zema Music Platform v1.0.2</p>
            <div className="flex justify-center gap-4 mt-2">
                <button onClick={() => onNavigate('terms')} className="hover:underline">Terms of Service</button>
                <button onClick={() => onNavigate('privacy')} className="hover:underline">Privacy Policy</button>
            </div>
        </div>

      </div>
    </div>
  );
};
