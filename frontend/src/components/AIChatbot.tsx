import React, { useState } from 'react';
import { MessageSquare, Send, X, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
        { role: 'bot', text: 'Hello! I am your AI Travel Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');

        // Simulate API call to backend AI-Gateway
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'bot', text: `I am processing your request: "${userMsg}". Finding the best flight options...` }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="glass-morphism w-80 h-96 rounded-2xl flex flex-col mb-4 overflow-hidden shadow-2xl"
                    >
                        <div className="bg-airport-blue p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-2">
                                <Bot size={20} />
                                <span className="font-semibold text-sm">AI Travel Assistant</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs ${msg.role === 'user'
                                            ? 'bg-airport-accent text-white rounded-tr-none'
                                            : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-white/10 bg-slate-900">
                            <div className="flex gap-2">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about flights, shops..."
                                    className="flex-1 bg-slate-800 border-none rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-airport-accent text-white"
                                />
                                <button onClick={handleSend} className="bg-airport-accent p-2 rounded-lg text-white">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-airport-accent w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-white"
            >
                {isOpen ? <X /> : <MessageSquare />}
            </motion.button>
        </div>
    );
};

export default AIChatbot;
