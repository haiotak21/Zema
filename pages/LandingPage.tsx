
import React from 'react';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { WifiOff, Mic2, Music, Heart, Smartphone, Globe, Sun, Moon, PlayCircle, Headphones } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin, onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'am' : 'en');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white flex flex-col transition-colors duration-300 overflow-x-hidden">
      {/* Custom Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-delayed {
          0% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
          100% { transform: translateY(0px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full z-50">
        <Logo className="h-10 w-auto" />
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage} 
            className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors font-bold text-xs w-10 h-10 flex items-center justify-center"
            title="Switch Language"
          >
            {language === 'en' ? 'አማ' : 'EN'}
          </button>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={onLogin}
            className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium text-sm transition-colors"
          >
            Log In
          </button>
          <Button size="sm" onClick={onGetStarted} className="hidden md:inline-flex hover:scale-105 transition-transform">
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative flex-1 flex items-center justify-center px-6 py-20 min-h-[85vh]">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Floating Icons - Decorative */}
          <div className="absolute -top-20 left-10 text-rose-500/10 dark:text-rose-500/20 animate-float hidden lg:block pointer-events-none">
             <Music size={120} />
          </div>
          <div className="absolute top-40 right-0 text-blue-500/10 dark:text-blue-500/20 animate-float-delayed hidden lg:block pointer-events-none">
             <Headphones size={100} />
          </div>
          <div className="absolute bottom-0 left-20 text-purple-500/10 dark:text-purple-500/20 animate-float hidden lg:block pointer-events-none">
             <Mic2 size={80} />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-300 mb-4 backdrop-blur-sm shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            The #1 Ethiopian Music Streaming Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] text-zinc-900 dark:text-white animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 animate-pulse">Rhythms</span> <br /> of Ethiopia
          </h1>
          
          <p className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 leading-relaxed">
            Stream your favorite traditional, jazz, and modern Ethiopian tracks. 
            Enjoy offline playback, lyrics synchronization, and support local artists directly.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button size="lg" className="h-16 px-10 text-lg rounded-full shadow-xl shadow-rose-600/20 dark:shadow-rose-900/20 hover:scale-105 transition-transform bg-gradient-to-r from-rose-600 to-rose-500 border-none" onClick={onGetStarted}>
              Start Listening Free
            </Button>
            <button 
                onClick={onLogin}
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all hover:scale-105"
            >
                <PlayCircle size={20} className="text-rose-600 group-hover:scale-110 transition-transform" />
                <span>Login to Account</span>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-zinc-950 py-24 px-6 border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300 relative z-20">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 view-animate">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white">Why Choose Zema?</h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">Built for the culture, optimized for your experience.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <FeatureCard 
                    icon={<WifiOff className="text-rose-500" size={32} />}
                    title="Offline Mode"
                    description="Save data by downloading your favorite tracks and playlists to listen anywhere, anytime."
                    delay={0}
                />
                <FeatureCard 
                    icon={<Mic2 className="text-blue-500" size={32} />}
                    title="Artist Support"
                    description="We ensure fair monetization for Ethiopian artists. Your streams directly support the creators."
                    delay={100}
                />
                <FeatureCard 
                    icon={<Music className="text-emerald-500" size={32} />}
                    title="Curated Playlists"
                    description="From Tizita to Ethio-Jazz, explore expertly curated playlists for every mood and moment."
                    delay={200}
                />
                <FeatureCard 
                    icon={<Smartphone className="text-purple-500" size={32} />}
                    title="Data Saver"
                    description="Optimized streaming for low-bandwidth connections without compromising on soul."
                    delay={300}
                />
                 <FeatureCard 
                    icon={<Heart className="text-red-500" size={32} />}
                    title="Interactive Lyrics"
                    description="Sing along with real-time synchronized lyrics for thousands of tracks."
                    delay={400}
                />
                 <FeatureCard 
                    icon={<Globe className="text-amber-500" size={32} />}
                    title="Global Reach"
                    description="Connecting the Ethiopian diaspora through the universal language of music."
                    delay={500}
                />
            </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-black text-center transition-colors duration-300 relative z-20">
         <div className="flex justify-center mb-8">
            <Logo className="h-10 w-auto opacity-80 grayscale hover:grayscale-0 transition-all duration-500" />
         </div>
         <div className="flex flex-wrap justify-center gap-8 text-sm text-zinc-500 mb-8 font-medium">
            <button onClick={() => onNavigate('about')} className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">About Us</button>
            <button onClick={() => onNavigate('artists')} className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">For Artists</button>
            <button onClick={() => onNavigate('privacy')} className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">Terms of Service</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">Contact Support</button>
         </div>
         <p className="text-zinc-400 dark:text-zinc-600 text-xs">© 2024 Zema Music Platform. Made with love in Addis Ababa.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
    <div 
        className="group bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 hover:border-rose-200 dark:hover:border-rose-900/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="bg-white dark:bg-zinc-950 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-zinc-100 dark:border-zinc-800 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-500 transition-colors">{title}</h3>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">{description}</p>
    </div>
);
