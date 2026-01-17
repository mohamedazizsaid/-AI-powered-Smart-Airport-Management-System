import React, { useEffect } from 'react';
import { AlertTriangle, CheckCircle, Clock, Activity, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApiStore } from '../store/apiStore';
import { SkeletonCard } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import type { Maintenance } from '../types/api.types';

const MaintenanceView: React.FC = () => {
    const {
        maintenanceAssets,
        maintenanceState,
        fetchMaintenanceAssets
    } = useApiStore();

    useEffect(() => {
        fetchMaintenanceAssets();
    }, [fetchMaintenanceAssets]);

    // Derived data for display - combine real API data with fallback mock structure
    const displayAssets: Array<{
        id: string;
        type: string;
        status: string;
        wear: number;
        next: string;
    }> = maintenanceAssets.length > 0
            ? maintenanceAssets.map((asset: Maintenance) => ({
                id: asset.assetId,
                type: asset.assetType,
                status: asset.status,
                wear: asset.wearLevel,
                next: asset.nextScheduledMaintenance?.split('T')[0] || 'N/A',
            }))
            : [
                // Fallback mock data when API returns empty
                { id: 'GATE-A1', type: 'PBB (Jet Bridge)', status: 'Healthy', wear: 12, next: '2026-03-10' },
                { id: 'RVW-04', type: 'Runway Surface', status: 'Warning', wear: 64, next: '2026-01-25' },
                { id: 'SCN-T1', type: 'Security Scanner', status: 'Critical', wear: 88, next: '2026-01-18' },
                { id: 'BLT-02', type: 'Baggage Belt', status: 'Healthy', wear: 34, next: '2026-02-14' },
            ];

    const handleScanInfrastructure = () => {
        fetchMaintenanceAssets();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Predictive Maintenance</h2>
                    <p className="text-slate-400 text-sm">AI-driven infrastructure health monitoring</p>
                </div>
                <button
                    onClick={handleScanInfrastructure}
                    disabled={maintenanceState.isLoading}
                    className="bg-airport-accent px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 disabled:opacity-50"
                >
                    <Activity size={16} className={maintenanceState.isLoading ? 'animate-spin' : ''} />
                    {maintenanceState.isLoading ? 'Scanning...' : 'Scan Infrastructure'}
                </button>
            </div>

            {/* Error State */}
            {maintenanceState.error && (
                <ErrorState
                    message={maintenanceState.error}
                    onRetry={fetchMaintenanceAssets}
                    compact
                />
            )}

            {/* Loading State */}
            {maintenanceState.isLoading && !maintenanceAssets.length && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            )}

            {/* Asset Cards */}
            {!maintenanceState.isLoading || maintenanceAssets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayAssets.map((asset, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="glass-card p-6 border border-white/5 relative overflow-hidden group"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl -mr-16 -mt-16 rounded-full opacity-20 transition-opacity group-hover:opacity-30 ${asset.status === 'Critical' ? 'bg-red-500' :
                                    asset.status === 'Warning' ? 'bg-orange-500' : 'bg-emerald-500'
                                }`} />

                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 rounded-xl ${asset.status === 'Critical' ? 'bg-red-500/10 text-red-500' :
                                        asset.status === 'Warning' ? 'bg-orange-500/10 text-orange-500' : 'bg-emerald-500/10 text-emerald-500'
                                    }`}>
                                    {asset.status === 'Critical' ? <AlertTriangle size={20} /> : <CheckCircle size={20} />}
                                </div>
                                <span className="text-[10px] font-mono font-bold text-slate-600 tracking-wider bg-black/30 px-2 py-1 rounded">
                                    {asset.id}
                                </span>
                            </div>

                            <h3 className="font-black text-white mb-2 tracking-tight">{asset.type}</h3>

                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Wear Level</p>
                                    <p className={`text-2xl font-black ${asset.wear > 80 ? 'text-red-500' :
                                            asset.wear > 50 ? 'text-orange-500' : 'text-emerald-500'
                                        }`}>
                                        {asset.wear}%
                                    </p>
                                </div>
                                <div className={`status-badge ${asset.status === 'Critical' ? 'status-badge-danger' :
                                        asset.status === 'Warning' ? 'status-badge-warning' : 'status-badge-success'
                                    }`}>
                                    {asset.status}
                                </div>
                            </div>

                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-6 shadow-inner">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${asset.wear}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className={`h-full shadow-[0_0_10px_rgba(255,255,255,0.1)] ${asset.wear > 80 ? 'bg-red-500' :
                                            asset.wear > 50 ? 'bg-orange-500' : 'bg-emerald-500'
                                        }`}
                                />
                            </div>

                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                <Clock size={12} className="text-airport-accent" />
                                <span>Cycle Update: {asset.next}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : null}

            <div className="glass-morphism p-8 rounded-[2.5rem] min-h-[350px] flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-airport-accent/5 blur-[100px] -mr-32 -mt-32" />
                <h3 className="font-black text-white mb-8 flex items-center gap-3">
                    <div className="p-2 bg-airport-accent/10 rounded-lg">
                        <Shield size={18} className="text-airport-accent" />
                    </div>
                    Vision Analytics Audit Log
                </h3>
                <div className="flex-1 rounded-2xl bg-black/30 p-6 space-y-4 overflow-y-auto custom-scrollbar">
                    {[
                        { time: '14:20:12', text: 'Runway 04: Minor surface crack detected via thermal imaging. Scheduling non-intrusive scan.', severity: 'low' },
                        { time: '13:45:05', text: 'Gate A1: Hydraulic collective pressure within nominal range (+0.2% variance).', severity: 'info' },
                        { time: '11:12:44', text: 'Security Scanner T1: X-ray tube wear exceeded 85%. Urgent replacement task generated.', severity: 'high' }
                    ].map((log, i) => (
                        <div key={i} className="flex gap-4 items-start text-xs p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group/log">
                            <span className="font-mono text-slate-600 font-bold tracking-tighter pt-0.5">{log.time}</span>
                            <span className="flex-1 text-slate-300 font-medium leading-relaxed">{log.text}</span>
                            <span className={`status-badge shrink-0 ${log.severity === 'high' ? 'status-badge-danger' :
                                    log.severity === 'low' ? 'status-badge-warning' : 'status-badge-success'
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
