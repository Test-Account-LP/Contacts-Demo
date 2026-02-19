import { ArrowRightLeft, Send, Download, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

interface ActionButtonsProps {
    onMoreClick: () => void;
}

export default function ActionButtons({ onMoreClick }: ActionButtonsProps) {
    const { tokens } = useTheme();

    const actions = [
        { icon: <ArrowRightLeft size={24} />, label: 'Swap', onClick: () => console.log('Swap') },
        { icon: <Send size={24} />, label: 'Send', onClick: () => console.log('Send') },
        { icon: <Download size={24} />, label: 'Receive', onClick: () => console.log('Receive') },
        { icon: <MoreHorizontal size={24} />, label: 'More', onClick: onMoreClick },
    ];

    return (
        <div className="flex justify-between items-center px-4 pt-2 pb-6">
            {actions.map((action, index) => (
                <button
                    key={index}
                    onClick={action.onClick}
                    className="flex flex-col items-center gap-2 group"
                >
                    <div
                        className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform group-active:scale-95 bg-cover bg-center"
                        style={{
                            background: tokens.metallicGradient || tokens.elevatedSurface,
                            color: tokens.metallicGradient ? tokens.primaryBackground : tokens.primaryText,
                        }}
                    >
                        {action.icon}
                    </div>
                    <span className="text-xs font-semibold" style={{ color: tokens.secondaryText }}>
                        {action.label}
                    </span>
                </button>
            ))}
        </div>
    );
}
