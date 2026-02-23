import { Twitter, Instagram, X as CloseIcon, Download, Share2 } from 'lucide-react';
import InfographicCard from './InfographicCard';

interface SocialShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'swap' | 'staking';
    details: {
        fromAmount?: string;
        fromToken?: string;
        toAmount?: string;
        toToken?: string;
        stakedAmount?: string;
    };
    socials: { platform: 'X' | 'Instagram'; isConnected: boolean; handle: string }[];
}

export default function SocialShareModal({ isOpen, onClose, type, details, socials }: SocialShareModalProps) {
    if (!isOpen) return null;

    const xConnected = socials.find(s => s.platform === 'X')?.isConnected;
    const instagramConnected = socials.find(s => s.platform === 'Instagram')?.isConnected;

    const handleShareX = () => {
        let text = '';
        if (type === 'swap') {
            text = `I just swapped ${details.fromAmount} ${details.fromToken} for ${details.toAmount} ${details.toToken} using Pera Wallet. #Algorand`;
        } else {
            text = `I just staked ${details.stakedAmount} ALGO to help secure the network. Supporting Algorand with Pera Wallet. #Algorand`;
        }
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const handleShareInstagram = () => {
        // Instagram deep linking is harder for web; fallback to native share API or message
        if (navigator.share) {
            navigator.share({
                title: 'Pera Wallet Activity',
                text: type === 'swap'
                    ? `I just swapped ${details.fromAmount} ${details.fromToken} for ${details.toAmount} ${details.toToken} using Pera Wallet.`
                    : `I just staked ${details.stakedAmount} ALGO to help secure the network.`,
                url: window.location.href
            }).catch(console.error);
        } else {
            alert('Opening Instagram Share Sheet...');
        }
    };

    const isNoneConnected = !xConnected && !instagramConnected;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[150] flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-t-[40px] sm:rounded-[40px] p-8 w-full max-w-lg shadow-2xl animate-in slide-in-from-bottom-10 duration-500 relative overflow-hidden">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                    <CloseIcon size={20} />
                </button>

                {isNoneConnected ? (
                    <div className="text-center py-6">
                        <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Share2 size={40} className="text-teal-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Share your {type}?</h3>
                        <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                            Connect your socials to share your activity with your friends.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={onClose} // In a real app, this might navigate to profile
                                className="w-full py-4 bg-teal-500 text-white rounded-2xl font-bold shadow-lg shadow-teal-500/20 hover:bg-teal-600 transition-all active:scale-[0.98]"
                            >
                                Connect Socials
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold hover:bg-slate-100 transition-all"
                            >
                                Not Now
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-900">Share Your {type === 'swap' ? 'Swap' : 'Staking'}</h3>

                        {/* Infographic Preview */}
                        <div className="rounded-[32px] overflow-hidden shadow-xl border-4 border-slate-50">
                            <InfographicCard type={type} details={details} />
                        </div>

                        <div className="space-y-3 pt-2">
                            {xConnected && (
                                <button
                                    onClick={handleShareX}
                                    className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-[0.98]"
                                >
                                    <Twitter size={20} fill="currentColor" /> Post to X
                                </button>
                            )}
                            {instagramConnected && (
                                <button
                                    onClick={handleShareInstagram}
                                    className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-[0.98]"
                                >
                                    <Instagram size={20} /> Share to Instagram
                                </button>
                            )}
                            <button
                                className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-100 transition-all"
                            >
                                <Download size={20} /> Save Image
                            </button>
                        </div>

                        <p className="text-center text-[11px] text-slate-400 font-medium pb-2">
                            Pera Wallet • Fast. Secure. Algorand.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
