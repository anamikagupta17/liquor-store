import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";

export interface ExecutePurchaseStepProps {
  partnerName: string;
  onBack: () => void;
  onExecute: () => void;
  resultData: any;
}

export function ExecutePurchaseStep({
  partnerName,
  onBack,
  onExecute,
  resultData,
}: ExecutePurchaseStepProps) {
 
  const [vintageName, setVintageName] = useState(resultData?.vintageName);
  const [purchasePrice, setPurchasePrice] = useState(resultData?.purchasePrice);
  const [chargeBackReduction, setChargeBackReduction] = useState(
    resultData?.chargeBackReduction
  );

  // Calculate values
  const totalAccounts = resultData?.totalAccounts;
  const enrolledDebt = resultData?.totalEnrolledDebt;
  const purchasePricePercentage = parseFloat(
    resultData?.purchasePricePercentage || "0"
  );
  const purchasePriceAmount = (enrolledDebt * purchasePricePercentage) / 100; //(enrolledDebt * parseFloat(purchasePrice)) / 100;
  const effectivePurchasePrice = parseFloat(resultData?.effectivePurchasePrice);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[48px] w-full h-full">
      {/* Header */}
      <div className="content-stretch flex gap-[8px] items-start w-full new-vintage-title">
        <div className="content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[8px] grow items-start leading-[normal] min-h-px min-w-px not-italic">
          <p className="text-[#262d33] text-[17px] w-full">Execute Purchase</p>
          <p className="text-[#7d7d7d] text-[14px] w-full">
            Review and finalize the vintage purchase
          </p>
        </div>

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
            onClick={onExecute}
            className="bg-[#219756] cursor-pointer box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[16px] rounded-[6px] shrink-0 hover:bg-[#1d7f49] transition-colors"
          >
            <Check className="size-[20px] text-white" />
            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[14px] text-white">
              Execute Purchase
            </p>
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white relative rounded-[8px] shrink-0 w-full">
        <div className="flex flex-col justify-center size-full">
          <div className="box-border content-stretch flex flex-col gap-[16px] items-start justify-center p-[16px] w-full">
            {/* Partner Section */}
            <div className="content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] items-start justify-center leading-[normal] not-italic w-full">
              <p className="opacity-60 text-[#7d7d7d] text-[14px]">Partner</p>
              <p className="text-[#262d33] text-[24px]">{partnerName}</p>
            </div>

            {/* Input Fields Row */}
            <div className="content-stretch flex gap-[16px] items-start w-full mobile-col">
              {/* Vintage Name */}
              <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-w-px">
                <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic opacity-60 text-[#7d7d7d] text-[14px]">
                  Vintage Name
                </p>
                <input
                  type="text"
                  value={vintageName}
                  onChange={(e) => setVintageName(e.target.value)}
                  className="bg-[#f3f2f6] box-border w-full p-[8px] rounded-[4px] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                />
              </div>

              {/* Purchase Price */}
              <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-w-px">
                <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic opacity-60 text-[#7d7d7d] text-[14px]">
                  Purchase Price (% of Enrolled Debt)
                </p>
                <div className="content-stretch flex gap-[8px] items-center w-full">
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    className="bg-[#f3f2f6] box-border w-full p-[8px] rounded-[4px] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                  />
                  <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#7d7d7d] text-[14px] whitespace-nowrap">
                    {purchasePrice}% advance rate
                  </p>
                </div>
              </div>

              {/* Charge Back Reduction */}
              <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-w-px">
                <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic opacity-60 text-[#7d7d7d] text-[14px]">
                  Charge Back Reduction
                </p>
                <input
                  type="number"
                  value={chargeBackReduction}
                  onChange={(e) => setChargeBackReduction(e.target.value)}
                  className="bg-[#f3f2f6] box-border w-full p-[8px] rounded-[4px] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                />
              </div>

              {/* Effective Purchase Price */}
              <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-w-px">
                <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic opacity-60 text-[#7d7d7d] text-[14px]">
                  Effective Purchase Price
                </p>
                <div className="relative rounded-[4px] w-full border border-[#f3f2f6]">
                  <div className="box-border p-[8px]">
                    <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px]">
                      {effectivePurchasePrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="content-stretch flex gap-[24px] items-center w-full mobile-col">
              {/* Total Accounts */}
              <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] border border-[#e6e6e6]">
                <div className="box-border content-stretch flex gap-[8px] items-start px-[16px] py-[24px] w-full">
                  <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                    <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                      Total Accounts
                    </p>
                    <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                      <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px]">
                        {totalAccounts}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrolled Debt */}
              <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] border border-[#e6e6e6]">
                <div className="box-border content-stretch flex gap-[8px] items-start px-[16px] py-[24px] w-full">
                  <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                    <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                      ENROLLED DEBT
                    </p>
                    <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                      <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px]">
                        {formatCurrency(enrolledDebt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Price */}
              <div className="basis-0 bg-[rgba(33,151,86,0.1)] grow min-h-px min-w-px relative rounded-[8px] border border-[#e6e6e6]">
                <div className="box-border content-stretch flex gap-[8px] items-start px-[16px] py-[24px] w-full">
                  <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                    <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                      Purchase Price
                    </p>
                    <div className="box-border content-stretch flex gap-[8px] items-center leading-[normal] not-italic px-0 py-[6px] w-full">
                      <p className="font-['Poppins:Bold',sans-serif] text-[#333333] text-[24px]">
                        {formatCurrency(purchasePriceAmount)}
                      </p>
                      <p className="font-['Poppins:Regular',sans-serif] text-[#636363] text-[14px]">
                        {purchasePrice}% of enrolled
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
