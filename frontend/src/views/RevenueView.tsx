import React from 'react';
import { DollarSign, PieChart, ArrowUpRight, ShoppingBag } from 'lucide-react';

const RevenueView: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Revenue Optimization</h2>
                    <p className="text-slate-400 text-sm">Dynamic pricing & demand forecasting</p>
                </div>
                <div className="flex gap-3">
                    <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-500/20 flex items-center gap-1">
                        <ArrowUpRight size={14} /> +12.4% Revenue Forecast
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-morphism p-6 rounded-2xl">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <DollarSign size={18} className="text-airport-accent" />
                        Dynamic Parking Pricing
                    </h3>
                    <div className="space-y-4">
                        {[
                            { type: 'Economy (Zone D)', current: '$15.50', recommended: '$18.00', demand: 'High' },
                            { type: 'Premium (Zone A)', current: '$45.00', recommended: '$42.50', demand: 'Low' },
                            { type: 'Valet', current: '$75.00', recommended: '$75.00', demand: 'Normal' }
                        ].map((price, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                                <div>
                                    <p className="text-sm font-bold text-slate-200">{price.type}</p>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Demand: {price.demand}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs line-through text-slate-500">{price.current}</p>
                                    <p className="text-lg font-black text-emerald-500">{price.recommended}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-morphism p-6 rounded-2xl flex flex-col">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <ShoppingBag size={18} className="text-purple-500" />
                        Retail Demand Heatmap
                    </h3>
                    <div className="flex-1 rounded-xl bg-airport-dark/50 p-4 border border-white/5 relative overflow-hidden flex items-center justify-center text-slate-600 italic">
                        {/* Simulated Heatmap SVG */}
                        <svg width="100%" height="150" viewBox="0 0 200 100" className="opacity-50">
                            <rect x="10" y="10" width="40" height="30" fill="currentColor" className="text-red-500/20" />
                            <rect x="60" y="10" width="80" height="30" fill="currentColor" className="text-orange-500/20" />
                            <rect x="150" y="10" width="40" height="80" fill="currentColor" className="text-emerald-500/20" />
                            <circle cx="100" cy="70" r="20" fill="currentColor" className="text-red-500/40 animate-pulse" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-xs font-bold text-slate-300 bg-black/40 px-3 py-1 rounded-full border border-white/10">Duty Free Zone C: HIGH DEMAND</p>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-xl bg-white/5">
                            <p className="text-[10px] text-slate-500 uppercase">Avg Spend/Pax</p>
                            <p className="text-xl font-bold">$64.20</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5">
                            <p className="text-[10px] text-slate-500 uppercase">Conversion Rate</p>
                            <p className="text-xl font-bold">18.4%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueView;
