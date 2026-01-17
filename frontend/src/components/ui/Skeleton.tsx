import React from 'react';

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const Skeleton: React.FC<SkeletonProps> = ({
    className = '',
    width,
    height,
    rounded = 'lg',
}) => {
    const roundedClasses = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        full: 'rounded-full',
    };

    return (
        <div
            className={`animate-pulse bg-white/5 ${roundedClasses[rounded]} ${className}`}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
            }}
        />
    );
};

// Skeleton card for maintenance/staff items
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`glass-morphism p-5 rounded-2xl border border-white/5 ${className}`}>
        <div className="flex justify-between items-start mb-4">
            <Skeleton width={40} height={40} rounded="lg" />
            <Skeleton width={60} height={20} />
        </div>
        <Skeleton width="70%" height={20} className="mb-2" />
        <Skeleton width="50%" height={16} className="mb-4" />
        <Skeleton width="100%" height={6} rounded="full" />
    </div>
);

// Skeleton for stat cards
export const SkeletonStatCard: React.FC = () => (
    <div className="glass-morphism p-6 rounded-2xl border border-white/5">
        <div className="flex justify-between items-start mb-5">
            <Skeleton width={48} height={48} rounded="2xl" />
            <Skeleton width={50} height={24} rounded="lg" />
        </div>
        <Skeleton width="60%" height={12} className="mb-2" />
        <Skeleton width="40%" height={32} />
    </div>
);

// Skeleton for list items
export const SkeletonListItem: React.FC = () => (
    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
        <div className="flex-1">
            <Skeleton width="50%" height={16} className="mb-2" />
            <Skeleton width="30%" height={12} />
        </div>
        <div className="text-right">
            <Skeleton width={60} height={20} className="mb-2" />
            <Skeleton width={100} height={6} rounded="full" />
        </div>
    </div>
);

export default Skeleton;
