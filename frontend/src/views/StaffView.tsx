import React, { useEffect } from 'react';
import { TrendingUp, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import { useApiStore } from '../store/apiStore';
import { SkeletonListItem } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';

const StaffView: React.FC = () => {
    const {
        staffAllocation,
        staffState,
        fetchStaffAllocation
    } = useApiStore();

    // Fetch staff allocation on mount with predicted passenger count
    useEffect(() => {
        fetchStaffAllocation(2500); // Default passenger prediction
    }, [fetchStaffAllocation]);

    // Compute staff stats from API data or use fallback
    const staffStats = staffAllocation
        ? [
            {
                area: 'Security',
                allocated: staffAllocation.allocation.security,
                required: Math.ceil(staffAllocation.allocation.security * 0.9),
                status: 'Optimal'
            },
            {
                area: 'Check-in',
                allocated: staffAllocation.allocation.checkin,
                required: Math.ceil(staffAllocation.allocation.checkin * 1.3),
                status: staffAllocation.allocation.checkin < Math.ceil(staffAllocation.allocation.checkin * 1.3) ? 'Understaffed' : 'Optimal'
            },
            {
                area: 'Maintenance',
                allocated: staffAllocation.allocation.maintenance,
                required: Math.ceil(staffAllocation.allocation.maintenance * 0.85),
                status: 'Optimal'
            },
            {
                area: 'Ground Crew',
                allocated: Math.ceil(staffAllocation.allocation.security * 1.5),
                required: Math.ceil(staffAllocation.allocation.security * 1.4),
                status: 'Optimal'
            },
        ]
        : [
            { area: 'Security', allocated: 24, required: 22, status: 'Optimal' },
            { area: 'Check-in', allocated: 18, required: 25, status: 'Understaffed' },
            { area: 'Maintenance', allocated: 12, required: 10, status: 'Optimal' },
            { area: 'Ground Crew', allocated: 30, required: 28, status: 'Optimal' },
        ];

    const efficiencyScore = staffAllocation?.efficiencyScore
        ? Math.round(staffAllocation.efficiencyScore * 100)
        : 94;

    const sentimentAlert = staffAllocation?.sentiment_context?.[0]
        || 'High stress detected in Terminal B Gate Staff. AI recommends a 15-min rotation break for Team C.';

    const handleOptimizeShifts = () => {
        fetchStaffAllocation(3000); // Re-fetch with higher passenger prediction
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Staff Management AI</h2>
                    <p className="text-slate-400 text-sm">Real-time workforce allocation & sentiment</p>
                </div>
                <button
                    onClick={handleOptimizeShifts}
                    disabled={staffState.isLoading}
                    className="bg-airport-accent px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 disabled:opacity-50"
                >
                    {staffState.isLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <Calendar size={16} />
                    )}
                    {staffState.isLoading ? 'Optimizing...' : 'Optimize Shifts'}
                </button>
            </div>

            {/* Error State */}
            {staffState.error && (
                <ErrorState
                    message={staffState.error}
                    onRetry={() => fetchStaffAllocation(2500)}
                    compact
                />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-morphism p-6 rounded-2xl flex flex-col gap-6">
                    <h3 className="font-bold flex items-center gap-2">
                        <TrendingUp size={18} className="text-airport-accent" />
                        Allocation Efficiency
                    </h3>
                    <div className="space-y-4">
                        {staffState.isLoading && !staffAllocation ? (
                            // Loading skeletons
                            [1, 2, 3, 4].map((i) => <SkeletonListItem key={i} />)
                        ) : (
                            staffStats.map((stat, i) => (
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
                                                style={{ width: `${Math.min(100, (stat.allocated / stat.required) * 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="glass-morphism p-6 rounded-2xl flex flex-col gap-4">
                    <h3 className="font-bold flex items-center gap-2">
                        <AlertCircle size={18} className="text-orange-500" />
                        Staff Sentiment Alert
                    </h3>
                    <div className="flex-1 bg-orange-500/5 border border-orange-500/10 rounded-xl p-4 italic text-sm text-orange-200/80">
                        "{sentimentAlert}"
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Efficiency Score</p>
                        <p className="text-3xl font-bold text-airport-accent">{efficiencyScore}%</p>
                        {staffAllocation?.model && (
                            <p className="text-[9px] text-slate-500 mt-1">Model: {staffAllocation.model}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffView;
