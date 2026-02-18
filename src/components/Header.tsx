import { ChevronDown, ScanLine, Bell, MoreHorizontal } from 'lucide-react';

export default function Header() {
    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white/40 backdrop-blur-xl sticky top-0 z-20 border-b border-white/20">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-md ring-2 ring-white/50">
                    {/* Placeholder for Identicon or Avatar */}
                    <span className="text-xl">₳</span>
                </div>
                <div>
                    <div className="flex items-center gap-1 text-slate-900">
                        <span className="font-bold text-lg tracking-tight">DUA4...2ESM</span>
                        <ChevronDown size={16} strokeWidth={3} className="text-slate-400" />
                    </div>
                    <div className="text-xs text-slate-400">Main Account</div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <MoreHorizontal size={24} className="text-slate-400" />
                <ScanLine size={24} className="text-slate-400" />
                <div className="relative">
                    <Bell size={24} className="text-slate-400" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">2</div>
                </div>
            </div>
        </div>
    );
}
