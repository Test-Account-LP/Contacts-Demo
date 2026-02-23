interface InfographicCardProps {
    type: 'swap' | 'staking';
    details: {
        fromAmount?: string;
        fromToken?: string;
        toAmount?: string;
        toToken?: string;
        stakedAmount?: string;
    };
}

export default function InfographicCard({ type, details }: InfographicCardProps) {
    const isSwap = type === 'swap';

    return (
        <div className="aspect-[4/5] w-full bg-gradient-to-br from-slate-900 via-slate-800 to-black p-8 flex flex-col justify-between relative overflow-hidden font-sans">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>

            {/* Pera Logo / Branding */}
            <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                    <span className="text-white font-black text-xl">P</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-white font-bold text-lg tracking-tight leading-none">Pera Wallet</span>
                    <span className="text-teal-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">Algorand Native</span>
                </div>
            </div>

            {/* Content Body */}
            <div className="relative z-10 space-y-6">
                <h4 className="text-white text-3xl font-black leading-tight tracking-tight">
                    {isSwap ? (
                        <>I just swapped <span className="text-teal-400">{details.fromAmount} {details.fromToken}</span> for <span className="text-teal-400">{details.toAmount} {details.toToken}</span>.</>
                    ) : (
                        <>I just staked <span className="text-teal-400">{details.stakedAmount} ALGO</span> to help secure the Algorand network.</>
                    )}
                </h4>

                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                    {isSwap
                        ? "Join the future of finance with Pera Wallet. Fast, secure, and decentralized."
                        : "Helping build a decentralized future. Secure the network, earn rewards."
                    }
                </p>

                {/* Token Icons Row (Optional visual flair) */}
                <div className="flex -space-x-3 pt-2">
                    {isSwap ? (
                        <>
                            <div className="w-12 h-12 rounded-full border-4 border-slate-900 bg-white flex items-center justify-center overflow-hidden shadow-xl">
                                <span className="text-slate-900 font-bold text-xs">{details.fromToken}</span>
                            </div>
                            <div className="w-12 h-12 rounded-full border-4 border-slate-900 bg-teal-500 flex items-center justify-center overflow-hidden shadow-xl">
                                <span className="text-white font-bold text-xs">{details.toToken}</span>
                            </div>
                        </>
                    ) : (
                        <div className="w-12 h-12 rounded-full border-4 border-slate-900 bg-black flex items-center justify-center overflow-hidden shadow-xl ring-2 ring-teal-500/50">
                            <div className="w-6 h-6 border-2 border-teal-400 rounded-sm rotate-45 flex items-center justify-center font-bold text-teal-400 text-[8px]">A</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-6">
                <div className="flex flex-col">
                    <span className="text-white/50 text-[10px] uppercase font-bold tracking-widest">Powered by</span>
                    <span className="text-white font-bold">Algorand</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
                    <span className="text-teal-400 font-bold text-xs">pera.algo</span>
                </div>
            </div>
        </div>
    );
}
