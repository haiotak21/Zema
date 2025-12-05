import React from 'react';
import { Smartphone, MonitorSpeaker, Laptop, X, Check } from 'lucide-react';

interface DevicePickerProps {
    onClose: () => void;
}

export const DevicePicker: React.FC<DevicePickerProps> = ({ onClose }) => {
    return (
        <div className="absolute bottom-full right-0 mb-4 w-64 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-4 animate-in slide-in-from-bottom-5 fade-in z-50">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    Connect Device
                </h3>
                <button onClick={onClose} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                    <X size={16} />
                </button>
            </div>

            <div className="space-y-1">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-rose-600 dark:text-rose-500 font-medium">
                    <Laptop size={20} />
                    <div className="flex-1 text-left">
                        <p className="text-sm">Web Player</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Current Device</p>
                    </div>
                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                </button>

                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 transition-colors">
                    <Smartphone size={20} />
                    <div className="flex-1 text-left">
                        <p className="text-sm">iPhone 14 Pro</p>
                        <p className="text-xs text-zinc-500">Zema Mobile</p>
                    </div>
                </button>

                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 transition-colors">
                    <MonitorSpeaker size={20} />
                    <div className="flex-1 text-left">
                        <p className="text-sm">Living Room Speaker</p>
                        <p className="text-xs text-zinc-500">Google Cast</p>
                    </div>
                </button>
            </div>
        </div>
    );
};