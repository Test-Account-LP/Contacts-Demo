import { ScanLine, Settings, CreditCard, Layers, ArrowRightLeft, Download, Upload, Users, User, Plus, QrCode, Palette, Lock } from 'lucide-react';

interface MenuScreenProps {
    onProfileClick: () => void;
    isPro: boolean;
    onTryPro: (feature: string) => void;
    onThemesClick: () => void;
}

export default function MenuScreen({ onProfileClick, isPro, onTryPro, onThemesClick }: MenuScreenProps) {
    const menuItems = [
        { icon: <Layers size={22} />, label: 'NFTs', onClick: () => console.log('NFTs') },
        { icon: <ArrowRightLeft size={22} />, label: 'Transfer', onClick: () => console.log('Transfer'), badge: 'NEW' },
        { icon: <Download size={22} />, label: 'Buy Algo', onClick: () => console.log('Buy Algo') },
        { icon: <Upload size={22} />, label: 'Receive', onClick: () => console.log('Receive') },
        { icon: <Users size={22} />, label: 'Invite Friends', onClick: () => console.log('Invite Friends') },
    ];

    return (
        <div className="pb-24 pt-10 px-4 bg-white min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="w-6"></div> {/* Spacer for centering */}
                <h2 className="text-lg font-bold">Menu</h2>
                <div className="flex gap-4 text-slate-900">
                    <ScanLine size={24} />
                    <Settings size={24} />
                </div>
            </div>

            {/* Cards Section */}
            <div className="bg-slate-50 p-5 rounded-2xl mb-4 relative overflow-hidden">
                <div className="flex items-center gap-2 font-bold mb-2">
                    <CreditCard size={20} />
                    Cards
                </div>
                <p className="text-sm text-slate-500 mb-6 max-w-[60%]">
                    Get the world's first web3 Mastercard.
                </p>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
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
                    className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 active:scale-95 transition-transform flex flex-col justify-between h-32"
                >
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="text-slate-900" size={20} />
                    </div>
                    <span className="font-bold text-slate-900">Profile & Contacts</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-3xl shadow-sm shadow-slate-200 active:scale-95 transition-transform flex flex-col justify-between h-32 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <QrCode size={64} className="text-white" />
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <QrCode className="text-white" size={20} />
                    </div>
                    <span className="font-bold text-white">Scan QR</span>
                </div>

                {/* Themes - Pro Locked */}
                <div
                    onClick={() => isPro ? onThemesClick() : onTryPro('Custom Themes')}
                    className={`bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-3xl shadow-sm border-0 active:scale-95 transition-transform flex flex-col justify-between h-32 relative overflow-hidden ${!isPro ? 'opacity-90' : ''}`}
                >
                    {!isPro && <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-md p-1.5 rounded-full"><Lock size={12} className="text-white" /></div>}
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Palette className="text-white" size={20} />
                    </div>
                    <div>
                        <span className="font-bold text-white block">Themes</span>
                        {!isPro && <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider">Pro Only</span>}
                    </div>
                </div>

                {/* Other Menu Items moved to Grid */}
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={item.onClick}
                        className="bg-slate-50 p-4 rounded-3xl border border-slate-100 active:scale-95 transition-transform flex flex-col justify-between h-32 relative overflow-hidden group hover:bg-slate-100"
                    >
                        {item.badge && (
                            <div className="absolute top-3 right-3 px-1.5 py-0.5 bg-teal-400 text-teal-900 text-[10px] font-bold uppercase rounded">{item.badge}</div>
                        )}
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-900 group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>
                        <span className="font-bold text-slate-900 leading-tight">{item.label}</span>
                    </div>
                ))}
            </div>

        </div>
    );
}
