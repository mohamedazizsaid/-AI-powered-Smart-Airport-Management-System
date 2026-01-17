import React, { useEffect } from 'react';
import { Leaf, Wind, Zap, BarChart3, CloudRain, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApiStore } from '../store/apiStore';
import { Skeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';

const EnvironmentView: React.FC = () => {
    const {
        environmentStats,
        environmentState,
        fetchEnvironmentStats
    } = useApiStore();

    useEffect(() => {
        fetchEnvironmentStats();
    }, [fetchEnvironmentStats]);

    // Use API data or fallback values
    const aqi = environmentStats?.airQualityIndex ?? 42;
    const aqiStatus = environmentStats?.status ?? 'Excellent';
    const energyConsumption = environmentStats?.predictedConsumption_kWh ?? 4502;
    const energySavingMode = environmentStats?.energySavingMode ?? false;
    const carbonOffset = environmentStats?.carbonOffset_Tons ?? 12.4;
    const activeOptimizations = environmentStats?.active_optimizations ?? [
        'Precision HVAC (Gate D)',
        'LED Output Auto-Dimming'
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Environmental Intelligence</h2>
                    <p className="text-slate-400 text-sm">Predictive energy & carbon monitoring</p>
                </div>
                <div className="flex gap-2">
                    {environmentState.isLoading ? (
                        <span className="bg-white/10 text-slate-400 px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                            <Loader2 size={12} className="animate-spin" /> Loading...
                        </span>
                    ) : (
                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider">
                            Carbon Neutral Goal 2030
                        </span>
                    )}
                </div>
            </div>

            {/* Error State */}
            {environmentState.error && (
                <ErrorState
                    message={environmentState.error}
                    onRetry={fetchEnvironmentStats}
                    compact
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* AQI Card */}
                <div className="glass-morphism p-6 rounded-3xl flex flex-col gap-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl -mr-10 -mt-10" />
                    <Wind className="text-emerald-500 mb-2" size={24} />
                    <p className="text-slate-400 text-sm">Air Quality Index (AQI)</p>
                    {environmentState.isLoading && !environmentStats ? (
                        <Skeleton width={80} height={40} className="mb-1" />
                    ) : (
                        <p className="text-4xl font-black">{aqi}</p>
                    )}
                    <p className={`text-xs font-bold uppercase ${aqi < 50 ? 'text-emerald-500' : 'text-orange-500'}`}>
                        Status: {aqiStatus}
                    </p>
                </div>

                {/* Energy Card */}
                <div className="glass-morphism p-6 rounded-3xl flex flex-col gap-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-2xl -mr-10 -mt-10" />
                    <Zap className="text-blue-500 mb-2" size={24} />
                    <p className="text-slate-400 text-sm">Energy Consumption</p>
                    {environmentState.isLoading && !environmentStats ? (
                        <Skeleton width={120} height={40} className="mb-1" />
                    ) : (
                        <p className="text-4xl font-black">
                            {energyConsumption.toLocaleString()} <span className="text-sm font-normal text-slate-500">kWh</span>
                        </p>
                    )}
                    <p className={`text-xs font-bold uppercase ${energySavingMode ? 'text-blue-500' : 'text-slate-500'}`}>
                        AI Saving Mode: {energySavingMode ? 'ACTIVE' : 'INACTIVE'}
                    </p>
                </div>

                {/* Carbon Card */}
                <div className="glass-morphism p-6 rounded-3xl flex flex-col gap-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-2xl -mr-10 -mt-10" />
                    <Leaf className="text-purple-500 mb-2" size={24} />
                    <p className="text-slate-400 text-sm">Carbon Footprint</p>
                    {environmentState.isLoading && !environmentStats ? (
                        <Skeleton width={100} height={40} className="mb-1" />
                    ) : (
                        <p className="text-4xl font-black">
                            {carbonOffset} <span className="text-sm font-normal text-slate-500">Tons</span>
                        </p>
                    )}
                    <p className="text-xs text-purple-500 font-bold uppercase">Reduction Target: -4%</p>
                </div>
            </div>

            <div className="glass-morphism p-8 rounded-3xl">
                <h3 className="font-bold mb-6 flex items-center gap-2">
                    <BarChart3 size={20} className="text-airport-accent" />
                    Energy Optimization Strategy
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        {[
                            { label: 'Gate C4 (Empty)', action: 'Reduced HVAC to 15%', saved: '12% Energy' },
                            { label: 'Terminal A Lighting', action: 'Adaptive Brightness at 40%', saved: '8% Energy' },
                            { label: 'Conveyor Motors', action: 'Smart Standby Mode Engaged', saved: '5% Energy' }
                        ].map((opt, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between"
                            >
                                <div>
                                    <p className="font-bold text-slate-200">{opt.label}</p>
                                    <p className="text-xs text-slate-500">{opt.action}</p>
                                </div>
                                <span className="text-xs font-bold text-emerald-500">+{opt.saved}</span>
                            </motion.div>
                        ))}
                        {activeOptimizations.length > 0 && (
                            <div className="pt-4 border-t border-white/5">
                                <p className="text-[10px] text-slate-500 uppercase mb-2">Active AI Optimizations</p>
                                <div className="flex flex-wrap gap-2">
                                    {activeOptimizations.map((opt, i) => (
                                        <span key={i} className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded">
                                            {opt}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="rounded-2xl bg-black/30 p-6 flex flex-col justify-center gap-4 relative overflow-hidden">
                        <CloudRain className="absolute top-4 right-4 text-slate-700 opacity-20" size={64} />
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Weather Impact Prediction</h4>
                        <p className="text-slate-300">
                            Rising humidity predicted for 18:00. <br />
                            AI will automatically increase dehumidification in **Terminal B** to maintain comfort while optimizing energy.
                        </p>
                        <div className="w-full h-1 bg-white/10 rounded-full">
                            <div className="w-[70%] h-full bg-blue-500/50" />
                        </div>
                        {environmentStats?.sensor_network && (
                            <p className="text-[9px] text-slate-500 mt-2">Sensor: {environmentStats.sensor_network}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnvironmentView;
