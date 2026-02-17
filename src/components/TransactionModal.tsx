import { useState } from 'react';
import { X, ArrowDownLeft, Send, Users, ChevronDown } from 'lucide-react';
import type { Contact } from '../App';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'send' | 'request';
    recipient: Contact;
    onConfirm: (amount: string, asset: string) => void;
}

export default function TransactionModal({ isOpen, onClose, type, recipient, onConfirm }: TransactionModalProps) {
    const [amount, setAmount] = useState('');
    const [asset] = useState('ALGO');
    const [step, setStep] = useState(1); // 1: Input, 2: Confirm

    if (!isOpen) return null;

    const isGroup = recipient.type === 'group';
    const memberCount = recipient.members?.length || 0;

    const handleConfirm = () => {
        onConfirm(amount, asset);
        onClose();
        setStep(1);
        setAmount('');
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-end sm:items-center justify-center pb-0 sm:pb-0 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 relative flex flex-col h-[85vh] sm:h-auto sm:min-h-[500px]">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 z-10">
                    <X size={24} />
                </button>

                {/* Step 1: Input */}
                {step === 1 && (
                    <>
                        <div className="text-center mb-6 mt-2">
                            <h3 className="text-xl font-bold flex items-center justify-center gap-2">
                                {type === 'send' ? 'Send to' : 'Request from'}
                                <span className="text-teal-600 truncate max-w-[150px]">{recipient.name}</span>
                            </h3>
                            {isGroup && (
                                <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mt-1">
                                    <Users size={12} />
                                    <span>{type === 'send' ? `Splitting with ${memberCount} members` : `Requesting from ${memberCount} members`}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col justify-center items-center">
                            <div className="relative mb-8">
                                <div className="flex items-end gap-2 text-5xl font-bold text-slate-900 dark:text-white">
                                    <span className="text-slate-300">$</span>
                                    <input
                                        autoFocus
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="bg-transparent w-40 text-center focus:outline-none placeholder-slate-200"
                                    />
                                </div>
                                <div className="flex justify-center mt-4">
                                    <button className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full font-bold text-sm hover:bg-slate-200 transition-colors">
                                        <div className="w-5 h-5 rounded-full bg-black"></div>
                                        {asset}
                                        <ChevronDown size={14} className="text-slate-400" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            disabled={!amount}
                            className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-4 rounded-xl font-bold hover:opacity-90 transition-opacity mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Review
                        </button>
                    </>
                )}

                {/* Step 2: Confirm */}
                {step === 2 && (
                    <div className="flex flex-col h-full">
                        <h3 className="text-xl font-bold text-center mb-8 mt-2">Confirm {type === 'send' ? 'Transaction' : 'Request'}</h3>

                        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 flex flex-col items-center mb-6">
                            <div className="text-4xl font-bold mb-1">${amount}</div>
                            <div className="text-slate-400 font-medium text-sm mb-6">{asset}</div>

                            <div className="w-full h-px bg-slate-200 dark:bg-slate-700 mb-6"></div>

                            <div className="w-full space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">To</span>
                                    <span className="font-bold flex items-center gap-1">
                                        {recipient.avatar && <img src={recipient.avatar} className="w-5 h-5 rounded-full" />}
                                        {recipient.name}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Network Fee</span>
                                    <span className="font-bold">0.001 ALGO</span>
                                </div>
                                {isGroup && (
                                    <div className="flex justify-between items-start text-sm">
                                        <span className="text-slate-500">Strategy</span>
                                        <div className="text-right">
                                            <span className="font-bold block">{type === 'send' ? 'Split Evenly' : 'Atomic Request'}</span>
                                            <span className="text-xs text-slate-400">~${(Number(amount) / memberCount).toFixed(2)} per person</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-auto">
                            <button
                                onClick={handleConfirm}
                                className="w-full bg-teal-500 text-white py-4 rounded-xl font-bold hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
                            >
                                {type === 'send' ? <Send size={20} /> : <ArrowDownLeft size={20} />}
                                {type === 'send' ? 'Send Now' : 'Request Funds'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
