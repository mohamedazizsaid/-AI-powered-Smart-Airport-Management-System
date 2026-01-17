import React, { useState } from 'react';
import { MessageSquare, Send, X, Bot, Mic, MicOff, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatbot } from '../hooks/useChatbot';

const AIChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [input, setInput] = useState('');

    const { messages, isLoading, sendMessage } = useChatbot();

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        const userMsg = input;
        setInput('');
        await sendMessage(userMsg);
    };

    const toggleVoice = () => {
        setIsListening(!isListening);
        if (!isListening) {
            // Simulate voice recognition
            setTimeout(() => {
                setIsListening(false);
                setInput('Where is the nearest lounge?');
            }, 3000);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="glass-morphism w-80 h-96 rounded-2xl flex flex-col mb-4 overflow-hidden shadow-2xl border border-white/10"
                    >
                        <div className="bg-airport-accent p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-2">
                                <Bot size={20} />
                                <span className="font-bold text-xs uppercase tracking-widest">SmartAir Assistant</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050811]/90 custom-scrollbar">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${msg.role === 'user'
                                        ? 'bg-airport-accent text-white rounded-tr-none shadow-lg shadow-airport-accent/10'
                                        : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5'
                                        }`}>
                                        {msg.text}
                                        {msg.sentiment && msg.sentiment !== 'NEUTRAL' && (
                                            <span className={`ml-2 text-[9px] px-1.5 py-0.5 rounded ${msg.sentiment === 'POSITIVE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'
                                                }`}>
                                                {msg.sentiment}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/5 text-airport-accent p-3 rounded-2xl rounded-tl-none border border-airport-accent/20 flex items-center gap-2">
                                        <Loader2 size={14} className="animate-spin" />
                                        <span className="text-[10px] font-bold uppercase tracking-tighter">AI Processing...</span>
                                    </div>
                                </motion.div>
                            )}
                            {isListening && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/5 text-airport-accent p-3 rounded-2xl rounded-tl-none border border-airport-accent/20 flex items-center gap-2">
                                        <div className="flex gap-1">
                                            <span className="w-1 h-1 bg-airport-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-1 h-1 bg-airport-accent rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                                            <span className="w-1 h-1 bg-airport-accent rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-tighter">AI Listening...</span>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <div className="p-4 border-t border-white/5 bg-[#050811]">
                            <div className="flex gap-2">
                                <button
                                    onClick={toggleVoice}
                                    className={`p-2 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                                >
                                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                </button>
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask your travel assistant..."
                                    disabled={isLoading}
                                    className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-airport-accent text-white outline-none disabled:opacity-50"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading || !input.trim()}
                                    className="bg-airport-accent p-2 rounded-xl text-white shadow-lg shadow-airport-accent/20 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-airport-accent w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_#3b82f644] text-white border-2 border-white/10"
            >
                {isOpen ? <X size={28} /> : <div className="relative"><MessageSquare size={28} /><span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#050811]"></span></div>}
            </motion.button>
        </div>
    );
};

export default AIChatbot;
