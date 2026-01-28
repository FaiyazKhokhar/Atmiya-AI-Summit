import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { User, LogIn, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkerLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        number: '',
        adhaar_id: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/workers/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Login failed');
            }

            const data = await response.json();
            localStorage.setItem('workerProfile', JSON.stringify(data.worker));
            navigate('/worker/dashboard'); // Or profile
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-10 pb-20">
            <div className="container max-w-md">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card>
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                                <User className="w-8 h-8" />
                            </div>
                            <h1 className="text-2xl font-bold mb-2">Worker Login</h1>
                            <p className="text-secondary">Welcome back! Please login to continue.</p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <Input
                                label="Phone Number"
                                placeholder="e.g. 9876543210"
                                value={formData.number}
                                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                required
                            />
                            <Input
                                label="Adhaar ID"
                                placeholder="Enter your registered Adhaar ID"
                                value={formData.adhaar_id}
                                onChange={(e) => setFormData({ ...formData, adhaar_id: e.target.value })}
                                required
                            />

                            <Button type="submit" className="mt-4 w-full" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'} <LogIn className="w-4 h-4 ml-2" />
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm text-secondary">
                            Don't have an account?{' '}
                            <Link to="/worker/register" className="text-primary hover:text-primary-hover font-semibold">
                                Register here
                            </Link>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
