import { useState } from 'react';
import { X, Globe, Search, Check, ChevronLeft } from 'lucide-react';

interface DomainPurchaseFlowProps {
    onBack: () => void;
    onSuccess: (domain: string) => void;
}

export default function DomainPurchaseFlow({ onBack, onSuccess }: DomainPurchaseFlowProps) {
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Intro, 2: Search, 3: Confirm, 4: Success
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

    // Step 1: Intro Screen
    if (step === 1) {
        return (
            <div className="min-h-screen bg-white p-6 flex flex-col pt-12 relative animate-in fade-in duration-300">
                <button onClick={onBack} className="absolute top-4 left-4 text-slate-900"><X size={24} /></button>

                <div className="flex-1 flex flex-col justify-center items-center text-center mt-10">
                    <div className="w-64 h-64 bg-slate-900 rounded-full flex items-center justify-center mb-8 relative">
                        <div className="w-full h-full border border-slate-800 rounded-full absolute animate-pulse opacity-20"></div>
                        <div className="w-48 h-48 border border-slate-800 rounded-full absolute opacity-40"></div>
                        <span className="bg-yellow-400 text-slate-900 font-bold px-4 py-2 rounded-xl text-lg flex items-center gap-2 transform -rotate-3 z-10">
                            .algo <Globe size={16} />
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold mb-4">Get a <span className="font-mono">'.algo'</span> name <span className="bg-teal-100 text-teal-800 text-xs px-2 py-0.5 rounded uppercase align-middle ml-1">New</span></h2>
                    <p className="text-slate-500 mb-6 leading-relaxed">
                        Short names are an easier way for your account to be found. Anyone can use short names on the receiver account select screen to find your account.
                    </p>
                    <p className="text-slate-500 text-sm">
                        The first .algo shortname you purchase for your account becomes your default shortname on Pera.
                    </p>
                </div>

                <button
                    onClick={() => setStep(2)}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold mt-8 mb-6 hover:bg-slate-800 transition-colors"
                >
                    Next
                </button>
            </div>
        );
    }

    // Step 2: Search Screen
    if (step === 2) {
        const cleanSearchTerm = searchTerm.toLowerCase().replace('.algo', '');
        const isAvailable = cleanSearchTerm.length > 3 && !cleanSearchTerm.includes('taken');

        return (
            <div className="pb-32 min-h-screen bg-white p-4 pt-12 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => setStep(1)}><ChevronLeft size={24} /></button>
                    <h2 className="text-2xl font-bold">Find a '.algo' name</h2>
                </div>

                <div className="bg-slate-100 rounded-xl flex items-center px-4 py-3 mb-8">
                    <Search className="text-slate-400 mr-2" size={20} />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Type in a name"
                        className="bg-transparent w-full focus:outline-none text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {!searchTerm.includes('.algo') && searchTerm && <span className="text-slate-400">.algo</span>}
                </div>

                {cleanSearchTerm.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 mb-2">Available</h3>

                        {isAvailable ? (
                            <>
                                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                                            <div className="w-4 h-4 bg-white transform rotate-45"></div>
                                        </div>
                                        <span className="font-medium">{cleanSearchTerm}.algo</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono">√80</span>
                                        <button
                                            onClick={() => { setSelectedDomain(cleanSearchTerm); setStep(3); }}
                                            className="bg-slate-100 px-4 py-1.5 rounded-lg font-bold text-sm hover:bg-slate-200"
                                        >
                                            Buy
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-slate-100 opacity-60">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                                            <div className="w-4 h-4 bg-white transform rotate-45"></div>
                                        </div>
                                        <span className="font-medium">nice{cleanSearchTerm}.algo</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono">√97.5</span>
                                        <button className="bg-slate-100 px-4 py-1.5 rounded-lg font-bold text-sm hover:bg-slate-200">Buy</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8 text-slate-400">
                                {cleanSearchTerm.length < 3 ? 'Keep typing...' : 'Not available'}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // Step 3: Transaction Request
    if (step === 3) {
        return (
            <div className="pb-20 min-h-screen bg-black/90 p-6 flex flex-col items-center justify-center fixed inset-0 z-50 animate-in fade-in duration-200 text-white backdrop-blur-sm">
                <div className="w-full bg-white text-slate-900 rounded-t-3xl absolute bottom-0 p-6 pb-12 animate-in slide-in-from-bottom duration-300">
                    <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
                    <h3 className="text-center font-bold mb-10">Transaction Request</h3>

                    <div className="text-center mb-12">
                        <div className="text-4xl font-mono font-bold mb-2">-√120.00</div>
                        <div className="text-slate-500">$34.39</div>
                    </div>

                    <div className="border-t border-slate-100 pt-6 mb-6 text-sm">
                        <div className="flex justify-between mb-2">
                            <span className="flex items-center gap-2"><div className="w-4 h-4 bg-orange-500 rounded-full"></div> QKZ6V2..2IHHJA</span>
                            <span className="font-mono">√73,493.58</span>
                        </div>
                        <div className="flex justify-between text-slate-500">
                            <span>Network Fee</span>
                            <span className="font-mono">√0.000002</span>
                        </div>
                    </div>

                    <button className="text-teal-600 font-bold text-sm mb-8 block">Show Transaction Details</button>

                    <div className="flex gap-4">
                        <button onClick={() => setStep(2)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold">Cancel</button>
                        <button onClick={() => setStep(4)} className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold">Confirm</button>
                    </div>
                </div>
            </div>
        );
    }

    // Step 4: Success
    if (step === 4) {
        return (
            <div className="pb-20 min-h-screen bg-white p-6 flex flex-col items-center justify-center animate-in scale-in-95 duration-300">
                <button onClick={() => onSuccess(selectedDomain!)} className="absolute top-4 left-4"><X size={24} /></button>

                <div className="w-48 h-48 border-2 border-teal-500 rounded-3xl flex flex-col items-center justify-center mb-8 bg-white shadow-xl shadow-teal-500/10">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white mb-4">
                        <Check size={24} strokeWidth={4} />
                    </div>
                    <div className="font-bold text-lg mb-1">{selectedDomain}.algo</div>
                    <div className="font-mono text-slate-500">√120</div>
                </div>

                <h2 className="text-2xl font-bold mb-4 text-center">Successfully added '.algo' name</h2>
                <p className="text-center text-slate-500 mb-12 max-w-xs leading-relaxed">
                    <span className="text-slate-900 font-medium">{selectedDomain}.algo</span> is now tied to the account QKZ6V2..2IHHJA. This name can now be used to receive assets for this account.
                </p>

                <button
                    onClick={() => onSuccess(selectedDomain! + '.algo')}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                >
                    Back to my account
                </button>
            </div>
        );
    }

    return null;
}
