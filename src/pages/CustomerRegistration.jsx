import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { User, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CustomerRegistration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        location: '',
        adhaar_id: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Registration failed');
            }

            const data = await response.json();
            localStorage.setItem('customerProfile', JSON.stringify(data.customer));
            navigate('/customer/profile');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-10 pb-20">
            <div className="container max-w-lg">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card>
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold mb-2">Customer Registration</h1>
                            <p className="text-secondary">Create a profile to hire professionals.</p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <Input
                                label="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <Input
                                label="Phone Number"
                                value={formData.number}
                                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                required
                            />
                            <Input
                                label="Location"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                required
                            />
                            <Input
                                label="Adhaar ID"
                                value={formData.adhaar_id}
                                onChange={(e) => setFormData({ ...formData, adhaar_id: e.target.value })}
                                required
                            />

                            <Button type="submit" className="mt-4" disabled={loading}>
                                {loading ? 'Registering...' : 'Create Profile'}
                            </Button>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
