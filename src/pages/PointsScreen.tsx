import { useState } from 'react';
import { ArrowLeft, Trophy, Zap, Repeat, Send, Database, Globe, Share2, Shield, BookOpen, Check } from 'lucide-react';
import type { UserProfile } from '../App';
import QuestModal from '../components/QuestModal';
import LevelBreakdownModal from '../components/LevelBreakdownModal';
import { quests, type Quest } from '../data/quests';

interface PointsScreenProps {
    profile: UserProfile;
    onBack: () => void;
    onQuestComplete: (questId: string, points: number) => void;
}

export default function PointsScreen({ profile, onBack, onQuestComplete }: PointsScreenProps) {
    const POINTS_PER_LEVEL = 15000;
    const currentLevelPoints = profile.points % POINTS_PER_LEVEL;
    const progress = (currentLevelPoints / POINTS_PER_LEVEL) * 100;
    const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
    const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false);

    const earnActions = [
        { icon: <Repeat size={18} className="text-blue-500" />, title: 'Swap Assets', points: '+50 pts', limit: 'Max 5/day' },
        { icon: <Send size={18} className="text-emerald-500" />, title: 'Send Transaction', points: '+20 pts', limit: 'Max 10/day' },
        { icon: <Database size={18} className="text-purple-500" />, title: 'Stake ALGO', points: '+100 pts', limit: 'Weekly' },
        { icon: <Globe size={18} className="text-sky-500" />, title: 'Governance Vote', points: '+500 pts', limit: 'Per Session' },
        { icon: <Zap size={18} className="text-amber-500" />, title: 'Daily Spin', points: '+10-100 pts', limit: 'Daily' },
        { icon: <Share2 size={18} className="text-pink-500" />, title: 'Bridge Assets', points: '+200 pts', limit: 'Monthly' },
    ];

    const achievements = [
        { id: 1, title: 'First Steps', desc: 'Complete profile', icon: '🎯', unlocked: true, progress: '1/1' },
        { id: 2, title: 'Trader', desc: 'Swap 50 times', icon: '💱', unlocked: true, progress: '34/50' },
        { id: 3, title: 'Whale', desc: 'Hold 10k ALGO', icon: '🐋', unlocked: false, progress: '2.4k/10k' },
        { id: 4, title: 'Diamond Hands', desc: 'Stake for 3mo', icon: '💎', unlocked: false, progress: '1/3 mo' },
        { id: 5, title: 'Networker', desc: '10 Friends', icon: '🤝', unlocked: true, progress: '12/10' },
        { id: 6, title: 'Power User', desc: 'Level 10', icon: '⚡', unlocked: false, progress: 'Lvl 7' },
    ];

    const leaderboard = [
        { rank: 1, name: 'CryptoKing', points: 45200, level: 12 },
        { rank: 2, name: 'Alice.algo', points: 38900, level: 11 },
        { rank: 3, name: 'Satoshi_Fan', points: 32150, level: 10 },
        { rank: 99, name: 'You', points: profile.points, level: profile.level },
    ];

    return (
        <div className="pb-20 min-h-screen bg-slate-50">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center gap-4">
                <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <span className="font-bold text-lg">Pera Rewards</span>
            </div>

            <div className="p-4 space-y-6">
                {/* Main Dashboard Card */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Current Level</div>
                                <h2 className="text-3xl font-bold flex items-center gap-2">
                                    Level {profile.level}
                                    <span className="text-sm font-normal text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">Gold Member</span>
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsBreakdownModalOpen(true)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95"
                            >
                                <Trophy size={32} className="text-amber-400" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
                                <span>{currentLevelPoints.toLocaleString()} pts</span>
                                <span>{POINTS_PER_LEVEL.toLocaleString()} pts</span>
                            </div>
                            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-white/10 rounded-xl p-3 flex-1 backdrop-blur-sm">
                                <div className="text-xs text-slate-400 mb-1">Lifetime Points</div>
                                <div className="text-xl font-bold">12.5k</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-3 flex-1 backdrop-blur-sm">
                                <div className="text-xs text-slate-400 mb-1">This Month</div>
                                <div className="text-xl font-bold text-emerald-400">+1,240</div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-1 text-[10px] text-slate-500">
                            <Shield size={10} />
                            Points are non-transferable and have no monetary value.
                        </div>
                    </div>
                </div>

                {/* Learning Quests (New Section) */}
                <div>
                    <h3 className="font-bold text-slate-900 mb-3 ml-1 flex items-center gap-2">
                        <BookOpen size={18} className="text-teal-600" />
                        Learning Quests
                    </h3>
                    <div className="space-y-3">
                        {quests.map(quest => {
                            const isCompleted = profile.completedQuests?.includes(quest.id);
                            return (
                                <div
                                    key={quest.id}
                                    onClick={() => !isCompleted && setSelectedQuest(quest)}
                                    className={`p-4 rounded-2xl border transition-all ${isCompleted ? 'metallic-card bg-teal-50/20 border-teal-200/50' : 'metallic-card hover:shadow-lg hover:shadow-teal-500/10 cursor-pointer active:scale-[0.98]'}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className={`font-bold text-base ${isCompleted ? 'text-teal-800' : 'text-slate-900'}`}>{quest.title}</h4>
                                        {isCompleted ? (
                                            <div className="bg-teal-100 text-teal-600 p-1 rounded-full"><Check size={14} strokeWidth={3} /></div>
                                        ) : (
                                            <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-full whitespace-nowrap">+{quest.points} PTS</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500 leading-snug mb-3">{quest.description}</p>
                                    <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
                                        <span className="flex items-center gap-1"><Zap size={12} /> {quest.timeEstimate}</span>
                                        {isCompleted && <span className="text-teal-600 font-bold">Completed</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* How to Earn */}
                <div>
                    <h3 className="font-bold text-slate-900 mb-3 ml-1">How to Earn</h3>
                    <div className="metallic-card rounded-2xl divide-y divide-slate-100/50">
                        {earnActions.map((action, i) => (
                            <div key={i} className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                                        {action.icon}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-slate-900">{action.title}</div>
                                        <div className="text-xs text-slate-400">{action.limit}</div>
                                    </div>
                                </div>
                                <div className="font-bold text-teal-600 text-sm">{action.points}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievements */}
                <div>
                    <h3 className="font-bold text-slate-900 mb-3 ml-1">Achievements</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {achievements.map((ach) => (
                            <div key={ach.id} className={`bg-white p-4 rounded-2xl border ${ach.unlocked ? 'border-teal-100 bg-teal-50/10' : 'border-slate-100 opacity-60'}`}>
                                <div className="text-2xl mb-2 grayscale-0 transition-all">{ach.icon}</div>
                                <div className="font-bold text-sm text-slate-900 mb-0.5">{ach.title}</div>
                                <div className="text-xs text-slate-500 mb-2">{ach.desc}</div>

                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${ach.unlocked ? 'bg-teal-500' : 'bg-slate-300'}`} style={{ width: '60%' }}></div> {/* Mock progress visual */}
                                </div>
                                <div className="text-[10px] text-right text-slate-400 mt-1">{ach.progress}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leaderboard */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-slate-900 ml-1">Leaderboard</h3>
                        <div className="bg-slate-200 p-0.5 rounded-lg flex text-xs font-bold">
                            <button className="bg-white px-3 py-1 rounded-md shadow-sm text-slate-900">Global</button>
                            <button className="px-3 py-1 text-slate-500">Friends</button>
                        </div>
                    </div>
                    <div className="metallic-card rounded-2xl overflow-hidden">
                        <div className="flex items-center text-xs font-bold text-slate-400 p-3 bg-slate-50/50 border-b border-slate-200/50">
                            <div className="w-8 text-center">#</div>
                            <div className="flex-1">User</div>
                            <div className="w-16 text-center">Level</div>
                            <div className="w-16 text-right">Points</div>
                        </div>
                        {leaderboard.map((user, i) => (
                            <div key={i} className={`flex items-center p-3 text-sm ${user.rank === 99 ? 'bg-amber-50' : ''}`}>
                                <div className="w-8 text-center font-bold text-slate-500">{user.rank}</div>
                                <div className="flex-1 font-bold text-slate-900">{user.name} {user.rank === 99 && '(You)'}</div>
                                <div className="w-16 text-center text-slate-500 font-mono text-xs font-bold bg-slate-100 rounded-full py-0.5">Lvl {user.level}</div>
                                <div className="w-16 text-right font-bold text-slate-900">{user.points.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-4 text-xs text-slate-400">
                        Users must opt-in to appear on public leaderboards.
                    </div>
                </div>
            </div>

            {selectedQuest && (
                <QuestModal
                    isOpen={!!selectedQuest}
                    quest={selectedQuest}
                    onClose={() => setSelectedQuest(null)}
                    onComplete={(points) => {
                        onQuestComplete(selectedQuest.id, points);
                        // We rely on the modal's internal state for confetti/success message flow.
                        // The actual data update happens here.
                    }}
                />
            )}
            {isBreakdownModalOpen && (
                <LevelBreakdownModal
                    isOpen={isBreakdownModalOpen}
                    currentLevel={profile.level}
                    onClose={() => setIsBreakdownModalOpen(false)}
                />
            )}
        </div>
    );
}
