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
        <div data-theme={currentTheme} className="min-h-screen flex justify-center bg-slate-200 font-sans p-4 sm:p-0">
            <div className="w-full max-w-md bg-slate-50/90 backdrop-blur-xl text-slate-900 min-h-screen shadow-2xl relative overflow-hidden flex flex-col sm:rounded-[3rem] sm:my-8 sm:border-[8px] sm:border-slate-800 ring-1 ring-black/5">
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
