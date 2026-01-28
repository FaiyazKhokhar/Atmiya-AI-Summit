import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/Button';
import Card from '../components/Card';
import { motion } from 'framer-motion';
import { Search, Hammer, Shield, MapPin } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen pb-20 relative overflow-hidden">
            {/* Hero Section with Centered Image and Text Overlay */}
            <section className="container text-center flex flex-col items-center gap-10 pt-20 pb-20 relative z-10">
                {/* Image with All Text Overlaid */}
                <div className="relative w-full max-w-5xl mx-auto mb-8">
                    <img
                        src="/hero-workers.png"
                        alt="Workers"
                        className="w-full h-auto object-contain opacity-90"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4">
                        <h2 className="text-5xl md:text-7xl font-black text-primary drop-shadow-lg" style={{ letterSpacing: '0.05em' }}>
                            WorkerConnect
                        </h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <span className="badge badge-success px-4 py-2 text-sm">
                                Now Live in Your City
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight text-white drop-shadow-lg">
                                Find Trusted Workers <br />
                                <span className="text-primary">Or Earn Daily.</span>
                            </h1>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <p className="text-secondary text-xl mt-4 max-w-3xl mx-auto leading-relaxed font-light">
                        The smartest way to hire maids, plumbers, and electricians nearby.
                        <br className="hidden md:block" />
                        Instant payments, verified skills, and voice-assisted registration.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-8 mt-12"
                >
                    <Link to="/customer/dashboard">
                        <Button size="lg" className="w-full sm:w-auto h-16 px-12 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                            <Search className="w-6 h-6 mr-3" /> Hire a Worker
                        </Button>
                    </Link>
                    <Link to="/worker/register">
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto h-16 px-12 text-lg hover:bg-white/10">
                            <Hammer className="w-6 h-6 mr-3" /> Join as Worker
                        </Button>
                    </Link>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="container py-32 border-t border-white/5">
                <div className="grid md:grid-cols-3 gap-12">
                    <Card hover className="flex flex-col gap-8 p-10 h-full">
                        <div className="p-5 bg-primary/20 w-fit rounded-2xl text-primary mb-2">
                            <MapPin className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-h2 text-3xl">Live Nearby Tracking</h3>
                            <p className="text-secondary text-lg leading-relaxed">See workers or jobs available in your immediate vicinity with real-time updates and map visualization.</p>
                        </div>
                    </Card>

                    <Card hover className="flex flex-col gap-8 p-10 h-full">
                        <div className="p-5 bg-accent/20 w-fit rounded-2xl text-accent mb-2">
                            <Shield className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-h2 text-3xl">Verified & Safe</h3>
                            <p className="text-secondary text-lg leading-relaxed">All workers are verified with ID and skill badges. Secure payments ensure safety for both parties.</p>
                        </div>
                    </Card>

                    <Card hover className="flex flex-col gap-8 p-10 h-full">
                        <div className="p-5 bg-secondary/20 w-fit rounded-2xl text-secondary mb-2">
                            <Hammer className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-h2 text-3xl">Voice-First Easy Use</h3>
                            <p className="text-secondary text-lg leading-relaxed">Register and find jobs using just your voice. Built with inclusivity for all language speakers.</p>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default Home;
