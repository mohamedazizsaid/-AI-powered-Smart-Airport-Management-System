import React, { useState } from 'react';
import { Package, Search, Clock, MapPin, AlertCircle, RefreshCw, CheckCircle2, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { baggageService } from '../services/baggage.service';
import { Button } from '../components/ui/Button';
import type { BaggagePredictionResponse } from '../types/api.types';

const BaggageView: React.FC = () => {
    const [tagNumber, setTagNumber] = useState('');
    const [isTracking, setIsTracking] = useState(false);
    const [trackingResult, setTrackingResult] = useState<BaggagePredictionResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleTrack = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!tagNumber.trim()) return;

        setIsTracking(true);
        setError(null);
        try {
            const result = await baggageService.track(tagNumber);
            setTrackingResult(result);
        } catch (err) {
            setError('Could not locate baggage tag. Please verify the ID and try again.');
            setTrackingResult(null);
        } finally {
            setIsTracking(false);
        }
    };

    // Mock data for the overall monitoring section
    const activeBaggage = [
        { id: 'TAG-8821', status: 'In Transit', currentLoc: 'Conveyor B', estArrival: '12 min', progress: 65 },
        { id: 'TAG-9022', status: 'Delayed', currentLoc: 'Sorting Gate 4', estArrival: '24 min', progress: 30 },
        { id: 'TAG-4410', status: 'Arrived', currentLoc: 'Carousel 3', estArrival: '0 min', progress: 100 },
        { id: 'TAG-1129', status: 'Processing', currentLoc: 'Check-in Desk 12', estArrival: '45 min', progress: 10 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Baggage Intelligence</h2>
                    <p className="text-slate-400 text-sm">Real-time tracking and delivery predictions</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <span className="text-xs font-bold text-slate-300">System Nominal</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tracker Tool */}
                <div className="lg:col-span-1 glass-morphism p-6 rounded-2xl flex flex-col gap-6">
                    <div>
                        <h3 className="font-bold flex items-center gap-2 mb-2">
                            <Navigation size={18} className="text-airport-accent" />
                            Global Tracker
                        </h3>
                        <p className="text-xs text-slate-500">Query the AI neural network for precise baggage location</p>
                    </div>

                    <form onSubmit={handleTrack} className="space-y-4">
                        <div className="relative">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Enter Tag ID (e.g. BAX-123)..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-airport-accent transition-colors"
                                value={tagNumber}
                                onChange={(e) => setTagNumber(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            isLoading={isTracking}
                            disabled={!tagNumber.trim()}
                            icon={<RefreshCw size={16} />}
                        >
                            Execute Search
                        </Button>
                    </form>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3"
                        >
                            <AlertCircle className="text-red-500 shrink-0" size={18} />
                            <p className="text-xs text-red-400 leading-relaxed font-medium">{error}</p>
                        </motion.div>
                    )}

                    {trackingResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 bg-airport-accent/10 border border-airport-accent/20 rounded-2xl space-y-4"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-[10px] text-airport-accent font-black uppercase tracking-widest mb-1">Status: {trackingResult.currentStatus}</p>
                                    <h4 className="font-black text-xl">{trackingResult.tagNumber}</h4>
                                </div>
                                <div className="p-2 bg-airport-accent/20 rounded-lg">
                                    <Package size={20} className="text-airport-accent" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Predicted Arrival</span>
                                    <span className="font-bold text-white">{trackingResult.estimatedDeliveryTimeMinutes} min</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">AI Confidence</span>
                                    <span className="font-bold text-airport-accent">{Math.round(trackingResult.predictionConfidence * 100)}%</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Routing Insights</p>
                                <p className="text-xs text-slate-300 italic">"Detected optimal path through Alpha-4 junction. High probability of early arrival at Carousel."</p>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Main Monitoring Board */}
                <div className="lg:col-span-2 glass-morphism p-6 rounded-2xl">
                    <h3 className="font-bold flex items-center gap-2 mb-6">
                        <Clock size={18} className="text-emerald-500" />
                        Network Throughput Monitoring
                    </h3>

                    <div className="space-y-4">
                        {activeBaggage.map((bag) => (
                            <div key={bag.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.08] transition-all group">
                                <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${bag.status === 'Delayed' ? 'bg-orange-500/10' : 'bg-airport-accent/10'}`}>
                                            <Package size={16} className={bag.status === 'Delayed' ? 'text-orange-500' : 'text-airport-accent'} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{bag.id}</p>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={12} className="text-slate-500" />
                                                <span className="text-[10px] text-slate-500 font-medium">{bag.currentLoc}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 mb-1 justify-end">
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${bag.status === 'Delayed' ? 'bg-orange-500/20 text-orange-500' :
                                                bag.status === 'Arrived' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-blue-500/20 text-blue-500'
                                                }`}>
                                                {bag.status}
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-400">ETA: {bag.estArrival}</p>
                                    </div>
                                </div>
                                <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${bag.progress}%` }}
                                        className={`h-full ${bag.status === 'Delayed' ? 'bg-orange-500 shadow-[0_0_10px_#f97316]' : 'bg-airport-accent shadow-[0_0_10px_#3b82f6]'}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-transparent border border-emerald-500/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 flex items-center justify-center border-t-emerald-500 animate-spin" />
                            <div>
                                <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest">AI Sorting Efficiency</h4>
                                <p className="text-2xl font-black text-white">99.4%</p>
                                <p className="text-xs text-slate-500">+2.1% from previous shift</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaggageView;
