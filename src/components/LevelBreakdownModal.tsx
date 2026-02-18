import { X, Trophy, Crown, Component, Award, Shield } from 'lucide-react';

interface LevelBreakdownModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentLevel: number;
}

export default function LevelBreakdownModal({ isOpen, onClose, currentLevel }: LevelBreakdownModalProps) {
    if (!isOpen) return null;

    const tiers = [
        { name: 'Bronze', levels: '1-4', icon: <Shield size={24} className="text-amber-700" />, color: 'bg-gradient-to-br from-orange-200 to-amber-700' },
        { name: 'Silver', levels: '5-9', icon: <Award size={24} className="text-slate-400" />, color: 'bg-gradient-to-br from-slate-200 to-slate-400' },
        { name: 'Gold', levels: '10-24', icon: <Trophy size={24} className="text-yellow-500" />, color: 'bg-gradient-to-br from-yellow-200 to-yellow-500' },
        { name: 'Platinum', levels: '25-49', icon: <Component size={24} className="text-cyan-400" />, color: 'bg-gradient-to-br from-cyan-100 to-cyan-500' },
        { name: 'Diamond', levels: '50+', icon: <Crown size={24} className="text-indigo-400" />, color: 'bg-gradient-to-br from-indigo-200 to-purple-500' },
    ];

    const getCurrentTier = (level: number) => {
        if (level >= 50) return 'Diamond';
        if (level >= 25) return 'Platinum';
        if (level >= 10) return 'Gold';
        if (level >= 5) return 'Silver';
        return 'Bronze';
    };

    const currentTierName = getCurrentTier(currentLevel);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-3xl p-6 relative shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                {/* Metallic Shine Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-700/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Trophy size={20} className="text-amber-400" />
                        Level Tiers
                    </h2>
                    <button onClick={onClose} className="p-2 bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="space-y-3">
                    {tiers.map((tier) => {
                        const isCurrent = tier.name === currentTierName;
                        return (
                            <div
                                key={tier.name}
                                className={`p-3 rounded-2xl border flex items-center justify-between relative overflow-hidden transition-all ${isCurrent ? 'bg-slate-800 border-amber-400/50 shadow-lg shadow-amber-900/20' : 'bg-slate-800/50 border-slate-700 opacity-80'}`}
                            >
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner bg-slate-900 border border-white/10`}>
                                        {tier.icon}
                                    </div>
                                    <div>
                                        <div className={`font-bold text-sm ${isCurrent ? 'text-white' : 'text-slate-300'}`}>{tier.name}</div>
                                        <div className="text-xs text-slate-500 font-mono">Lvl {tier.levels}</div>
                                    </div>
                                </div>
                                {isCurrent && (
                                    <div className="bg-amber-400 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10">
                                        Current
                                    </div>
                                )}
                                {/* Tier distinctive glow */}
                                <div className={`absolute inset-0 opacity-5 ${tier.color}`}></div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 text-center text-xs text-slate-500">
                    Earn points to unlock higher tiers and exclusive rewards.
                </div>
            </div>
        </div>
    );
}
