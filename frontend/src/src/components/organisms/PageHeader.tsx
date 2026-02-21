import { ReactNode } from "react";
import { Plus } from "lucide-react";

export interface PageHeaderProps {
  /**
   * Header icon
   */
  icon: ReactNode;
  /**
   * Title text
   */
  title: string;
  /**
   * Optional action button text
   */
  actionText?: string;
  /**
   * Action button handler
   */
  onAction?: () => void;
}

/**
 * PageHeader component - section header with title and action button
 * @param icon - Icon element
 * @param title - Header title
 * @param actionText - Action button text
 * @param onAction - Action button handler
 */
export function PageHeader({
  icon,
  title,
  actionText,
  onAction,
}: PageHeaderProps) {
  const raw = localStorage.getItem("userData");
  const userData = JSON.parse(raw !== null ? raw : "null");
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-between relative shrink-0 w-full">
      <div className="flex gap-[8px] items-center flex-1">
        <div className="relative shrink-0 size-[32px]">{icon}</div>
        <p className="basis-0 grow leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[#262d33] text-[17px]">
          {title}
        </p>
      </div>
      {actionText && onAction  && userData?.role?.includes('admin') && (
        <button
          onClick={onAction}
          className="cursor-pointer bg-[#6e55fb] box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 transition-colors hover:bg-[#5941e6] focus:outline-none focus:ring-2 focus:ring-[#6e55fb] focus:ring-offset-2"
        >
          <Plus className="size-[24px] text-[#f3f2f6]" strokeWidth={2} />
          <span className="font-normal leading-[normal] not-italic relative shrink-0 text-[#f3f2f6] text-[16px] text-nowrap whitespace-pre">
            {actionText}
          </span>
        </button>
      )}
    </div>
  );
}
