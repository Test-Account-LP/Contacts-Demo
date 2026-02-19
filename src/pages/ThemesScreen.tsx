import { ArrowLeft, Lock, Check } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';
import { themes } from '../theme/ThemeTokens';
import type { ThemeName } from '../theme/ThemeTokens';

interface ThemesScreenProps {
    onBack: () => void;
    userLevel: number;
}

export default function ThemesScreen({ onBack, userLevel }: ThemesScreenProps) {
    const { themeName: currentTheme, setTheme: onSelectTheme, tokens } = useTheme();

    const coolThemes: { id: ThemeName; name: string }[] = [
        { id: 'default', name: 'Default' },
        { id: 'retro', name: '90s Retro' },
        { id: 'space', name: 'Deep Space' },
        { id: 'bmx', name: 'BMX Dirt' },
        { id: 'train', name: 'Night Train' },
    ];

    const metalThemes: { id: ThemeName; name: string; level: number }[] = [
        { id: 'bronze', name: 'Bronze', level: 5 },
        { id: 'silver', name: 'Silver', level: 10 },
        { id: 'gold', name: 'Gold', level: 25 },
        { id: 'platinum', name: 'Platinum', level: 50 },
        { id: 'diamond', name: 'Diamond', level: 100 },
    ];

    return (
        <div className="min-h-screen pb-20" style={{ backgroundColor: tokens.primaryBackground, color: tokens.primaryText }}>
            {/* Header */}
            <div
                className="sticky top-0 z-10 px-4 py-4 flex items-center gap-4 border-b backdrop-blur-md"
                style={{ backgroundColor: tokens.headerBackground, borderColor: tokens.dividerColor }}
            >
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <span className="font-bold text-lg">App Themes</span>
                </div>
            </div>

            <div className="p-4 space-y-8">

                {/* Cool Themes */}
                <section>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">Vibe Themes</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {coolThemes.map((theme) => {
                            const optionTokens = themes[theme.id];
                            return (
                                <button
                                    key={theme.id}
                                    onClick={() => onSelectTheme(theme.id)}
                                    className={`relative h-24 rounded-2xl border-2 transition-all overflow-hidden ${currentTheme === theme.id ? 'scale-[1.02] shadow-xl' : 'opacity-80 hover:opacity-100'}`}
                                    style={{
                                        backgroundColor: optionTokens.secondaryBackground,
                                        borderColor: currentTheme === theme.id ? optionTokens.primaryText : optionTokens.borderColor,
                                        color: optionTokens.primaryText
                                    }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center font-bold text-lg drop-shadow-md">
                                        {theme.name}
                                    </div>
                                    {currentTheme === theme.id && (
                                        <div
                                            className="absolute top-2 right-2 p-1 rounded-full z-20 shadow-md"
                                            style={{ backgroundColor: '#ffffff', color: '#000000' }}
                                        >
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Metal/Level Themes */}
                <section>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">Level Unlocks</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {metalThemes.map((theme) => {
                            const isLocked = userLevel < theme.level;
                            const optionTokens = themes[theme.id];
                            const isMetallic = !!optionTokens.metallicGradient;

                            return (
                                <button
                                    key={theme.id}
                                    disabled={isLocked}
                                    onClick={() => !isLocked && onSelectTheme(theme.id)}
                                    className={`relative h-32 rounded-2xl border-2 transition-all overflow-hidden flex flex-col items-center justify-center gap-1 shadow-lg
                                ${isLocked ? 'grayscale opacity-60 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-2xl hover:brightness-110'}
                                ${currentTheme === theme.id ? 'scale-[1.05] shadow-2xl opacity-100 grayscale-0 z-10 ring-4 ring-white/30' : ''}
                            `}
                                    style={{
                                        background: isMetallic ? optionTokens.metallicGradient : optionTokens.primaryAccent,
                                        borderColor: optionTokens.borderColor,
                                        color: optionTokens.primaryText
                                    }}
                                >
                                    <span className="font-bold text-lg drop-shadow-md text-shadow">{theme.name}</span>
                                    {isLocked && (
                                        <div
                                            className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full backdrop-blur-sm"
                                            style={{ backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff' }}
                                        >
                                            <Lock size={10} /> Lvl {theme.level}
                                        </div>
                                    )}
                                    {currentTheme === theme.id && !isLocked && (
                                        <div
                                            className="absolute top-2 right-2 p-1 rounded-full z-20 shadow-md"
                                            style={{ backgroundColor: '#ffffff', color: '#000000' }}
                                        >
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
