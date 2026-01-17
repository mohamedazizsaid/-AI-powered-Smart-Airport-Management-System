import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    icon,
    error,
    className = '',
    id,
    ...props
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={id} className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                    {label}
                </label>
            )}
            <div className="relative group/input">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within/input:text-airport-accent text-slate-500">
                        {icon}
                    </div>
                )}
                <input
                    id={id}
                    className={`input-field ${icon ? 'pl-11' : 'pl-4'} ${error ? 'border-red-500/50 ring-red-500/20' : ''} ${className}`}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-red-400 text-[10px] font-medium ml-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-500" />
                    {error}
                </p>
            )}
        </div>
    );
};
