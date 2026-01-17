import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
    className?: string;
    compact?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
    message,
    onRetry,
    className = '',
    compact = false,
}) => {
    if (compact) {
        return (
            <div className={`flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 ${className}`}>
                <AlertTriangle className="text-red-500 shrink-0" size={18} />
                <p className="text-sm text-red-300 flex-1">{message}</p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors"
                    >
                        <RefreshCw size={16} />
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-500" size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Something went wrong</h3>
            <p className="text-sm text-slate-400 mb-6 max-w-md">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-medium"
                >
                    <RefreshCw size={18} />
                    Try Again
                </button>
            )}
        </div>
    );
};

// Empty state component
interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    title,
    description,
    action,
    className = '',
}) => (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
        {icon && (
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                {icon}
            </div>
        )}
        <h3 className="text-lg font-bold text-slate-200 mb-2">{title}</h3>
        {description && <p className="text-sm text-slate-400 mb-6 max-w-md">{description}</p>}
        {action}
    </div>
);

export default ErrorState;
