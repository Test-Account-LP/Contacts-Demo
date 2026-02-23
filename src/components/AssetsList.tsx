import { useState, useEffect } from 'react';
import { Search, Plus, SlidersHorizontal, X, CheckCircle, Clock } from 'lucide-react';
import KycModal from './KycModal';

interface AssetsListProps {
    isKycVerified: boolean;
    peraUsdOptedIn: boolean;
    onKycVerified: () => void;
    onPeraUsdOptIn: () => void;
}

type OptInPhase = 'idle' | 'confirm' | 'signing' | 'success' | 'settled';

export default function AssetsList({ isKycVerified, peraUsdOptedIn, onKycVerified, onPeraUsdOptIn }: AssetsListProps) {
    const [optInPhase, setOptInPhase] = useState<OptInPhase>('idle');
    const [showKycModal, setShowKycModal] = useState(false);
    const [peraUsdBalance, setPeraUsdBalance] = useState(peraUsdOptedIn ? 1.0 : 0);
    const [highlightSuccess, setHighlightSuccess] = useState(false);

    const baseAssets = [
        { name: 'Algo', ticker: 'ALGO', balance: '108.27', fiat: '$6.06', icon: 'A', color: 'bg-black text-white' },
        { name: 'USDC', ticker: 'USDC', balance: '3,495.00', fiat: '$3,495.00', icon: '$', color: 'bg-blue-500 text-white' },
        { name: 'Akita INU', ticker: 'AKTA', balance: '3,495.00', fiat: '$3,495.00', icon: '🐶', color: 'bg-pink-500 text-white' },
    ];

    const handlePeraUsdTap = () => {
        if (!isKycVerified) {
            setShowKycModal(true);
        } else if (!peraUsdOptedIn && optInPhase === 'idle') {
            setOptInPhase('confirm');
        }
    };

    const handleSign = () => {
        setOptInPhase('signing');
        // 2s signing animation
        setTimeout(() => {
            setOptInPhase('success');
            // 5s wait then settle
            setTimeout(() => {
                onPeraUsdOptIn();
                setPeraUsdBalance(1.0);
                setOptInPhase('settled');
                setHighlightSuccess(true);
                setTimeout(() => setHighlightSuccess(false), 3000);
            }, 5000);
        }, 2000);
    };

    // Sync peraUsdBalance if prop changes (e.g. parent resets)
    useEffect(() => {
        if (peraUsdOptedIn) setPeraUsdBalance(1.0);
    }, [peraUsdOptedIn]);

    const isOptedIn = peraUsdOptedIn || optInPhase === 'settled';

    return (
        <div className="mt-6 px-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-900">Assets</h2>
                <div className="flex gap-2">
                    <button className="p-2 bg-slate-100 rounded-lg text-slate-600"><SlidersHorizontal size={20} /></button>
                    <button className="flex items-center gap-1 px-3 py-2 bg-teal-50 text-teal-600 rounded-lg font-semibold text-sm">
                        <Plus size={18} /> Add Asset
                    </button>
                </div>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search assets"
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/60 shadow-inner rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder:text-slate-400"
                />
            </div>

            <div className="flex flex-col gap-4">
                {/* Base assets */}
                {baseAssets.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between p-3 metallic-card rounded-xl cursor-pointer hover:scale-[1.02] transition-transform">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full ${asset.color} flex items-center justify-center font-bold`}>
                                {asset.icon}
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 flex items-center gap-1">
                                    {asset.name}
                                    <div className="w-4 h-4 rounded-full bg-blue-400 text-white flex items-center justify-center text-[10px]">✓</div>
                                </div>
                                <div className="text-xs text-slate-400">{asset.ticker}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-slate-900">₳{asset.balance}</div>
                            <div className="text-sm text-slate-500">{asset.fiat}</div>
                        </div>
                    </div>
                ))}

                {/* PeraUSD Promo Card */}
                <div
                    onClick={handlePeraUsdTap}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all
                        ${isOptedIn
                            ? `metallic-card hover:scale-[1.02] cursor-pointer ${highlightSuccess ? 'ring-2 ring-teal-400 ring-offset-2 animate-pulse' : ''}`
                            : 'border-2 border-dashed border-teal-300/60 bg-teal-50/30 cursor-pointer hover:border-teal-400/80 hover:bg-teal-50/50 active:scale-[0.98]'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center font-bold text-white text-base transition-all ${isOptedIn ? 'opacity-100' : 'opacity-50'}`}>
                            $
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                                PeraUSD
                                {!isOptedIn && (
                                    <span className="text-[9px] font-bold bg-amber-400 text-white px-1.5 py-0.5 rounded uppercase tracking-wide">
                                        Limited Time
                                    </span>
                                )}
                                {isOptedIn && (
                                    <div className="w-4 h-4 rounded-full bg-blue-400 text-white flex items-center justify-center text-[10px]">✓</div>
                                )}
                            </div>
                            <div className="text-xs text-slate-500">
                                {isOptedIn ? 'PERAУSD' : 'Opt into PeraUSD today and get $1'}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        {isOptedIn ? (
                            <>
                                <div className="font-bold text-slate-900">${peraUsdBalance.toFixed(2)}</div>
                                <div className="text-sm text-slate-500">$1.00</div>
                            </>
                        ) : (
                            <div className="text-teal-600 font-bold text-sm">+ Get $1 →</div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Opt-in Confirmation Sheet ── */}
            {(optInPhase === 'confirm' || optInPhase === 'signing' || optInPhase === 'success') && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-t-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300 pb-safe">

                        {/* ── CONFIRM ── */}
                        {optInPhase === 'confirm' && (
                            <>
                                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-900">Opt into PeraUSD</h3>
                                    <button onClick={() => setOptInPhase('idle')} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                                        <X size={18} className="text-slate-600" />
                                    </button>
                                </div>
                                <div className="p-6">
                                    {/* Token info */}
                                    <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 mb-5">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center font-bold text-white text-lg">$</div>
                                        <div>
                                            <div className="font-bold text-slate-900">PeraUSD</div>
                                            <div className="text-sm text-slate-500">USD Stablecoin on Algorand</div>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <div className="font-bold text-emerald-600 text-lg">$1.00</div>
                                            <div className="text-xs text-slate-400">Claim reward</div>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 text-sm leading-relaxed mb-2">
                                        Opt in to receive PeraUSD and claim your $1 reward. Transaction fees are covered by Pera.
                                    </p>
                                    <p className="text-xs text-slate-400 mb-6 flex items-center gap-1">
                                        <CheckCircle size={12} className="text-teal-500" /> Gas fees: <strong className="text-teal-600">Free — covered by Pera</strong>
                                    </p>

                                    <div className="space-y-3">
                                        <button
                                            onClick={handleSign}
                                            className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-2xl hover:opacity-90 shadow-lg shadow-teal-500/25 active:scale-[0.98] transition-all"
                                        >
                                            Sign Transaction
                                        </button>
                                        <button
                                            onClick={() => setOptInPhase('idle')}
                                            className="w-full py-3 text-slate-500 font-semibold text-sm hover:text-slate-700 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ── SIGNING ── */}
                        {optInPhase === 'signing' && (
                            <div className="p-8 text-center">
                                <div className="w-20 h-20 mx-auto mb-5 relative">
                                    <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
                                    <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center text-2xl">✍️</div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Signing Transaction</h3>
                                <p className="text-slate-500 text-sm">Broadcasting to Algorand…</p>
                            </div>
                        )}

                        {/* ── SUCCESS (waiting 5s) ── */}
                        {optInPhase === 'success' && (
                            <div className="p-8 text-center">
                                <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
                                    <CheckCircle size={40} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Transaction Confirmed!</h3>
                                <p className="text-slate-500 text-sm mb-4">
                                    $1 in PeraUSD has been deposited into your account!
                                </p>
                                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 bg-slate-50 rounded-xl p-3">
                                    <Clock size={14} className="animate-spin" style={{ animationDuration: '3s' }} />
                                    Awaiting blockchain confirmation…
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* KYC Modal triggered from PeraUSD card */}
            <KycModal
                isOpen={showKycModal}
                onClose={() => setShowKycModal(false)}
                onVerified={() => {
                    onKycVerified();
                    setShowKycModal(false);
                    setTimeout(() => setOptInPhase('confirm'), 400);
                }}
            />
        </div>
    );
}
