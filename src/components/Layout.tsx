import type { ReactNode } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import { useTheme } from '../theme/ThemeContext';

interface LayoutProps {
    children: ReactNode;
    onHomeClick: () => void;
    onMenuClick: () => void;
    onDiscoverClick: () => void;
    overlay?: ReactNode;
}

export default function Layout({ children, onHomeClick, onMenuClick, onDiscoverClick, overlay }: LayoutProps) {
    const { tokens } = useTheme();

    return (
        <div className="min-h-screen flex justify-center font-sans p-4 sm:p-0" style={{ backgroundColor: tokens.primaryBackground }}>
            <div
                className="w-full max-w-md min-h-screen shadow-2xl relative overflow-hidden flex flex-col sm:rounded-[3rem] sm:my-8 sm:border-[8px] sm:border-slate-800 ring-1 ring-black/5"
                style={{ backgroundColor: tokens.secondaryBackground, color: tokens.primaryText }}
            >
                <Header />
                <main className="flex-1 px-4 py-4 overflow-y-auto pb-24">
                    {children}
                </main>
                <div
                    className="absolute bottom-0 w-full z-40 border-t"
                    style={{ backgroundColor: tokens.footerBackground, borderColor: tokens.dividerColor }}
                >
                    <BottomNav onHomeClick={onHomeClick} onMenuClick={onMenuClick} onDiscoverClick={onDiscoverClick} />
                </div>
                {overlay && (
                    <div className="absolute inset-0 z-50">{overlay}</div>
                )}
            </div>
        </div>
    );
}
