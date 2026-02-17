import { Home, Globe, Repeat, Download, Menu } from 'lucide-react';

interface BottomNavProps {
    onHomeClick: () => void;
    onMenuClick: () => void;
}

export default function BottomNav({ onHomeClick, onMenuClick }: BottomNavProps) {
    return (
        <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 py-3 px-6 flex justify-between items-center text-slate-400 z-10 pb-6">
            <div
                onClick={onHomeClick}
                className="flex flex-col items-center gap-1 text-slate-900 cursor-pointer hover:bg-slate-50 rounded-lg p-1 transition-colors"
            >
                <Home size={24} strokeWidth={2.5} />
                <span className="text-[10px] font-medium">Home</span>
            </div>
            <div className="flex flex-col items-center gap-1 hover:text-slate-600 transition-colors cursor-pointer">
                <Globe size={24} strokeWidth={2} />
                <span className="text-[10px] font-medium">Discover</span>
            </div>
            <div className="flex flex-col items-center gap-1 hover:text-slate-600 transition-colors cursor-pointer">
                <Repeat size={24} strokeWidth={2} />
                <span className="text-[10px] font-medium">Swap</span>
            </div>
            <div className="flex flex-col items-center gap-1 hover:text-slate-600 transition-colors cursor-pointer">
                <Download size={24} strokeWidth={2} className="rotate-180" />
                <span className="text-[10px] font-medium">Fund</span>
            </div>
            <div
                onClick={onMenuClick}
                className="flex flex-col items-center gap-1 hover:text-slate-600 transition-colors cursor-pointer hover:bg-slate-50 rounded-lg p-1"
            >
                <Menu size={24} strokeWidth={2} />
                <span className="text-[10px] font-medium">Menu</span>
            </div>
        </div>
    );
}
