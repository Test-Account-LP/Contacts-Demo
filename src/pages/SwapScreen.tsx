import { useState } from 'react';
import { ArrowLeft, ArrowDown, Info, Settings2, Loader2, CheckCircle2 } from 'lucide-react';
import SocialShareModal from '../components/SocialShareModal';

interface SwapScreenProps {
    onBack: () => void;
    socials: { platform: 'X' | 'Instagram'; isConnected: boolean; handle: string }[];
}

interface Token {
    id: string;
    symbol: string;
    name: string;
    balance: string;
}

export default function SwapScreen({ onBack, socials }: SwapScreenProps) {
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [swapStep, setSwapStep] = useState<'input' | 'sending' | 'success'>('input');
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const tokens: Token[] = [
        { id: '1', symbol: 'ALGO', name: 'Algorand', balance: '1,240.50' },
        { id: '2', symbol: 'USDC', name: 'USD Coin', balance: '520.00' },
    ];

    const [fromToken] = useState(tokens[0]);
    const [toToken] = useState(tokens[1]);

    const handleAmountChange = (val: string) => {
        setFromAmount(val);
        // Mock 1:1 swap for demo
        setToAmount(val);
    };

    const handleSwap = () => {
        if (!fromAmount) return;
        setSwapStep('sending');

        setTimeout(() => {
            setSwapStep('success');
        }, 3000);
    };

    const handleFinish = () => {
        setIsShareModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20 font-sans">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-white rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Swap</h2>
                <button className="p-2 -mr-2 hover:bg-white rounded-full transition-colors">
                    <Settings2 size={24} />
                </button>
            </div>

            {swapStep === 'input' && (
                <div className="px-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    {/* From Section */}
                    <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">From</span>
                            <span className="text-xs font-bold text-slate-400">Balance: {fromToken.balance}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                value={fromAmount}
                                onChange={(e) => handleAmountChange(e.target.value)}
                                placeholder="0.00"
                                className="flex-1 text-3xl font-bold bg-transparent border-none focus:outline-none placeholder-slate-200"
                            />
                            <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-2xl cursor-pointer hover:bg-slate-200 transition-colors">
                                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-[10px] text-white font-bold">A</div>
                                <span className="font-bold">{fromToken.symbol}</span>
                            </div>
                        </div>
                    </div>

                    {/* Arrow Divider */}
                    <div className="relative h-4 flex items-center justify-center">
                        <div className="absolute inset-x-0 h-px bg-slate-100"></div>
                        <div className="relative z-10 w-10 h-10 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-teal-500">
                            <ArrowDown size={20} />
                        </div>
                    </div>

                    {/* To Section */}
                    <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">To (Est.)</span>
                            <span className="text-xs font-bold text-slate-400">Balance: {toToken.balance}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                value={toAmount}
                                readOnly
                                placeholder="0.00"
                                className="flex-1 text-3xl font-bold bg-transparent border-none focus:outline-none placeholder-slate-200"
                            />
                            <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-2xl cursor-pointer hover:bg-slate-200 transition-colors">
                                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">$</div>
                                <span className="font-bold">{toToken.symbol}</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-4 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 flex items-center gap-1.5 font-medium">Price <Info size={14} /></span>
                            <span className="font-bold text-slate-900">1 {fromToken.symbol} ≈ 1.00 {toToken.symbol}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-medium">Slippage Tolerance</span>
                            <span className="font-bold text-teal-600">0.5%</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-medium">Fee</span>
                            <span className="font-bold text-slate-900">0.001 ALGO</span>
                        </div>
                    </div>

                    {/* Swap Button */}
                    <button
                        disabled={!fromAmount}
                        onClick={handleSwap}
                        className={`w-full py-5 rounded-[28px] font-black text-lg transition-all shadow-xl active:scale-[0.98] ${fromAmount ? 'bg-teal-500 text-white shadow-teal-500/30' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                    >
                        Swap
                    </button>
                </div>
            )}

            {swapStep === 'sending' && (
                <div className="px-6 flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="relative mb-8">
                        <div className="w-32 h-32 rounded-full border-4 border-teal-100 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full border-4 border-teal-500 border-t-transparent animate-spin"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-teal-500 rounded-full animate-pulse flex items-center justify-center">
                                <Loader2 size={32} className="text-white animate-spin-slow" />
                            </div>
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-2">Sending to Network</h3>
                    <p className="text-slate-500 font-medium">Processing your transaction on the Algorand blockchain...</p>

                    {/* Tiny blockchain animation bits */}
                    <div className="flex gap-2 mt-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-3 h-3 bg-teal-500 rounded-sm animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                        ))}
                    </div>
                </div>
            )}

            {swapStep === 'success' && (
                <div className="px-6 flex flex-col items-center justify-center min-h-[60vh] text-center animate-in zoom-in-95 duration-500">
                    <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mb-8 animate-bounce-short">
                        <CheckCircle2 size={64} className="text-emerald-500" />
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 mb-2">Swap Successful</h3>
                    <p className="text-lg text-slate-500 font-medium mb-12">
                        You swapped {fromAmount} {fromToken.symbol} for {toAmount} {toToken.symbol}.
                    </p>

                    <button
                        onClick={handleFinish}
                        className="w-full py-5 bg-slate-900 text-white rounded-[28px] font-black text-lg shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all"
                    >
                        Success
                    </button>
                    <button
                        onClick={onBack}
                        className="mt-4 text-slate-400 font-bold hover:text-slate-600 transition-colors"
                    >
                        Back to Wallet
                    </button>
                </div>
            )}

            <SocialShareModal
                isOpen={isShareModalOpen}
                onClose={() => {
                    setIsShareModalOpen(false);
                    onBack();
                }}
                type="swap"
                details={{
                    fromAmount,
                    fromToken: fromToken.symbol,
                    toAmount,
                    toToken: toToken.symbol
                }}
                socials={socials}
            />
        </div>
    );
}

// Add these to index.css if not already there or defined here
// @keyframes bounce-short { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
// .animate-bounce-short { animation: bounce-short 1s ease-in-out infinite; }
// .animate-spin-slow { animation: spin 3s linear infinite; }
