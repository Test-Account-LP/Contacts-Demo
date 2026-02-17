import { ChevronDown, ScanLine, Bell, MoreHorizontal } from 'lucide-react';

export default function Header() {
    return (
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 backdrop-blur-md sticky top-0 z-10 text-white">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center text-teal-900 font-bold">
                    {/* Placeholder for Identicon or Avatar */}
                    <span className="text-xl">₳</span>
                </div>
                <div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold text-lg">DUA4...2ESM</span>
                        <ChevronDown size={20} />
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
