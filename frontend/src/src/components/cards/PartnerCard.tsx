import { Partner } from "../../types";
import { ChevronRight } from "lucide-react";
import { capitalizeWords } from "../../utils/stringUtils";
export interface PartnerCardProps {
  /**
   * Partner data to display
   */
  partner: Partner;
  /**
   * Click handler for the card
   */
  onClick?: (id: string) => void;
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";
  /**
   * Density variant
   */
  density?: "comfortable" | "compact";
  /**
   * Visual state
   */
  state?: "default" | "hover" | "selected" | "disabled";
}

/**
 * PartnerCard component - displays partner information
 * Shows name and three key metrics: Hurdle, Split, and Advance Rate
 */
export function PartnerCard({
  partner,
  onClick,
  size = "md",
  density = "comfortable",
  state = "default",
}: PartnerCardProps) {
  const paddingClasses = {
    comfortable: "p-[24px]",
    compact: "p-[16px]",
  };

  const gapClasses = {
    comfortable: "gap-[24px]",
    compact: "gap-[16px]",
  };

  const stateClasses = {
    default: "hover:shadow-md",
    hover: "shadow-md",
    selected: "ring-2 ring-[#6e55fb]",
    disabled: "opacity-50 pointer-events-none",
  };

  return (
    <div
      className={`group bg-white relative rounded-[8px] self-start shrink-0 transition-all cursor-pointer ${stateClasses[state]}`}
      onClick={() => onClick?.(partner.id)}
      role="button"
      tabIndex={state === "disabled" ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(partner.id);
        }
      }}
      aria-label={`Partner card for ${capitalizeWords(partner.partnerName)}`}
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <div className="flex flex-col justify-center size-full">
        <div
          className={`box-border content-stretch flex flex-col ${gapClasses[density]} items-start justify-center ${paddingClasses[density]} relative w-full`}
        >
          {/* Header */}
          <div className="content-stretch flex items-start relative shrink-0 w-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 flex-1">
              <p className="leading-[normal] not-italic relative shrink-0 text-[#333333] text-[17px] truncate font-medium">
                {capitalizeWords(partner.partnerName)}
              </p>
            </div>
            <div className="relative shrink-0 size-[24px] opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight
                className="size-full text-[#333333]"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Body - Metrics */}
          <div className="content-stretch flex items-start relative shrink-0 w-full gap-4">
            {/* Hurdle */}
            <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-nowrap whitespace-pre">
              <p className="opacity-60 relative shrink-0 text-[#636363] text-[14px]">
                Hurdle
              </p>
              <p className="relative shrink-0 text-[#333333] text-[17px]">
                {partner.termsHurdle}
              </p>
            </div>

            {/* Split */}
            <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-nowrap whitespace-pre">
              <p className="opacity-60 relative shrink-0 text-[#636363] text-[14px]">
                Split
              </p>
              <p className="relative shrink-0 text-[#333333] text-[17px]">
                {partner.split}
              </p>
            </div>

            {/* Advance Rate */}
            <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-nowrap whitespace-pre">
              <p className="opacity-60 relative shrink-0 text-[#636363] text-[14px]">
                Advance Rate
              </p>
              <p className="relative shrink-0 text-[#333333] text-[17px]">
                {partner.advancePercentage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * PartnerCardSkeleton - loading state for PartnerCard
 */
export function PartnerCardSkeleton() {
  return (
    <div className="bg-white relative rounded-[8px] self-start shrink-0 animate-pulse">
      <div
        aria-hidden="true"
        className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative w-full">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="content-stretch flex items-start relative shrink-0 w-full gap-4">
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
