import React, { useState, useEffect } from 'react';
import { Plane, User as UserIcon, CheckCircle, MapPin, Search, Mic, MicOff, Camera, Navigation, ShieldCheck, FileText, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useApiStore } from '../store/apiStore';

const CheckInView: React.FC = () => {
    const { user } = useAuthStore();
    const { flights, fetchFlights } = useApiStore();

    const [step, setStep] = useState(1);
    const [isListening, setIsListening] = useState(false);
    const [showAR, setShowAR] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [bookingRef, setBookingRef] = useState('');
    const [selectedFlight, setSelectedFlight] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (flights.length === 0) {
            fetchFlights();
        }
    }, [fetchFlights, flights.length]);

    const nextStep = () => setStep((prev: number) => prev + 1);

    const handleFindFlight = () => {
        setError(null);
        if (!bookingRef) {
            setError('Please enter your Booking Reference');
            return;
        }

        // Simulate flight lookup against real flights
        // In a real app, this would be an API call with bookingRef
        // For demo, we'll pick a flight that matches the Ref or just the first one
        const flight = flights.find(f => f.flightNumber.includes(bookingRef.toUpperCase())) || flights[0];

        if (flight) {
            setSelectedFlight(flight);
            nextStep();
        } else {
            setError('No flight found for this reference.');
        }
    };

    const simulateScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            nextStep();
        }, 3000);
    };

    const toggleVoice = () => {
        setIsListening(!isListening);
        if (!isListening) setTimeout(() => setIsListening(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#050811] text-white p-6 font-sans overflow-hidden">
            <div className="max-w-md mx-auto pt-10">
                <header className="mb-10 text-center relative">
                    <div className="absolute top-0 left-0">
                        <Link to="/" className="p-2 text-slate-500 hover:text-white transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                    </div>
                    <div className="w-16 h-16 bg-airport-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-airport-accent/30">
                        <Plane className="text-airport-accent" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Smart Check-in</h1>
                    <p className="text-slate-400 mt-1 font-medium">AI-powered seamless boarding</p>

                    <button
                        onClick={toggleVoice}
                        className={`absolute top-0 right-0 p-3 rounded-2xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/5 text-slate-500'}`}
                    >
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                </header>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass-morphism p-8 rounded-3xl space-y-6 border border-white/5"
                        >
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Booking Reference (PNR)</label>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input
                                            type="text"
                                            value={bookingRef}
                                            onChange={(e) => setBookingRef(e.target.value)}
                                            placeholder="e.g. XY72B1"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-airport-accent outline-none font-mono text-lg transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Last Name</label>
                                    <input
                                        type="text"
                                        defaultValue={user?.name.split(' ').pop()}
                                        placeholder="Enter your family name"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-airport-accent outline-none transition-all"
                                    />
                                </div>
                                {error && <p className="text-xs text-red-400 pl-1">{error}</p>}
                            </div>

                            <button
                                onClick={handleFindFlight}
                                className="w-full bg-airport-accent py-4 rounded-2xl font-bold text-lg shadow-lg shadow-airport-accent/30 active:scale-95 transition-all text-white"
                            >
                                Find My Flight
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-morphism p-8 rounded-3xl text-center space-y-8 border border-white/10"
                        >
                            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto border border-blue-500/30">
                                <ShieldCheck className="text-blue-500" size={40} />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold">Identity Verification</h2>
                                <p className="text-slate-400 text-sm">AI Facial Recognition & OCR Document Scan</p>
                            </div>

                            <div className="h-48 bg-black/40 rounded-3xl relative overflow-hidden flex items-center justify-center border border-white/5">
                                {isScanning ? (
                                    <>
                                        <div className="absolute inset-0 bg-blue-500/10" />
                                        <motion.div
                                            animate={{ top: ['0%', '100%', '0%'] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                            className="absolute left-0 right-0 h-0.5 bg-blue-400 shadow-[0_0_15px_#60a5fa] z-10"
                                        />
                                        <UserIcon className="text-white/20" size={64} />
                                        <div className="absolute top-4 left-4 text-[10px] font-bold text-blue-400 uppercase tracking-widest">Scanning Bio-Data...</div>
                                    </>
                                ) : (
                                    <p className="text-xs text-slate-500 italic">Position your document or face</p>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={simulateScan}
                                    className="flex-1 bg-white/5 border border-white/10 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
                                >
                                    <Camera size={18} /> Face Scan
                                </button>
                                <button
                                    onClick={simulateScan}
                                    className="flex-1 bg-white/5 border border-white/10 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
                                >
                                    <FileText size={18} /> Passport OCR
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            {!showAR ? (
                                <div className="glass-morphism p-6 rounded-3xl border border-white/10">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Flight Number</p>
                                            <p className="text-xl font-black">{selectedFlight?.flightNumber || 'BA-2291'}</p>
                                        </div>
                                        <div className="text-right space-y-1">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Status</p>
                                            <p className={`text-sm font-bold italic ${selectedFlight?.status === 'Delayed' ? 'text-orange-500' : 'text-emerald-500'}`}>
                                                {selectedFlight?.status || 'On Time'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center py-6 border-y border-white/5 relative">
                                        <div className="text-center">
                                            <p className="text-2xl font-black">{selectedFlight?.origin || 'LHR'}</p>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase">Origin</p>
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
                                            <p className="text-2xl font-black">{selectedFlight?.destination || 'DXB'}</p>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase">Destination</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 space-y-4">
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                                            <UserIcon className="text-airport-accent" size={20} />
                                            <div>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Verified Passenger</p>
                                                <p className="text-sm font-bold uppercase">{user?.name || 'M. AZIZ SAID'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                                            <MapPin className="text-emerald-500" size={20} />
                                            <div className="flex-1">
                                                <p className="text-[10px] font-black text-emerald-500 uppercase">Smart Gate Assigned</p>
                                                <p className="text-sm font-bold text-emerald-100 italic">Gate {selectedFlight?.gateAssignment || 'B12'} (Fast Track)</p>
                                            </div>
                                            <button
                                                onClick={() => setShowAR(true)}
                                                className="bg-emerald-500 p-2 rounded-xl text-white shadow-lg"
                                            >
                                                <Navigation size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-[400px] bg-black rounded-3xl relative overflow-hidden border-2 border-emerald-500/30"
                                >
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <Camera className="text-white/10" size={80} />
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                            <motion.path
                                                d="M 50 350 Q 200 200 350 50"
                                                stroke="#10b981"
                                                strokeWidth="12"
                                                fill="transparent"
                                                strokeDasharray="30, 15"
                                                initial={{ strokeDashoffset: 1000 }}
                                                animate={{ strokeDashoffset: 0 }}
                                                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                                            />
                                        </svg>
                                        <div className="absolute top-6 left-6 flex flex-col gap-1">
                                            <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full border border-white/10">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                <span className="text-[10px] uppercase font-black tracking-widest">AR Navigation Live</span>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-6 left-6 bg-emerald-500 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl">
                                            <Navigation size={20} className="text-white" />
                                            <div>
                                                <p className="text-[8px] font-black text-emerald-100 uppercase tracking-widest">Destination</p>
                                                <p className="text-sm font-black text-white italic">GATE B12 - 200m</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setShowAR(false)}
                                            className="absolute top-6 right-6 bg-black/60 p-2 rounded-full text-white border border-white/10"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            <button
                                onClick={() => setStep(4)}
                                className="w-full bg-emerald-500 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/20 active:scale-95 transition-all text-white"
                            >
                                Confirm & Get Boarding Pass
                            </button>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="glass-morphism p-10 rounded-[3rem] text-center space-y-8 relative overflow-hidden border border-white/10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent pointer-events-none" />

                            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                                <CheckCircle className="text-white" size={40} />
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-2xl font-black">Check-in Complete!</h2>
                                <p className="text-slate-400 text-sm">Your Identity & Documents have been verified by AI.</p>
                            </div>

                            <div className="bg-white p-6 rounded-[2rem] mx-auto w-52 h-52 flex items-center justify-center border-[12px] border-slate-900 shadow-2xl">
                                <div className="w-full h-full grid grid-cols-8 gap-0.5 bg-black p-1 relative overflow-hidden">
                                    {Array.from({ length: 64 }).map((_, i) => (
                                        <div key={i} className={`h-full w-full ${Math.random() > 0.4 ? 'bg-black' : 'bg-transparent'}`} />
                                    ))}
                                    <motion.div
                                        animate={{ top: ['0%', '100%', '0%'] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                        className="absolute left-0 right-0 h-1 bg-emerald-500 blur-sm z-10"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(1)}
                                className="text-slate-500 font-black uppercase text-xs tracking-[0.2em] hover:text-white transition-colors"
                            >
                                Finish
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const X = ({ size }: { size?: number }) => (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);

export default CheckInView;
