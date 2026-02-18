import { Search, Plus, SlidersHorizontal } from 'lucide-react';

export default function AssetsList() {
    const assets = [
        { name: 'Algo', ticker: 'ALGO', balance: '108,27', fiat: '$6.06', icon: 'A', color: 'bg-black text-white' },
        { name: 'USDC', ticker: 'USDC', balance: '3,495.00', fiat: '$3,495.00', icon: '$', color: 'bg-blue-500 text-white' },
        { name: 'Akita INU', ticker: 'AKTA', balance: '3,495.00', fiat: '$3,495.00', icon: '🐶', color: 'bg-pink-500 text-white' },
    ];

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
                {assets.map((asset, index) => (
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
            </div>
        </div>
    );
}
