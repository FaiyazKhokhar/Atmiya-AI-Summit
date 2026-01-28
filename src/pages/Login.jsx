import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, ArrowRight, Lock, Phone } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('customer'); // 'customer' or 'worker'
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        // Mock Login Delay
        setTimeout(() => {
            setLoading(false);
            if (role === 'worker') {
                navigate('/worker/dashboard');
            } else {
                navigate('/customer/dashboard');
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen pb-20 relative overflow-hidden">
            {/* Background blobs for aesthetics */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />



            <div className="container flex justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md"
                >
                    <Card className="border-t-4 border-t-primary shadow-glow backdrop-blur-xl bg-bg-card/80">
                        <div className="text-center mb-8">
                            <h1 className="text-h2 text-2xl mb-2">Welcome Back</h1>
                            <p className="text-secondary">Login to access your dashboard</p>
                        </div>

                        {/* Role Toggles */}
                        <div className="flex bg-slate-900/50 p-1 rounded-xl mb-8 relative">
                            <motion.div
                                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-lg shadow-sm"
                                animate={{ x: role === 'customer' ? 0 : '100%' }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            <button
                                onClick={() => setRole('customer')}
                                className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${role === 'customer' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                            >
                                <User className="w-4 h-4" /> Customer
                            </button>
                            <button
                                onClick={() => setRole('worker')}
                                className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${role === 'worker' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                            >
                                <Briefcase className="w-4 h-4" /> Worker
                            </button>
                        </div>

                        <form onSubmit={handleLogin} className="flex flex-col gap-5">
                            <Input
                                icon={<Phone className="w-5 h-5 text-secondary" />}
                                label={role === 'worker' ? "Phone Number" : "Email / Phone"}
                                placeholder={role === 'worker' ? "e.g. 9876543210" : "name@example.com"}
                                type={role === 'worker' ? "tel" : "text"}
                                required
                            />

                            <div className="relative">
                                <Input
                                    label="Password"
                                    placeholder="••••••••"
                                    type="password"
                                    required
                                />
                                <a href="#" className="absolute top-0 right-0 text-xs text-primary hover:text-primary-hover">Forgot?</a>
                            </div>

                            <Button
                                type="submit"
                                loading={loading}
                                className="w-full h-12 text-lg mt-2 shadow-lg hover:shadow-primary/50"
                            >
                                Login as {role === 'worker' ? 'Worker' : 'Customer'} <ArrowRight className="w-5 h-5" />
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm text-secondary">
                            Don't have an account? {' '}
                            <Link to={role === 'worker' ? '/worker/register' : '/'} className="text-primary hover:underline font-medium">
                                Register here
                            </Link>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
