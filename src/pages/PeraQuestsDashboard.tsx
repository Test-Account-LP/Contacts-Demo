import { useState } from 'react';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, CheckCircle, Zap, ArrowRight, Star } from 'lucide-react';
import type { UserProfile } from '../App';
import { quests, type Quest } from '../data/quests';
import QuestModal from '../components/QuestModal';


interface PeraQuestsDashboardProps {
    profile: UserProfile;
    onBack: () => void;
    onUpdateProfile: (updates: Partial<UserProfile>) => void;
    onQuestComplete: (questId: string, points: number) => void;
}

export default function PeraQuestsDashboard({ profile, onBack, onUpdateProfile, onQuestComplete }: PeraQuestsDashboardProps) {
    const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
    const [isInfoExpanded, setIsInfoExpanded] = useState(true);

    // Intro Screen Logic
    if (!profile.hasSeenPeraQuestIntro) {
        return (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="w-full max-w-md h-full bg-slate-50 flex flex-col relative shadow-2xl overflow-hidden">
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto">
                        <div className="w-24 h-24 bg-sky-100 rounded-3xl flex items-center justify-center mb-8 shadow-sm rotate-3">
                            <BookOpen size={48} className="text-sky-600" />
                        </div>

                        <h1 className="text-3xl font-bold text-slate-900 mb-4">Welcome to Pera Quests</h1>

                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Pera Quests are interactive learning and engagement challenges designed to help you explore the Pera ecosystem.
                            <br /><br />
                            Complete quests to earn rewards, unlock achievements, and track your progress — all in one place.
                            <br /><br />
                            Complete quests to earn rewards, unlock achievements, and track your progress — all in one place.
                        </p>

                        <button
                            onClick={() => onUpdateProfile({ hasSeenPeraQuestIntro: true })}
                            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
                        >
                            Start Exploring <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* Background Decor */}
                    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 -left-20 w-64 h-64 bg-sky-200/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    const completedQuestsList = quests.filter(q => profile.completedQuests.includes(q.id));
    const availableQuestsList = quests.filter(q => !profile.completedQuests.includes(q.id));

    return (
        <div className="pb-20 min-h-screen bg-slate-50">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center gap-4">
                <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <span className="font-bold text-lg">Pera Quests</span>
            </div>

            <div className="p-4 space-y-6">

                {/* Collapsible Info Section */}
                <div className="metallic-card rounded-2xl">
                    <button
                        onClick={() => setIsInfoExpanded(!isInfoExpanded)}
                        className="w-full flex items-center justify-between p-4 bg-sky-50/50 hover:bg-sky-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center">
                                <Star size={16} fill="currentColor" />
                            </div>
                            <span className="font-bold text-slate-900">What Are Pera Quests?</span>
                        </div>
                        {isInfoExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                    </button>

                    {isInfoExpanded && (
                        <div className="p-4 pt-0 text-sm text-slate-600 leading-relaxed border-t border-sky-50 bg-sky-50/30">
                            <div className="pt-3 space-y-2">
                                <p>Pera Quests are guided challenges that reward you for engaging with features, learning about Web3, and participating in the Pera ecosystem.</p>
                                <ul className="list-disc list-inside space-y-1 text-slate-500 pl-2">
                                    <li>Each quest has clear steps and completion criteria.</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Available Quests */}
                <div>
                    <h3 className="font-bold text-slate-900 mb-3 ml-1 flex items-center gap-2">
                        Available Quests
                        <span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full">{availableQuestsList.length}</span>
                    </h3>

                    {availableQuestsList.length === 0 ? (
                        <div className="text-center p-8 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400">
                            No active quests available right now. Check back later!
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {availableQuestsList.map(quest => (
                                <div
                                    key={quest.id}
                                    className="metallic-card p-5 rounded-2xl hover:shadow-xl hover:shadow-sky-500/10 transition-all group active:scale-[0.98]"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-lg text-slate-900 group-hover:text-sky-700 transition-colors">{quest.title}</h4>
                                        <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full whitespace-nowrap shadow-sm">+{quest.points} PTS</span>
                                    </div>
                                    <p className="text-slate-600 text-sm mb-4">{quest.description}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                            <Zap size={14} className="text-amber-400" /> {quest.timeEstimate}
                                        </div>
                                        <button
                                            onClick={() => setSelectedQuest(quest)}
                                            className="bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-sm active:scale-95"
                                        >
                                            Start Quest
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Completed Quests */}
                {completedQuestsList.length > 0 && (
                    <div>
                        <h3 className="font-bold text-slate-900 mb-3 ml-1 flex items-center gap-2 opacity-80">
                            Completed
                            <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full">{completedQuestsList.length}</span>
                        </h3>
                        <div className="space-y-3 opacity-80 hover:opacity-100 transition-opacity">
                            {completedQuestsList.map(quest => (
                                <div
                                    key={quest.id}
                                    className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between"
                                >
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-slate-700 line-through decoration-slate-400 decoration-2">{quest.title}</h4>
                                            <CheckCircle size={16} className="text-emerald-500" />
                                        </div>
                                        <div className="text-xs text-emerald-600 font-bold">Earned {quest.points} PTS</div>
                                    </div>
                                    {/* <button className="text-xs text-slate-400 font-bold hover:text-slate-600">Review</button> */}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Reuse Existing Quest Modal Logic */}
            {selectedQuest && (
                <QuestModal
                    isOpen={!!selectedQuest}
                    quest={selectedQuest}
                    onClose={() => setSelectedQuest(null)}
                    onComplete={(points) => {
                        onQuestComplete(selectedQuest.id, points);
                        // Confetti is handled in App.tsx generally, but we can trigger specific effects if needed
                        // The modal itself shows the success state.
                    }}
                />
            )}
        </div>
    );
}
