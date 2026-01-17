import React, { useEffect } from 'react';
import { DollarSign, ArrowUpRight, ShoppingBag, Loader2 } from 'lucide-react';
import { useApiStore } from '../store/apiStore';
import { Skeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';

const RevenueView: React.FC = () => {
    const {
        dynamicPricing,
        revenueState,
        fetchDynamicPricing
    } = useApiStore();

    useEffect(() => {
        fetchDynamicPricing();
    }, [fetchDynamicPricing]);

    // Compute pricing data from API or use fallback
    const pricingData = dynamicPricing
        ? [
            {
                type: 'Economy (Zone D)',
                current: `$${(dynamicPricing.parking.economy * 0.9).toFixed(2)}`,
                recommended: `$${dynamicPricing.parking.economy.toFixed(2)}`,
                demand: dynamicPricing.parking.demand_index > 0.6 ? 'High' : dynamicPricing.parking.demand_index > 0.3 ? 'Normal' : 'Low'
            },
            {
                type: 'Premium (Zone A)',
                current: `$${(dynamicPricing.parking.premium * 1.1).toFixed(2)}`,
                recommended: `$${dynamicPricing.parking.premium.toFixed(2)}`,
                demand: dynamicPricing.parking.demand_index > 0.5 ? 'Normal' : 'Low'
            },
            {
                type: 'Valet',
                current: '$75.00',
                recommended: '$75.00',
                demand: 'Normal'
            }
        ]
        : [
            { type: 'Economy (Zone D)', current: '$15.50', recommended: '$18.00', demand: 'High' },
            { type: 'Premium (Zone A)', current: '$45.00', recommended: '$42.50', demand: 'Low' },
            { type: 'Valet', current: '$75.00', recommended: '$75.00', demand: 'Normal' }
        ];

    const retailInsights = dynamicPricing?.retailInsights
        || 'High affinity for luxury goods detected in Terminal 2';

    const recommendedPromos = dynamicPricing?.recommendedPromos
        || ['Dynamic Happy Hour (Lounge B)', 'Duty-Free Flash Sale'];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Revenue Optimization</h2>
                    <p className="text-slate-400 text-sm">Dynamic pricing & demand forecasting</p>
                </div>
                <div className="flex gap-3">
                    {revenueState.isLoading ? (
                        <span className="bg-white/10 text-slate-400 px-3 py-1 rounded-lg text-xs font-bold border border-white/10 flex items-center gap-1">
                            <Loader2 size={14} className="animate-spin" /> Loading...
                        </span>
                    ) : (
                        <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-500/20 flex items-center gap-1">
                            <ArrowUpRight size={14} /> +12.4% Revenue Forecast
                        </span>
                    )}
                </div>
            </div>

            {/* Error State */}
            {revenueState.error && (
                <ErrorState
                    message={revenueState.error}
                    onRetry={fetchDynamicPricing}
                    compact
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-morphism p-6 rounded-2xl">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <DollarSign size={18} className="text-airport-accent" />
                        Dynamic Parking Pricing
                    </h3>
                    <div className="space-y-4">
                        {revenueState.isLoading && !dynamicPricing ? (
                            [1, 2, 3].map((i) => (
                                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                                    <div>
                                        <Skeleton width={120} height={16} className="mb-2" />
                                        <Skeleton width={80} height={12} />
                                    </div>
                                    <div className="text-right">
                                        <Skeleton width={50} height={12} className="mb-1" />
                                        <Skeleton width={70} height={24} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            pricingData.map((price, i) => (
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
                            ))
                        )}
                    </div>
                    {dynamicPricing?.algorithm && (
                        <p className="text-[9px] text-slate-500 mt-4">Algorithm: {dynamicPricing.algorithm}</p>
                    )}
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
                            <p className="text-xs font-bold text-slate-300 bg-black/40 px-3 py-1 rounded-full border border-white/10">
                                {retailInsights.includes('Terminal') ? retailInsights.split('.')[0] : 'Duty Free Zone C: HIGH DEMAND'}
                            </p>
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
                    {recommendedPromos.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/5">
                            <p className="text-[10px] text-slate-500 uppercase mb-2">Recommended Promos</p>
                            <div className="flex flex-wrap gap-2">
                                {recommendedPromos.map((promo, i) => (
                                    <span key={i} className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-1 rounded">
                                        {promo}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RevenueView;
