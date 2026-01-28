import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container section-padding">
                {children}
            </main>
            <footer className="border-t border-white/10 py-8 mt-auto bg-slate-900/50 backdrop-blur-sm">
                <div className="container flex flex-col md:flex-row justify-between items-center text-sm text-secondary gap-4">
                    <p>&copy; 2024 WorkConnect. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
