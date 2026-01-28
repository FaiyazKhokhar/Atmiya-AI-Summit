import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { MapPin, Clock, DollarSign, Star, ToggleLeft, ToggleRight, CheckCircle, TrendingUp, History } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkerDashboard = () => {
    const [isAvailable, setIsAvailable] = useState(true);
    const [history, setHistory] = useState([]);
    const [stats, setStats] = useState({ totalEarnings: 0, todayEarnings: 0 });
    const [loading, setLoading] = useState(true);
    const [workerId, setWorkerId] = useState(null);

    // Mock Data for Jobs
    const jobs = [
        { id: 1, type: 'Cleaning', title: 'Home Cleaning Service', distance: '0.5 km', price: '₹400', time: '2 hrs' },
        { id: 2, type: 'Plumbing', title: 'Leaking Tap Fix', distance: '1.2 km', price: '₹250', time: 'Direct' },
        { id: 3, type: 'Electrical', title: 'Fan Installation', distance: '2.0 km', price: '₹150', time: 'Direct' },
    ];

    useEffect(() => {
        const storedProfile = localStorage.getItem('workerProfile');
        if (storedProfile) {
            const { id } = JSON.parse(storedProfile);
            setWorkerId(id);
            fetchHistory(id);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchHistory = async (id) => {
        try {
            const response = await fetch(`/api/workers/${id}/history`);
            if (response.ok) {
                const data = await response.json();
                setHistory(data);
                calculateStats(data);
            }
        } catch (error) {
            console.error("Error fetching history:", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (data) => {
        const total = data.reduce((acc, curr) => acc + curr.wage, 0);

        // Simple "Today's Earnings" calculation (checking if date is today)
        const today = new Date().toISOString().split('T')[0];
        const todayTotal = data
            .filter(item => item.date.startsWith(today))
            .reduce((acc, curr) => acc + curr.wage, 0);

        setStats({ totalEarnings: total, todayEarnings: todayTotal });
    };

    return (
        <div className="min-h-screen pb-20 pt-8">
            <div className="container">
                {/* Status Section */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <Card className="flex-1 bg-gradient-to-br from-primary/20 to-transparent border-primary/30">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold mb-1">Your Status</h2>
                                <p className={isAvailable ? "text-success" : "text-secondary"}>
                                    {isAvailable ? "● Online & Receiving Jobs" : "○ Offline"}
                                </p>
                            </div>
                            <button onClick={() => setIsAvailable(!isAvailable)} className="text-primary hover:text-primary-hover transition-colors">
                                {isAvailable ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-secondary" />}
                            </button>
                        </div>
                    </Card>

                    <Card className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-bold">Total Earnings</h2>
                            <span className="text-xs text-secondary bg-white/5 px-2 py-1 rounded">Lifetime</span>
                        </div>
                        <p className="text-3xl font-bold text-success">₹{stats.totalEarnings.toLocaleString()}</p>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-sm text-secondary">
                                <TrendingUp className="w-4 h-4 text-green-400" /> Today: <span className="text-white">₹{stats.todayEarnings}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-yellow-500">
                                <Star className="w-4 h-4 fill-current" /> 4.8 Rating
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Jobs Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-h2">Nearby Jobs</h3>
                        <div className="grid gap-4">
                            {jobs.map((job) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.01 }}
                                >
                                    <Card className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-primary hover:border-l-accent transition-all">
                                        <div>
                                            <span className="badge bg-white/10 text-xs mb-2 block w-fit">{job.type}</span>
                                            <h4 className="text-lg font-bold">{job.title}</h4>
                                            <div className="flex gap-4 mt-2 text-sm text-secondary">
                                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.distance}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.time}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                            <p className="text-xl font-bold text-accent">{job.price}</p>
                                            <Button size="sm" className="flex-1 md:flex-none">
                                                Accept <CheckCircle className="w-4 h-4 ml-1" />
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Work History */}
                    <div>
                        <h3 className="text-h2 mb-6">Work History</h3>
                        <div className="space-y-4">
                            {loading ? (
                                <p className="text-secondary text-sm">Loading history...</p>
                            ) : history.length > 0 ? (
                                history.map((item) => (
                                    <Card key={item.id} className="p-4 bg-white/5 border-white/5">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-sm">{item.job_title}</h4>
                                            <span className="text-success font-bold text-sm">₹{item.wage}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-secondary">
                                            <span>{new Date(item.date).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1 text-green-400">
                                                <CheckCircle className="w-3 h-3" /> {item.status}
                                            </span>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center py-8 bg-white/5 rounded-xl border border-dashed border-white/10">
                                    <History className="w-8 h-8 text-secondary mx-auto mb-2" />
                                    <p className="text-secondary text-sm">No work history yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerDashboard;
