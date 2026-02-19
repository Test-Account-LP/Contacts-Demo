import { useState } from 'react';
import { useTheme } from '../theme/ThemeContext';

export default function PortfolioSummary() {
    const { tokens } = useTheme();
    const [activeRange, setActiveRange] = useState('1W');

    return (
        <div className="px-2 py-4">
            {/* Tabs */}
            <div className="flex rounded-full p-1 mb-6" style={{ backgroundColor: tokens.elevatedSurface }}>
                <button
                    className="flex-1 py-1.5 px-4 rounded-full text-sm font-semibold shadow-md"
                    style={{ backgroundColor: tokens.buttonPrimaryBackground, color: tokens.buttonPrimaryText }}
                >
                    Overview
                </button>
                <button className="flex-1 py-1.5 px-4 rounded-full text-sm font-medium transition-colors" style={{ color: tokens.mutedText }}>
                    NFTs
                </button>
                <button className="flex-1 py-1.5 px-4 rounded-full text-sm font-medium transition-colors" style={{ color: tokens.mutedText }}>
                    History
                </button>
            </div>

            {/* Balance */}
            <div className="text-center mb-2">
                <h1 className="text-4xl font-bold flex items-center justify-center gap-1" style={{ color: tokens.primaryText }}>
                    <span className="text-3xl" style={{ color: tokens.primaryAccent }}>₳</span>16,006
                </h1>
                <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-sm" style={{ color: tokens.secondaryText }}>$15,594.15</span>
                    {/* Profit badge — no border, just a soft background */}
                    <span
                        className="text-sm font-bold flex items-center gap-0.5 px-2 py-0.5 rounded-lg"
                        style={{ backgroundColor: 'rgba(20,184,166,0.15)', color: '#14b8a6' }}
                    >
                        + $16,02 <span>↑ 20,24%</span>
                    </span>
                </div>
            </div>

            {/* Chart */}
            <div className="h-40 w-full mt-6 relative">
                <svg viewBox="0 0 100 40" className="w-full h-full fill-none stroke-2 stroke-teal-500" preserveAspectRatio="none">
                    <path d="M0,35 Q10,38 20,30 T40,20 T60,15 T80,18 T100,10" vectorEffect="non-scaling-stroke" />
                    <path d="M0,40 L0,35 Q10,38 20,30 T40,20 T60,15 T80,18 T100,10 L100,40 Z" className="fill-teal-500/10 stroke-none" />
                </svg>
            </div>

            {/* Time Range Buttons — outside chart div with top margin */}
            <div className="flex justify-center gap-6 mt-6 mb-2">
                {['1W', '1M', '1Y'].map(range => (
                    <button
                        key={range}
                        onClick={() => setActiveRange(range)}
                        className="px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                        style={
                            activeRange === range
                                ? { backgroundColor: tokens.elevatedSurface, color: tokens.primaryText }
                                : { color: tokens.mutedText }
                        }
                    >
                        {range}
                    </button>
                ))}
            </div>
        </div>
    );
}
