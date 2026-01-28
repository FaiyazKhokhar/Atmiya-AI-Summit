import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Card = ({ children, className, hover = false, ...props }) => {
    return (
        <motion.div
            whileHover={hover ? { y: -5 } : {}}
            className={clsx(
                'card',
                hover && 'cursor-pointer hover:shadow-glow hover:border-white/10',
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
