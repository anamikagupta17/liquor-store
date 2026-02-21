import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Activity, Filter, X, ChevronRight } from "lucide-react";
import { partnersData } from "../data/partners";
import { PerformanceIdType } from "../types";
import { api } from "../lib/api";
import { formatNumber } from "../utils/formatNumber";
import svgPaths from "../../imports/svg-lh3rb6afa7";

export function Performance() {
  const { partnerId } = useParams<{ partnerId: string }>();
  const navigate = useNavigate();
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [performanceData, setPerformanceData] =
    useState<PerformanceIdType | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  /* performance by id */

  useEffect(() => {
    async function fetchPeromanceById() {
      if (!partnerId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await api.getPartnerPerformanceId(partnerId);
        setPerformanceData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPeromanceById();
  }, [partnerId]);

  /* total performace   */

  useEffect(() => {
    async function fetchPeromance() {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getPerformance();
        setPerformanceData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (!partnerId) {
      fetchPeromance();
    }
  }, [location.pathname]);

  const handlePartnerSelect = (partnerId: string) => {
    setSelectedPartner(partnerId);
    setShowFilterDialog(false);
    // In a real app, this would filter the data
  };

  const handleClearFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPartner(null);
  };

  const handlePartnerCardClick = (partnerId: string) => {
    navigate(`/performance/${partnerId}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showFilterDialog &&
        dropdownRef.current &&
        filterButtonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setShowFilterDialog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilterDialog]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!performanceData) return <div>No Data found</div>;

  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start w-full max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="content-stretch flex gap-[24px] items-start w-full">
        <div className="basis-0 box-border content-stretch flex gap-[8px] grow h-[42px] items-center min-h-px min-w-px px-0 py-[8px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 32 32"
            style={{ width: "24px", height: "auto" }}
          >
            <g>
              <path d={svgPaths.p20865a80} fill="var(--fill-0, #222222)" />
              <path d={svgPaths.p1ab46600} fill="var(--fill-0, #222222)" />
            </g>
          </svg>
          <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[17px]">
            Performance
          </p>
        </div>
      </div>

      {/* Portfolio Metrics Section */}
      <div className="bg-white relative rounded-[8px] shrink-0 w-full">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
            {/* Header */}
            <div className="content-stretch flex gap-[4px] items-center justify-center w-full">
              <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start leading-[normal] min-h-px min-w-px not-italic">
                <p className="text-[#262d33] text-[17px] w-full">
                  Portfolio Metrics
                </p>
                <p className="text-[#7d7d7d] text-[14px] w-full">
                  Aggregate performance across all partner & vintages
                </p>
              </div>
              {/* <button
                ref={filterButtonRef}
                onClick={() => setShowFilterDialog(true)}
                className="bg-[#6e55fb] hover:bg-[#5a45e5] box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[8px] rounded-[8px] shrink-0 cursor-pointer border-none"
              >
          
                <div className="relative shrink-0 size-[24px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <path d="M12 7L20 7" stroke="white" strokeLinecap="round" strokeWidth="2" />
                    <path d="M4 7L8 7" stroke="white" strokeLinecap="round" strokeWidth="2" />
                    <path d="M17 17L20 17" stroke="white" strokeLinecap="round" strokeWidth="2" />
                    <path d="M4 17L12 17" stroke="white" strokeLinecap="round" strokeWidth="2" />
                    <circle cx="10" cy="7" r="2" stroke="white" strokeLinecap="round" strokeWidth="2" transform="rotate(90 10 7)" />
                    <circle cx="15" cy="17" r="2" stroke="white" strokeLinecap="round" strokeWidth="2" transform="rotate(90 15 17)" />
                  </svg>
                </div>
                
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-[#f3f2f6] text-[16px] text-nowrap whitespace-pre">
                  {selectedPartnerData ? selectedPartnerData.name : 'Filter'}
                </span>
                
               
                {selectedPartnerData && (
                  <div
                    onClick={handleClearFilter}
                    className="relative shrink-0 size-[24px] hover:opacity-80 transition-opacity cursor-pointer"
                    role="button"
                    aria-label="Clear filter"
                  >
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <path d="M18 6L6 18" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      <path d="M6 6L18 18" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                )}
              </button> */}
            </div>

            {/* Metrics Grid */}
            <div className="gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(3,_minmax(0px,_1fr))] min-h-[389px] w-full">
              <div className="bg-white relative rounded-[8px] self-start size-full">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                />
                <div className="size-full flex items-center">
                  <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        TOTAL CAPITAL DEPLOYED
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold text-nowrap whitespace-pre">
                          ${formatNumber(performanceData?.totalCapitalDeployed)}
                        </p>
                      </div>
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[12px] w-full">
                        {performanceData?.totalVintage} vintages
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white relative rounded-[8px] self-start size-full">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                />
                <div className="size-full flex items-center">
                  <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        TOTAL CASH COLLECTED
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold text-nowrap whitespace-pre">
                          ${formatNumber(performanceData?.totalCashCollected)}
                        </p>
                      </div>
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[12px] w-full">
                        {performanceData?.flobaseShare}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white relative rounded-[8px] self-start size-full">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                />
                <div className="size-full flex items-center">
                  <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        TOTAL ENROLLED DEBT
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold text-nowrap whitespace-pre">
                          ${formatNumber(performanceData?.totalEnrolledDebt)}
                        </p>
                      </div>
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[12px] w-full">
                        {performanceData?.totalAccounts} accounts
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white relative rounded-[8px] self-start size-full">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                />
                <div className="size-full flex items-center">
                  <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        TOTAL ACTIVE DEBT
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold text-nowrap whitespace-pre">
                          ${formatNumber(performanceData?.totalActiveDebt)}
                        </p>
                      </div>
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[12px] w-full">
                        Enrolled - Cancelled - Settled
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[rgba(255,158,22,0.1)] relative rounded-[8px] self-start size-full">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                />
                <div className="size-full flex items-center">
                  <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        TOTAL CANCELLED DEBT
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold text-nowrap whitespace-pre">
                          ${formatNumber(performanceData?.totalCancelledDebt)}
                        </p>
                      </div>
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[12px] w-full">
                        {performanceData?.cancelledPercent}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white relative rounded-[8px] self-start size-full">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                />
                <div className="size-full flex items-center">
                  <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        AVG. ADVANCE RATE
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold text-nowrap whitespace-pre">
                          {performanceData?.avgAdvanceRate}
                        </p>
                      </div>
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[12px] w-full">
                        {performanceData?.weightedAverage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white relative rounded-[8px] shrink-0 w-full">
        <div className="overflow-x-clip overflow-y-auto size-full">
          <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] w-full">
            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[17px] text-black w-full">
              Performance by DSC
            </p>

            <div className="content-stretch grid grid-cols-1 md:grid-cols-2 gap-[16px] items-start w-full ">
              {performanceData?.dscPerformanceResponseDtos?.map(
                (partner, index) => (
                  <div
                    key={`${partner?.partnerId}-${index}`}
                    onClick={() => handlePartnerCardClick(partner?.partnerId)}
                    className="group basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                    />
                    <div className="flex flex-col justify-center size-full">
                      <div className="box-border content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] w-full">
                        <div className="content-stretch flex items-start w-full">
                          <div className="content-stretch flex gap-[8px] items-center justify-between w-full">
                            <p className="font-['Poppins', sans-serif] leading-[normal] not-italic text-[#333333] text-[17px] font-bold text-nowrap whitespace-pre">
                              {partner?.partnerName}
                            </p>
                            <div className="relative shrink-0 size-[24px] opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRight
                                className="size-full text-[#333333]"
                                strokeWidth={1.5}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="content-stretch flex items-start w-full">
                          <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic text-nowrap whitespace-pre">
                            <p className="opacity-60 text-[#636363] text-[14px]">
                              Vintages
                            </p>
                            <p className="text-[#333333] text-[17px]">
                              {partner.totalVintages}
                            </p>
                          </div>

                          <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic text-nowrap whitespace-pre">
                            <p className="opacity-60 text-[#636363] text-[14px]">
                              Capital Deployed
                            </p>
                            <p className="text-[#333333] text-[17px]">
                              {partner.capitalDeployed}
                            </p>
                          </div>

                          <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic text-nowrap whitespace-pre">
                            <p className="opacity-60 text-[#636363] text-[14px]">
                              Active Debt
                            </p>
                            <p className="text-[#333333] text-[17px]">
                              {partner.activeDebt}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {showFilterDialog && (
        <div
          ref={dropdownRef}
          className="fixed z-50 bg-white rounded-[8px] shadow-lg border border-[#e6e6e6] max-w-[400px] w-full"
          style={{
            top: filterButtonRef.current
              ? `${filterButtonRef.current.getBoundingClientRect().bottom + 8}px`
              : "0px",
            left: filterButtonRef.current
              ? `${filterButtonRef.current.getBoundingClientRect().right - 400}px`
              : "0px",
          }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Poppins:Medium',sans-serif] text-[#262d33] text-[20px]">
                Filter by Partner
              </h2>
              <button
                onClick={() => setShowFilterDialog(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="size-[24px] text-[#636363]" />
              </button>
            </div>
            <div className="flex flex-col gap-2 py-4 max-h-[400px] overflow-y-auto">
              <button
                onClick={() => handlePartnerSelect("")}
                className={`text-left p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                  selectedPartner === null ? "bg-gray-100" : ""
                }`}
              >
                <p className="font-['Poppins:Medium',sans-serif] text-[#333333]">
                  All Partners
                </p>
              </button>
              {partnersData.map((partner) => (
                <button
                  key={partner.id}
                  onClick={() => handlePartnerSelect(partner.id)}
                  className={`text-left p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                    selectedPartner === partner.id ? "bg-gray-100" : ""
                  }`}
                >
                  <p className="font-['Poppins:Medium',sans-serif] text-[#333333]">
                    {partner.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
