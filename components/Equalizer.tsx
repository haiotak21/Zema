import React, { useState } from 'react';
import { Sliders, X, RotateCcw } from 'lucide-react';

interface EqualizerProps {
    onClose: () => void;
}

const PRESETS = {
    'Flat': [0, 0, 0, 0, 0],
    'Bass Boost': [8, 5, 0, 0, -2],
    'Vocal': [-2, -1, 3, 5, 2],
    'Treble Boost': [-2, 0, 2, 5, 8],
    'Electronic': [5, 3, 0, 2, 5]
};

export const Equalizer: React.FC<EqualizerProps> = ({ onClose }) => {
    const [preset, setPreset] = useState<keyof typeof PRESETS>('Flat');
    const [values, setValues] = useState<number[]>(PRESETS['Flat']);

    const handlePresetChange = (name: string) => {
        setPreset(name as any);
        setValues([...PRESETS[name as keyof typeof PRESETS]]);
    };

    const handleSliderChange = (index: number, val: number) => {
        const newValues = [...values];
        newValues[index] = val;
        setValues(newValues);
        setPreset('Flat'); // Custom
    };

    return (
        <div className="absolute bottom-full right-0 mb-4 w-72 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-4 animate-in slide-in-from-bottom-5 fade-in z-50">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Sliders size={16} /> Equalizer
                </h3>
                <button onClick={onClose} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                    <X size={16} />
                </button>
            </div>

            <div className="mb-6">
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 block">Preset</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {Object.keys(PRESETS).map(p => (
                        <button
                            key={p}
                            onClick={() => handlePresetChange(p)}
                            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                                preset === p
                                    ? 'bg-rose-600 text-white border-rose-600'
                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-end h-32 gap-3 px-2">
                {['60Hz', '230Hz', '910Hz', '4kHz', '14kHz'].map((label, i) => (
                    <div key={label} className="flex flex-col items-center gap-2 h-full flex-1">
                        <input
                            type="range"
                            min="-12"
                            max="12"
                            step="1"
                            value={values[i]}
                            onChange={(e) => handleSliderChange(i, parseInt(e.target.value))}
                            className="h-full w-1 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-rose-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [writing-mode:vertical-lr] direction-rtl"
                            style={{ WebkitAppearance: 'slider-vertical' } as any}
                        />
                        <span className="text-[10px] text-zinc-500 font-mono">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};