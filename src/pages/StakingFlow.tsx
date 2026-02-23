import { useState } from 'react';
import { ArrowLeft, ShieldCheck, ChevronRight, CheckCircle2, Lock, Landmark, Zap } from 'lucide-react';
import SocialShareModal from '../components/SocialShareModal';

interface StakingFlowProps {
    onBack: () => void;
    onConnectClick: () => void;
    socials: { platform: 'X' | 'Instagram'; isConnected: boolean; handle: string }[];
}

export default function StakingFlow({ onBack, onConnectClick, socials }: StakingFlowProps) {
    const [step, setStep] = useState<'intro' | 'input' | 'transaction' | 'success'>('intro');
    const [stakeAmount, setStakeAmount] = useState('');
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const balance = "1,240.50";

    const handleStake = () => {
        if (!stakeAmount) return;
        setStep('transaction');
        setTimeout(() => {
            setStep('success');
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-white pb-20 font-sans">
            {/* Header */}
            <div className="flex items-center gap-4 px-6 pt-6 pb-4">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Stake ALGO</h2>
            </div>

            {step === 'intro' && (
                <div className="px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="w-24 h-24 bg-teal-50 rounded-[32px] flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck size={48} className="text-teal-500" />
                    </div>

                    <div className="text-center space-y-4">
                        <h3 className="text-3xl font-black text-slate-900">Stake ALGO.<br />Secure the Network.</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Staking on Algorand helps secure the network and support decentralization. Earn rewards while contributing to ecosystem security.
                        </p>
                    </div>

                    <div className="space-y-4 bg-slate-50 p-6 rounded-[32px] border border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-teal-500">
                                <Lock size={20} />
                            </div>
                            <span className="font-bold text-slate-700">Secure the network</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-500">
                                <Landmark size={20} />
                            </div>
                            <span className="font-bold text-slate-700">Support decentralization</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-amber-500">
                                <Zap size={20} />
                            </div>
                            <span className="font-bold text-slate-700">Earn rewards</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setStep('input')}
                        className="w-full py-5 bg-teal-500 text-white rounded-[28px] font-black text-lg shadow-xl shadow-teal-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        Continue <ChevronRight size={20} />
                    </button>
                </div>
            )}

            {step === 'input' && (
                <div className="px-6 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Landmark size={120} />
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Amount to Stake</span>
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-slate-400">Balance: {balance} ALGO</span>
                            </div>
                        </div>

                        <div className="flex items-end gap-2 mb-2">
                            <input
                                type="number"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                                placeholder="0.00"
                                className="flex-1 text-5xl font-black bg-transparent border-none focus:outline-none placeholder-slate-200"
                                autoFocus
                            />
                            <span className="text-2xl font-black text-slate-300 pb-1">ALGO</span>
                        </div>

                        <button
                            onClick={() => setStakeAmount('250')}
                            className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full hover:bg-teal-100 transition-colors"
                        >
                            Max Amount
                        </button>
                    </div>

                    <div className="p-4 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-medium">Estimated APR</span>
                            <span className="font-bold text-emerald-600">~4.2%</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-medium">Lock-up Period</span>
                            <span className="font-bold text-slate-900">None</span>
                        </div>
                    </div>

                    <button
                        disabled={!stakeAmount}
                        onClick={handleStake}
                        className={`w-full py-5 rounded-[28px] font-black text-lg transition-all shadow-xl active:scale-[0.98] ${stakeAmount ? 'bg-teal-500 text-white shadow-teal-500/30' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                    >
                        Stake
                    </button>
                </div>
            )}

            {step === 'transaction' && (
                <div className="px-6 flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in duration-500">
                    <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                        {/* Node connection animation */}
                        <div className="absolute inset-0 border-2 border-dashed border-teal-200 rounded-full animate-spin-slow"></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-teal-500 rounded-full shadow-lg shadow-teal-500/50"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-teal-500 rounded-full shadow-lg shadow-teal-500/50"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-teal-500 rounded-full shadow-lg shadow-teal-500/50"></div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-teal-500 rounded-full shadow-lg shadow-teal-500/50"></div>

                        <div className="w-32 h-32 bg-teal-50 rounded-full flex items-center justify-center relative z-10">
                            <Landmark size={64} className="text-teal-500 animate-pulse" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-2">Staking to Network</h3>
                    <p className="text-slate-500 font-medium">Your contribution is securing the decentralised future of Algorand.</p>
                    <div className="mt-8 flex gap-1.5 justify-center">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="w-1.5 h-1.5 bg-teal-500/30 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                        ))}
                    </div>
                </div>
            )}

            {step === 'success' && (
                <div className="px-6 flex flex-col items-center justify-center min-h-[70vh] text-center animate-in zoom-in-95 duration-500">
                    <div className="w-32 h-32 bg-emerald-100 rounded-[40px] flex items-center justify-center mb-8 rotate-12">
                        <CheckCircle2 size={64} className="text-emerald-500 -rotate-12" />
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 mb-2">Staking Successful</h3>
                    <p className="text-lg text-slate-500 font-medium mb-12">
                        You staked {stakeAmount} ALGO to help secure the network.
                    </p>

                    <div className="w-full space-y-3">
                        <button
                            onClick={() => {
                                if (socials.some(s => s.isConnected)) {
                                    setIsShareModalOpen(true);
                                } else {
                                    onConnectClick();
                                }
                            }}
                            className="w-full py-5 bg-slate-900 text-white rounded-[28px] font-black text-lg shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all"
                        >
                            {socials.some(s => s.isConnected) ? 'Share activity' : 'Connect socials to share'}
                        </button>
                    </div>
                    <button
                        onClick={onBack}
                        className="mt-6 text-slate-400 font-bold hover:text-slate-600 transition-colors"
                    >
                        Done
                    </button>
                </div>
            )}

            <SocialShareModal
                isOpen={isShareModalOpen}
                onClose={() => {
                    setIsShareModalOpen(false);
                    onBack();
                }}
                type="staking"
                details={{
                    stakedAmount: stakeAmount
                }}
                socials={socials}
            />
        </div>
    );
}
