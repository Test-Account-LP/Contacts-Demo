import { X, Star, Shield, Users } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

interface ProEvaluationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStartTrial: () => void;
    featureName?: string;
}

export default function ProEvaluationModal({ isOpen, onClose, onStartTrial, featureName }: ProEvaluationModalProps) {
    const { tokens } = useTheme();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center pb-0 sm:pb-0 backdrop-blur-sm" style={{ backgroundColor: tokens.overlayDark }}>
            <div className="w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-8 relative flex flex-col items-center animate-in slide-in-from-bottom duration-300" style={{ backgroundColor: tokens.surface, color: tokens.primaryText }}>
                <button onClick={onClose} className="absolute top-4 right-4 hover:opacity-70 transition-opacity" style={{ color: tokens.secondaryText }}>
                    <X size={24} />
                </button>

                <div className="w-16 h-16 bg-gradient-to-br from-amber-300 to-orange-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-500/20 transform -rotate-6">
                    <Star size={32} fill="currentColor" />
                </div>

                <h3 className="text-2xl font-bold mb-2 text-center">Unlock Pro Mode</h3>
                <p className="text-center mb-6 px-4 text-sm" style={{ color: tokens.secondaryText }}>
                    {featureName ? `The "${featureName}" feature is available for Pro users.` : 'Upgrade to access exclusive features.'}
                </p>

                <div className="w-full space-y-3 mb-8">
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: tokens.elevatedSurface }}>
                        <Shield className="text-teal-500" size={20} />
                        <span className="font-medium text-sm">Advanced Privacy Controls</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: tokens.elevatedSurface }}>
                        <Users className="text-purple-500" size={20} />
                        <span className="font-medium text-sm">Create Contact Groups</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: tokens.elevatedSurface }}>
                        <Star className="text-amber-500" size={20} />
                        <span className="font-medium text-sm">"Friends" Recognition</span>
                    </div>
                </div>

                <button
                    onClick={onStartTrial}
                    className="w-full py-4 rounded-xl font-bold hover:opacity-90 transition-opacity mb-3 shadow-md"
                    style={{ backgroundColor: tokens.buttonPrimaryBackground, color: tokens.buttonPrimaryText }}
                >
                    Start 7-Day Free Trial
                </button>
                <button
                    onClick={onClose}
                    className="font-medium text-sm hover:opacity-70 transition-opacity"
                    style={{ color: tokens.secondaryText }}
                >
                    Maybe Later
                </button>
            </div>
        </div>
    );
}
