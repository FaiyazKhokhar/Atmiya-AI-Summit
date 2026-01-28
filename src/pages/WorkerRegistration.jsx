import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import { Mic, MicOff, Check, User, Phone, IdCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorkerRegistration() {
    const navigate = useNavigate();
    const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        skill: '',
        workerId: '' // adhaar_id
    });

    const [activeField, setActiveField] = useState(null);
    const [agentMessage, setAgentMessage] = useState("Tap the mic to start voice registration.");
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    useEffect(() => {
        if (transcript) {
            if (activeField) {
                setFormData(prev => ({ ...prev, [activeField]: transcript }));
                handleNextField(activeField);
            }
            setTranscript('');
        }
    }, [transcript, activeField, setTranscript]);

    const handleNextField = (current) => {
        if (current === 'name') {
            setActiveField('phone');
            setAgentMessage("Got it! Now, say your Phone Number.");
            setTimeout(startListening, 1500);
        } else if (current === 'phone') {
            setActiveField('location');
            setAgentMessage("Thanks. Where are you located?");
            setTimeout(startListening, 1500);
        } else if (current === 'location') {
            setActiveField('skill');
            setAgentMessage("Okay. What is your primary skill?");
            setTimeout(startListening, 1500);
        } else if (current === 'skill') {
            setActiveField('workerId');
            setAgentMessage("Finally, say your Adhaar ID.");
            setTimeout(startListening, 1500);
        } else if (current === 'workerId') {
            setActiveField(null);
            setAgentMessage("All done! Please review and submit.");
        }
    };

    const startVoiceFlow = () => {
        setActiveField('name');
        setAgentMessage("Hello! Please say your Full Name.");
        startListening();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('/api/workers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    number: formData.phone,
                    location: formData.location,
                    skill: formData.skill,
                    adhaar_id: formData.workerId
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }

            const data = await response.json();
            console.log("Registered:", data);
            setStatus('success');
            setAgentMessage("Registration Successful! Redirecting...");
            localStorage.setItem('workerProfile', JSON.stringify(data.worker));
            setTimeout(() => navigate('/worker/dashboard'), 1500);
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus('error');
            setAgentMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen pb-20">
            <div className="container max-w-lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="relative overflow-hidden border-primary/20">
                        {/* Voice Agent Visualizer */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary" />

                        <div className="text-center mb-8">
                            <h1 className="text-h2 mb-2">Worker Registration</h1>
                            <p className="text-sm text-secondary">Join the network to find jobs instantly.</p>
                        </div>

                        <div className="bg-primary/10 rounded-xl p-6 mb-8 text-center border border-primary/20">
                            <div className="flex justify-center mb-4">
                                <button
                                    onClick={isListening ? stopListening : startVoiceFlow}
                                    className={`p-4 rounded-full transition-all ${isListening ? 'bg-error animate-pulse' : 'bg-primary hover:bg-primary-hover'}`}
                                >
                                    {isListening ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
                                </button>
                            </div>
                            <p className="font-medium text-lg text-white mb-1">
                                {isListening ? "Listening..." : "Voice Agent"}
                            </p>
                            <p className="text-sm text-indigo-200">
                                "{agentMessage}"
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className={activeField === 'name' ? 'ring-2 ring-accent rounded-lg p-1 transition-all' : ''}>
                                <Input
                                    label="Full Name"
                                    placeholder="e.g. John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={activeField === 'phone' ? 'ring-2 ring-accent rounded-lg p-1 transition-all' : ''}>
                                <Input
                                    label="Phone Number"
                                    placeholder="e.g. 9876543210"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={activeField === 'location' ? 'ring-2 ring-accent rounded-lg p-1 transition-all' : ''}>
                                <Input
                                    label="Location"
                                    placeholder="e.g. Mumbai, Andheri East"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={activeField === 'skill' ? 'ring-2 ring-accent rounded-lg p-1 transition-all' : ''}>
                                <Input
                                    label="Primary Skill"
                                    placeholder="e.g. Carpenter, Plumber"
                                    value={formData.skill}
                                    onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={activeField === 'workerId' ? 'ring-2 ring-accent rounded-lg p-1 transition-all' : ''}>
                                <Input
                                    label="Adhaar ID"
                                    placeholder="e.g. 1234 5678 9012"
                                    value={formData.workerId}
                                    onChange={(e) => setFormData({ ...formData, workerId: e.target.value })}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                className="mt-4 w-full h-12 text-lg"
                                disabled={status === 'submitting'}
                            >
                                {status === 'submitting' ? 'Registering...' : 'Complete Registration'} <Check className="w-5 h-5 ml-2" />
                            </Button>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
