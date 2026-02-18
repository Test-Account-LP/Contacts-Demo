import { useState } from 'react';
import { ArrowLeft, User, Plus, Edit2, QrCode, Clock, Lock, Users, Globe, Star, Crown } from 'lucide-react';
import type { Contact } from '../App';
import AddContactModal from '../components/AddContactModal';
import QRCodeModal from '../components/QRCodeModal';

export interface UserProfile {
    name: string;
    bio: string;
    handle: string;
    privacy: 'public' | 'friends' | 'private';
    level: number;
    points: number;
    followers: number;
    following: number;
    completedQuests: string[];
}

interface ProfileContactsScreenProps {
    onBack: () => void;
    profile: UserProfile;
    contacts: Contact[];
    onUpdateProfile: (updatedProfile: Partial<UserProfile>) => void;
    onAddContact: (contact: Omit<Contact, 'id'>) => void;
    onPurchaseStart: () => void;
    isPro: boolean;
    onTryPro: (feature: string) => void;
    onContactClick: (id: string) => void;
    onPointsClick: () => void;
}

export default function ProfileContactsScreen({
    onBack,
    profile,
    contacts,
    onUpdateProfile,
    onAddContact,
    onPurchaseStart,
    isPro,
    onTryPro,
    onContactClick,
    onPointsClick
}: ProfileContactsScreenProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [editName, setEditName] = useState(profile.name);
    const [editBio, setEditBio] = useState(profile.bio);
    const [editPrivacy, setEditPrivacy] = useState<'public' | 'friends' | 'private'>(profile.privacy || 'public');

    const handleSaveProfile = () => {
        onUpdateProfile({ name: editName, bio: editBio, privacy: editPrivacy });
        setIsEditing(false);
    };

    const handleAddStart = () => {
        setIsModalOpen(true);
    };

    const handleModalAdd = (c: any) => {
        onAddContact(c);
        setIsModalOpen(false);
    };

    const handleFeatureClick = (feature: string) => {
        onTryPro(feature);
    };

    // Mock Friend Logic: If contact has a handle, treat as friend for demo
    const isFriend = (contact: Contact) => !!contact.handle;

    // Helper to get title based on level
    const getTitle = (level: number) => {
        if (level >= 100) return 'Diamond';
        if (level >= 50) return 'Platinum';
        if (level >= 25) return 'Gold';
        if (level >= 10) return 'Silver';
        if (level >= 5) return 'Bronze';
        return 'Member';
    };

    return (
        <div className="pb-20 min-h-screen bg-white">
            <div className="flex items-center gap-4 mb-6 px-4 pt-4">
                <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-2xl font-bold">Profile & Contacts</h2>
            </div>

            {/* Profile Section */}
            <div className="mx-4 metallic-card !bg-gradient-to-br !from-slate-900 !to-slate-800 text-white p-6 rounded-3xl mb-8 relative shadow-xl overflow-hidden border-slate-700">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                {/* Edit Button */}
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-full backdrop-blur-sm z-20"
                    >
                        <Edit2 size={18} />
                    </button>
                )}

                {/* Level Badge - Clickable to go to Points Screen */}
                {!isEditing && (
                    <button
                        onClick={onPointsClick}
                        className="absolute top-4 left-4 flex items-center gap-1.5 bg-amber-400/20 text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-400/30 hover:bg-amber-400/30 transition-colors z-20"
                    >
                        <Crown size={12} fill="currentColor" />
                        <span>Lvl {profile.level} • {getTitle(profile.level)}</span>
                    </button>
                )}

                <div className="relative z-10 flex flex-col items-center text-center mt-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-500 p-0.5 mb-4 relative group">
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center text-2xl font-bold">
                            {profile.handle ? profile.handle[0].toUpperCase() : '₳'}
                        </div>
                        {!isEditing && (
                            <button
                                onClick={() => setIsQRModalOpen(true)}
                                className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full border-2 border-slate-800 hover:bg-slate-700 transition-colors"
                            >
                                <QrCode size={14} />
                            </button>
                        )}
                        {isEditing && (
                            <button
                                onClick={() => {/* Mock change PFP */ }}
                                className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center rounded-full text-xs font-bold backdrop-blur-[2px] hover:bg-black/50 transition-colors z-20"
                            >
                                <Edit2 size={16} className="mb-1" />
                                Change
                            </button>
                        )}
                    </div>

                    <h3 className="text-2xl font-bold">{profile.name || 'Unnamed'}</h3>

                    {/* Pro Social Metrics */}
                    {isPro && (
                        <div className="flex items-center gap-6 mt-2 mb-1">
                            <div className="text-center">
                                <div className="text-lg font-bold text-white leading-none">{profile.followers?.toLocaleString() ?? 1240}</div>
                                <div className="text-[10px] text-teal-200 font-bold uppercase tracking-wider">Followers</div>
                            </div>
                            <div className="w-px h-6 bg-white/20"></div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-white leading-none">{profile.following?.toLocaleString() ?? 42}</div>
                                <div className="text-[10px] text-teal-200 font-bold uppercase tracking-wider">Following</div>
                            </div>
                        </div>
                    )}

                    {/* Extended Logic for .algo domain */}
                    <div className="mt-1 flex flex-col items-center gap-1">
                        <div
                            onClick={!profile.handle ? onPurchaseStart : undefined}
                            className={`text-slate-400 text-sm flex items-center gap-2 ${!profile.handle ? 'cursor-pointer hover:text-teal-400 transition-colors' : ''}`}
                        >
                            {profile.handle ? `@${profile.handle}` : (
                                <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border border-white/5">
                                    Get a .algo name <span className="text-teal-400">→</span>
                                </span>
                            )}
                        </div>
                        {/* Domain Renewal Clock (Mocked) */}
                        {profile.handle && (
                            <div
                                onClick={() => handleFeatureClick('Domain Renewal')}
                                className="flex items-center gap-1.5 text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded cursor-pointer hover:bg-amber-400/20 transition-colors"
                            >
                                <Clock size={10} />
                                <span>Exp: 10m 23d</span>
                            </div>
                        )}
                    </div>
                </div>

                {isEditing ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Display Name</label>
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                placeholder="Your Name"
                                className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 backdrop-blur-sm transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Bio</label>
                            <textarea
                                value={editBio}
                                onChange={(e) => setEditBio(e.target.value)}
                                placeholder="Fill out your bio..."
                                className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-slate-500 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/50 backdrop-blur-sm transition-all"
                            ></textarea>
                        </div>

                        {/* Privacy Toggles (Public is Pro-only per user request) */}
                        <div onClick={!isPro ? () => { } : undefined}>
                            <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                                Visibility
                            </label>
                            <div className="grid grid-cols-3 gap-2 p-1 bg-black/20 rounded-xl">
                                {['public', 'friends', 'private'].map((mode) => {
                                    const isLocked = mode === 'public' && !isPro;
                                    return (
                                        <button
                                            key={mode}
                                            onClick={() => isLocked ? handleFeatureClick('Public Visibility') : setEditPrivacy(mode as any)}
                                            className={`py-2 rounded-lg text-xs font-bold capitalize flex flex-col items-center gap-1 transition-all ${editPrivacy === mode ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'} ${isLocked ? 'opacity-50' : ''}`}
                                        >
                                            <div className="relative">
                                                {mode === 'public' && <Globe size={12} />}
                                                {mode === 'friends' && <Users size={12} />}
                                                {mode === 'private' && <Lock size={12} />}
                                                {isLocked && <Lock size={8} className="absolute -top-1 -right-1 text-amber-500" />}
                                            </div>
                                            {mode}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="pt-2 flex gap-3">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex-1 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveProfile}
                                className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-teal-500/20"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center px-4">
                        <p className="text-slate-300 text-sm leading-relaxed">
                            {profile.bio || "No bio yet. Tap the edit icon to fill out your bio!"}
                        </p>
                    </div>
                )}
            </div>

            {/* Contacts Section */}
            <div className="px-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-900">Contacts</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleFeatureClick('Groups')}
                            className="flex items-center gap-1 text-slate-500 font-bold bg-slate-100 px-3 py-2 rounded-xl text-sm hover:bg-slate-200 transition-colors"
                        >
                            <Users size={18} />
                            {!isPro && <Lock size={12} className="ml-1" />}
                        </button>
                        <button
                            onClick={handleAddStart}
                            className="flex items-center gap-1 text-teal-600 font-bold bg-teal-50 px-4 py-2 rounded-xl text-sm hover:bg-teal-100 transition-colors"
                        >
                            <Plus size={18} /> Add New
                        </button>
                    </div>
                </div>

                <div className="space-y-3">
                    {contacts.length === 0 ? (
                        <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                            <User size={48} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium">No contacts yet</p>
                            <p className="text-slate-400 text-xs mt-1">Add friends to send assets easily</p>
                        </div>
                    ) : (
                        contacts.map(contact => (
                            <div
                                key={contact.id}
                                onClick={() => onContactClick(contact.id)}
                                className="p-4 metallic-card rounded-2xl flex items-center gap-4 hover:shadow-lg transition-all hover:bg-white/60 cursor-pointer active:scale-[0.99]"
                            >
                                {contact.type === 'group' ? (
                                    <div className="relative shrink-0 w-12 h-12">
                                        <div className="w-full h-full rounded-2xl bg-slate-100 flex flex-wrap p-1 overflow-hidden ring-2 ring-white shadow-sm">
                                            {contact.members?.slice(0, 4).map((m, i) => (
                                                <div key={i} className="w-[50%] h-[50%] p-0.5">
                                                    <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-[8px] overflow-hidden">
                                                        {m.avatar ? <img src={m.avatar} className="w-full h-full object-cover" /> : m.name[0]}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {contact.role === 'admin' && (
                                            <div className="absolute -top-2 -right-2 bg-amber-400 text-white p-1 rounded-full shadow-md z-10">
                                                <Crown size={10} fill="currentColor" />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="relative shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 ring-2 ring-white shadow-sm overflow-hidden">
                                            {contact.avatar ? <img src={contact.avatar} className="w-full h-full object-cover" /> : <User size={24} />}
                                        </div>
                                        {isFriend(contact) && (
                                            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-white p-1 rounded-full ring-2 ring-white z-10">
                                                <Star size={10} fill="currentColor" />
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-slate-900 flex items-center justify-between">
                                        <span className="flex items-center gap-1 truncate">
                                            {contact.name}
                                            {contact.isPro && !contact.type && <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[8px] px-1.5 py-0.5 rounded font-bold uppercase">Pro</span>}
                                            {contact.type === 'group' && <span className="bg-slate-200 text-slate-500 text-[8px] px-1.5 py-0.5 rounded font-bold uppercase flex items-center gap-0.5"><Users size={8} /> Group</span>}
                                        </span>
                                        {contact.handle && <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-bold border border-teal-100 text-ellipsis overflow-hidden max-w-[80px]">.algo</span>}
                                    </div>
                                    <div className="text-xs text-slate-400 font-mono mt-0.5 truncate">
                                        {contact.type === 'group'
                                            ? `${contact.members?.length} members • ${contact.role === 'admin' ? 'Created by you' : 'Participant'}`
                                            : contact.address
                                        }
                                    </div>
                                </div>
                                <div className="text-slate-300">
                                    <ArrowLeft size={16} className="rotate-180" />
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Friend Status Explanation */}
                {contacts.some(isFriend) && (
                    <p className="text-center text-[10px] text-slate-400 mt-4 flex items-center justify-center gap-1">
                        <Star size={10} className="text-amber-400" fill="currentColor" /> Indicates a mutual friend
                    </p>
                )}
            </div>

            <AddContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleModalAdd}
            />

            <QRCodeModal
                isOpen={isQRModalOpen}
                onClose={() => setIsQRModalOpen(false)}
                address="DUA4...2ESM"
            />
        </div>
    );
}
