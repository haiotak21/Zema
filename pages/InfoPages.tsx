
import React from 'react';
import { ArrowLeft, Users, Globe, Music, BarChart3, DollarSign, Shield, Mail, CheckCircle, Briefcase, MapPin, Clock, ChevronRight, Laptop } from 'lucide-react';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';

interface PageProps {
    onBack: () => void;
}

interface AboutUsProps extends PageProps {
    onSeeCareers: () => void;
}

interface ForArtistsProps extends PageProps {
    onSignUp: () => void;
}

// === ABOUT US ===
export const AboutUs: React.FC<AboutUsProps> = ({ onBack, onSeeCareers }) => (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white animate-in fade-in slide-in-from-bottom-8">
        <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
            <Logo className="h-8" />
            <button onClick={onBack} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
                <ArrowLeft size={24} />
            </button>
        </nav>
        
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-20">
            <section className="text-center space-y-6">
                <h1 className="text-5xl md:text-7xl font-black tracking-tight">Our Rhythm.<br/>Our Roots.</h1>
                <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                    Zema is more than a streaming platform. It is a digital home for Ethiopian music, preserving our heritage while amplifying the sounds of the future.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Globe, title: "Global Reach", desc: "Connecting the diaspora with the heartbeat of home." },
                    { icon: Music, title: "Authentic Content", desc: "From Tizita to Ethio-Jazz, curated by experts." },
                    { icon: Users, title: "Community First", desc: "Built by Ethiopians, for Ethiopians." }
                ].map((item, i) => (
                    <div key={i} className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 text-center">
                        <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <item.icon size={32} />
                        </div>
                        <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                        <p className="text-zinc-500">{item.desc}</p>
                    </div>
                ))}
            </section>

            <section className="bg-zinc-900 dark:bg-zinc-950 rounded-3xl p-12 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
                    <p className="text-zinc-400 max-w-lg mx-auto mb-8">We are always looking for passionate people to join our team in Addis Ababa and remotely.</p>
                    <Button 
                        className="bg-white text-black hover:bg-zinc-200 border-none"
                        onClick={onSeeCareers}
                    >
                        See Careers
                    </Button>
                </div>
            </section>
        </div>
    </div>
);

// === CAREERS ===
export const Careers: React.FC<PageProps> = ({ onBack }) => {
    const jobs = [
        { title: "Senior Frontend Engineer", dept: "Engineering", type: "Full-time", loc: "Remote / Addis Ababa" },
        { title: "Music Curator (Ethio-Jazz)", dept: "Content", type: "Contract", loc: "Addis Ababa" },
        { title: "Product Designer", dept: "Design", type: "Full-time", loc: "Remote" },
        { title: "Backend Developer (Node.js)", dept: "Engineering", type: "Full-time", loc: "Remote" },
        { title: "Marketing Specialist", dept: "Growth", type: "Full-time", loc: "Addis Ababa" },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white animate-in fade-in slide-in-from-bottom-8">
            <nav className="p-6">
                <button onClick={onBack} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium">
                    <ArrowLeft size={20} /> Back to About
                </button>
            </nav>

            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black mb-6">Build the Future of<br/>Ethiopian Music</h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Join a passionate team dedicated to preserving culture and empowering artists through technology.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-500 rounded-xl flex items-center justify-center mb-4">
                            <Laptop size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Remote Friendly</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Work from anywhere. We value output over hours.</p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500 rounded-xl flex items-center justify-center mb-4">
                            <Briefcase size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Competitive Pay</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Global standard salaries and equity options.</p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-500 rounded-xl flex items-center justify-center mb-4">
                            <Music size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Free Music</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Premium subscription and concert tickets on us.</p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                    Open Positions <span className="bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs px-2 py-1 rounded-full">{jobs.length}</span>
                </h2>

                <div className="space-y-4">
                    {jobs.map((job, i) => (
                        <div key={i} className="group bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-rose-300 dark:hover:border-rose-700 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-500 transition-colors">{job.title}</h3>
                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                                    <span className="flex items-center gap-1"><Briefcase size={14} /> {job.dept}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.loc}</span>
                                </div>
                            </div>
                            <Button variant="secondary" className="group-hover:bg-rose-50 dark:group-hover:bg-rose-900/20 group-hover:text-rose-600 dark:group-hover:text-rose-500 border-transparent">
                                Apply Now <ChevronRight size={16} className="ml-1" />
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl p-8">
                    <h3 className="font-bold text-xl mb-2">Don't see your role?</h3>
                    <p className="text-zinc-500 mb-6">We are always interested in meeting talented individuals.</p>
                    <a href="mailto:careers@zema.com" className="font-bold text-rose-600 hover:underline">Email us at careers@zema.com</a>
                </div>
            </div>
        </div>
    );
};

// === FOR ARTISTS ===
export const ForArtists: React.FC<ForArtistsProps> = ({ onBack, onSignUp }) => (
    <div className="min-h-screen bg-black text-white selection:bg-rose-500 selection:text-white animate-in fade-in">
        <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto absolute top-0 left-0 right-0 z-20">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                <Music className="text-rose-500" /> Zema for Artists
            </div>
            <div className="flex gap-4">
                <button onClick={onBack} className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Back to Site</button>
                <button onClick={onSignUp} className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform">Get Access</button>
            </div>
        </nav>

        <div className="relative pt-32 pb-20 px-6 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-rose-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="max-w-5xl mx-auto text-center relative z-10">
                <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
                    Your Music.<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">Your Business.</span>
                </h1>
                <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12">
                    Take control of your career with Zema for Artists. Get verified, analyze your audience, and monetize your craft instantly.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={onSignUp} className="h-14 px-10 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-rose-900/50">
                        Claim Your Profile
                    </button>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: BarChart3, title: "Real-time Analytics", desc: "See who is listening, from where, and which tracks are trending right now." },
                    { icon: DollarSign, title: "Transparent Payouts", desc: "Withdraw your earnings directly to local banks (CBE, Dashen) or mobile money (Telebirr)." },
                    { icon: Globe, title: "Global Exposure", desc: "Reach the Ethiopian diaspora and music lovers worldwide with zero barriers." }
                ].map((item, i) => (
                    <div key={i} className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-zinc-700 transition-colors group">
                        <item.icon size={40} className="text-zinc-500 group-hover:text-rose-500 transition-colors mb-6" />
                        <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                        <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// === LEGAL (Privacy & Terms) ===
const LegalPage: React.FC<{ title: string, content: React.ReactNode, onBack: () => void }> = ({ title, content, onBack }) => (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white animate-in fade-in">
        <div className="sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 z-50">
            <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                <h1 className="font-bold text-lg">{title}</h1>
                <button onClick={onBack} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </button>
            </div>
        </div>
        <div className="max-w-3xl mx-auto px-6 py-12 prose dark:prose-invert prose-zinc">
            {content}
        </div>
    </div>
);

export const PrivacyPolicy: React.FC<PageProps> = (props) => (
    <LegalPage 
        {...props} 
        title="Privacy Policy" 
        content={
            <>
                <h3>1. Introduction</h3>
                <p>At Zema, we value your privacy. This policy explains how we collect, use, and protect your personal information.</p>
                <h3>2. Data We Collect</h3>
                <ul>
                    <li>Account information (Name, Email, Password)</li>
                    <li>Usage data (Songs played, Playlists created)</li>
                    <li>Device information (IP address, Device type)</li>
                </ul>
                <h3>3. How We Use Your Data</h3>
                <p>We use your data to personalize your listening experience, improve our service, and compensate artists fairly.</p>
                <h3>4. Your Rights</h3>
                <p>You have the right to access, correct, or delete your personal data at any time through the app settings.</p>
                <p className="text-sm text-zinc-500 mt-8">Last updated: October 2024</p>
            </>
        }
    />
);

export const TermsOfService: React.FC<PageProps> = (props) => (
    <LegalPage 
        {...props} 
        title="Terms of Service" 
        content={
            <>
                <h3>1. Acceptance of Terms</h3>
                <p>By accessing or using Zema, you agree to be bound by these Terms of Service.</p>
                <h3>2. User Accounts</h3>
                <p>You are responsible for maintaining the confidentiality of your account credentials.</p>
                <h3>3. Content Usage</h3>
                <p>Music streamed on Zema is for personal, non-commercial use only. Unauthorized reproduction is prohibited.</p>
                <h3>4. Termination</h3>
                <p>We reserve the right to suspend or terminate accounts that violate these terms or engage in illegal activity.</p>
                <p className="text-sm text-zinc-500 mt-8">Last updated: October 2024</p>
            </>
        }
    />
);

// === CONTACT ===
export const ContactUs: React.FC<PageProps> = ({ onBack }) => {
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col animate-in fade-in slide-in-from-bottom-8">
            <nav className="p-6">
                <button onClick={onBack} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium">
                    <ArrowLeft size={20} /> Back
                </button>
            </nav>
            
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 md:p-12">
                    {!submitted ? (
                        <>
                            <div className="text-center mb-10">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Mail size={32} />
                                </div>
                                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Get in Touch</h1>
                                <p className="text-zinc-500 dark:text-zinc-400">We'd love to hear from you. Fill out the form below.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">First Name</label>
                                        <input required className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500 text-zinc-900 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Last Name</label>
                                        <input required className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500 text-zinc-900 dark:text-white" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Email Address</label>
                                    <input type="email" required className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500 text-zinc-900 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Message</label>
                                    <textarea required rows={4} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500 resize-none text-zinc-900 dark:text-white" />
                                </div>
                                <Button className="w-full h-12 text-lg shadow-lg shadow-rose-900/20">Send Message</Button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-10 animate-in zoom-in-95">
                            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Message Sent!</h2>
                            <p className="text-zinc-500 mb-8">Thank you for contacting us. We'll get back to you shortly.</p>
                            <Button onClick={onBack} variant="secondary">Back to Home</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
