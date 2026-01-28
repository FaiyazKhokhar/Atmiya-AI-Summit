import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    className,
    loading,
    disabled,
    ...props
}) => {
    const baseStyles = 'btn';

    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'border border-primary text-primary hover:bg-primary/10',
        ghost: 'hover:bg-white/5',
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={disabled || loading}
            className={clsx(
                baseStyles,
                variants[variant],
                (disabled || loading) && 'opacity-50 cursor-not-allowed',
                className
            )}
            {...props}
        >
            {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
            ) : children}
        </motion.button>
    );
};

export default Button;
