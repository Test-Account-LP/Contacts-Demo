import { ScanLine, Settings, CreditCard, Layers, ArrowRightLeft, Download, Upload, Users, User, Plus, QrCode, Palette, Lock, BookOpen } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

interface MenuScreenProps {
    onProfileClick: () => void;
    isPro: boolean;
    onTryPro: (feature: string) => void;
    onThemesClick: () => void;
    onPeraRewardsClick: () => void;
}

export default function MenuScreen({ onProfileClick, isPro, onTryPro, onThemesClick, onPeraRewardsClick }: MenuScreenProps) {
    const { tokens } = useTheme();
    console.log('Rendering MenuScreen - Updated'); // Debugging update
    const menuItems = [
        { icon: <Layers size={22} />, label: 'NFTs', onClick: () => console.log('NFTs') },
        { icon: <ArrowRightLeft size={22} />, label: 'Transfer', onClick: () => console.log('Transfer'), badge: 'NEW' },
        { icon: <Download size={22} />, label: 'Buy Algo', onClick: () => console.log('Buy Algo') },
        { icon: <Upload size={22} />, label: 'Receive', onClick: () => console.log('Receive') },
        { icon: <Users size={22} />, label: 'Invite Friends', onClick: () => console.log('Invite Friends') },
    ];

    return (
        <div className="pb-24 pt-10 px-4 min-h-screen" style={{ backgroundColor: tokens.primaryBackground, color: tokens.primaryText }}>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="w-6"></div> {/* Spacer for centering */}
                <h2 className="text-lg font-bold">Menu</h2>
                <div className="flex gap-4" style={{ color: tokens.primaryText }}>
                    <ScanLine size={24} />
                    <Settings size={24} />
                </div>
            </div>

            {/* Cards Section */}
            <div
                className="p-5 rounded-2xl mb-4 relative overflow-hidden"
                style={{ backgroundColor: tokens.surface, color: tokens.primaryText, boxShadow: `0 4px 6px ${tokens.overlayDark}` }}
            >
                <div className="flex items-center gap-2 font-bold mb-2">
                    <CreditCard size={20} />
                    Cards
                </div>
                <p className="text-sm mb-6 max-w-[60%]" style={{ color: tokens.secondaryText }}>
                    Get the world's first web3 Mastercard.
                </p>
                <button
                    className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                    style={{ backgroundColor: tokens.buttonPrimaryBackground, color: tokens.buttonPrimaryText }}
                >
                    <Plus size={20} /> Create Pera Card
                </button>

                {/* Decorative Card Graphic Placeholder */}
                <div className="absolute top-4 right-[-20px] rotate-12 opacity-90">
                    <div className="w-24 h-32 bg-sky-400 rounded-xl border-2 border-slate-900 shadow-sm relative z-10">
                        <div className="absolute top-2 right-2 w-6 h-4 bg-yellow-400 rounded-sm border border-slate-900"></div>
                    </div>
                    <div className="w-24 h-32 bg-yellow-400 rounded-xl border-2 border-slate-900 shadow-sm absolute top-4 right-12 -z-10 rotate-[-15deg]"></div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                    onClick={onProfileClick}
                    className="p-4 rounded-3xl active:scale-95 transition-transform flex flex-col justify-between h-32"
                    style={{ backgroundColor: tokens.surface, color: tokens.primaryText, boxShadow: `0 4px 6px ${tokens.overlayDark}` }}
                >
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-cover bg-center"
                        style={{ background: tokens.metallicGradient || tokens.elevatedSurface, color: tokens.metallicGradient ? tokens.primaryBackground : tokens.primaryText }}
                    >
                        <User size={20} />
                    </div>
                    <span className="font-bold">Profile & Contacts</span>
                </div>

                {/* Pera Rewards - Replaced Pera Quests */}
                <div
                    onClick={onPeraRewardsClick}
                    className="p-4 rounded-3xl shadow-lg active:scale-95 transition-transform flex flex-col justify-between h-32 relative overflow-hidden"
                    style={{ backgroundColor: tokens.surface, color: tokens.primaryText, border: `1px solid ${tokens.borderColor}`, boxShadow: `0 4px 12px ${tokens.overlayDark}` }}
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
                        <BookOpen size={64} style={{ color: tokens.primaryAccent }} />
                    </div>
                    <div className="absolute bottom-10 right-2 opacity-20">
                        <div className="w-8 h-8 rounded-full border-2" style={{ borderColor: tokens.primaryAccent }}></div>
                    </div>

                    <div
                        className="w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: tokens.elevatedSurface, color: tokens.primaryAccent }}
                    >
                        <BookOpen size={20} />
                    </div>
                    <div>
                        <span className="font-bold block leading-tight">Pera Rewards</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: tokens.secondaryText }}>Earn Rewards</span>
                    </div>
                </div>

                <div
                    className="p-4 rounded-3xl shadow-sm active:scale-95 transition-transform flex flex-col justify-between h-32 relative overflow-hidden"
                    style={{ backgroundColor: tokens.buttonPrimaryBackground, color: tokens.buttonPrimaryText, boxShadow: `0 4px 12px ${tokens.overlayDark}` }}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <QrCode size={64} />
                    </div>
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: tokens.overlayLight }}
                    >
                        <QrCode size={20} />
                    </div>
                    <span className="font-bold">Scan QR</span>
                </div>

                {/* Themes - Pro Locked */}
                <div
                    onClick={() => isPro ? onThemesClick() : onTryPro('Custom Themes')}
                    className={`p-4 rounded-3xl border-0 active:scale-95 transition-transform flex flex-col justify-between h-32 relative overflow-hidden ${!isPro ? 'opacity-90' : ''}`}
                    style={{ background: tokens.metallicGradient || tokens.secondaryAccent, color: tokens.primaryBackground, boxShadow: `0 4px 12px ${tokens.overlayDark}` }}
                >
                    {!isPro && <div className="absolute top-3 right-3 p-1.5 rounded-full" style={{ backgroundColor: tokens.overlayDark }}><Lock size={12} color="#fff" /></div>}
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: tokens.overlayDark, color: '#fff' }}
                    >
                        <Palette size={20} />
                    </div>
                    <div>
                        <span className="font-bold block">Themes</span>
                        {!isPro && <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: tokens.overlayDark }}>Pro Only</span>}
                    </div>
                </div>

                {/* Other Menu Items moved to Grid */}
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={item.onClick}
                        className="p-4 rounded-3xl active:scale-95 transition-transform flex flex-col justify-between h-32 relative overflow-hidden group"
                        style={{ backgroundColor: tokens.surface, color: tokens.primaryText, boxShadow: `0 4px 6px ${tokens.overlayDark}` }}
                    >
                        {item.badge && (
                            <div
                                className="absolute top-3 right-3 px-1.5 py-0.5 text-[10px] font-bold uppercase rounded"
                                style={{ backgroundColor: tokens.success, color: '#fff' }}
                            >{item.badge}</div>
                        )}
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform bg-cover bg-center"
                            style={{ background: tokens.metallicGradient || tokens.elevatedSurface, color: tokens.metallicGradient ? tokens.primaryBackground : tokens.primaryText }}
                        >
                            {item.icon}
                        </div>
                        <span className="font-bold leading-tight">{item.label}</span>
                    </div>
                ))}
            </div>

        </div>
    );
}
