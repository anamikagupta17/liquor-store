import { ReactNode } from 'react';

export interface BreadcrumbProps {
  /**
   * Icon element
   */
  icon: ReactNode;
  /**
   * Breadcrumb text
   */
  label: string;
}

/**
 * Breadcrumb component - displays current page location
 * @param icon - Icon element
 * @param label - Breadcrumb text
 */
export function Breadcrumb({ icon, label }: BreadcrumbProps) {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <div className="basis-0 box-border content-stretch flex gap-[8px] grow h-[42px] items-center min-h-px min-w-px px-0 py-[8px] relative shrink-0">
        <div className="relative shrink-0 size-[24px]">{icon}</div>
        <p className="basis-0 grow leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[#262d33] text-[17px]">
          {label}
        </p>
      </div>
    </div>
  );
}
