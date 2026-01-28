import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
    return (
        <nav className="glass-panel sticky top-4 z-50 mx-4 px-6 py-4 flex-between">
            <div className="hidden md:flex gap-6 items-center">
                <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
                <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">How it Works</Link>
            </div>

            <div className="flex gap-4">
                <Link to="/login">
                    <Button variant="ghost" className="text-sm">Log In</Button>
                </Link>
                <Link to="/worker/register">
                    <Button variant="primary" className="text-sm">Join as Worker</Button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
