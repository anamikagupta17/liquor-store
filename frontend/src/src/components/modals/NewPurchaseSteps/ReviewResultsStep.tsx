import { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Check
} from "lucide-react";

import loader from "../../../../assets/loader.gif";

import { FixedSizeList } from "react-window";

export interface ReviewResultsStepProps {
  onBack: () => void;
  onContinue: () => void;
  resultData: any;
}

type ResultTab = "eligible" | "ineligible";

export function ReviewResultsStep({
  onBack,
  onContinue,
  resultData
}: ReviewResultsStepProps) {
  const [activeTab, setActiveTab] = useState<ResultTab>("eligible");
  const eligibleList = resultData?.eligibleList ?? [];
  const inEligibleList = resultData?.inEligibleList ?? [];

  const eligibleCount = eligibleList.length ?? 0;
  const ineligibleCount = inEligibleList.length ?? 0;

  const displayData = useMemo(
    () => (activeTab === "eligible" ? eligibleList : inEligibleList),

    [activeTab, eligibleList, inEligibleList]
  );

  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000); // 2 second loading simulation

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    setIsLoading(true);

    const t = setTimeout(() => setIsLoading(false), 300);

    return () => clearTimeout(t);
  }, [displayData]);

  // Row renderer (design unchanged)

  const Row = ({ index, style }: any) => {
    const row = displayData[index];

    return (
      <div
        style={style}
        className={`grid grid-cols-[120px_1fr_100px_140px_100px_100px] gap-[16px] px-[16px] py-[12px] ${
          index % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"
        } hover:bg-[#f3f2f6] transition-colors`}
      >
        <p className="text-[14px] text-[#262d33]">{row.clientId}</p>

        <p className="text-[14px] text-[#262d33]">{row.account}</p>

        <p className="text-[14px] text-[#262d33]">{row.fico}</p>

        <p className="text-[14px] text-[#262d33]">{row.enrolledDebt}</p>

        <p className="text-[14px] text-[#262d33]">{row.epf}</p>

        <div className="flex justify-center">
          {row.firstPay && <Check className="size-[20px] text-[#10B981]" />}
        </div>
      </div>
    );
  };

  return (
    <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[48px] w-full h-full">
      {/* Header */}
      <div className="content-stretch flex gap-[8px] items-start w-full new-vintage-title">
        <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[17px]">
          Review Results
        </p>

        {/* Action Buttons */}
        <div className="content-stretch flex gap-[32px] items-center justify-end shrink-0">
          <button
            onClick={onBack}
            className="bg-[#f3f2f6] cursor-pointer box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[16px] rounded-[6px] shrink-0 hover:bg-[#e7e6ee] transition-colors"
          >
            <ChevronLeft className="size-[20px] text-[#262d33]" />
            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px]">
              Back
            </p>
          </button>

          <button
            onClick={onContinue}
            className="bg-[#007aff] cursor-pointer box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[16px] rounded-[6px] shrink-0 hover:bg-[#0066dd] transition-colors"
          >
            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[14px] text-white">
              Continue to Purchase
            </p>
            <ChevronRight className="size-[20px] text-white" />
          </button>
        </div>
      </div>

      {/* Toggle Tabs */}
      <div className="flex gap-[16px] items-center w-full">
        <button
          onClick={() => setActiveTab("eligible")}
          className={`flex items-center gap-[8px] px-[16px] py-[12px] rounded-[8px] transition-colors ${
            activeTab === "eligible"
              ? "bg-[#D1FAE5]"
              : "bg-[#f3f2f6] hover:bg-[#e7e6ee]"
          }`}
        >
          <CheckCircle2 className="size-[20px] text-[#10B981]" />
          <div className="flex flex-col items-start">
            <p className="font-['Poppins:Medium',sans-serif] text-[14px] text-[#10B981]">
              Eligible
            </p>
            <p className="font-['Poppins:Regular',sans-serif] text-[12px] text-[#7d7d7d]">
              {eligibleCount} account{eligibleCount !== 1 ? "s" : ""}
            </p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab("ineligible")}
          className={`flex items-center gap-[8px] px-[16px] py-[12px] rounded-[8px] transition-colors ${
            activeTab === "ineligible"
              ? "bg-[#FEE2E2]"
              : "bg-[#f3f2f6] hover:bg-[#e7e6ee]"
          }`}
        >
          <XCircle className="size-[20px] text-[#EF4444]" />
          <div className="flex flex-col items-start">
            <p className="font-['Poppins:Medium',sans-serif] text-[14px] text-[#EF4444]">
              Ineligible
            </p>
            <p className="font-['Poppins:Regular',sans-serif] text-[12px] text-[#7d7d7d]">
              {ineligibleCount} account{ineligibleCount !== 1 ? "s" : ""}
            </p>
          </div>
        </button>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-[8px] w-full overflow-hidden border border-[#e6e6e6]">
        {/* Table Header */}
        <div className="bg-[#f9fafb] border-b border-[#e6e6e6]">
          <div className="grid grid-cols-[120px_1fr_100px_140px_100px_100px] gap-[16px] px-[16px] py-[12px]">
            <p className="font-['Poppins:Medium',sans-serif] text-[14px] text-[#636363]">
              Client ID
            </p>
            <p className="font-['Poppins:Medium',sans-serif] text-[14px] text-[#636363]">
              Account
            </p>
            <p className="font-['Poppins:Medium',sans-serif] text-[14px] text-[#636363]">
              FICO
            </p>
            <p className="font-['Poppins:Medium',sans-serif] text-[14px] text-[#636363]">
              Enrolled Debt
            </p>
            <p className="font-['Poppins:Medium',sans-serif] text-[14px] text-[#636363]">
              EPF %
            </p>
            <p className="font-['Poppins:Medium',sans-serif] text-[14px] text-[#636363]">
              First pay
            </p>
          </div>
        </div>

        {/* Table Body */}
        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-[120px]">
              <div className="size-[48px] border-4 border-[#e6e6e6] border-t-[#6e55fb] rounded-full animate-spin"></div>
              <img src={loader} alt="Loading..." className="size-[48px]" />
            </div>
          ) : (
            /* visibleData?.map((row, index) => (
              <div
                key={row.clientId}
                className={`grid grid-cols-[120px_1fr_100px_140px_100px_100px] gap-[16px] px-[16px] py-[12px] ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"
                } hover:bg-[#f3f2f6] transition-colors`}
              >
                <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#262d33]">
                  {row.clientId}
                </p>
                <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#262d33]">
                  {row.account}
                </p>
                <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#262d33]">
                  {row.fico}
                </p>
                <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#262d33]">
                  {row.enrolledDebt}
                </p>
                <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#262d33]">
                  {row.epf}
                </p>
                <div className="flex items-center justify-center">
                  {row.firstPay && (
                    <Check className="size-[20px] text-[#10B981]" />
                  )}
                </div>
              </div>
            )) */
            <FixedSizeList
              height={400}
              itemCount={displayData.length}
              itemSize={56}
              width="100%"
            >
              {Row}
            </FixedSizeList>
          )}
        </div>
      </div>
    </div>
  );
}
