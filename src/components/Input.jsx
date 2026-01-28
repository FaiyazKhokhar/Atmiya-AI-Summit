import React, { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(({ className, label, error, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
            <input
                ref={ref}
                className={clsx('input-field', error && 'border-error', className)}
                {...props}
            />
            {error && <span className="text-xs text-error">{error}</span>}
        </div>
    );
});

export default Input;
