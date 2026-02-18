import { ArrowLeft, Lock, Check } from 'lucide-react';
import type { Theme } from '../App';

interface ThemesScreenProps {
    currentTheme: Theme;
    onSelectTheme: (theme: Theme) => void;
    onBack: () => void;
    userLevel: number;
}

export default function ThemesScreen({ currentTheme, onSelectTheme, onBack, userLevel }: ThemesScreenProps) {

    const coolThemes: { id: Theme; name: string; colors: string }[] = [
        { id: 'default', name: 'Default', colors: 'bg-slate-900 border-slate-800' },
        { id: 'retro', name: '90s Retro', colors: 'bg-indigo-600 border-pink-500' },
        { id: 'space', name: 'Deep Space', colors: 'bg-black border-blue-900' },
        { id: 'bmx', name: 'BMX Dirt', colors: 'bg-stone-800 border-amber-600' },
        { id: 'train', name: 'Night Train', colors: 'bg-slate-800 border-red-900' },
    ];

    const metalThemes: { id: Theme; name: string; level: number; colors: string }[] = [
        { id: 'bronze', name: 'Bronze', level: 5, colors: 'bg-gradient-to-br from-orange-200 via-amber-600 to-orange-900 border-orange-400 text-orange-50' },
        { id: 'silver', name: 'Silver', level: 10, colors: 'bg-gradient-to-br from-slate-100 via-slate-400 to-slate-600 border-slate-300 text-slate-50' },
        { id: 'gold', name: 'Gold', level: 25, colors: 'bg-gradient-to-br from-yellow-100 via-yellow-400 to-yellow-700 border-yellow-200 text-yellow-50' },
        { id: 'platinum', name: 'Platinum', level: 50, colors: 'bg-gradient-to-br from-cyan-50 via-cyan-200 to-cyan-600 border-cyan-100 text-cyan-50' },
        { id: 'diamond', name: 'Diamond', level: 100, colors: 'bg-gradient-to-br from-blue-100 via-indigo-400 to-purple-800 border-indigo-200 text-indigo-50' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black/50 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-white/10">
                <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <span className="font-bold text-lg">App Themes</span>
            </div>

            <div className="p-4 space-y-8">

                {/* Cool Themes */}
                <section>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">Vibe Themes</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {coolThemes.map((theme) => (
                            <button
                                key={theme.id}
                                onClick={() => onSelectTheme(theme.id)}
                                className={`relative h-24 rounded-2xl border-2 transition-all overflow-hidden ${theme.colors} ${currentTheme === theme.id ? 'ring-2 ring-white scale-[1.02] shadow-xl' : 'opacity-80 hover:opacity-100'}`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center font-bold text-lg drop-shadow-md">
                                    {theme.name}
                                </div>
                                {currentTheme === theme.id && (
                                    <div className="absolute top-2 right-2 bg-white text-black p-1 rounded-full">
                                        <Check size={12} strokeWidth={4} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Metal/Level Themes */}
                <section>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">Level Unlocks</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {metalThemes.map((theme) => {
                            const isLocked = userLevel < theme.level;
                            return (
                                <button
                                    key={theme.id}
                                    disabled={isLocked}
                                    onClick={() => !isLocked && onSelectTheme(theme.id)}
                                    className={`relative h-32 rounded-2xl border-2 transition-all overflow-hidden flex flex-col items-center justify-center gap-1 shadow-lg
                                ${theme.colors} 
                                ${isLocked ? 'grayscale opacity-60 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-2xl hover:brightness-110'}
                                ${currentTheme === theme.id ? 'ring-4 ring-white/50 scale-[1.05] shadow-2xl opacity-100 grayscale-0 z-10' : ''}
                            `}
                                >
                                    <span className="font-bold text-lg drop-shadow-md text-shadow">{theme.name}</span>
                                    {isLocked && (
                                        <div className="flex items-center gap-1 text-xs font-bold bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                            <Lock size={10} /> Lvl {theme.level}
                                        </div>
                                    )}
                                    {currentTheme === theme.id && !isLocked && (
                                        <div className="absolute top-2 right-2 bg-white text-black p-1 rounded-full">
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </section>

            </div>
        </div>
    );
}
