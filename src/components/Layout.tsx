import type { ReactNode } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import type { Theme } from '../App';

interface LayoutProps {
    children: ReactNode;
    onHomeClick: () => void;
    onMenuClick: () => void;
    currentTheme?: Theme;
}

export default function Layout({ children, onHomeClick, onMenuClick, currentTheme = 'default' }: LayoutProps) {
    return (
        <div data-theme={currentTheme} className="min-h-screen flex justify-center bg-slate-100 dark:bg-slate-900 font-sans">
            <div className="w-full max-w-md bg-white text-slate-900 min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
                <Header />
                <main className="flex-1 px-4 py-4 overflow-y-auto pb-24">
                    {children}
                </main>
                <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 z-50">
                    <BottomNav onHomeClick={onHomeClick} onMenuClick={onMenuClick} />
                </div>
            </div>
        </div>
    );
}
