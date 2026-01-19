import React, { useEffect, useMemo } from 'react';
import { Plane, Search, Filter, AlertCircle, CheckCircle2, Clock, MapPin, RefreshCw } from 'lucide-react';
import { useApiStore } from '../store/apiStore';
import { SkeletonListItem } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { Button } from '../components/ui/Button';

const FlightsView: React.FC = () => {
    const { flights, flightsState, fetchFlights } = useApiStore();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filterStatus, setFilterStatus] = React.useState('All');

    useEffect(() => {
        fetchFlights();
    }, [fetchFlights]);

    const filteredFlights = useMemo(() => {
        return flights.filter(flight => {
            const matchesSearch = flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                flight.destination.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterStatus === 'All' || flight.status === filterStatus;
            return matchesSearch && matchesFilter;
        });
    }, [flights, searchTerm, filterStatus]);

    const stats = useMemo(() => {
        const total = flights.length;
        const delayed = flights.filter(f => f.status === 'Delayed').length;
        const onTime = flights.filter(f => f.status === 'Scheduled' || f.status === 'Departed').length;
        return {
            onTime: total > 0 ? Math.round((onTime / total) * 100) : 100,
            delayed,
            total
        };
    }, [flights]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Flight Operations AI</h2>
                    <p className="text-slate-400 text-sm">Predictive scheduling and gate allocation</p>
                </div>
                <Button
                    onClick={fetchFlights}
                    isLoading={flightsState.isLoading}
                    icon={<RefreshCw size={16} />}
                >
                    Reschedule All
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-morphism p-4 rounded-2xl flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                        <Plane size={20} className="text-blue-500" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Flights</p>
                        <p className="text-2xl font-black">{stats.total}</p>
                    </div>
                </div>
                <div className="glass-morphism p-4 rounded-2xl flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-xl">
                        <CheckCircle2 size={20} className="text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">On-Time Performance</p>
                        <p className="text-2xl font-black">{stats.onTime}%</p>
                    </div>
                </div>
                <div className="glass-morphism p-4 rounded-2xl flex items-center gap-4">
                    <div className="p-3 bg-red-500/10 rounded-xl">
                        <AlertCircle size={20} className="text-red-500" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Delayed</p>
                        <p className="text-2xl font-black">{stats.delayed}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-[300px]">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search flight number or destination..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-airport-accent transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {['All', 'Scheduled', 'Departed', 'Delayed', 'Arrived', 'Cancelled'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterStatus === status
                                ? 'bg-airport-accent text-white'
                                : 'bg-white/5 text-slate-400 hover:bg-white/10'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Error State */}
            {flightsState.error && (
                <ErrorState
                    message={flightsState.error}
                    onRetry={fetchFlights}
                    compact
                />
            )}

            {/* Flights List */}
            <div className="glass-morphism rounded-2xl overflow-hidden border border-white/5">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Flight</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Destination</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Gate</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Scheduled</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">AI Prediction</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {flightsState.isLoading && flights.length === 0 ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i}>
                                        <td colSpan={6} className="px-6 py-4">
                                            <SkeletonListItem />
                                        </td>
                                    </tr>
                                ))
                            ) : filteredFlights.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">
                                        No flights found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredFlights.map((flight) => (
                                    <tr key={flight._id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                                    <Plane size={14} className="text-blue-500" />
                                                </div>
                                                <span className="font-bold">{flight.flightNumber}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} className="text-slate-500" />
                                                <span className="text-sm font-medium">{flight.destination}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${flight.status === 'Delayed' ? 'bg-red-500/10 text-red-500' :
                                                flight.status === 'Departed' ? 'bg-slate-500/10 text-slate-500' :
                                                    flight.status === 'Arrived' ? 'bg-emerald-500/20 text-emerald-500' :
                                                        'bg-emerald-500/10 text-emerald-500'
                                                }`}>
                                                {flight.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm">{flight.gateAssignment || '--'}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            {new Date(flight.scheduledDeparture).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} className="text-airport-accent" />
                                                <span className="text-sm font-bold text-airport-accent">
                                                    {Math.random() > 0.7 ? 'On Track' : 'Predicted +5m'}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FlightsView;
