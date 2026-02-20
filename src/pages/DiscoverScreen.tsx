import { useState } from 'react';
import { Search, TrendingUp, ChevronRight, ArrowUpRight, Globe, Sparkles } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

interface DiscoverScreenProps {
    onSpinClick?: () => void;
    onCrosswordClick?: () => void;
    onBrickBreakerClick?: () => void;
}

export default function DiscoverScreen({ onSpinClick, onCrosswordClick, onBrickBreakerClick }: DiscoverScreenProps) {
    const { tokens } = useTheme();
    const [activeTab, setActiveTab] = useState<'discover' | 'favorites'>('discover');

    const dApps = [
        { name: 'Folks Finance', desc: 'Participate in Governance', icon: '⚡', color: '#1a1a2e' },
        { name: 'Tinyman', desc: 'DeFi', icon: '⚗️', color: '#0d1117' },
        { name: 'Vestige', desc: 'Defi', icon: '🔵', color: '#003366' },
        { name: 'allo', desc: 'Explorer', icon: '🟣', color: '#1a0033' },
    ];

    const topGainers = [
        { name: 'AlgoGems', verified: true, change: '+133.5%', positive: true },
        { name: 'Kimno', verified: true, change: '+111.5%', positive: true },
        { name: 'Bones ASA', verified: true, change: '+70.7%', positive: true },
    ];

    const trendingNFTs = [
        { name: 'MetaRillair10', volume: '₳1,204.99', color: '#c0392b' },
        { name: 'Enter the Hashverse', volume: '₳1,340', color: '#2c3e50' },
    ];

    const newsItems = [
        {
            title: 'Pera Cards: Your Everyday Offramp',
            date: '15 May 2025',
            color: '#1a1aff'
        },
        {
            title: 'Pera – March 2',
            date: '01 Apr 2025',
            color: '#f5a623'
        },
    ];

    return (
        <div className="pb-24 min-h-screen" style={{ backgroundColor: tokens.primaryBackground, color: tokens.primaryText }}>
            {/* Header Tabs */}
            <div className="flex gap-4 px-4 pt-12 pb-3">
                <button
                    onClick={() => setActiveTab('discover')}
                    className={`text-2xl font-bold transition-opacity ${activeTab === 'discover' ? 'opacity-100' : 'opacity-40'}`}
                    style={{ color: tokens.primaryText }}
                >
                    Discover
                </button>
                <button
                    onClick={() => setActiveTab('favorites')}
                    className={`text-2xl font-bold transition-opacity ${activeTab === 'favorites' ? 'opacity-100' : 'opacity-40'}`}
                    style={{ color: tokens.primaryText }}
                >
                    Favorites
                </button>
            </div>

            <div className="px-4 pb-4 space-y-6">
                {/* Search */}
                <div
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
                    style={{ backgroundColor: tokens.elevatedSurface, color: tokens.mutedText }}
                >
                    <Search size={16} />
                    <span className="text-sm">Search or Type URL</span>
                </div>

                {/* Fun Zone */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <button className="flex items-center gap-2 font-bold text-lg" style={{ color: tokens.primaryText }}>
                            <Sparkles size={18} className="text-violet-500" />
                            Fun Zone
                            <ChevronRight size={16} style={{ color: tokens.mutedText }} />
                        </button>
                        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border" style={{ borderColor: tokens.borderColor, color: tokens.secondaryText }}>
                            <div className="w-4 h-4 rounded bg-teal-400" />
                            Main Account ▾
                        </div>
                    </div>

                    {/* Horizontal scroll of game tiles */}
                    <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
                        {/* Lucky Wheel Tile */}
                        <button
                            onClick={onSpinClick}
                            className="flex-shrink-0 flex items-center gap-3 p-4 rounded-2xl border-2 transition-all active:scale-[0.98]"
                            style={{ borderColor: '#7c3aed', backgroundColor: tokens.surface, width: 270 }}
                        >
                            {/* Wheel icon — dark outer rim, colored segments */}
                            <div className="flex-shrink-0" style={{
                                width: 52, height: 52, borderRadius: '50%',
                                background: 'conic-gradient(#475569 0deg 45deg, #94a3b8 45deg 90deg, #6d28d9 90deg 135deg, #475569 135deg 180deg, #0ea5e9 180deg 225deg, #94a3b8 225deg 270deg, #334155 270deg 315deg, #64748b 315deg 360deg)',
                                border: '3px solid #1e293b', boxShadow: 'inset 0 0 0 12px rgba(0,0,0,0.15)',
                                position: 'relative', overflow: 'hidden'
                            }}>
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#1e293b', border: '2px solid #6d28d9' }} />
                                </div>
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-bold text-sm" style={{ color: tokens.primaryText }}>Pera Lucky Wheel</div>
                                <div className="text-xs mt-0.5" style={{ color: tokens.secondaryText }}>Test your luck to win prizes!</div>
                            </div>
                            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#7c3aed' }}>
                                <ChevronRight size={18} color="white" />
                            </div>
                        </button>

                        {/* Mini Crossword Tile */}
                        <button
                            onClick={onCrosswordClick}
                            className="flex-shrink-0 flex items-center gap-3 p-4 rounded-2xl border-2 transition-all active:scale-[0.98]"
                            style={{ borderColor: '#0ea5e9', backgroundColor: tokens.surface, width: 270 }}
                        >
                            {/* Crossword grid preview */}
                            <div className="flex-shrink-0" style={{ width: 52, height: 52 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, width: 52, height: 52 }}>
                                    {[0, 0, 0, 0, 1, 0, 0, 0, 0].map((b, i) => (
                                        <div key={i} style={{ backgroundColor: b ? '#1e293b' : '#ddd6fe', borderRadius: 2 }} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-bold text-sm" style={{ color: tokens.primaryText }}>Daily Mini Crossword</div>
                                <div className="text-xs mt-0.5" style={{ color: tokens.secondaryText }}>5×5 daily puzzle</div>
                            </div>
                            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0ea5e9' }}>
                                <ChevronRight size={18} color="white" />
                            </div>
                        </button>

                        {/* Brick Breaker Tile */}
                        <button
                            onClick={onBrickBreakerClick}
                            className="flex-shrink-0 flex items-center gap-3 p-4 rounded-2xl border-2 transition-all active:scale-[0.98]"
                            style={{ borderColor: '#f59e0b', backgroundColor: tokens.surface, width: 270 }}
                        >
                            <div className="flex-shrink-0" style={{
                                width: 52, height: 52, backgroundColor: '#1e293b', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <div style={{ width: 30, height: 6, backgroundColor: '#7c3aed', borderRadius: 2 }} />
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-bold text-sm" style={{ color: tokens.primaryText }}>Classic Brick Breaker</div>
                                <div className="text-xs mt-0.5" style={{ color: tokens.secondaryText }}>10 levels • 3 lives</div>
                            </div>
                            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f59e0b' }}>
                                <ChevronRight size={18} color="white" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Algo Price */}
                <div>
                    <button className="flex items-center gap-1 font-bold text-lg mb-3" style={{ color: tokens.primaryText }}>
                        <Globe size={18} style={{ color: tokens.primaryAccent }} />
                        <span>Algo</span>
                        <ChevronRight size={16} style={{ color: tokens.mutedText }} />
                    </button>
                    <div
                        className="rounded-2xl p-4"
                        style={{ backgroundColor: tokens.surface, border: `1px solid ${tokens.borderColor}` }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <div className="text-2xl font-bold" style={{ color: tokens.primaryText }}>$0.3733</div>
                                <div className="text-xs mt-0.5" style={{ color: tokens.mutedText }}>Price</div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                                    <ArrowUpRight size={14} />
                                    6.20%
                                </div>
                                <div className="text-xs mt-0.5" style={{ color: tokens.mutedText }}>Today</div>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            {[
                                { label: 'Market cap', value: '$1,524,552,459' },
                                { label: 'Last block', value: '3456789' },
                                { label: 'Transactions (1.82B Total)', value: '16 TPS' },
                            ].map(row => (
                                <div key={row.label} className="flex justify-between">
                                    <span style={{ color: tokens.secondaryText }}>{row.label}</span>
                                    <span className="font-semibold" style={{ color: tokens.primaryText }}>{row.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* News */}
                <div>
                    <button className="flex items-center gap-1 font-bold text-lg mb-3" style={{ color: tokens.primaryText }}>
                        📰 News <ChevronRight size={16} style={{ color: tokens.mutedText }} />
                    </button>
                    <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
                        {newsItems.map((item, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0 w-40 h-28 rounded-2xl relative overflow-hidden cursor-pointer flex items-end p-3"
                                style={{ backgroundColor: item.color }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                                <div className="relative z-10">
                                    <div className="text-white text-xs font-semibold leading-tight line-clamp-2">{item.title}</div>
                                    <div className="text-white/60 text-[10px] mt-1">{item.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top dApps */}
                <div>
                    <button className="flex items-center gap-1 font-bold text-lg mb-3" style={{ color: tokens.primaryText }}>
                        ⚡ Top dApps <ChevronRight size={16} style={{ color: tokens.mutedText }} />
                    </button>
                    <div
                        className="rounded-2xl overflow-hidden divide-y"
                        style={{ backgroundColor: tokens.surface, border: `1px solid ${tokens.borderColor}`, borderColor: tokens.dividerColor }}
                    >
                        {dApps.map((dapp, i) => (
                            <div key={i} className="flex items-center justify-between px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-9 h-9 rounded-full flex items-center justify-center text-base"
                                        style={{ backgroundColor: dapp.color }}
                                    >
                                        {dapp.icon}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm" style={{ color: tokens.primaryText }}>{dapp.name}</div>
                                        <div className="text-xs" style={{ color: tokens.secondaryText }}>{dapp.desc}</div>
                                    </div>
                                </div>
                                <button
                                    className="text-xs font-bold px-4 py-1.5 rounded-full"
                                    style={{ backgroundColor: tokens.elevatedSurface, color: tokens.primaryText }}
                                >
                                    Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Markets */}
                <div>
                    <button className="flex items-center gap-1 font-bold text-lg mb-3" style={{ color: tokens.primaryText }}>
                        📊 Markets <ChevronRight size={16} style={{ color: tokens.mutedText }} />
                    </button>
                    <div
                        className="rounded-2xl p-4"
                        style={{ backgroundColor: tokens.surface, border: `1px solid ${tokens.borderColor}` }}
                    >
                        <div className="flex items-center gap-1 text-xs font-bold mb-3" style={{ color: tokens.secondaryText }}>
                            <TrendingUp size={12} />
                            Top Gainers
                            <span className="ml-auto" style={{ color: tokens.mutedText }}>Last 24h</span>
                        </div>
                        <div className="space-y-3">
                            {topGainers.map((g, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                            style={{ backgroundColor: ['#e84393', '#9b59b6', '#e67e22'][i] }}
                                        >
                                            {g.name[0]}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-semibold" style={{ color: tokens.primaryText }}>{g.name}</span>
                                            {g.verified && <span className="text-blue-500 text-xs">✓</span>}
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-emerald-500">{g.change}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trending NFTs */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <button className="flex items-center gap-1 font-bold text-lg" style={{ color: tokens.primaryText }}>
                            🖼️ Trending NFTs <ChevronRight size={16} style={{ color: tokens.mutedText }} />
                        </button>
                        <span className="text-xs" style={{ color: tokens.secondaryText }}>7 Day Volume</span>
                    </div>
                    <div
                        className="rounded-2xl overflow-hidden divide-y"
                        style={{ backgroundColor: tokens.surface, border: `1px solid ${tokens.borderColor}`, borderColor: tokens.dividerColor }}
                    >
                        {trendingNFTs.map((nft, i) => (
                            <div key={i} className="flex items-center justify-between px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-xl"
                                        style={{ backgroundColor: nft.color }}
                                    />
                                    <span className="font-semibold text-sm" style={{ color: tokens.primaryText }}>{nft.name}</span>
                                </div>
                                <span className="font-bold text-sm" style={{ color: tokens.primaryText }}>{nft.volume}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
