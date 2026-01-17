import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Plane, ShieldCheck } from 'lucide-react';
import { authService } from '../services/auth.service';
import { getErrorMessage } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.login({ email, password });
            useAuthStore.getState().setUser(response.user, response.access_token);
            navigate('/');
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
                        <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Command Center</h1>
                        <p className="text-slate-400 text-sm font-medium">SmartAir Management Console Login</p>
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Terminal Email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="operator@smartair.aero"
                            icon={<Mail className="h-5 w-5" />}
                        />

                        <Input
                            label="Security Key"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            icon={<Lock className="h-5 w-5" />}
                        />

                        <div className="flex items-center justify-between text-xs py-1">
                            <label className="flex items-center gap-2 text-slate-400 cursor-pointer group/check">
                                <div className="relative">
                                    <input type="checkbox" className="peer sr-only" />
                                    <div className="w-4 h-4 rounded border border-white/20 bg-white/5 transition-colors peer-checked:bg-airport-accent peer-checked:border-airport-accent" />
                                </div>
                                <span className="group-hover/check:text-slate-200 transition-colors">Remember Session</span>
                            </label>
                            <a href="#" className="font-bold text-airport-accent hover:text-airport-accent/80 transition-colors">Recover Access?</a>
                        </div>

                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="w-full py-4 text-base"
                            icon={<LogIn className="w-5 h-5" />}
                        >
                            Access Console
                        </Button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <p className="text-slate-400 text-sm">
                            New Personnel?{' '}
                            <Link to="/signup" className="text-airport-accent font-black hover:text-airport-accent/80 transition-colors">
                                Register Credentials
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
                        <ShieldCheck className="w-3 h-3 text-airport-accent/50" />
                        <span>Advanced Biometric Protection</span>
                    </div>
                </div>

                <p className="mt-10 text-center text-slate-600 text-[10px] font-black tracking-[0.2em] uppercase">
                    &copy; 2026 SmartAir Global &bull; AI-Powered Infrastructure
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
