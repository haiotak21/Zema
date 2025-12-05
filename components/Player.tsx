
import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Mic2, Signal, WifiOff, Volume2, ChevronDown, ListMusic, Maximize2, Minimize2, MonitorSpeaker, PictureInPicture2, Heart, PlaySquare, X, Volume1, VolumeX, Sliders, Gauge } from 'lucide-react';
import { Song, LyricLine } from '../types';
import { Equalizer } from './Equalizer';
import { DevicePicker } from './DevicePicker';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  isDataSaver: boolean;
  isLyricsOpen: boolean;
  queue?: Song[];
  togglePlay: () => void;
  toggleDataSaver: () => void;
  toggleLyrics: () => void;
  onSeek: (time: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onPlaySong?: (song: Song) => void;
  onShare?: (item?: any) => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const Player: React.FC<PlayerProps> = ({
  currentSong,
  isPlaying,
  progress,
  isDataSaver,
  isLyricsOpen,
  queue = [],
  togglePlay,
  toggleDataSaver,
  toggleLyrics,
  onSeek,
  onNext,
  onPrev,
  onPlaySong,
  onShare
}) => {
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  
  // Local State
  const [isQueueOpen, setQueueOpen] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);
  
  // New States
  const [showEQ, setShowEQ] = useState(false);
  const [showDevices, setShowDevices] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Auto-scroll lyrics
  useEffect(() => {
    if (isLyricsOpen && currentSong?.lyrics && lyricsContainerRef.current) {
      const activeIndex = currentSong.lyrics.findIndex(l => l.time > progress) - 1;
      if (activeIndex >= 0) {
        const activeElement = lyricsContainerRef.current.children[activeIndex] as HTMLElement;
        if (activeElement) {
            activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [progress, isLyricsOpen, currentSong]);

  const toggleSpeed = () => {
      const speeds = [1, 1.2, 1.5, 2];
      const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
      setPlaybackSpeed(speeds[nextIndex]);
  };

  if (!currentSong) return null;

  // Miniplayer Mode
  if (isMiniPlayer) {
      return (
          <div className="fixed bottom-4 right-4 z-[60] w-72 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 overflow-hidden animate-in fade-in slide-in-from-bottom-10">
              <div className="relative aspect-video group">
                  <img src={currentSong.coverUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={onPrev}><SkipBack size={20} className="text-white" /></button>
                      <button onClick={togglePlay} className="p-2 bg-white rounded-full text-black"><Play size={20} fill="currentColor" /></button>
                      <button onClick={onNext}><SkipForward size={20} className="text-white" /></button>
                  </div>
                  <button 
                    onClick={() => setIsMiniPlayer(false)} 
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                      <X size={14} />
                  </button>
              </div>
              <div className="p-3">
                  <h4 className="font-bold text-white truncate">{currentSong.title}</h4>
                  <p className="text-xs text-zinc-400 truncate">{currentSong.artist}</p>
                  <div className="w-full h-1 bg-zinc-700 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-rose-500" style={{ width: `${(progress / currentSong.duration) * 100}%` }}></div>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <>
      {/* Full Screen Overlay (Combined Lyrics & Player) */}
      {(isFullScreen || isLyricsOpen) && (
        <div className="fixed inset-0 z-[70] bg-white dark:bg-zinc-950 flex flex-col animate-in fade-in slide-in-from-bottom-10 duration-300">
           {/* Background Blur */}
           <div 
                className="absolute inset-0 bg-cover bg-center blur-3xl opacity-30 dark:opacity-20 pointer-events-none scale-110"
                style={{ backgroundImage: `url(${currentSong.coverUrl})` }}
           />
           
           {/* Fullscreen Header */}
           <div className="relative z-10 flex items-center justify-between p-6">
              <button onClick={() => { setFullScreen(false); if(isLyricsOpen) toggleLyrics(); }} className="p-2 bg-zinc-100 dark:bg-white/10 rounded-full text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/20 transition-colors">
                  <ChevronDown />
              </button>
              <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Now Playing</p>
                  <p className="font-bold text-zinc-900 dark:text-white text-sm">{currentSong.album}</p>
              </div>
              <button className="p-2 text-zinc-900 dark:text-white">
                  <MoreHorizontalIcon />
              </button>
           </div>
           
           <div className="flex-1 overflow-y-auto px-6 relative z-10">
              <div className="max-w-6xl mx-auto h-full flex flex-col md:flex-row items-center justify-center gap-12 py-8">
                
                {/* Left: Cover Art (Hidden on small screens if lyrics active) */}
                <div className={`w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 transition-all duration-500 ${isLyricsOpen ? 'hidden lg:block w-64 h-64 opacity-80' : 'block'}`}>
                    <img src={currentSong.coverUrl} className="w-full h-full object-cover" />
                </div>

                {/* Right: Lyrics or Metadata */}
                <div className="flex-1 w-full max-w-2xl h-full flex flex-col">
                    {isLyricsOpen ? (
                         <div className="flex-1 overflow-y-auto text-center space-y-8 mask-gradient pb-20 no-scrollbar" ref={lyricsContainerRef}>
                            {currentSong.lyrics && currentSong.lyrics.length > 0 ? (
                            currentSong.lyrics.map((line, idx) => {
                                const isActive = progress >= line.time && 
                                                (idx === currentSong.lyrics!.length - 1 || progress < currentSong.lyrics![idx + 1].time);
                                return (
                                <p 
                                    key={idx} 
                                    className={`text-2xl md:text-4xl font-bold transition-all duration-300 cursor-pointer ${isActive ? 'text-rose-500 scale-105 origin-center' : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
                                    onClick={() => onSeek(line.time)}
                                >
                                    {line.text}
                                </p>
                                )
                            })
                            ) : (
                            <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                                <Mic2 size={48} className="mb-4 opacity-50" />
                                <p>No lyrics available for this track.</p>
                            </div>
                            )}
                         </div>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center text-center md:text-left text-zinc-900 dark:text-white space-y-6">
                             <div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-2">{currentSong.title}</h2>
                                <p className="text-2xl md:text-3xl text-zinc-500 dark:text-zinc-400">{currentSong.artist}</p>
                             </div>
                             <div className="flex gap-4 justify-center md:justify-start">
                                 <span className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-white/10 text-xs font-medium">{currentSong.genre}</span>
                                 <span className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-white/10 text-xs font-medium">{formatTime(currentSong.duration)}</span>
                             </div>
                        </div>
                    )}
                </div>

              </div>
           </div>

           {/* Fullscreen Controls */}
           <div className="p-8 pb-12 relative z-10 max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{formatTime(progress)}</span>
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{formatTime(currentSong.duration)}</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full cursor-pointer mb-8 group" onClick={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 const percent = (e.clientX - rect.left) / rect.width;
                 onSeek(percent * currentSong.duration);
              }}>
                <div 
                  className="h-full bg-rose-600 rounded-full relative group-hover:bg-rose-500 transition-all" 
                  style={{ width: `${(progress / currentSong.duration) * 100}%` }}
                >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                  <button onClick={() => setIsLiked(!isLiked)} className={isLiked ? "text-rose-500" : "text-zinc-400"}>
                      <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
                  </button>
                  
                  <div className="flex items-center gap-8">
                      <button className={`text-zinc-900 dark:text-white hover:text-rose-500 transition-colors ${isShuffle ? 'text-rose-600' : 'text-zinc-400'}`} onClick={() => setIsShuffle(!isShuffle)}>
                          <Shuffle size={24} />
                      </button>
                      <button onClick={onPrev} className="text-zinc-900 dark:text-white hover:scale-110 transition-transform">
                          <SkipBack size={32} fill="currentColor" />
                      </button>
                      <button 
                        onClick={togglePlay}
                        className="h-16 w-16 flex items-center justify-center rounded-full bg-rose-600 text-white hover:scale-105 transition-transform shadow-lg shadow-rose-600/20"
                      >
                        {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                      </button>
                      <button onClick={onNext} className="text-zinc-900 dark:text-white hover:scale-110 transition-transform">
                          <SkipForward size={32} fill="currentColor" />
                      </button>
                      <button className={`text-zinc-900 dark:text-white hover:text-rose-500 transition-colors ${isRepeat ? 'text-rose-600' : 'text-zinc-400'}`} onClick={() => setIsRepeat(!isRepeat)}>
                          <Repeat size={24} />
                      </button>
                  </div>

                  <button onClick={toggleLyrics} className={`text-zinc-900 dark:text-white transition-colors ${isLyricsOpen ? 'text-rose-500' : 'text-zinc-400'}`}>
                      <Mic2 size={24} />
                  </button>
              </div>
           </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      {/* 
          Restricted to md:left-64 on desktop to avoid covering the sidebar bottom actions.
          Full width on mobile to ensure accessibility.
      */}
      <div className={`fixed bottom-0 left-0 md:left-64 right-0 z-[60] bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 transition-colors ${isMiniPlayer ? 'hidden' : 'block'}`}>
        
        {/* Modals Positioned Above Player */}
        {showEQ && <Equalizer onClose={() => setShowEQ(false)} />}
        {showDevices && <DevicePicker onClose={() => setShowDevices(false)} />}

        {/* Queue Popover */}
        {isQueueOpen && (
            <div className="absolute bottom-[calc(100%+12px)] right-4 w-80 md:w-96 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-4 animate-in slide-in-from-bottom-5 fade-in duration-200 max-h-[60vh] flex flex-col">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-bold text-zinc-900 dark:text-white">Queue</h3>
                    <button onClick={() => setQueueOpen(false)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"><X size={16}/></button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-1 pr-2">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Now Playing</p>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 mb-4">
                        <img src={currentSong.coverUrl} className="w-10 h-10 rounded object-cover" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-rose-600 dark:text-rose-500 truncate">{currentSong.title}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{currentSong.artist}</p>
                        </div>
                        <div className="mr-2">
                             <div className="flex gap-0.5 items-end h-3">
                                 <div className="w-1 bg-rose-500 animate-[music-bar_1s_ease-in-out_infinite]" style={{height: '60%'}}></div>
                                 <div className="w-1 bg-rose-500 animate-[music-bar_1.5s_ease-in-out_infinite_0.1s]" style={{height: '100%'}}></div>
                                 <div className="w-1 bg-rose-500 animate-[music-bar_1.2s_ease-in-out_infinite_0.2s]" style={{height: '40%'}}></div>
                             </div>
                        </div>
                    </div>

                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Next Up</p>
                    {queue.length > 0 ? (
                        queue.map((song, i) => (
                            <div 
                                key={`${song.id}-${i}`} 
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer group"
                                onClick={() => {
                                    if(onPlaySong) onPlaySong(song);
                                }}
                            >
                                <span className="text-zinc-400 text-xs w-4 text-center group-hover:hidden">{i + 1}</span>
                                <Play size={12} className="text-zinc-900 dark:text-white w-4 hidden group-hover:block" fill="currentColor"/>
                                
                                <img src={song.coverUrl} className="w-8 h-8 rounded object-cover opacity-80" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate group-hover:text-rose-600 dark:group-hover:text-rose-500">{song.title}</p>
                                    <p className="text-xs text-zinc-500 truncate">{song.artist}</p>
                                </div>
                                <span className="text-xs text-zinc-400">{formatTime(song.duration)}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-zinc-500 text-center py-4">Queue is empty</p>
                    )}
                </div>
            </div>
        )}

        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Track Info */}
          <div className="flex items-center gap-4 w-[30%] min-w-0">
            <div className="relative group">
                <img src={currentSong.coverUrl} alt="cover" className="h-14 w-14 rounded bg-zinc-200 dark:bg-zinc-800 object-cover shadow-sm" />
                <button 
                    onClick={() => setFullScreen(true)}
                    className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Maximize2 size={12} />
                </button>
            </div>
            <div className="truncate">
              <h4 className="text-zinc-900 dark:text-white font-medium text-sm hover:underline cursor-pointer truncate">{currentSong.title}</h4>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs hover:underline cursor-pointer truncate">{currentSong.artist}</p>
            </div>
            <button 
                onClick={() => setIsLiked(!isLiked)} 
                className={`hidden md:block ml-2 ${isLiked ? 'text-rose-600' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'}`}
            >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Center: Controls */}
          <div className="flex flex-col items-center gap-1.5 flex-1 max-w-[40%]">
            <div className="flex items-center gap-6">
              <button 
                className={`text-zinc-400 hover:text-zinc-700 dark:hover:text-white hidden md:block transition-colors ${isShuffle ? 'text-rose-600 dark:text-rose-500' : ''}`}
                onClick={() => setIsShuffle(!isShuffle)}
                title="Shuffle"
              >
                  <Shuffle size={18} />
              </button>
              <button className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-white transition-colors" onClick={onPrev}>
                  <SkipBack size={20} fill="currentColor" />
              </button>
              <button 
                className="h-9 w-9 flex items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-105 transition shadow-sm"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
              </button>
              <button className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-white transition-colors" onClick={onNext}>
                  <SkipForward size={20} fill="currentColor" />
              </button>
              <button 
                className={`text-zinc-400 hover:text-zinc-700 dark:hover:text-white hidden md:block transition-colors ${isRepeat ? 'text-rose-600 dark:text-rose-500' : ''}`}
                onClick={() => setIsRepeat(!isRepeat)}
                title="Repeat"
              >
                  <Repeat size={18} />
              </button>
            </div>
            
            <div className="flex items-center gap-2 w-full max-w-md group">
              <span className="text-[10px] text-zinc-500 dark:text-zinc-500 w-8 text-right font-medium tabular-nums">{formatTime(progress)}</span>
              <div className="flex-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full cursor-pointer relative" onClick={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 const percent = (e.clientX - rect.left) / rect.width;
                 onSeek(percent * currentSong.duration);
              }}>
                <div 
                  className="absolute top-0 left-0 h-full bg-zinc-800 dark:bg-white rounded-full group-hover:bg-rose-600 transition-colors" 
                  style={{ width: `${(progress / currentSong.duration) * 100}%` }}
                >
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-500 w-8 font-medium tabular-nums">{formatTime(currentSong.duration)}</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-2 lg:gap-3 w-[30%] min-w-0">
             
             {/* Playback Speed */}
             <button 
                onClick={toggleSpeed}
                className="hidden lg:flex items-center justify-center h-8 w-8 text-xs font-bold rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                title="Playback Speed"
             >
                 {playbackSpeed}x
             </button>

             {/* EQ Toggle */}
             <button
                onClick={() => setShowEQ(!showEQ)}
                className={`hidden lg:block p-1.5 rounded-md transition-colors ${showEQ ? 'text-rose-600 dark:text-rose-500' : 'text-zinc-400 hover:text-zinc-800 dark:hover:text-white'}`}
                title="Equalizer"
             >
                 <Sliders size={18} />
             </button>

             {/* Lyrics Toggle */}
             <button 
              onClick={toggleLyrics}
              className={`p-1.5 rounded-md transition-colors ${isLyricsOpen ? 'text-rose-600 dark:text-rose-500' : 'text-zinc-400 hover:text-zinc-800 dark:hover:text-white'}`}
              title="Lyrics"
            >
              <Mic2 size={18} />
            </button>
            
            {/* Queue Toggle */}
            <button 
              onClick={() => setQueueOpen(!isQueueOpen)}
              className={`p-1.5 rounded-md transition-colors ${isQueueOpen ? 'text-rose-600 dark:text-rose-500' : 'text-zinc-400 hover:text-zinc-800 dark:hover:text-white'}`}
              title="Queue"
            >
              <ListMusic size={18} />
            </button>

            {/* Device Picker */}
            <button 
                onClick={() => setShowDevices(!showDevices)}
                className={`hidden md:block p-1.5 rounded-md transition-colors ${showDevices ? 'text-rose-600 dark:text-rose-500' : 'text-zinc-400 hover:text-zinc-800 dark:hover:text-white'}`}
                title="Connect Device"
            >
                <MonitorSpeaker size={18} />
            </button>

            {/* Volume Control */}
            <div className="hidden md:flex items-center gap-2 w-20 group">
               <button onClick={() => setVolume(v => v === 0 ? 80 : 0)} className="text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-white">
                  {volume === 0 ? <VolumeX size={18} /> : volume < 50 ? <Volume1 size={18} /> : <Volume2 size={18} />}
               </button>
               <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume} 
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-300 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:opacity-0 group-hover:[&::-webkit-slider-thumb]:opacity-100 transition-all"
               />
            </div>

            {/* Miniplayer */}
            <button 
                onClick={() => setIsMiniPlayer(true)}
                className="hidden lg:block text-zinc-400 hover:text-zinc-800 dark:hover:text-white"
                title="Miniplayer"
            >
                <PictureInPicture2 size={18} />
            </button>

            {/* Full Screen Toggle */}
            <button 
                onClick={() => setFullScreen(!isFullScreen)}
                className="hidden sm:block text-zinc-400 hover:text-zinc-800 dark:hover:text-white"
                title="Full Screen"
            >
                {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>

        </div>
      </div>
      
      {/* Mini Player Placeholder CSS */}
      <style>{`
        @keyframes music-bar {
            0% { transform: scaleY(0.5); }
            50% { transform: scaleY(1); }
            100% { transform: scaleY(0.5); }
        }
      `}</style>
    </>
  );
};

// Helper Icon for Fullscreen header
const MoreHorizontalIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="6" cy="12" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="18" cy="12" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
