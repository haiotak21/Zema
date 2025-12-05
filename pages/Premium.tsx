
import React, { useState } from 'react';
import { Check, Zap, Crown, Music, WifiOff, Volume2 } from 'lucide-react';
import { Button } from '../components/Button';
import { useLanguage } from '../context/LanguageContext';
import { PaymentModal } from '../components/PaymentModal';

export const Premium: React.FC = () => {
    const { t } = useLanguage();
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const benefits = [
        { icon: <Music size={24} />, title: t('ad_free'), desc: "Enjoy music without interruptions." },
        { icon: <WifiOff size={24} />, title: t('offline_mode'), desc: "Download and listen anywhere." },
        { icon: <Volume2 size={24} />, title: t('high_quality'), desc: "Lossless audio streaming." },
        { icon: <Zap size={24} />, title: "Unlimited Skips", desc: "Play any song, any time." },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pb-20 animate-in fade-in slide-in-from-bottom-8">
            <PaymentModal 
                isOpen={isPaymentOpen} 
                onClose={() => setIsPaymentOpen(false)} 
                amount="199 ETB"
                planName="Zema Premium"
            />

            {/* Hero */}
            <div className="relative bg-zinc-900 dark:bg-zinc-950 py-20 px-6 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/40 via-zinc-900/0 to-zinc-900/0 pointer-events-none"></div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <span className="inline-block py-1 px-3 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4 border border-rose-500/30">
                        Go Premium
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        {t('premium_title')}
                    </h1>
                    <p className="text-xl text-zinc-400 mb-8 max-w-xl mx-auto">
                        Experience Ethiopian music like never before. Support artists directly and unlock exclusive features.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {benefits.map((b, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-100 dark:border-zinc-800 text-center">
                            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                {b.icon}
                            </div>
                            <h3 className="font-bold text-zinc-900 dark:text-white mb-2">{b.title}</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">{b.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Plans */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Plan */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('plan_free')}</h2>
                            <p className="text-zinc-500 mt-2">For casual listening.</p>
                        </div>
                        <div className="text-4xl font-black text-zinc-900 dark:text-white mb-8">
                            0 <span className="text-lg font-medium text-zinc-500">ETB / mo</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
                                <Check size={20} className="text-emerald-500" /> Ad-supported music
                            </li>
                            <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
                                <Check size={20} className="text-emerald-500" /> Standard audio quality
                            </li>
                            <li className="flex items-center gap-3 text-zinc-400">
                                <Check size={20} /> Offline playback
                            </li>
                        </ul>
                        <Button variant="secondary" className="w-full" disabled>
                            {t('current_plan')}
                        </Button>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-zinc-900 dark:bg-zinc-950 rounded-2xl p-8 border-2 border-rose-500 flex flex-col relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            RECOMMENDED
                        </div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Crown size={24} className="text-rose-500 fill-rose-500" />
                                {t('plan_premium')}
                            </h2>
                            <p className="text-zinc-400 mt-2">For the ultimate experience.</p>
                        </div>
                        <div className="text-4xl font-black text-white mb-8">
                            199 <span className="text-lg font-medium text-zinc-500">ETB / mo</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-white">
                                <Check size={20} className="text-rose-500" /> Ad-free music listening
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <Check size={20} className="text-rose-500" /> Download for offline
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <Check size={20} className="text-rose-500" /> High-fidelity audio
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <Check size={20} className="text-rose-500" /> Support Artists directly
                            </li>
                        </ul>
                        <Button 
                            className="w-full bg-rose-600 hover:bg-rose-700 text-white border-none py-3 text-lg shadow-lg shadow-rose-900/50"
                            onClick={() => setIsPaymentOpen(true)}
                        >
                            {t('subscribe')}
                        </Button>
                        <p className="text-center text-xs text-zinc-500 mt-4">Cancel anytime. Terms apply.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
