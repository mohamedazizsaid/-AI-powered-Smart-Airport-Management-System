import React, { useState } from 'react';
import { Settings, Tool, AlertTriangle, CheckCircle, Clock, Activity, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const MaintenanceView: React.FC = () => {
    const [assets, setAssets] = useState([
        { id: 'GATE-A1', type: 'PBB (Jet Bridge)', status: 'Healthy', wear: 12, next: '2026-03-10' },
        { id: 'RVW-04', type: 'Runway Surface', status: 'Warning', wear: 64, next: '2026-01-25' },
        { id: 'SCN-T1', type: 'Security Scanner', status: 'Critical', wear: 88, next: '2026-01-18' },
        { id: 'BLT-02', type: 'Baggage Belt', status: 'Healthy', wear: 34, next: '2026-02-14' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Predictive Maintenance</h2>
                    <p className="text-slate-400 text-sm">AI-driven infrastructure health monitoring</p>
                </div>
                <button className="bg-airport-accent px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                    <Activity size={16} /> Scan Infrastructure
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {assets.map((asset, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="glass-morphism p-5 rounded-2xl border border-white/5 relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl -mr-12 -mt-12 rounded-full ${asset.status === 'Critical' ? 'bg-red-500/20' : asset.status === 'Warning' ? 'bg-orange-500/20' : 'bg-emerald-500/20'
                            }`} />

                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg ${asset.status === 'Critical' ? 'bg-red-500/10 text-red-500' : asset.status === 'Warning' ? 'bg-orange-500/10 text-orange-500' : 'bg-emerald-500/10 text-emerald-500'
                                }`}>
                                {asset.status === 'Critical' ? <AlertTriangle size={20} /> : <CheckCircle size={20} />}
                            </div>
                            <span className="text-[10px] font-mono text-slate-500">{asset.id}</span>
                        </div>

                        <h3 className="font-bold text-slate-200 mb-1">{asset.type}</h3>
                        <div className="flex justify-between text-xs mb-3">
                            <span className="text-slate-500">Wear Level</span>
                            <span className={`font-bold ${asset.wear > 80 ? 'text-red-500' : asset.wear > 50 ? 'text-orange-500' : 'text-emerald-500'}`}>
                                {asset.wear}%
                            </span>
                        </div>

                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                            <div
                                className={`h-full transition-all duration-1000 ${asset.wear > 80 ? 'bg-red-500' : asset.wear > 50 ? 'bg-orange-500' : 'bg-emerald-500'
                                    }`}
                                style={{ width: `${asset.wear}%` }}
                            />
                        </div>

                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <Clock size={12} />
                            <span>Next Check: {asset.next}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="glass-morphism p-6 rounded-2xl min-h-[300px] flex flex-col">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Shield size={18} className="text-airport-accent" />
                    Vision Analysis History
                </h3>
                <div className="flex-1 rounded-xl bg-black/20 p-4 space-y-3">
                    {[
                        { time: '14:20', text: 'Runway 04: Minor surface crack detected via thermal imaging.', severity: 'low' },
                        { time: '13:45', text: 'Gate A1: Hydraulic pressure within nominal range (+0.2%).', severity: 'info' },
                        { time: '11:12', text: 'Security Scanner T1: X-ray tube wear exceeded 85%. replacement required.', severity: 'high' }
                    ].map((log, i) => (
                        <div key={i} className="flex gap-4 items-center text-xs p-3 rounded-lg border border-white/5 bg-white/5">
                            <span className="font-mono text-slate-500">{log.time}</span>
                            <span className="flex-1 text-slate-300">{log.text}</span>
                            <span className={`px-2 py-0.5 rounded uppercase font-bold text-[9px] ${log.severity === 'high' ? 'bg-red-500/20 text-red-500' : log.severity === 'low' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'
                                }`}>
                                {log.severity}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MaintenanceView;
