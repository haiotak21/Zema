
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { KeyRound, ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ForgotPasswordProps {
  onSwitchToLogin: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSwitchToLogin }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
        setIsSubmitted(true);
    }, 1000);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'am' : 'en');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black p-4 relative overflow-hidden transition-colors duration-300">
       {/* Top Right Toggles */}
      <div className="absolute top-4 right-4 flex gap-3 z-20">
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
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-600/10 dark:from-rose-900/20 via-zinc-200/0 dark:via-zinc-900/0 to-zinc-200/0 dark:to-zinc-900/0 pointer-events-none"></div>
      
      <div className="w-full max-w-md z-10 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-6 shadow-xl dark:shadow-2xl">
              <KeyRound size={32} className="text-rose-600 dark:text-rose-500" />
           </div>
           <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Reset Password</h1>
           <p className="text-zinc-600 dark:text-zinc-400">Enter your email to receive instructions.</p>
        </div>

        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-2xl">
          {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors placeholder-zinc-400 dark:placeholder-zinc-600"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <Button className="w-full mt-8 h-12 text-lg shadow-lg shadow-rose-600/20 dark:shadow-rose-900/20" type="submit">
                  Send Reset Link
                </Button>
                
                <div className="mt-6 text-center">
                    <button type="button" onClick={onSwitchToLogin} className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex items-center justify-center gap-2 mx-auto transition-colors">
                        <ArrowLeft size={16} /> Back to Login
                    </button>
                </div>
              </form>
          ) : (
              <div className="text-center animate-in fade-in slide-in-from-bottom-4">
                  <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 rounded-lg p-4 mb-6 text-sm border border-emerald-500/20">
                      We have sent a password reset link to <span className="font-bold text-zinc-900 dark:text-white block mt-1">{email}</span>
                      <span className="block mt-1">Please check your inbox.</span>
                  </div>
                  <Button className="w-full" variant="secondary" onClick={onSwitchToLogin}>
                      Return to Login
                  </Button>
                  <p className="mt-4 text-xs text-zinc-500">
                      Didn't receive the email? <button onClick={() => setIsSubmitted(false)} className="text-rose-600 dark:text-rose-500 hover:underline">Try again</button>
                  </p>
              </div>
          )}
        </div>
        
        <div className="mt-8 text-center text-zinc-500 dark:text-zinc-600 text-xs">
          <p>© 2024 Zema Music Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
