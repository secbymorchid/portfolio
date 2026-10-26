import React, { forwardRef } from 'react';

export interface BrassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const BrassButton = forwardRef<HTMLButtonElement, BrassButtonProps>(
  ({ variant = 'outline', size = 'md', icon, children, className = '', ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3 text-base',
    }[size];

    const variantClasses = {
      primary: 'bg-brass text-ink font-semibold shadow-brass hover:bg-brass-light border border-brass-light',
      outline: 'bg-deep-wood/80 text-brass-light border border-brass/70 hover:border-brass-light hover:text-white hover:bg-brass/15 shadow-sm',
      subtle: 'bg-transparent text-brass/90 border border-transparent hover:border-brass/40 hover:text-brass-light',
    }[variant];

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2.5 uppercase tracking-widest font-mono rounded transition-all duration-300 active:scale-[0.98] ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }
);

BrassButton.displayName = 'BrassButton';
