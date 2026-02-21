import { Search } from 'lucide-react';
import { InputHTMLAttributes, forwardRef } from 'react';

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
}

/**
 * SearchInput component - styled search input with icon
 * @param placeholder - Placeholder text
 * @param value - Input value
 * @param onChange - Change handler
 * @param containerClassName - Container CSS classes
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = 'Search...', containerClassName = '', className = '', ...props }, ref) => {
    return (
      <div
        className={`bg-[#f3f2f6] box-border content-stretch flex gap-[16px] overflow-clip p-2 relative rounded-[8px] shrink-0 w-full md:w-[286px] ${containerClassName}`}
      >
        <Search className="shrink-0 text-[#262D33]" size={24} />
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className={`bg-transparent border-none outline-none text-[#7d7d7d] text-[17px] placeholder:text-[#7d7d7d] ${className}`}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
