import React, { useMemo } from 'react';
import { Shield, AlertTriangle, Eye, Lock, Zap, RefreshCw, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApiStore } from '../store/apiStore';
import { Button } from '../components/ui/Button';

const SecurityView: React.FC = () => {
    const { securityAlerts, clearAlerts } = useApiStore();

    const stats = useMemo(() => {
        return {
            activeAlerts: securityAlerts.length,
            confidence: 98.4,
            uptime: '99.99%',
            monitoredZones: 142
        };
    }, [securityAlerts]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Security Sentinel AI</h2>
                    <p className="text-slate-400 text-sm">Advanced computer vision & anomaly detection</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="ghost"
                        onClick={clearAlerts}
                        className="text-slate-400 hover:text-white"
                        icon={<RefreshCw size={16} />}
                    >
                        Reset History
                    </Button>
                    <Button variant="primary" icon={<Shield size={16} />}>
                        Deploy Backup
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Active Alerts', value: stats.activeAlerts, icon: <AlertTriangle className="text-red-500" />, color: 'red' },
                    { label: 'AI Confidence', value: `${stats.confidence}%`, icon: <Zap className="text-yellow-500" />, color: 'yellow' },
                    { label: 'System Uptime', value: stats.uptime, icon: <Lock className="text-emerald-500" />, color: 'emerald' },
                    { label: 'Monitored Zones', value: stats.monitoredZones, icon: <Eye className="text-blue-500" />, color: 'blue' },
                ].map((stat, i) => (
                    <div key={i} className="glass-morphism p-4 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-start mb-2">
                            <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
                                {stat.icon}
                            </div>
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Live</span>
                        </div>
                        <p className="text-2xl font-black">{stat.value}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Alert Feed */}
                <div className="lg:col-span-2 glass-morphism p-6 rounded-2xl flex flex-col min-h-[500px]">
                    <h3 className="font-bold flex items-center gap-2 mb-6">
                        <AlertTriangle size={18} className="text-red-500" />
                        Anomaly Response Feed
                    </h3>

                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                        <AnimatePresence initial={false}>
                            {securityAlerts.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                                    <div className="p-4 bg-white/5 rounded-full">
                                        <Shield size={40} className="opacity-20" />
                                    </div>
                                    <p className="text-sm italic">No active security threats detected</p>
                                </div>
                            ) : (
                                securityAlerts.map((alert, i) => (
                                    <motion.div
                                        key={alert.timestamp + i}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 20, opacity: 0 }}
                                        className={`p-4 rounded-xl border flex items-center justify-between group transition-all ${alert.risk_level === 'high'
                                            ? 'bg-red-500/10 border-red-500/20'
                                            : 'bg-white/5 border-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-lg ${alert.risk_level === 'high' ? 'bg-red-500/20' : 'bg-white/10'}`}>
                                                <Eye size={16} className={alert.risk_level === 'high' ? 'text-red-500' : 'text-slate-400'} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${alert.risk_level === 'high' ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-300'
                                                        }`}>
                                                        {alert.type}
                                                    </span>
                                                    <span className="text-[10px] text-slate-500 font-mono">
                                                        {new Date(alert.timestamp).toLocaleTimeString()}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-bold text-slate-200">{alert.message}</p>
                                                <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">
                                                    LOCATION: <span className="text-slate-400">{alert.location}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            Acknowledge
                                        </Button>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* AI Sentinel Status */}
                <div className="space-y-6">
                    <div className="glass-morphism p-6 rounded-2xl">
                        <h3 className="font-bold flex items-center gap-2 mb-6">
                            <Map size={18} className="text-airport-accent" />
                            Zone Coverage
                        </h3>
                        <div className="aspect-square bg-black/60 rounded-2xl relative overflow-hidden flex items-center justify-center border border-white/5 ring-1 ring-white/10">
                            {/* Visual representation of radar/scanning */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    className="w-full h-full border-t border-airport-accent/30 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="absolute w-[80%] h-[80%] border border-white/5 rounded-full" />
                                <div className="absolute w-[60%] h-[60%] border border-white/5 rounded-full" />
                                <div className="absolute w-[40%] h-[40%] border border-white/5 rounded-full" />
                                <div className="absolute w-1 h-1 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444] top-1/3 left-1/4" />
                                <div className="absolute w-1 h-1 bg-green-500 rounded-full shadow-[0_0_10px_#10b981] bottom-1/4 right-1/3" />
                            </div>
                            <div className="z-10 text-center">
                                <Shield className="text-airport-accent/20 mx-auto mb-2" size={48} />
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active Scan</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-3">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500">Processing Load</span>
                                <span className="font-bold text-airport-accent">42%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-airport-accent"
                                    initial={{ width: 0 }}
                                    animate={{ width: '42%' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="glass-morphism p-6 rounded-2xl bg-gradient-to-br from-airport-accent/5 to-transparent border-airport-accent/10">
                        <h3 className="font-bold text-sm mb-4">AI Vision Metrics</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Face Recognition', value: 99.2 },
                                { label: 'Object Tracking', value: 97.5 },
                                { label: 'Behavioral Analysis', value: 94.8 }
                            ].map((metric, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">{metric.label}</span>
                                        <span className="text-[10px] font-mono text-airport-accent">{metric.value}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-airport-accent/50"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${metric.value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityView;
