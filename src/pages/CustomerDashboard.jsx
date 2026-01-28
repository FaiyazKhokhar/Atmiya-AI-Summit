import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { Search, MapPin, Phone, Star, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CustomerDashboard() {
    const [workers, setWorkers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWorkers();
    }, []);

    const fetchWorkers = async () => {
        try {
            const response = await fetch('/api/workers');
            if (response.ok) {
                const data = await response.json();
                setWorkers(data);
            }
        } catch (error) {
            console.error("Error fetching workers:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredWorkers = workers.filter(worker =>
        worker.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen pb-20">
            <div className="container py-8">
                <header className="mb-8">
                    <h1 className="text-h2 mb-2">Find a Professional</h1>
                    <p className="text-secondary">Connect with skilled workers in your area.</p>
                </header>

                {/* Search Bar */}
                <div className="mb-8 relative">
                    <Input
                        placeholder="Search for 'Plumber', 'Mumbai'..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
                </div>

                {/* Workers Grid */}
                {loading ? (
                    <div className="text-center py-10 text-secondary">Loading professionals...</div>
                ) : filteredWorkers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredWorkers.map((worker) => (
                            <motion.div
                                key={worker.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -5 }}
                            >
                                <Card className="h-full flex flex-col hover:border-accent/40 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">{worker.name}</h3>
                                                <span className="inline-block bg-accent/10 text-accent px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider">
                                                    {worker.skill}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex bg-yellow-500/10 px-2 py-1 rounded text-yellow-500 text-sm font-bold items-center gap-1">
                                            4.8 <Star className="w-3 h-3 fill-current" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-6 flex-grow">
                                        <div className="flex items-center gap-2 text-secondary text-sm">
                                            <MapPin className="w-4 h-4" />
                                            {worker.location}
                                        </div>
                                        <div className="flex items-center gap-2 text-secondary text-sm">
                                            <Phone className="w-4 h-4" />
                                            {worker.number}
                                        </div>
                                    </div>

                                    <Button variant="outline" className="w-full">
                                        View Profile
                                    </Button>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-primary/5 rounded-xl border-2 border-dashed border-primary/10">
                        <p className="text-secondary">No workers found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
