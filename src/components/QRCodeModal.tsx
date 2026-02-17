import { X, Copy, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

interface QRCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    address: string;
}

export default function QRCodeModal({ isOpen, onClose, address }: QRCodeModalProps) {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-8 shadow-2xl relative flex flex-col items-center">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <X size={24} />
                </button>

                <h3 className="text-xl font-bold mb-2 text-center">Your Address</h3>
                <p className="text-slate-500 text-xs text-center mb-6 break-all px-4">{address}</p>

                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-inner mb-8">
                    <QRCodeSVG value={address} size={200} />
                </div>

                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors w-full justify-center"
                >
                    {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                    {copied ? 'Copied!' : 'Copy Address'}
                </button>
            </div>
        </div>
    );
}
