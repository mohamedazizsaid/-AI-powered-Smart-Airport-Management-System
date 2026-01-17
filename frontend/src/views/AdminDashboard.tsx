import React, { useEffect, useCallback, useMemo } from 'react';
import {
    LayoutDashboard,
    Plane,
    Users,
    Shield,
    Settings,
    Package,
    Activity,
    Info,
    DollarSign,
    Leaf,
    BarChart,
    RefreshCw,
    LogOut,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MaintenanceView from './MaintenanceView';
import StaffView from './StaffView';
import RevenueView from './RevenueView';
import EnvironmentView from './EnvironmentView';
import { useApiStore } from '../store/apiStore';
import { useAuthStore } from '../store/authStore';
import { useWebSocket } from '../hooks/useWebSocket';
import { SkeletonStatCard } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { Button } from '../components/ui/Button';

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState('dashboard');

    const { user, logout: logoutAuth } = useAuthStore();
    const navigate = useNavigate();

    // Global store
    const {
        flights,
        flightsState,
        fetchFlights,
        fetchStaff,
        fetchMaintenanceAssets,
        fetchDynamicPricing,
        fetchEnvironmentStats,
        securityAlerts,
        flightUpdates,
    } = useApiStore();

    // WebSocket connection for real-time updates
    useWebSocket();

    // Fetch all data on mount
    useEffect(() => {
        const fetchAll = async () => {
            await Promise.all([
                fetchFlights(),
                fetchStaff(),
                fetchMaintenanceAssets(),
                fetchDynamicPricing(),
                fetchEnvironmentStats(),
            ]);
        };
        fetchAll();
    }, [fetchFlights, fetchStaff, fetchMaintenanceAssets, fetchDynamicPricing, fetchEnvironmentStats]);

    // Combine security alerts from WebSocket with local alerts
    const allAlerts = useMemo(() => {
        const wsAlerts = securityAlerts.map(alert => ({
            type: alert.type || 'Security Anomaly',
            location: alert.location || 'Unknown',
            message: alert.message || 'AI-detected security event',
            timestamp: new Date(alert.timestamp).toLocaleTimeString(),
        }));
        return wsAlerts;
    }, [securityAlerts]);

    // Simulate initial alert for demo if no real alerts
    useEffect(() => {
        if (allAlerts.length === 0) {
            const timer = setTimeout(() => {
                useApiStore.getState().addSecurityAlert({
                    type: 'Security Anomaly',
                    location: 'Zone C2',
                    message: 'Unattended object detected by AI vision',
                    timestamp: new Date().toISOString(),
                    risk_level: 'elevated',
                    anomalies: [],
                });
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [allAlerts.length]);

    // Derived stats
    const activeFlights = flights.filter(f =>
        f.status === 'Scheduled' || f.status === 'Departed'
    ).length || 128;

    const handleRunOptimization = useCallback(async () => {
        // Trigger AI optimization
        await fetchFlights();
    }, [fetchFlights]);

    const menuItems = [
        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { id: 'flights', icon: <Plane size={20} />, label: 'Flights' },
        { id: 'staff', icon: <Users size={20} />, label: 'AI Staffing' },
        { id: 'revenue', icon: <DollarSign size={20} />, label: 'Revenue AI' },
        { id: 'maintenance', icon: <Activity size={20} />, label: 'Maintenance' },
        { id: 'security', icon: <Shield size={20} />, label: 'Security' },
        { id: 'baggage', icon: <Package size={20} />, label: 'Baggage' },
        { id: 'environment', icon: <Leaf size={20} />, label: 'Environment' },
        { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
    ];

    return (
        <div className="flex min-h-screen bg-[#050811] text-white bg-gradient-mesh">
            {/* Sidebar */}
            <aside className="w-64 min-w-[256px] shrink-0 h-screen flex flex-col p-6 sticky top-0 border-r border-white/5 bg-gradient-to-b from-slate-900/95 to-[#050811]/98 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 bg-airport-accent rounded-lg flex items-center justify-center">
                        <Plane className="text-white rotate-45" size={20} />
                    </div>
                    <span className="font-bold text-xl tracking-tight">
                        Smart<span className="text-airport-accent">Air</span>
                    </span>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === item.id
                                ? 'bg-airport-accent text-white shadow-[0_0_20px_rgba(59,130,246,0.25)]'
                                : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
                                }`}
                        >
                            <div className={`transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                                {item.icon}
                            </div>
                            <span className={`font-semibold text-[11px] uppercase tracking-[0.1em] transition-all ${activeTab === item.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                                {item.label}
                            </span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 overflow-hidden">
                        <div className="w-10 h-10 rounded-full bg-airport-accent/10 border border-airport-accent/20 flex items-center justify-center shrink-0">
                            <span className="text-airport-accent font-bold">{user?.name?.charAt(0) || 'A'}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate">{user?.name || 'Admin User'}</p>
                            <p className="text-[10px] text-slate-500 truncate capitalize">{user?.role || 'System Lead'}</p>
                        </div>
                        <button
                            onClick={() => {
                                logoutAuth();
                                navigate('/login');
                            }}
                            className="p-1.5 hover:bg-white/10 rounded-lg text-slate-500 hover:text-red-400 transition-colors"
                            title="Logout"
                        >
                            <LogOut size={14} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto min-w-0">
                <div className="max-w-7xl mx-auto">
                    {activeTab === 'dashboard' ? (
                        <>
                            <header className="flex flex-wrap justify-between items-start gap-4 mb-10">
                                <div>
                                    <h1 className="text-4xl font-black tracking-tight text-white mb-2">Operational Hub</h1>
                                    <p className="text-slate-400 text-sm font-medium">Real-time AI monitoring of Terminal Operations</p>
                                </div>
                                <div className="flex gap-4">
                                    {allAlerts.length > 0 && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                            {allAlerts.length} SECURITY ANOMALIES
                                        </motion.div>
                                    )}
                                    <button className="px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-white text-sm font-bold flex items-center gap-2 border border-white/5 transition-all active:scale-95">
                                        <Info size={16} className="text-airport-accent" /> System Status
                                    </button>
                                    <Button
                                        onClick={handleRunOptimization}
                                        isLoading={flightsState.isLoading}
                                        className="shadow-xl"
                                        icon={<RefreshCw size={16} />}
                                    >
                                        Run AI Sync
                                    </Button>
                                </div>
                            </header>

                            {/* Error State */}
                            {flightsState.error && (
                                <ErrorState
                                    message={flightsState.error}
                                    onRetry={fetchFlights}
                                    compact
                                    className="mb-8"
                                />
                            )}

                            {/* Stat Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                {flightsState.isLoading && flights.length === 0 ? (
                                    [1, 2, 3, 4].map((i) => <SkeletonStatCard key={i} />)
                                ) : (
                                    <>
                                        <StatCard
                                            icon={<Plane className="text-blue-400" />}
                                            label="Live Traffic"
                                            value={activeFlights}
                                            trend={12}
                                            color="blue"
                                        />
                                        <StatCard
                                            icon={<Users className="text-emerald-400" />}
                                            label="Pax Throughput"
                                            value="3,420/hr"
                                            trend={5}
                                            color="emerald"
                                        />
                                        <StatCard
                                            icon={<Shield className="text-orange-400" />}
                                            label="Sec Analytics"
                                            value={10 + allAlerts.length}
                                            trend={-20}
                                            color="orange"
                                        />
                                        <StatCard
                                            icon={<Activity className="text-purple-400" />}
                                            label="System Vitals"
                                            value="99.8%"
                                            trend={0.1}
                                            color="purple"
                                        />
                                    </>
                                )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                                <div className="lg:col-span-2 glass-morphism p-8 rounded-[2.5rem] h-[450px] flex flex-col relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-airport-accent/5 blur-[100px] -mr-32 -mt-32" />
                                    <h3 className="font-black text-white mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-airport-accent/10 rounded-lg">
                                            <BarChart size={18} className="text-airport-accent" />
                                        </div>
                                        Live Operations Feed
                                    </h3>
                                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar mask-gradient-b">
                                        {allAlerts.map((alert, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                className="p-6 rounded-2xl bg-red-500/[0.03] border border-red-500/10 flex justify-between items-center group/item hover:bg-red-500/[0.05] transition-all"
                                            >
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest px-2 py-0.5 bg-red-500/10 rounded">
                                                            {alert.type}
                                                        </span>
                                                        <span className="text-[10px] text-slate-500 font-mono">{alert.timestamp}</span>
                                                    </div>
                                                    <p className="text-sm font-bold text-slate-200 group-hover/item:text-white transition-colors">
                                                        {alert.message}
                                                    </p>
                                                    <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-wider">
                                                        ZONE ID: <span className="text-slate-400">{alert.location}</span>
                                                    </p>
                                                </div>
                                                <div className="w-8 h-8 rounded-full border border-red-500/20 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                    <Shield size={14} className="text-red-500" />
                                                </div>
                                            </motion.div>
                                        ))}
                                        {/* Flight updates */}
                                        {flightUpdates.slice(0, 3).map((update, i) => (
                                            <div key={`flight-${i}`} className="p-6 rounded-2xl bg-blue-500/[0.03] border border-blue-500/10 flex justify-between items-center group/item hover:bg-blue-500/[0.05] transition-all">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-2 py-0.5 bg-blue-500/10 rounded">
                                                            AIRCRAFT UPDATE
                                                        </span>
                                                        <span className="text-[10px] text-slate-500 font-mono">{new Date(update.timestamp).toLocaleTimeString()}</span>
                                                    </div>
                                                    <p className="text-sm font-bold text-slate-200 group-hover/item:text-white transition-colors">
                                                        {update.flightNumber} - {update.status}
                                                        {update.gate && ` assigned to Gate ${update.gate}`}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="glass-morphism p-8 rounded-[2.5rem] h-[450px] flex flex-col">
                                    <h3 className="font-black text-white mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                                            <Shield size={18} className="text-emerald-500" />
                                        </div>
                                        AI Sentinel Vision
                                    </h3>
                                    <div className="flex-1 rounded-3xl bg-black/60 relative overflow-hidden flex items-center justify-center border border-white/10 group shadow-inner">
                                        <div className="absolute top-6 left-6 flex gap-3 z-10 p-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"></span>
                                            <span className="text-[10px] font-black text-white tracking-[0.2em] uppercase">CAM_SEC_044</span>
                                        </div>
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                                        <Shield className="opacity-10 text-airport-accent transition-transform duration-1000 group-hover:scale-110" size={100} />

                                        <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Scanning Network...</span>
                                                <span className="text-[9px] font-mono text-airport-accent">94.2% CONFIDENCE</span>
                                            </div>
                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '100%' }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                    className="h-full bg-airport-accent shadow-[0_0_15px_#3b82f6]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-morphism p-8 rounded-[2rem] border border-white/5">
                                <h3 className="font-bold mb-8 flex items-center gap-2 text-slate-200">
                                    <Package size={20} className="text-airport-accent" />
                                    AI Baggage Tracking Monitoring
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[
                                        { id: 'TAG-8821', status: 'On Time', est: '12 min', progress: 65 },
                                        { id: 'TAG-9022', status: 'Delayed', est: '24 min', progress: 30 },
                                        { id: 'TAG-4410', status: 'Arrived', est: '0 min', progress: 100 },
                                    ].map((bag, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors">
                                            <div className="flex justify-between items-center mb-5">
                                                <span className="text-[10px] font-mono font-bold text-slate-500 tracking-wider bg-black/30 px-2 py-1 rounded">{bag.id}</span>
                                                <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${bag.status === 'Delayed' ? 'bg-orange-500/20 text-orange-500' : 'bg-emerald-500/20 text-emerald-500'
                                                    }`}>
                                                    {bag.status}
                                                </span>
                                            </div>
                                            <p className="text-3xl font-black mb-1">{bag.est}</p>
                                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-4">ESTIMATED DELIVERY</p>
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-1000 ${bag.status === 'Delayed' ? 'bg-orange-500' : 'bg-airport-accent'}`}
                                                    style={{ width: `${bag.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : activeTab === 'maintenance' ? (
                        <MaintenanceView />
                    ) : activeTab === 'staff' ? (
                        <StaffView />
                    ) : activeTab === 'revenue' ? (
                        <RevenueView />
                    ) : activeTab === 'environment' ? (
                        <EnvironmentView />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[70vh] text-slate-500">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                <Settings className="animate-spin-slow opacity-20" size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-300 mb-2">Module Under Optimization</h3>
                            <p className="text-sm italic opacity-60">The {activeTab} AI engine is training on latest operational data...</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    trend: number;
    color: string;
}

const StatCard: React.FC<StatCardProps> = React.memo(({ icon, label, value, trend, color }) => (
    <div className="glass-morphism p-6 rounded-2xl flex flex-col gap-5 border border-white/5 hover:border-white/10 transition-all hover:translate-y-[-2px]">
        <div className="flex justify-between items-start">
            <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100 shrink-0`}>
                {icon}
            </div>
            <span
                className={`text-[10px] font-black px-2 py-1 rounded-lg ${trend > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                    }`}
            >
                {trend > 0 ? '+' : ''}
                {trend}%
            </span>
        </div>
        <div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{label}</p>
            <p className="text-3xl font-black mt-1 tracking-tight">{value}</p>
        </div>
    </div>
));

StatCard.displayName = 'StatCard';

export default AdminDashboard;
