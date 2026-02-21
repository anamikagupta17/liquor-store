import { ChevronLeft, ChevronRight } from "lucide-react";
import { EligibilityCriteria } from "../NewPurchaseModal";
import { allowOnlyNumbers } from "../../../utils/formatNumber";
export interface EligibilityCriteriaStepProps {
  criteria: EligibilityCriteria;
  onCriteriaChange: (criteria: EligibilityCriteria) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function EligibilityCriteriaStep({
  criteria,
  onCriteriaChange,
  onBack,
  onContinue
}: EligibilityCriteriaStepProps) {
  const handleFicoChange = (value: string) => {
    onCriteriaChange({ ...criteria, fico: parseFloat(value) || 0 });
  };

  const handleEnrolledDebtChange = (value: string) => {
    onCriteriaChange({ ...criteria, enrolledDebt: parseFloat(value) || 0 });
  };

  const handleEpfChange = (value: string) => {
    onCriteriaChange({ ...criteria, epf: parseFloat(value) || 0 });
  };

  return (
    <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[48px] w-full h-full">
      {/* Header */}
      <div className="content-stretch flex gap-[8px] items-start w-full new-vintage-title">
        <div className="content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[8px] grow items-start leading-[normal] min-h-px min-w-px not-italic">
          <p className="text-[#262d33] text-[17px] w-full">
            Eligibility Criteria
          </p>
          <p className="text-[#7d7d7d] text-[14px] w-full">
            Configure rules for 200 accounts
          </p>
        </div>

        {/* Action Buttons */}
        <div className="content-stretch flex gap-[32px] items-center justify-end shrink-0">
          <button
            onClick={onBack}
            className="bg-[#f3f2f6] box-border content-stretch cursor-pointer flex gap-[8px] items-center justify-center px-[24px] py-[16px] rounded-[6px] shrink-0 hover:bg-[#e7e6ee] transition-colors"
          >
            <ChevronLeft className="size-[20px] text-[#262d33]" />
            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px]">
              Back
            </p>
          </button>

          <button
            onClick={onContinue}
            className="bg-[#007aff] box-border content-stretch cursor-pointer flex gap-[8px] items-center justify-center px-[24px] py-[16px] rounded-[6px] shrink-0 hover:bg-[#0066dd] transition-colors"
          >
            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[14px] text-white">
              Run Eligibility Check
            </p>
            <ChevronRight className="size-[20px] text-white" />
          </button>
        </div>
      </div>

      {/* Criteria Card */}
      <div className="bg-white relative rounded-[8px] shrink-0 w-full">
        <div className="flex flex-col justify-center size-full">
          <div className="box-border content-stretch flex flex-col gap-[16px] items-start justify-center p-[16px] w-full">
            {/* Section Title */}
            <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
              <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[18px] w-full">
                First payment cleared
              </p>
              <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#7d7d7d] text-[14px]">
                  Column: {criteria.columnName}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-0 relative shrink-0 w-full">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 1474 1"
                >
                  <line
                    opacity="0.2"
                    stroke="#7D7D7D"
                    x2="1474"
                    y1="0.5"
                    y2="0.5"
                  />
                </svg>
              </div>
            </div>

            {/* Criteria Inputs */}
            <div className="content-stretch flex gap-[16px] items-start w-full mobile-col">
              {/* FICO */}
              <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-w-px">
                <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[18px]">
                  FICO ≥
                </p>
                <div className="content-stretch flex gap-[8px] items-center">
                  <input
                    type="text"
                    value={criteria.fico}
                    onChange={(e) => handleFicoChange(e.target.value)}
                    onKeyDown={allowOnlyNumbers}
                    inputMode="numeric"
                    className="bg-[#f3f2f6] box-border content-stretch flex flex-col items-start p-[8px] rounded-[4px] w-[188px] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                  />
                  <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#7d7d7d] text-[14px]">
                    (Score)
                  </p>
                </div>
              </div>

              {/* ENROLLED DEBT */}
              <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-w-px">
                <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[18px]">
                  ENROLLED DEBT ≥
                </p>
                <div className="content-stretch flex gap-[8px] items-center">
                  <input
                    type="text"
                    value={criteria.enrolledDebt}
                    onChange={(e) => handleEnrolledDebtChange(e.target.value)}
                    onKeyDown={allowOnlyNumbers}
                    inputMode="numeric"
                    className="bg-[#f3f2f6] box-border content-stretch flex flex-col items-start p-[8px] rounded-[4px] w-[188px] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                  />
                  <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#7d7d7d] text-[14px]">
                    (Dollars)
                  </p>
                </div>
              </div>

              {/* EPF % */}
              <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-w-px">
                <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[18px]">
                  EPF % ≥
                </p>
                <div className="content-stretch flex gap-[8px] items-center">
                  <input
                    type="text"
                    value={criteria.epf}
                    onChange={(e) => handleEpfChange(e.target.value)}
                    onKeyDown={allowOnlyNumbers}
                    inputMode="numeric"
                    className="bg-[#f3f2f6] box-border content-stretch flex flex-col items-start p-[8px] rounded-[4px] w-[188px] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                  />
                  <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#7d7d7d] text-[14px]">
                    (Percentage)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
