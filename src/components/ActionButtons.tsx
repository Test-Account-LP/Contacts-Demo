import { ArrowRightLeft, Send, Download, MoreHorizontal } from 'lucide-react';

interface ActionButtonsProps {
    onMoreClick: () => void;
}

export default function ActionButtons({ onMoreClick }: ActionButtonsProps) {
    const actions = [
        { icon: <ArrowRightLeft size={24} />, label: 'Swap', onClick: () => console.log('Swap') },
        { icon: <Send size={24} />, label: 'Send', onClick: () => console.log('Send') },
        { icon: <Download size={24} />, label: 'Receive', onClick: () => console.log('Receive') },
        { icon: <MoreHorizontal size={24} />, label: 'More', onClick: onMoreClick },
    ];

    return (
        <div className="flex justify-between items-center px-4 py-6">
            {actions.map((action, index) => (
                <button
                    key={index}
                    onClick={action.onClick}
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white shadow-sm group-hover:scale-105 transition-transform group-active:scale-95">
                        {action.icon}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{action.label}</span>
                </button>
            ))}
        </div>
    );
}
