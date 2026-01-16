import React from 'react';
import { Users, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const StaffView: React.FC = () => {
    const staffStats = [
        { area: 'Security', allocated: 24, required: 22, status: 'Optimal' },
        { area: 'Check-in', allocated: 18, required: 25, status: 'Understaffed' },
        { area: 'Maintenance', allocated: 12, required: 10, status: 'Optimal' },
        { area: 'Ground Crew', allocated: 30, required: 28, status: 'Optimal' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Staff Management AI</h2>
                    <p className="text-slate-400 text-sm">Real-time workforce allocation & sentiment</p>
                </div>
                <button className="bg-airport-accent px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                    <Calendar size={16} /> Optimize Shifts
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-morphism p-6 rounded-2xl flex flex-col gap-6">
                    <h3 className="font-bold flex items-center gap-2">
                        <TrendingUp size={18} className="text-airport-accent" />
                        Allocation Efficiency
                    </h3>
                    <div className="space-y-4">
                        {staffStats.map((stat, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-slate-200">{stat.area}</p>
                                    <p className="text-xs text-slate-500">Allocated: {stat.allocated} / Needed: {stat.required}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${stat.status === 'Understaffed' ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'
                                        }`}>
                                        {stat.status}
                                    </span>
                                    <div className="w-32 h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                                        <div
                                            className={`h-full ${stat.status === 'Understaffed' ? 'bg-red-500' : 'bg-airport-accent'}`}
                                            style={{ width: `${(stat.allocated / stat.required) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-morphism p-6 rounded-2xl flex flex-col gap-4">
                    <h3 className="font-bold flex items-center gap-2">
                        <AlertCircle size={18} className="text-orange-500" />
                        Staff Sentiment Alert
                    </h3>
                    <div className="flex-1 bg-orange-500/5 border border-orange-500/10 rounded-xl p-4 italic text-sm text-orange-200/80">
                        "High stress detected in Terminal B Gate Staff. AI recommends a 15-min rotation break for Team C."
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Efficiency Score</p>
                        <p className="text-3xl font-bold text-airport-accent">94%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffView;
