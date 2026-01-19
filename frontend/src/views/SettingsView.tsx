import React from 'react';
import { Settings, User, Bell, Shield, Cpu, Save, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const SettingsView: React.FC = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-xl font-bold">System Configuration</h2>
                <p className="text-slate-400 text-sm">Manage your profile and AI engine parameters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Navigation Sidebar */}
                <div className="md:col-span-1 space-y-2">
                    {[
                        { icon: <User size={18} />, label: 'Profile' },
                        { icon: <Bell size={18} />, label: 'Notifications' },
                        { icon: <Shield size={18} />, label: 'Security' },
                        { icon: <Cpu size={18} />, label: 'AI Engine' },
                        { icon: <Settings size={18} />, label: 'System' },
                    ].map((item, i) => (
                        <button
                            key={i}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${i === 0 ? 'bg-airport-accent text-white shadow-lg shadow-airport-accent/20' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Pane */}
                <div className="md:col-span-2 space-y-6">
                    <section className="glass-morphism p-6 rounded-2xl border border-white/5">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                            <User size={16} className="text-airport-accent" />
                            Administrative Profile
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-airport-accent/20 border-2 border-airport-accent/50 flex items-center justify-center">
                                    <span className="text-2xl font-black text-airport-accent">{user?.name?.charAt(0) || 'A'}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{user?.name || 'Admin User'}</p>
                                    <p className="text-sm text-slate-500">{user?.email || 'admin@smartair.io'}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue={user?.name}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-airport-accent transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider ml-1">Role</label>
                                    <input
                                        type="text"
                                        defaultValue={user?.role}
                                        disabled
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm opacity-50 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="glass-morphism p-6 rounded-2xl border border-white/5">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                            <Cpu size={16} className="text-purple-500" />
                            AI Neural Parameters
                        </h3>
                        <div className="space-y-6">
                            {[
                                { label: 'Inference Threshold', value: 85, color: 'airport-accent' },
                                { label: 'Resource Aggression', value: 62, color: 'purple-500' },
                            ].map((p, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-slate-300">{p.label}</span>
                                        <span className="font-mono text-airport-accent">{p.value}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className={`h-full bg-${p.color}`} style={{ width: `${p.value}%` }} />
                                    </div>
                                </div>
                            ))}
                            <div className="flex items-center gap-3 p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl">
                                <Bell className="text-purple-500" size={18} />
                                <p className="text-xs text-purple-200/70">Automatic re-training scheduled for 03:00 AM UTC based on seasonal variance.</p>
                            </div>
                        </div>
                    </section>

                    <div className="flex gap-4 pt-4">
                        <Button variant="primary" icon={<Save size={16} />}>
                            Save Changes
                        </Button>
                        <Button
                            variant="ghost"
                            className="bg-red-500/5 text-red-500 border border-red-500/10 hover:bg-red-500/10"
                            icon={<LogOut size={16} />}
                            onClick={handleLogout}
                        >
                            Terminate Session
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
