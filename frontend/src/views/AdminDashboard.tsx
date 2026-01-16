import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Plane,
    Users,
    Shield,
    Settings,
    Package,
    Activity,
    Info,
    User,
    DollarSign,
    Leaf,
    BarChart,
} from 'lucide-react';
import { motion } from 'framer-motion';
import MaintenanceView from './MaintenanceView';
import StaffView from './StaffView';
import RevenueView from './RevenueView';
import EnvironmentView from './EnvironmentView';

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [alerts, setAlerts] = useState<any[]>([]);

    // Simulation of WebSocket behavior for security alerts
    useEffect(() => {
        const timer = setTimeout(() => {
            const mockAlert = {
                type: 'Security Anomaly',
                location: 'Zone C2',
                message: 'Unattended object detected by AI vision',
                timestamp: new Date().toLocaleTimeString(),
            };
            setAlerts((prev) => [mockAlert, ...prev]);
        }, 8000);
        return () => clearTimeout(timer);
    }, []);

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
        <div className="flex min-h-screen bg-[#050811] text-white">
            {/* Sidebar */}
            <div className="w-64 glass-morphism h-screen flex flex-col p-6 sticky top-0 border-r border-white/5">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 bg-airport-accent rounded-lg flex items-center justify-center">
                        <Plane className="text-white rotate-45" size={20} />
                    </div>
                    <span className="font-bold text-xl tracking-tight">
                        Smart<span className="text-airport-accent">Air</span>
                    </span>
                </div>

                <nav className="flex-1 space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === item.id
                                    ? 'bg-airport-accent text-white shadow-lg shadow-airport-accent/20'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            <span className="font-medium text-xs tracking-wide">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 overflow-hidden">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                            <User size={20} className="text-slate-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate">Admin User</p>
                            <p className="text-[10px] text-slate-500 truncate">System Lead</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {activeTab === 'dashboard' ? (
                        <>
                            <header className="flex justify-between items-start mb-10">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight">Airport Overview</h1>
                                    <p className="text-slate-500 text-sm mt-1">Real-time status of Smart Airport operations</p>
                                </div>
                                <div className="flex gap-4">
                                    {alerts.length > 0 && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="animate-pulse bg-red-500/20 text-red-500 border border-red-500/50 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
                                        >
                                            <Shield size={14} /> {alerts.length} NEW SECURITY ALERTS
                                        </motion.div>
                                    )}
                                    <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium flex items-center gap-2 border border-white/5 transition-colors">
                                        <Info size={16} /> Help
                                    </button>
                                    <button className="px-4 py-2 rounded-xl bg-airport-accent hover:bg-airport-accent/80 text-sm font-medium shadow-lg shadow-airport-accent/20 transition-all active:scale-95">
                                        Run AI Optimization
                                    </button>
                                </div>
                            </header>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                                <StatCard
                                    icon={<Plane className="text-blue-500" />}
                                    label="Active Flights"
                                    value="128"
                                    trend={12}
                                    color="bg-blue-500"
                                />
                                <StatCard
                                    icon={<Users className="text-emerald-500" />}
                                    label="Passenger Flow"
                                    value="3,420/hr"
                                    trend={5}
                                    color="bg-emerald-500"
                                />
                                <StatCard
                                    icon={<Shield className="text-orange-500" />}
                                    label="Security Alerts"
                                    value={10 + alerts.length}
                                    trend={-20}
                                    color="bg-orange-500"
                                />
                                <StatCard
                                    icon={<Activity className="text-purple-500" />}
                                    label="System Health"
                                    value="99.8%"
                                    trend={0.1}
                                    color="bg-purple-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                                <div className="lg:col-span-2 glass-morphism p-8 rounded-[2rem] h-[400px] flex flex-col border border-white/5">
                                    <h3 className="font-bold mb-6 text-slate-200 flex items-center gap-2">
                                        <BarChart size={18} className="text-airport-accent" />
                                        Live Operational Activity
                                    </h3>
                                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                                        {alerts.map((alert, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 flex justify-between items-center"
                                            >
                                                <div>
                                                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">
                                                        {alert.type}
                                                    </p>
                                                    <p className="text-sm font-semibold text-slate-200">
                                                        {alert.message}
                                                    </p>
                                                    <p className="text-[10px] text-slate-500 mt-2 font-medium">
                                                        LOCATION: <span className="text-slate-300">{alert.location}</span>
                                                    </p>
                                                </div>
                                                <span className="text-[10px] bg-red-500/20 px-3 py-1.5 rounded-lg text-red-500 font-mono font-bold">
                                                    {alert.timestamp}
                                                </span>
                                            </motion.div>
                                        ))}
                                        <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center opacity-60">
                                            <div>
                                                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">
                                                    Flight Update
                                                </p>
                                                <p className="text-sm font-semibold text-slate-200">
                                                    BA123 assigned to Gate B4
                                                </p>
                                            </div>
                                            <span className="text-[10px] bg-white/10 px-3 py-1.5 rounded-lg text-slate-400 font-mono">
                                                14:10:02
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="glass-morphism p-8 rounded-[2rem] h-[400px] flex flex-col border border-white/5">
                                    <h3 className="font-bold mb-6 text-slate-200">Security CV Monitoring</h3>
                                    <div className="flex-1 rounded-[1.5rem] bg-black/60 relative overflow-hidden flex items-center justify-center border border-white/10 group">
                                        <div className="absolute top-6 left-6 flex gap-3 z-10">
                                            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"></span>
                                            <span className="text-[10px] font-black text-red-500 tracking-[0.2em] uppercase">Live CAM-04</span>
                                        </div>
                                        <Shield className="opacity-10 text-airport-accent transition-transform duration-700 group-hover:scale-110" size={100} />
                                        <div className="absolute bottom-6 left-6 right-6 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 5, repeat: Infinity }}
                                                className="h-full bg-airport-accent shadow-[0_0_15px_#3b82f6]"
                                            />
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

const StatCard = ({ icon, label, value, trend, color }: any) => (
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
);

export default AdminDashboard;
