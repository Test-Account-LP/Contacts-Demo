import { useState } from 'react';
import { X, Search } from 'lucide-react';

interface AddContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (contact: { name: string; address: string; avatar?: string }) => void;
}

export default function AddContactModal({ isOpen, onClose, onAdd }: AddContactModalProps) {
    const [address, setAddress] = useState('');
    const [handle, setHandle] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    if (!isOpen) return null;

    const handleSearch = () => {
        // Mock search logic
        setIsSearching(true);
        setTimeout(() => {
            setIsSearching(false);
            if (handle.toLowerCase().includes('bob')) {
                setAddress('BOB...X99');
            } else if (address.length > 10) {
                setHandle('Unknown.algo');
            }
        }, 1000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({
            name: handle || 'Custom Contact',
            address: address,
            avatar: undefined
        });
        setAddress('');
        setHandle('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <X size={24} />
                </button>

                <h3 className="text-xl font-bold mb-4">Add Contact</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Top-level Domain (.algo)</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={handle}
                                onChange={(e) => setHandle(e.target.value)}
                                placeholder="username.algo"
                                className="flex-1 p-2 rounded-lg bg-slate-50 border border-slate-200"
                            />
                            <button
                                type="button"
                                onClick={handleSearch}
                                disabled={isSearching}
                                className="p-2 bg-teal-500 text-white rounded-lg disabled:opacity-50"
                            >
                                {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="text-center text-xs text-slate-400 font-medium">- OR -</div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Wallet Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="ALGO..."
                            className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 font-mono text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!address}
                        className="w-full py-3 bg-teal-500 text-white rounded-xl font-bold hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        Add Contact
                    </button>
                </form>
            </div>
        </div>
    );
}
