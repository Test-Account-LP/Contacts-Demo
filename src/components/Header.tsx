import { ChevronDown, ScanLine, Bell, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

export default function Header() {
    const { tokens } = useTheme();

    return (
        <div
            className="flex items-center justify-between px-6 py-4 backdrop-blur-xl sticky top-0 z-20 border-b"
            style={{ backgroundColor: tokens.headerBackground, borderColor: tokens.dividerColor }}
        >
            <div className="flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md ring-2"
                    style={{
                        backgroundColor: tokens.primaryAccent,
                        color: tokens.buttonPrimaryText,
                        boxShadow: `0 0 0 2px ${tokens.overlayLight}`
                    }}
                >
                    {/* Placeholder for Identicon or Avatar */}
                    <span className="text-xl">₳</span>
                </div>
                <div>
                    <div className="flex items-center gap-1" style={{ color: tokens.primaryText }}>
                        <span className="font-bold text-lg tracking-tight">DUA4...2ESM</span>
                        <ChevronDown size={16} strokeWidth={3} style={{ color: tokens.mutedText }} />
                    </div>
                    <div className="text-xs" style={{ color: tokens.secondaryText }}>Main Account</div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <MoreHorizontal size={24} style={{ color: tokens.mutedText }} />
                <ScanLine size={24} style={{ color: tokens.mutedText }} />
                <div className="relative">
                    <Bell size={24} style={{ color: tokens.mutedText }} />
                    <div
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold"
                        style={{ backgroundColor: tokens.error, color: '#fff' }}
                    >2</div>
                </div>
            </div>
        </div>
    );
}
