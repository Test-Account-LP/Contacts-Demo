import { useState, useEffect } from 'react';
import { X, ShieldCheck, Check, User } from 'lucide-react';

type Phase = 'intro' | 'verifying' | 'success';

interface KycModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerified: () => void;
}

export default function KycModal({ isOpen, onClose, onVerified }: KycModalProps) {
    const [phase, setPhase] = useState<Phase>('intro');
    const [progress, setProgress] = useState(0);
    const [showCheck, setShowCheck] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            // Reset on close
            setTimeout(() => {
                setPhase('intro');
                setProgress(0);
                setShowCheck(false);
            }, 300);
        }
    }, [isOpen]);

    const handleVerify = () => {
        setPhase('verifying');
        setProgress(0);

        // Animate progress bar 0 → 100 over ~2.5s
        const duration = 2500;
        const interval = 30;
        const steps = duration / interval;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            setProgress(Math.min(Math.round((step / steps) * 100), 100));
            if (step >= steps) {
                clearInterval(timer);
                // Brief pause then success
                setTimeout(() => {
                    setPhase('success');
                    setTimeout(() => setShowCheck(true), 200);
                }, 300);
            }
        }, interval);
    };

    const handleContinue = () => {
        onVerified();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300">

                {/* ── INTRO PHASE ── */}
                {phase === 'intro' && (
                    <>
                        {/* Header */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            {/* Icon */}
                            <div className="w-14 h-14 bg-teal-500/20 border border-teal-400/30 rounded-2xl flex items-center justify-center mb-4 relative">
                                <ShieldCheck size={28} className="text-teal-400" />
                            </div>

                            <div className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">Pera KYC</div>
                            <h2 className="text-2xl font-bold max-w-[85%]">Unlock More with KYC Accounts</h2>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <p className="text-slate-600 text-sm leading-relaxed mb-5">
                                Pera Wallet does not store your personal information. KYC Accounts let you securely verify your identity to participate in select promotions and earn additional Pera Points.
                            </p>

                            {/* Benefits */}
                            <div className="space-y-3 mb-5">
                                {[
                                    { emoji: '🎁', text: 'Participate in exclusive promotions' },
                                    { emoji: '⚡', text: 'Earn bonus Pera Points' },
                                    { emoji: '🏆', text: 'Access special rewards' },
                                ].map((b, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center text-base shrink-0">{b.emoji}</div>
                                        <span className="text-sm font-medium text-slate-700">{b.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Reassurance */}
                            <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-50 rounded-xl p-3 mb-6 border border-slate-100">
                                🔒 Verification is handled securely and your information is never stored by Pera Wallet.
                            </p>

                            {/* Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleVerify}
                                    className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-teal-500/25 active:scale-[0.98]"
                                >
                                    Verify Identity
                                </button>
                                <button
                                    onClick={onClose}
                                    className="w-full py-3 text-slate-500 font-semibold text-sm hover:text-slate-700 transition-colors"
                                >
                                    Skip for Now
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* ── VERIFYING PHASE ── */}
                {phase === 'verifying' && (
                    <div className="p-8 text-center">
                        {/* Scanning Animation */}
                        <div className="relative w-28 h-28 mx-auto mb-6">
                            {/* Outer ring */}
                            <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
                            {/* Spinning arc */}
                            <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin" />
                            {/* Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <User size={40} className="text-slate-300" />
                            </div>
                            {/* Scan line */}
                            <div
                                className="absolute left-0 right-0 h-0.5 bg-teal-400/60 transition-all duration-100"
                                style={{ top: `${progress}%` }}
                            />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-2">Verifying Identity</h3>
                        <p className="text-slate-500 text-sm mb-6">Securely processing your verification…</p>

                        {/* Progress bar */}
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                            <div
                                className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-100"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="text-xs text-slate-400 font-mono">{progress}%</div>
                    </div>
                )}

                {/* ── SUCCESS PHASE ── */}
                {phase === 'success' && (
                    <div className="p-8 text-center">
                        {/* Animated check */}
                        <div className={`w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 ${showCheck ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                            <Check size={44} strokeWidth={3} className="text-white" />
                        </div>

                        <div className={`transition-all duration-500 delay-200 ${showCheck ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">You're Verified!</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                Your KYC Account is now active. You can participate in exclusive promotions and earn more Pera Points.
                            </p>

                            {/* Points reward callout */}
                            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6">
                                <div className="text-xs text-amber-600 font-bold uppercase tracking-wider mb-1">Bonus Reward</div>
                                <div className="text-3xl font-bold text-amber-500">+1,000 PTS</div>
                                <div className="text-xs text-amber-500/70 mt-0.5">Added to your Pera Rewards</div>
                            </div>

                            <button
                                onClick={handleContinue}
                                className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors active:scale-[0.98]"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
