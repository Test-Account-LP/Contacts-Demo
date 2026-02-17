import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Lock, ShieldCheck } from 'lucide-react';
import type { Contact } from '../App';

interface ChatScreenProps {
    contact: Contact;
    onBack: () => void;
}

export default function ChatScreen({ contact, onBack }: ChatScreenProps) {
    const [messages, setMessages] = useState<{ id: string, text: string, sender: 'me' | 'them' }[]>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const sarcasticResponses = [
        "Oh, wow. That's fascinating. Tell me less.",
        "I'm sorry, I was busy not caring. What were you saying?",
        "Do you always type so loud?",
        "Seen. (But ignoring)",
        "That sounds like a 'you' problem.",
        "Riveting stuff. Truly.",
        "New phone, who dis?",
        "I'd agree with you, but then we'd both be wrong.",
        "Is this going to be on the test?",
        "k."
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMessage = { id: Date.now().toString(), text: inputText, sender: 'me' as const };
        setMessages(prev => [...prev, newMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate sarcastic AI response
        setTimeout(() => {
            const randomResponse = sarcasticResponses[Math.floor(Math.random() * sarcasticResponses.length)];
            setMessages(prev => [...prev, { id: Date.now().toString(), text: randomResponse, sender: 'them' as const }]);
            setIsTyping(false);
        }, 1500 + Math.random() * 2000);
    };

    return (
        <div className="pb-20 min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <div className="bg-white px-4 py-4 flex items-center gap-4 shadow-sm z-10 sticky top-0">
                <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex-1">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        {contact.name}
                        {contact.isPro && <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Pro</span>}
                    </h2>
                    <div className="flex items-center gap-1 text-xs text-teal-600 font-medium">
                        <ShieldCheck size={12} />
                        <span>End-to-End Encrypted</span>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    {contact.avatar && <img src={contact.avatar} className="w-full h-full object-cover" />}
                </div>
            </div>

            {/* Encryption Notice */}
            <div className="p-4 flex justify-center">
                <div className="bg-amber-50 text-amber-700 text-xs px-4 py-2 rounded-lg border border-amber-100 text-center max-w-xs">
                    <Lock size={12} className="inline mr-1" />
                    Messages are secured with P2P encryption. Even we can't read them (though we probably wouldn't want to).
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.sender === 'me'
                                ? 'bg-slate-900 text-white rounded-br-none'
                                : 'bg-white text-slate-800 border border-slate-100 shadow-sm rounded-bl-none'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-bl-none px-4 py-3 flex gap-1 items-center">
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t border-slate-100 sticky bottom-0">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-100 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputText.trim()}
                        className="bg-slate-900 text-white p-3 rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
