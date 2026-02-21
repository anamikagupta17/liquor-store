import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Upload, Undo2 } from "lucide-react";
import { performanceMonitorDataType, PartnerIdType } from "../types";
import { api } from "../lib/api";
import { toTitleCase, capitalizeWords } from "../utils/stringUtils";
import { formatNumber } from "../utils/formatNumber";
// Mock vintage data for partner
// const vintagesData = [
//   {
//     id: '1',
//     name: 'CLG-NOV-2025',
//     deployed: '$1,541,451',
//     collected: '$752,454',
//   },
//   {
//     id: '2',
//     name: 'CLG-NOV-2025',
//     deployed: '$1,541,451',
//     collected: '$752,454',
//   },
//   {
//     id: '3',
//     name: 'CLG-NOV-2025',
//     deployed: '$1,541,451',
//     collected: '$752,454',
//     moic: '0.90x',
//     hasGuarantee: true,
//   },
// ];

/**
 * PartnerPerformance - Detailed performance page for a specific partner
 */
export function PartnerPerformance() {
  const { partnerId } = useParams<{ partnerId: string }>();
  const navigate = useNavigate();
  const [partner, setPartner] = useState<PartnerIdType | null>(null);
  const [performanceMonitorData, setPerformanceMonitorData] =
    useState<performanceMonitorDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPerformanceMonitor() {
      if (!partnerId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await api.getPerformanceMonitorId(partnerId);
        const data2 = await api.getPartnerById(partnerId);
        setPerformanceMonitorData(data);
        setPartner(data2);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPerformanceMonitor();
  }, [partnerId]);

  // If partner not found, redirect to performance
  // if (!partner) {
  //   navigate('/performance');
  //   return null;
  // }

  const handleExport = async () => {
    try {
      const data = await api.downloadPerformanceCSV();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleBackToPerformance = () => {
    navigate("/performance");
  };

  const handleVintageClick = (vintageId: string) => {
    navigate(`/performance/${partnerId}/vintage/${vintageId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!performanceMonitorData) return <div>No Data found</div>;

  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start w-full max-w-[1400px] mx-auto">
      {/* Breadcrumbs */}
      <div className="content-stretch flex gap-[24px] items-center justify-end w-full">
        <div className="basis-0 box-border content-stretch flex gap-[8px] grow items-center min-h-px min-w-px px-0 py-[8px]">
          <button
            onClick={handleBackToPerformance}
            className="relative shrink-0 size-[24px] cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Go back to Performance"
          >
            <Undo2 className="size-[24px] text-[#33363F]" strokeWidth={2} />
          </button>
          <button
            onClick={handleBackToPerformance}
            className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic opacity-50 text-[#7d7d7d] text-[17px] hover:opacity-70 transition-opacity cursor-pointer"
          >
            Performance Monitoring
          </button>
          <ChevronRight
            className="size-[24px] text-[#33363F]"
            strokeWidth={2}
          />
          <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[17px]">
            {capitalizeWords(partner?.partnerName)}
          </p>
        </div>
      </div>

      {/* Partner Metrics Section */}
      <div className="bg-white relative rounded-[8px] shrink-0 w-full">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] w-full">
            {/* Header */}
            <div className="content-stretch flex items-center justify-between w-full">
              <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[18px] text-nowrap whitespace-pre">
                {toTitleCase(partner?.partnerName)}
              </p>
              <button
                onClick={handleExport}
                className="bg-[#6e55fb] hover:bg-[#5a45e5] box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[8px] rounded-[8px] shrink-0 cursor-pointer border-none"
              >
                <Upload className="size-[24px] text-white" />
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-[#f3f2f6] text-[16px] text-nowrap whitespace-pre">
                  Export Data
                </span>
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] w-full">
              {/* MOIC */}
              <div className="bg-[rgba(255,158,22,0.1)] relative rounded-[8px] self-start">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                />
                <div className="size-full">
                  <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        MOIC
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold text-nowrap whitespace-pre">
                          {performanceMonitorData?.moic}
                        </p>
                      </div>
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[12px] w-full">
                        Multiple on capital
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Capital Deployed */}
              <div className="bg-white relative rounded-[8px] self-start">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                />
                <div className="size-full">
                  <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        CAPITAL DEPLOYED
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold text-nowrap whitespace-pre">
                          $
                          {formatNumber(
                            performanceMonitorData?.totalCapitalDeployed
                          )}
                        </p>
                      </div>
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[12px] w-full">
                        {performanceMonitorData?.totalVintage} vintages
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Debt */}
              <div className="bg-white relative rounded-[8px] self-start">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                />
                <div className="size-full">
                  <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        ACTIVE DEBT
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold text-nowrap whitespace-pre">
                          $
                          {formatNumber(
                            performanceMonitorData?.totalActiveDebt
                          )}
                        </p>
                      </div>
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[12px] w-full">
                        Enrolled - Cancelled - Settled
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cash Collected */}
              <div className="bg-white relative rounded-[8px] self-start">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                />
                <div className="size-full">
                  <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        CASH COLLECTED
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold text-nowrap whitespace-pre">
                          $
                          {formatNumber(
                            performanceMonitorData?.totalCashCollected
                          )}
                        </p>
                      </div>
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[12px] w-full">
                        Flobase share (EPF)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vintages Section */}
      <div className=" bg-white relative rounded-[8px] shrink-0 w-full">
        <div className="overflow-x-clip overflow-y-auto size-full">
          <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] w-full">
            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[17px] text-black w-full">
              Vintages
            </p>

            <div className="content-stretch flex flex-col gap-[16px] items-start w-full">
              {performanceMonitorData?.vintageMonitorResponseDtos?.map(
                (vintage) => (
                  <div
                    key={vintage.id}
                    onClick={() => handleVintageClick(vintage.id)}
                    className="bg-white relative rounded-[8px] shrink-0 w-full cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                    />
                    <div className="group flex flex-col justify-center size-full">
                      <div className="box-border content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] w-full">
                        {/* Header */}
                        <div className="content-stretch flex items-start w-full">
                          <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px">
                            <p className="basis-0 font-['Poppins:Medium',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#333333] text-[17px]">
                              {capitalizeWords(vintage.vintageName)}
                            </p>

                            <div className="relative shrink-0 size-[24px] opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRight
                                className="size-full text-[#333333]"
                                strokeWidth={1.5}
                              />
                            </div>
                            {vintage.moic && (
                              <div className="bg-[rgba(255,158,22,0.1)] box-border content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[2px] rounded-[30px] shrink-0">
                                <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#ff9e16] text-[17px] text-nowrap whitespace-pre">
                                  {vintage.moic} MOIC
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Guarantee Triggered (if applicable) */}
                        {vintage.guranteeTriggered && (
                          <div className="bg-[rgba(243,88,88,0.1)] relative rounded-[8px] shrink-0 w-full">
                            <div className="overflow-clip rounded-[inherit] size-full">
                              <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] w-full">
                                <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#f35858] text-[17px] w-full">
                                  Guarantee Triggered
                                </p>
                                {vintage?.guranteeTriggered?.map((grt) => (
                                  <div className="content-stretch flex gap-[16px] items-start w-full">
                                    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[4px]">
                                      <div className="flex flex-col items-center justify-center size-full">
                                        <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-center p-[4px] w-full">
                                          <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#f35858] text-[17px] text-nowrap whitespace-pre">
                                            {grt.negativeSplit}% Split
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[4px]">
                                      <div className="flex flex-col items-center justify-center size-full">
                                        <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-center p-[4px] w-full">
                                          <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#219756] text-[17px] text-nowrap whitespace-pre">
                                            {grt.positiveSplit}% Split
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Deployed & Collected */}
                        <div className="content-stretch flex items-start w-full">
                          {/* Deployed */}
                          <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic text-nowrap whitespace-pre">
                            <p className="opacity-60 text-[#636363] text-[14px]">
                              Deployed
                            </p>
                            <p className="text-[#333333] text-[17px]">
                              {vintage.totalCapitalDeployed}
                            </p>
                          </div>

                          {/* Collected */}
                          <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic text-nowrap whitespace-pre">
                            <p className="opacity-60 text-[#636363] text-[14px]">
                              Collected
                            </p>
                            <p className="text-[#219756] text-[17px]">
                              {vintage.totalCashCollected}
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
    </div>
  );
}
