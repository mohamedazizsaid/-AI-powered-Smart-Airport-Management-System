import React, { useState } from 'react';
import { Plane, User, CreditCard, CheckCircle, MapPin, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CheckInView: React.FC = () => {
    const [step, setStep] = useState(1);
    const [flightData, setFlightData] = useState({
        pnr: '',
        lastName: ''
    });

    const nextStep = () => setStep(prev => prev + 1);

    return (
        <div className="min-h-screen bg-[#050811] text-white p-6 font-sans">
            <div className="max-w-md mx-auto pt-10">
                <header className="mb-10 text-center">
                    <div className="w-16 h-16 bg-airport-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-airport-accent/30">
                        <Plane className="text-airport-accent" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Smart Check-in</h1>
                    <p className="text-slate-500 mt-2">AI-powered seamless boarding</p>
                </header>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass-morphism p-8 rounded-3xl space-y-6"
                        >
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Booking Reference (PNR)</label>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input
                                            type="text"
                                            placeholder="e.g. XY72B1"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-airport-accent outline-none font-mono text-lg"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your family name"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-airport-accent outline-none"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={nextStep}
                                className="w-full bg-airport-accent py-4 rounded-2xl font-bold text-lg shadow-lg shadow-airport-accent/30 active:scale-95 transition-transform"
                            >
                                Find My Flight
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="glass-morphism p-6 rounded-3xl border border-white/10">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Flight Number</p>
                                        <p className="text-xl font-bold">BA-2291</p>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Date</p>
                                        <p className="text-sm font-medium">16 Jan 2026</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-6 border-y border-white/5 relative">
                                    <div className="text-center">
                                        <p className="text-2xl font-black">LHR</p>
                                        <p className="text-[10px] text-slate-500">London</p>
                                    </div>
                                    <div className="flex-1 px-4 flex flex-col items-center">
                                        <div className="w-full h-px bg-white/10 relative">
                                            <motion.div
                                                initial={{ left: 0 }}
                                                animate={{ left: '100%' }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="absolute -top-1 w-2 h-2 bg-airport-accent rounded-full shadow-[0_0_10px_#3b82f6]"
                                            />
                                        </div>
                                        <Plane className="text-slate-700 my-2" size={16} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-black">DXB</p>
                                        <p className="text-[10px] text-slate-500">Dubai</p>
                                    </div>
                                </div>

                                <div className="pt-6 space-y-4">
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <User className="text-airport-accent" size={20} />
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase">Passenger</p>
                                            <p className="text-sm font-semibold">M. AZIZ SAID</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                                        <MapPin className="text-emerald-500" size={20} />
                                        <div>
                                            <p className="text-xs font-bold text-emerald-500 uppercase">Smart Gate Assigned</p>
                                            <p className="text-sm font-semibold text-emerald-100 italic">Fast Track: B12 (Recommended)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={nextStep}
                                className="w-full bg-emerald-500 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-500/30 active:scale-95 transition-transform"
                            >
                                Confirm & Get Boarding Pass
                            </button>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="glass-morphism p-10 rounded-[3rem] text-center space-y-8 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent pointer-events-none" />

                            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_#10b981]">
                                <CheckCircle className="text-white" size={40} />
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Check-in Complete!</h2>
                                <p className="text-slate-400">Your digital boarding pass is ready in your wallet.</p>
                            </div>

                            <div className="bg-white p-6 rounded-3xl mx-auto w-48 h-48 flex items-center justify-center border-8 border-slate-900 shadow-inner">
                                {/* Mock QR Code */}
                                <div className="w-full h-full grid grid-cols-6 gap-0.5 bg-black opacity-90 p-1">
                                    {Array.from({ length: 36 }).map((_, i) => (
                                        <div key={i} className={`h-full w-full ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`} />
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(1)}
                                className="text-slate-500 font-bold hover:text-white transition-colors"
                            >
                                Done
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CheckInView;
