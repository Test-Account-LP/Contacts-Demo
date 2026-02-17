import { User, ChevronRight } from 'lucide-react';

interface MoreScreenProps {
    onProfileContactsClick: () => void;
    onBack: () => void;
}

export default function MoreScreen({ onProfileContactsClick }: MoreScreenProps) {
    return (
        <div className="pb-20 pt-4">
            <h2 className="text-3xl font-bold mb-8 px-2">More</h2>

            <div
                onClick={onProfileContactsClick}
                className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                        <User size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Profile and Contacts</h3>
                        <p className="text-slate-500 text-sm">Update info & manage contacts</p>
                    </div>
                </div>
                <ChevronRight className="text-slate-400" />
            </div>

        </div>
    );
}
