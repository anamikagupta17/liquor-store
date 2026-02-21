import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface NavItemProps {
  /**
   * Navigation path
   */
  to: string;
  /**
   * Icon element
   */
  icon: ReactNode;
  /**
   * Label text
   */
  label: string;
  /**
   * Optional badge content
   */
  badge?: string;
  /**
   * Whether the sidebar is collapsed
   */
  isCollapsed?: boolean;
}

/**
 * NavItem component - navigation menu item
 * Highlights when active based on current route
 * @param to - Route path
 * @param icon - Icon element
 * @param label - Menu label
 * @param badge - Optional badge text
 * @param isCollapsed - Whether sidebar is collapsed
 */
export function NavItem({ to, icon, label, badge, isCollapsed = false }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const baseClasses = 'relative rounded-[8px] shrink-0 w-full transition-all';
  const activeClasses = isActive
    ? 'bg-[#f3f2f6]'
    : 'bg-white opacity-70 hover:opacity-100 hover:bg-gray-50';

  return (
    <Link
      to={to}
      className={`${baseClasses} ${activeClasses} focus:outline-none focus:ring-2 focus:ring-[#6e55fb] focus:ring-offset-2 group`}
      aria-current={isActive ? 'page' : undefined}
      title={isCollapsed ? label : undefined}
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className={`box-border content-stretch flex ${isCollapsed ? 'justify-center' : 'justify-between'} gap-[16px] items-center p-[16px] relative w-full`}>
          <div className={`flex gap-[16px] items-center ${isCollapsed ? '' : 'flex-1'}`}>
            <div className="relative shrink-0 size-[32px]">{icon}</div>
            {!isCollapsed && (
              <p className="basis-0 grow leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[#262d33] text-[17px]">
                {label}
              </p>
            )}
          </div>
          {!isCollapsed && badge && (
            <span className="bg-[#6e55fb] text-white text-xs px-2 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}