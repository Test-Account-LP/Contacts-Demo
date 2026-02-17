import { useState } from 'react';
import { ArrowLeft, Send, ArrowDownLeft, MessageCircle, Star, Shield, Lock, X, Plus } from 'lucide-react';
import type { Contact } from '../App';
import AddContactModal from '../components/AddContactModal';

interface ContactDetailsScreenProps {
    contact: Contact;
    allContacts?: Contact[]; // passed from parent to allow adding members
    onBack: () => void;
    onChat: () => void;
    onSend: () => void;
    onRequest: () => void;
    onRemoveMember?: (memberId: string) => void;
    onAddMember?: (member: Contact) => void;
}

export default function ContactDetailsScreen({ contact, onBack, onChat, onSend, onRequest, onRemoveMember, onAddMember }: ContactDetailsScreenProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const isFriend = !!contact.handle;

    const handleAddMemberSelect = (selectedContact: any) => { // using any to match modal output for now
        if (onAddMember) {
            // In a real app we'd need to convert the modal output or ensure it matches Contact
            // Reusing the modal's output directly for demo purposes, adding id if needed
            onAddMember({ ...selectedContact, id: selectedContact.id || Date.now().toString() });
        }
        setIsAddModalOpen(false);
    };

    return (
        <div className="pb-20 min-h-screen bg-white">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center gap-4">
                <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <span className="font-bold text-lg">Contact Details</span>
            </div>

            <div className="p-6 flex flex-col items-center">
                {/* Avatar & Identity */}
                <div className="w-24 h-24 mb-4 relative">
                    <div className="w-full h-full rounded-full bg-slate-100 overflow-hidden ring-4 ring-slate-50 shadow-lg">
                        {contact.avatar
                            ? <img src={contact.avatar} className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 font-bold text-3xl">{contact.name[0]}</div>
                        }
                    </div>
                    {/* Move friend/admin indicators OUTSIDE the overflow-hidden div */}
                    {isFriend && <div className="absolute bottom-1 right-1 bg-amber-400 text-white p-1 rounded-full ring-2 ring-white"><Star size={12} fill="currentColor" /></div>}
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                    {contact.name}
                    {contact.isPro && <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold uppercase shadow-sm">Pro</span>}
                </h1>
                {contact.handle && <div className="text-teal-600 font-medium mb-1">@{contact.handle}</div>}
                <div className="text-slate-400 text-xs font-mono bg-slate-50 px-3 py-1 rounded-full">{contact.address || `${contact.members?.length} Members`}</div>

                {/* Bio or Group Description */}
                {contact.bio && (
                    <div className="mt-6 text-center max-w-xs">
                        <p className="text-slate-600 italic leading-relaxed">"{contact.bio}"</p>
                    </div>
                )}

                {/* Group Members List */}
                {contact.type === 'group' && contact.members && (
                    <div className="mt-6 w-full max-w-sm">
                        <div className="flex justify-between items-center mb-2 px-1">
                            <h3 className="text-sm font-bold text-slate-900">Members</h3>
                            {contact.role === 'admin' && (
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="text-xs text-teal-600 font-bold hover:underline"
                                >
                                    {isEditing ? 'Done' : 'Edit Group'}
                                </button>
                            )}
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-2 space-y-1">
                            {contact.members.map(m => (
                                <div key={m.id} className="flex items-center gap-3 p-2 bg-white rounded-xl shadow-sm justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs overflow-hidden">
                                            {m.avatar ? <img src={m.avatar} className="w-full h-full object-cover" /> : m.name[0]}
                                        </div>
                                        <div className="text-sm font-bold text-slate-900">{m.name}</div>
                                    </div>
                                    {isEditing && (
                                        <button
                                            onClick={() => onRemoveMember && onRemoveMember(m.id)}
                                            className="p-1.5 bg-rose-100 text-rose-500 rounded-full hover:bg-rose-200 transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    )}
                                </div>
                            ))}

                            {contact.role === 'member' && !isEditing && (
                                <button className="w-full py-3 text-rose-500 font-bold text-sm hover:bg-rose-50 rounded-xl transition-colors">
                                    Leave Group
                                </button>
                            )}

                            {/* Add Member Button in Edit Mode */}
                            {isEditing && (
                                <button
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="w-full py-3 text-teal-600 font-bold text-sm hover:bg-teal-50 rounded-xl transition-colors flex items-center justify-center gap-2 border border-dashed border-teal-200"
                                >
                                    <Plus size={16} /> Add Member
                                </button>
                            )}

                            {contact.role === 'admin' && !isEditing && (
                                <button
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="w-full py-3 text-slate-400 font-bold text-sm hover:bg-slate-200 rounded-xl transition-colors"
                                >
                                    Add Member
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Pro Stats (Mufasa) */}
                {contact.isPro && contact.pnl && (
                    <div className="mt-8 flex gap-4 w-full max-w-sm">
                        <div className="flex-1 bg-slate-900 text-white p-4 rounded-xl flex flex-col items-center shadow-xl shadow-slate-900/10">
                            <span className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Lifetime PnL</span>
                            <span className="text-2xl font-bold text-emerald-400">{contact.pnl}</span>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-8 w-full max-w-sm">
                    <button
                        onClick={onSend}
                        className="flex-1 flex flex-col items-center justify-center gap-2 bg-slate-100 p-4 rounded-2xl hover:bg-slate-200 transition-colors"
                    >
                        <Send size={24} className="text-slate-700" />
                        <span className="text-xs font-bold text-slate-600">Send</span>
                    </button>

                    <button
                        onClick={isFriend || contact.type === 'group' ? onRequest : undefined}
                        disabled={!isFriend && contact.type !== 'group'}
                        className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-colors ${(isFriend || contact.type === 'group') ? 'bg-slate-100 hover:bg-slate-200' : 'bg-slate-50 opacity-50 cursor-not-allowed'}`}
                    >
                        <div className="relative">
                            <ArrowDownLeft size={24} className="text-slate-700" />
                            {!isFriend && contact.type !== 'group' && <Lock size={12} className="absolute -top-1 -right-1 text-slate-400" />}
                        </div>
                        <span className="text-xs font-bold text-slate-600">Request</span>
                    </button>

                    <button
                        onClick={isFriend ? onChat : undefined}
                        disabled={!isFriend}
                        className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-colors ${isFriend ? 'bg-teal-50 hover:bg-teal-100' : 'bg-slate-50 opacity-50 cursor-not-allowed'}`}
                    >
                        <div className="relative">
                            <MessageCircle size={24} className="text-teal-600" />
                            {!isFriend && <Lock size={12} className="absolute -top-1 -right-1 text-slate-400" />}
                        </div>
                        <span className="text-xs font-bold text-teal-700">Chat</span>
                    </button>
                </div>
            </div>

            <AddContactModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddMemberSelect}
            />

            {/* History Section (Pro Only) */}
            {contact.isPro && contact.history && (
                <div className="max-w-md mx-auto mt-4 px-4">
                    <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
                        <Shield size={16} className="text-amber-500" />
                        Verified History
                    </h3>
                    <div className="space-y-3">
                        {contact.history.map((tx, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'received' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                        {tx.type === 'received' ? <ArrowDownLeft size={16} /> : <Send size={16} />}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-slate-900">{tx.type === 'received' ? 'Received' : 'Sent'} {tx.asset}</div>
                                        <div className="text-xs text-slate-400">{tx.date}</div>
                                    </div>
                                </div>
                                <div className={`font-bold ${tx.type === 'received' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                    {tx.type === 'received' ? '+' : '-'}{tx.amount}
                                </div>
                            </div>
                        ))}
                        <div className="text-center py-4 text-xs text-slate-400 italic">
                            History ends abruptly in 2022...
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
