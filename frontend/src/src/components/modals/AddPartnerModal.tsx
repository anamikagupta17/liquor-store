import { useState } from "react";
import { X, Plus, CheckCircle } from "lucide-react";
import { Partner } from "../../types";
import svgPaths from "../../../imports/svg-imv8ag37lj";
import { allowOnlyNumbers } from "../../utils/formatNumber";

export interface AddPartnerModalProps {
  /**
   * Whether modal is open
   */
  isOpen: boolean;
  /**
   * Close handler
   */
  onClose: () => void;
  /**
   * Submit handler
   */
  onSubmit: (partner: Omit<Partner, "id" | "createdAt">) => Promise<void>;
}

interface PerformanceGuarantee {
  id: string;
  periods: string;
  target: string;
  min: string;
  max: string;
}

/**
 * AddPartnerModal component - modal for adding new partners
 */
export function AddPartnerModal({
  isOpen,
  onClose,
  onSubmit
}: AddPartnerModalProps) {
  const [partnerName, setPartnerName] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [hurdle, setHurdle] = useState("");
  const [preHurdleSplit, setPreHurdleSplit] = useState("");
  const [postHurdleSplit, setPostHurdleSplit] = useState("");
  const [advanceRate, setAdvanceRate] = useState("");
  const [chargeBackPeriod, setChargeBackPeriod] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [performanceGuarantees, setPerformanceGuarantees] = useState<
    PerformanceGuarantee[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const chargeBackOptions = ["40 days", "80 days", "120 days"];

  const handleAddPerformanceGuarantee = () => {
    setPerformanceGuarantees([
      ...performanceGuarantees,
      { id: `pg-${Date.now()}`, periods: "", target: "", min: "", max: "" }
    ]);
  };

  const handleDeletePerformanceGuarantee = (id: string) => {
    setPerformanceGuarantees(
      performanceGuarantees.filter((pg) => pg.id !== id)
    );
  };

  const handlePerformanceGuaranteeChange = (
    id: string,
    field: "periods" | "target",
    value: string
  ) => {
    setPerformanceGuarantees(
      performanceGuarantees.map((pg) => {
        if (pg.id === id) {
          const updated = { ...pg, [field]: value };

          // Calculate Min and Max based on Target
          if (field === "target" && value) {
            const targetNum = parseFloat(value);
            if (!isNaN(targetNum)) {
              // Min = Target * 0.90 (90%)
              updated.min = (targetNum * 0.9).toFixed(2) + "%";
              // Max = Target * 0.95 (95%)
              updated.max = (targetNum * 0.95).toFixed(2) + "%";
            } else {
              updated.min = "";
              updated.max = "";
            }
          }

          return updated;
        }
        return pg;
      })
    );
  };

  const resetForm = () => {
    setPartnerName("");
    setPartnerCode("");
    setHurdle("");
    setPreHurdleSplit("");
    setPostHurdleSplit("");
    setAdvanceRate("");
    setChargeBackPeriod("");
    setPerformanceGuarantees([]);
    setShowSuccess(false);
  };

  const handleSubmit = async () => {
    if (
      !partnerName ||
      !partnerCode ||
      !hurdle ||
      !preHurdleSplit ||
      !postHurdleSplit ||
      !advanceRate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const newPartner = {
        partnerName: partnerName,
        partnerCode: partnerCode,
        termsHurdle: `${hurdle}%`,
        termsPreHurdlePercentage: `${preHurdleSplit}%`,
        termsPostHurdlePercentage: `${postHurdleSplit}%`,
        advancePercentage: `${advanceRate}%`,
        chargeBackPolicyPeriod: chargeBackPeriod,
        performanceGuranteeList: performanceGuarantees.map((pg) => ({
          periodMonths: pg.periods,
          targetPercantage: pg.target,
          minPercentage: pg.min,
          maxPercentage: pg.max
        }))
      };

      await onSubmit(newPartner);
      setShowSuccess(true);

      // Close modal after showing success
      setTimeout(() => {
        resetForm();
        onClose();
      }, 1500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-[8px] p-[48px] flex flex-col items-center gap-[24px] animate-in fade-in zoom-in">
          <CheckCircle className="size-[64px] text-green-500" />
          <div className="text-center">
            <h3 className="text-[20px] font-medium text-black mb-2">
              Partner Added Successfully!
            </h3>
            <p className="text-[15px] text-gray-600">
              {partnerName} has been added to your partners list.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isOpen ? null : (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-[#f3f2f6] relative rounded-[8px] w-full max-w-[640px] max-h-[90vh] overflow-y-auto">
            <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
              {/* Header */}
              <div className="content-stretch flex flex-row items-center justify-between relative shrink-0 w-full">
                <p className="leading-[normal] not-italic relative shrink-0 text-[17px] text-black text-nowrap whitespace-pre">
                  Add New Partner
                </p>
                <button
                  onClick={handleClose}
                  className="block cursor-pointer relative shrink-0 size-[24px] hover:opacity-70 transition-opacity"
                  disabled={isSubmitting}
                >
                  <X className="size-full text-[#33363F]" strokeWidth={2} />
                </button>
              </div>

              {/* Divider */}
              <div className="h-0 relative shrink-0 w-full">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 608 1"
                >
                  <line
                    opacity="0.2"
                    stroke="#7D7D7D"
                    x2="608"
                    y1="0.5"
                    y2="0.5"
                  />
                </svg>
              </div>

              {/* Form */}
              <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
                {/* Partner Name & Code */}
                <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    <div className="h-[48px] relative shrink-0 w-full">
                      <div className="absolute bg-[#f2f2f2] inset-0 rounded-[6px]">
                        <div className="absolute border-[0.5px] border-neutral-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                      </div>
                      <input
                        type="text"
                        placeholder="Partner Name"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        className="absolute inset-0 bg-transparent px-[16px] py-[8px] text-[15px] text-gray-700 placeholder:text-gray-400 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                      />
                    </div>
                  </div>

                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    <div className="h-[48px] relative shrink-0 w-full">
                      <div className="absolute bg-[#f2f2f2] inset-0 rounded-[6px]">
                        <div className="absolute border-[0.5px] border-neutral-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                      </div>
                      <input
                        type="text"
                        placeholder="Partner Code"
                        value={partnerCode}
                        onChange={(e) => setPartnerCode(e.target.value)}
                        className="absolute inset-0 bg-transparent px-[16px] py-[8px] text-[15px] text-gray-700 placeholder:text-gray-400 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                  <p className="leading-[normal] not-italic text-[14px] text-black">
                    Terms
                  </p>
                  <div className="gap-[24px] grid grid-cols-2 w-full">
                    <input
                      type="text"
                      placeholder="Hurdle"
                      value={hurdle}
                      onChange={(e) => setHurdle(e.target.value)}
                      className="h-[48px] bg-[#f2f2f2] border-[0.5px] border-neutral-200 px-[16px] py-[8px] text-[15px] text-gray-700 placeholder:text-gray-400 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                    />
                    <input
                      type="text"
                      placeholder="Pre-Hurdle Split %"
                      value={preHurdleSplit}
                      onChange={(e) => setPreHurdleSplit(e.target.value)}
                      onKeyDown={allowOnlyNumbers}
                      inputMode="numeric"
                      className="h-[48px] bg-[#f2f2f2] border-[0.5px] border-neutral-200 px-[16px] py-[8px] text-[15px] text-gray-700 placeholder:text-gray-400 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                    />
                    <input
                      type="text"
                      placeholder="Post-Hurdle Split %"
                      value={postHurdleSplit}
                      onChange={(e) => setPostHurdleSplit(e.target.value)}
                      onKeyDown={allowOnlyNumbers}
                      inputMode="numeric"
                      className="h-[48px] bg-[#f2f2f2] border-[0.5px] border-neutral-200 px-[16px] py-[8px] text-[15px] text-gray-700 placeholder:text-gray-400 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                    />
                    <input
                      type="text"
                      placeholder="Advance %"
                      value={advanceRate}
                      onChange={(e) => setAdvanceRate(e.target.value)}
                      onKeyDown={allowOnlyNumbers}
                      inputMode="numeric"
                      className="h-[48px] bg-[#f2f2f2] border-[0.5px] border-neutral-200 px-[16px] py-[8px] text-[15px] text-gray-700 placeholder:text-gray-400 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                    />
                  </div>
                </div>

                {/* Charge Back Policy */}
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                  <p className="leading-[normal] not-italic text-[14px] text-black">
                    Charge Back Policy
                  </p>
                  <div className="relative h-[48px] w-full">
                    <div className="absolute bg-[#f2f2f2] inset-0 rounded-[6px]">
                      <div className="absolute border-[0.5px] border-neutral-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="absolute cursor-pointer inset-0 bg-transparent px-[16px] py-[8px] text-[15px] text-left text-gray-700 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                    >
                      {chargeBackPeriod || "Charge Back Period"}
                    </button>
                    <div className="absolute right-[8px] size-[24px] top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="block size-full"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M18 9L12 15L6 9"
                          stroke="#33363F"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[6px] shadow-lg border border-gray-200 z-50">
                        {chargeBackOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setChargeBackPeriod(option);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full text-left px-[16px] py-[12px] text-[15px] hover:bg-gray-100 first:rounded-t-[6px] last:rounded-b-[6px]"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Performance Guarantee */}
                <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                    <p className="leading-[normal] not-italic text-[14px] text-black">
                      Performance Guarantee
                    </p>
                    <button
                      type="button"
                      onClick={handleAddPerformanceGuarantee}
                      className="bg-[#007aff] cursor-pointer box-border content-stretch flex gap-[4px] items-center justify-center px-[24px] py-[10px] relative rounded-[6px] shrink-0 hover:bg-[#0066d9] transition-colors"
                    >
                      <Plus
                        className="size-[20px] text-white"
                        strokeWidth={2}
                      />
                      <span className="font-bold text-[15px] text-white ">
                        Add
                      </span>
                    </button>
                  </div>

                  {/* Performance Guarantee Table */}
                  {performanceGuarantees.length > 0 && (
                    <div className="bg-white relative rounded-[4px] w-full">
                      <div className="box-border content-stretch flex gap-[16px] items-center p-[8px] relative w-full">
                        {/* Column 1: Periods (Months) */}
                        <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
                          <div className="box-border content-stretch flex gap-[8px] items-center justify-center p-[4px] relative shrink-0 w-full">
                            <p className="basis-0 leading-[normal] not-italic relative shrink-0 text-[#7d7d7d] text-[14px]">
                              Periods (Months)
                            </p>
                          </div>
                          {performanceGuarantees.map((pg) => (
                            <div
                              key={`periods-${pg.id}`}
                              className="bg-[#f3f2f6] relative rounded-[4px] shrink-0 w-full"
                            >
                              <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
                                <input
                                  type="text"
                                  placeholder=""
                                  value={pg.periods}
                                  onChange={(e) =>
                                    handlePerformanceGuaranteeChange(
                                      pg.id,
                                      "periods",
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={allowOnlyNumbers}
                                  className="w-full bg-transparent leading-[normal] not-italic text-[#262d33] text-[14px] outline-none"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Column 2: Target (%) */}
                        <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
                          <div className="relative shrink-0 w-full">
                            <div className="box-border content-stretch flex gap-[8px] items-center justify-center p-[4px] relative w-full">
                              <p className="basis-0 leading-[normal] not-italic relative shrink-0 text-[#7d7d7d] text-[14px]">
                                Target (%)
                              </p>
                            </div>
                          </div>
                          {performanceGuarantees.map((pg) => (
                            <div
                              key={`target-${pg.id}`}
                              className="bg-[#f3f2f6] relative rounded-[4px] shrink-0 w-full"
                            >
                              <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
                                <input
                                  type="text"
                                  placeholder=""
                                  value={pg.target}
                                  onChange={(e) =>
                                    handlePerformanceGuaranteeChange(
                                      pg.id,
                                      "target",
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={allowOnlyNumbers}
                                  className="w-full bg-transparent leading-[normal] not-italic text-[#262d33] text-[14px] outline-none"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Column 3: Min (90%) */}
                        <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
                          <div className="relative shrink-0 w-full">
                            <div className="box-border content-stretch flex gap-[8px] items-center justify-center p-[4px] relative w-full">
                              <p className="basis-0 leading-[normal] not-italic relative shrink-0 text-[#7d7d7d] text-[14px]">
                                Min (90%)
                              </p>
                            </div>
                          </div>
                          {performanceGuarantees.map((pg) => (
                            <div
                              key={`min-${pg.id}`}
                              className="relative rounded-[4px] shrink-0 w-full"
                            >
                              <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
                                <p className="leading-[normal] not-italic relative shrink-0 text-[#7d7d7d] text-[14px] text-nowrap whitespace-pre">
                                  {pg.min || "-"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Column 4: Max (95%) */}
                        <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
                          <div className="relative shrink-0 w-full">
                            <div className="box-border content-stretch flex gap-[8px] items-center justify-center p-[4px] relative w-full">
                              <p className="basis-0 leading-[normal] not-italic relative shrink-0 text-[#7d7d7d] text-[14px]">
                                Max (95%)
                              </p>
                            </div>
                          </div>
                          {performanceGuarantees.map((pg) => (
                            <div
                              key={`max-${pg.id}`}
                              className="relative rounded-[4px] shrink-0 w-full"
                            >
                              <div className="box-border content-stretch flex flex-col items-start p-[8px] relative w-full">
                                <p className="leading-[normal] not-italic relative shrink-0 text-[#7d7d7d] text-[14px] text-nowrap whitespace-pre">
                                  {pg.max || "-"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Column 5: Delete (no title) */}
                        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
                          <div className="box-border content-stretch flex gap-[8px] items-center justify-center p-[4px] relative shrink-0">
                            <p className="leading-[normal] not-italic opacity-0 relative shrink-0 text-[#7d7d7d] text-[14px] text-nowrap whitespace-pre">
                              0
                            </p>
                          </div>
                          {performanceGuarantees.map((pg) => (
                            <button
                              key={`delete-${pg.id}`}
                              type="button"
                              onClick={() =>
                                handleDeletePerformanceGuarantee(pg.id)
                              }
                              className="bg-[#f3f2f6] box-border content-stretch flex gap-[4px] items-center justify-center p-[8px] relative rounded-[6px] shrink-0 hover:bg-[#e5e4e8] transition-colors"
                            >
                              <div className="relative shrink-0 size-[20px]">
                                <svg
                                  className="block size-full"
                                  fill="none"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 20 20"
                                >
                                  <g>
                                    <path
                                      d={svgPaths.p24b5a270}
                                      stroke="#F35858"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d={svgPaths.p25b9f000}
                                      stroke="#F35858"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d={svgPaths.p39a1b780}
                                      stroke="#F35858"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d={svgPaths.p385aa40}
                                      stroke="#F35858"
                                      strokeLinecap="round"
                                    />
                                  </g>
                                </svg>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-0 relative shrink-0 w-full">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 608 1"
                  >
                    <line
                      opacity="0.2"
                      stroke="#7D7D7D"
                      x2="608"
                      y1="0.5"
                      y2="0.5"
                    />
                  </svg>
                </div>

                {/* Action Buttons */}
                <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="basis-0 bg-[#7d7d7d] cursor-pointer grow min-h-px min-w-px relative rounded-[6px] shrink-0 hover:bg-[#6d6d6d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex flex-col items-center justify-center px-[24px] py-[10px]">
                      <span className="font-bold text-[15px] text-white">
                        Cancel
                      </span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="basis-0 bg-[#007aff] cursor-pointer grow min-h-px min-w-px relative rounded-[6px] shrink-0 hover:bg-[#0066d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex flex-col items-center justify-center px-[24px] py-[10px]">
                      <span className="font-bold text-[15px] text-white">
                        {isSubmitting ? "Adding..." : "Add"}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
