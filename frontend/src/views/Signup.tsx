import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User as UserIcon, Plane, UserPlus, ShieldCheck } from 'lucide-react';
import { authService } from '../services/auth.service';
import { getErrorMessage } from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await authService.register({ name, email, password, role });
            navigate('/login');
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#03060e] flex items-center justify-center p-4 relative overflow-hidden bg-gradient-mesh">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-airport-accent/10 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] animate-pulse-slow" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md"
            >
                <div className="glass-morphism p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-airport-accent/40 to-transparent" />

                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center justify-center p-4 bg-airport-accent/15 rounded-2xl mb-6 border border-airport-accent/25"
                        >
                            <Plane className="w-8 h-8 text-airport-accent" />
                        </motion.div>
                        <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Join SmartAir</h1>
                        <p className="text-slate-400 text-sm font-medium">Initialize your Operator Profile</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm"
                        >
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Full Personnel Name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Captain Aviation"
                            icon={<UserIcon className="h-5 w-5" />}
                        />

                        <Input
                            label="Official Email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="operator@smartair.aero"
                            icon={<Mail className="h-5 w-5" />}
                        />

                        <Input
                            label="Secure Access Key"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            icon={<Lock className="h-5 w-5" />}
                        />

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Assigned Division</label>
                            <div className="relative">
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="block w-full px-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-airport-accent/40 focus:border-airport-accent/50 transition-all duration-300 appearance-none cursor-pointer"
                                >
                                    <option value="user" className="bg-[#0a0f1d]">Passenger Services</option>
                                    <option value="staff" className="bg-[#0a0f1d]">Airport Ground Staff</option>
                                    <option value="admin" className="bg-[#0a0f1d]">Terminal Administration</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500">
                                    <UserPlus className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                className="w-full py-4 text-base"
                                icon={<UserPlus className="w-5 h-5" />}
                            >
                                Register Operator
                            </Button>
                        </div>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <p className="text-slate-400 text-sm">
                            Already Authorized?{' '}
                            <Link to="/login" className="text-airport-accent font-black hover:text-airport-accent/80 transition-colors">
                                Access Console
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
                        <ShieldCheck className="w-3 h-3 text-airport-accent/50" />
                        <span>Encrypted Protocol Stack</span>
                    </div>
                </div>

                <p className="mt-10 text-center text-slate-600 text-[10px] font-black tracking-[0.2em] uppercase">
                    &copy; 2026 SmartAir Global &bull; Next-Gen Terminal Logic
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
