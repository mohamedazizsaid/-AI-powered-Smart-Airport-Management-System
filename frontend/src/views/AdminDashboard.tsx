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
} from 'lucide-react';
import { motion } from 'framer-motion';
import MaintenanceView from './MaintenanceView';

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
        { id: 'maintenance', icon: <Activity size={20} />, label: 'Maintenance' },
        { id: 'security', icon: <Shield size={20} />, label: 'Security' },
        { id: 'baggage', icon: <Package size={20} />, label: 'Baggage' },
        { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
    ];

    return (
        <div className="flex min-h-screen bg-airport-dark text-white">
            {/* Sidebar Integrated */}
            <div className="w-64 glass-morphism h-screen flex flex-col p-6 sticky top-0">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 bg-airport-accent rounded-lg flex items-center justify-center">
                        <Plane className="text-white rotate-45" size={20} />
                    </div>
                    <span className="font-bold text-xl tracking-tight">
                        Smart<span className="text-airport-accent">Air</span>
                    </span>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === item.id
                                    ? 'bg-airport-accent text-white shadow-lg shadow-airport-accent/20'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            <span className="font-medium text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                            <User size={20} className="text-slate-300" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold truncate">Admin User</p>
                            <p className="text-xs text-slate-500 truncate">System Administrator</p>
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-1 p-8 overflow-y-auto">
                {activeTab === 'dashboard' ? (
                    <>
                        <header className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-2xl font-bold">Airport Overview</h1>
                                <p className="text-slate-400 text-sm">Real-time status of Smart Airport operations</p>
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
                                <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium flex items-center gap-2">
                                    <Info size={16} /> Help
                                </button>
                                <button className="px-4 py-2 rounded-xl bg-airport-accent hover:bg-airport-accent/80 text-sm font-medium shadow-lg shadow-airport-accent/20">
                                    Run AI Optimization
                                </button>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            <div className="lg:col-span-2 glass-morphism p-6 rounded-2xl h-80 flex flex-col">
                                <h3 className="font-semibold mb-4 text-slate-200">Real-time Activity Log</h3>
                                <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                                    {alerts.map((alert, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex justify-between items-center"
                                        >
                                            <div>
                                                <p className="text-xs font-bold text-red-500 uppercase tracking-wider">
                                                    {alert.type}
                                                </p>
                                                <p className="text-sm font-medium text-slate-200">
                                                    {alert.message}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    Location: {alert.location}
                                                </p>
                                            </div>
                                            <span className="text-[10px] bg-red-500/20 px-2 py-1 rounded text-red-500 font-mono">
                                                {alert.timestamp}
                                            </span>
                                        </motion.div>
                                    ))}
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center opacity-50">
                                        <div>
                                            <p className="text-xs font-bold text-blue-500 uppercase tracking-wider">
                                                Flight Update
                                            </p>
                                            <p className="text-sm font-medium text-slate-200">
                                                BA123 assigned to Gate B4
                                            </p>
                                        </div>
                                        <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-slate-400 font-mono">
                                            14:10:02
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="glass-morphism p-6 rounded-2xl h-80 flex flex-col">
                                <h3 className="font-semibold mb-4 text-slate-200">Security CV Monitoring</h3>
                                <div className="flex-1 rounded-xl bg-black/40 relative overflow-hidden flex items-center justify-center border border-white/5">
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                                        <span className="text-[10px] font-bold text-red-500 tracking-widest uppercase">
                                            Live CAM-04
                                        </span>
                                    </div>
                                    <Shield className="opacity-20 text-airport-accent" size={64} />
                                    <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 5, repeat: Infinity }}
                                            className="h-full bg-airport-accent shadow-[0_0_10px_#3b82f6]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-morphism p-6 rounded-2xl">
                            <h3 className="font-semibold mb-6 flex items-center gap-2 text-slate-200">
                                <Package size={20} className="text-airport-accent" />
                                AI Baggage Tracking Monitoring
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { id: 'TAG-8821', status: 'On Time', est: '12 min', progress: 65 },
                                    { id: 'TAG-9022', status: 'Delayed', est: '24 min', progress: 30 },
                                    { id: 'TAG-4410', status: 'Arrived', est: '0 min', progress: 100 },
                                ].map((bag, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-xs font-mono text-slate-400">{bag.id}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bag.status === 'Delayed' ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500'
                                                }`}>
                                                {bag.status}
                                            </span>
                                        </div>
                                        <p className="text-xl font-bold mb-1">{bag.est}</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-3">Estimated Delivery</p>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-airport-accent" style={{ width: `${bag.progress}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : activeTab === 'maintenance' ? (
                    <MaintenanceView />
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-500 italic">
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} module integration in progress...
                    </div>
                )}
            </main>
        </div>
    );
};

const StatCard = ({ icon, label, value, trend, color }: any) => (
    <div className="glass-morphism p-6 rounded-2xl flex flex-col gap-4 border border-white/5">
        <div className="flex justify-between items-start">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
                {icon}
            </div>
            <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}
            >
                {trend > 0 ? '+' : ''}
                {trend}%
            </span>
        </div>
        <div>
            <p className="text-slate-400 text-sm font-medium">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
    </div>
);

export default AdminDashboard;
