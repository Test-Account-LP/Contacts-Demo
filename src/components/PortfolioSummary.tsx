export default function PortfolioSummary() {
    return (
        <div className="px-2 py-4">
            {/* Tabs */}
            <div className="flex bg-slate-100 rounded-full p-1 mb-6">
                <button className="flex-1 py-1.5 px-4 rounded-full bg-white shadow-sm text-sm font-semibold text-slate-900">Overview</button>
                <button className="flex-1 py-1.5 px-4 rounded-full text-sm font-medium text-slate-500">NTFs</button>
                <button className="flex-1 py-1.5 px-4 rounded-full text-sm font-medium text-slate-500">History</button>
            </div>

            {/* Balance */}
            <div className="text-center mb-2">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1">
                    <span className="text-3xl text-slate-400">₳</span>16,006
                </h1>
                <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-slate-500 text-sm">$15,594.15</span>
                    <span className="text-teal-500 text-sm font-medium flex items-center bg-teal-50 px-1.5 py-0.5 rounded">
                        + $16,02 <span className="ml-1">↑ 20,24%</span>
                    </span>
                </div>
            </div>

            {/* Chart Placeholder */}
            <div className="h-40 w-full mt-6 relative">
                <svg viewBox="0 0 100 40" className="w-full h-full stroke-teal-500 fill-none stroke-2" preserveAspectRatio="none">
                    <path d="M0,35 Q10,38 20,30 T40,20 T60,15 T80,18 T100,10" vectorEffect="non-scaling-stroke" />
                    <path d="M0,40 L0,35 Q10,38 20,30 T40,20 T60,15 T80,18 T100,10 L100,40 Z" className="fill-teal-500/10 stroke-none" />
                </svg>

                <div className="flex justify-center gap-6 mt-4">
                    <button className="bg-slate-100 px-3 py-1 rounded text-xs font-bold text-slate-900">1W</button>
                    <button className="px-3 py-1 rounded text-xs font-medium text-slate-400">1M</button>
                    <button className="px-3 py-1 rounded text-xs font-medium text-slate-400">1Y</button>
                </div>
            </div>
        </div>
    );
}
