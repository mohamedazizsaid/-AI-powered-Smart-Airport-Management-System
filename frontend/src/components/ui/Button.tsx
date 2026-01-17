import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'ghost' | 'danger';
    isLoading?: boolean;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading = false,
    icon,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = 'btn-' + variant;
    const combinedClassName = `${baseStyles} flex items-center justify-center gap-2 ${className}`;

    return (
        <button
            disabled={isLoading || disabled}
            className={combinedClassName}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <>
                    {children}
                    {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
                </>
            )}
        </button>
    );
};
