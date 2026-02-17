import { X, Star, Shield, Users } from 'lucide-react';

interface ProEvaluationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStartTrial: () => void;
    featureName?: string;
}

export default function ProEvaluationModal({ isOpen, onClose, onStartTrial, featureName }: ProEvaluationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-end sm:items-center justify-center pb-0 sm:pb-0 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-8 relative flex flex-col items-center animate-in slide-in-from-bottom duration-300">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <X size={24} />
                </button>

                <div className="w-16 h-16 bg-gradient-to-br from-amber-300 to-orange-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-500/20 transform -rotate-6">
                    <Star size={32} fill="currentColor" />
                </div>

                <h3 className="text-2xl font-bold mb-2 text-center">Unlock Pro Mode</h3>
                <p className="text-slate-500 text-center mb-6 px-4">
                    {featureName ? `The "${featureName}" feature is available for Pro users.` : 'Upgrade to access exclusive features.'}
                </p>

                <div className="w-full space-y-3 mb-8">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                        <Shield className="text-teal-500" size={20} />
                        <span className="font-medium text-sm">Advanced Privacy Controls</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                        <Users className="text-purple-500" size={20} />
                        <span className="font-medium text-sm">Create Contact Groups</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                        <Star className="text-amber-500" size={20} />
                        <span className="font-medium text-sm">"Friends" Recognition</span>
                    </div>
                </div>

                <button
                    onClick={onStartTrial}
                    className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-4 rounded-xl font-bold hover:opacity-90 transition-opacity mb-3"
                >
                    Start 7-Day Free Trial
                </button>
                <button
                    onClick={onClose}
                    className="text-slate-400 font-medium text-sm hover:text-slate-600 dark:hover:text-slate-300"
                >
                    Maybe Later
                </button>
            </div>
        </div>
    );
}
