import { Home, Globe, Repeat, Download, Menu } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

interface BottomNavProps {
    onHomeClick: () => void;
    onMenuClick: () => void;
    onDiscoverClick: () => void;
}

export default function BottomNav({ onHomeClick, onMenuClick, onDiscoverClick }: BottomNavProps) {
    const { tokens } = useTheme();

    const navItemStyle = { color: tokens.secondaryText };

    return (
        <div
            className="w-full py-3 px-6 flex justify-between items-center z-10 pb-6 border-t"
            style={{ backgroundColor: tokens.footerBackground, color: tokens.secondaryText, borderColor: tokens.dividerColor }}
        >
            <div
                onClick={onHomeClick}
                className="flex flex-col items-center gap-1 cursor-pointer rounded-lg p-1 transition-colors"
                style={{ color: tokens.primaryText }}
            >
                <Home size={24} strokeWidth={2.5} />
                <span className="text-[10px] font-medium">Home</span>
            </div>
            <div onClick={onDiscoverClick} className="flex flex-col items-center gap-1 transition-colors cursor-pointer" style={navItemStyle}>
                <Globe size={24} strokeWidth={2} />
                <span className="text-[10px] font-medium">Discover</span>
            </div>
            <div className="flex flex-col items-center gap-1 transition-colors cursor-pointer" style={navItemStyle}>
                <Repeat size={24} strokeWidth={2} />
                <span className="text-[10px] font-medium">Swap</span>
            </div>
            <div className="flex flex-col items-center gap-1 transition-colors cursor-pointer" style={navItemStyle}>
                <Download size={24} strokeWidth={2} className="rotate-180" />
                <span className="text-[10px] font-medium">Fund</span>
            </div>
            <div
                onClick={onMenuClick}
                className="flex flex-col items-center gap-1 cursor-pointer rounded-lg p-1 transition-colors"
                style={navItemStyle}
            >
                <Menu size={24} strokeWidth={2} />
                <span className="text-[10px] font-medium">Menu</span>
            </div>
        </div>
    );
}
