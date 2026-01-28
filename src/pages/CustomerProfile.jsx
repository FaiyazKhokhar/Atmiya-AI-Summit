import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { User, Edit2, Loader2, Save, Camera } from 'lucide-react';

export default function CustomerProfile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const storedProfile = localStorage.getItem('customerProfile');
        if (storedProfile) {
            const { id } = JSON.parse(storedProfile);
            fetchProfile(id);

            // Load profile picture from localStorage
            const savedPic = localStorage.getItem(`customerProfilePic_${id}`);
            if (savedPic) {
                setProfilePicture(savedPic);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const fetchProfile = async (id) => {
        try {
            const response = await fetch(`/api/customers/${id}`);
            if (response.ok) {
                const data = await response.json();
                setProfile(data);
            } else {
                setMessage('Failed to load profile.');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setMessage('Error loading profile.');
        } finally {
            setLoading(false);
        }
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setMessage('Image size should be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setProfilePicture(base64String);
                // Save to localStorage
                localStorage.setItem(`customerProfilePic_${profile.id}`, base64String);
                setMessage('Profile picture updated!');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const response = await fetch(`/api/customers/${profile.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    number: profile.number,
                    location: profile.location
                }),
            });

            if (response.ok) {
                setMessage('Profile updated successfully!');
                setIsEditing(false);
                localStorage.setItem('customerProfile', JSON.stringify(profile));
            } else {
                setMessage('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading profile...</div>;
    }

    if (!profile) {
        return (
            <div className="p-8 text-center container">
                <Card>
                    <h2 className="text-xl font-bold mb-4">No Profile Found</h2>
                    <p className="mb-4">Please register to create a customer profile.</p>
                    <Button onClick={() => navigate('/customer/register')}>Register Now</Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 pt-8">
            <div className="container max-w-lg">
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            {/* Profile Picture with Upload */}
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center text-primary border-2 border-primary/30">
                                    {profilePicture ? (
                                        <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-10 h-10" />
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full hover:bg-primary-hover transition-colors shadow-lg"
                                    title="Change profile picture"
                                >
                                    <Camera className="w-3.5 h-3.5" />
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                    className="hidden"
                                />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{profile.name}</h1>
                                <p className="text-secondary text-sm">Customer Profile</p>
                            </div>
                        </div>
                        {!isEditing && (
                            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                <Edit2 className="w-4 h-4 mr-2" /> Edit
                            </Button>
                        )}
                    </div>

                    {message && (
                        <div className={`p-3 rounded-lg mb-4 text-sm ${message.includes('success') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                        {/* Read Only Fields */}
                        <div className="opacity-70">
                            <label className="block text-sm font-medium text-secondary mb-1">Full Name (Locked)</label>
                            <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-white/50">{profile.name}</div>
                        </div>

                        <div className="opacity-70">
                            <label className="block text-sm font-medium text-secondary mb-1">Adhaar ID (Locked)</label>
                            <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-white/50">{profile.adhaar_id}</div>
                        </div>

                        {/* Editable Fields */}
                        <Input
                            label="Phone Number"
                            value={profile.number}
                            onChange={(e) => setProfile({ ...profile, number: e.target.value })}
                            disabled={!isEditing}
                            required
                        />

                        <Input
                            label="Location"
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            disabled={!isEditing}
                            required
                        />

                        {isEditing && (
                            <div className="flex gap-3 mt-4">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => {
                                    setIsEditing(false);
                                    window.location.reload();
                                }}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1" disabled={saving}>
                                    {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                                </Button>
                            </div>
                        )}
                    </form>
                </Card>
            </div>
        </div>
    );
}
