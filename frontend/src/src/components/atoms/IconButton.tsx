import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Icon or content to display
   */
  children: ReactNode;
  /**
   * Visual style variant
   */
  variant?: 'default' | 'ghost';
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * IconButton component - button containing an icon
 * Used for notification bell, menu toggle, etc.
 * @param children - Icon element to render
 * @param variant - Style variant
 * @param size - Size variant
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, variant = 'default', size = 'md', className = '', ...props }, ref) => {
    const baseClasses = 'bg-white box-border content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#6e55fb] focus:ring-offset-2';
    
    const sizeClasses = {
      sm: 'p-[6px]',
      md: 'p-[8px]',
      lg: 'p-[10px]',
    };

    const variantClasses = {
      default: '',
      ghost: 'bg-transparent hover:bg-gray-100',
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        aria-label="Icon button"
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
