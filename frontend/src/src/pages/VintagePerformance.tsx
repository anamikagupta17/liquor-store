import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Download, Undo2 } from "lucide-react";
import { partnersData } from "../data/partners";
import svgPaths from "../../imports/svg-dj6lnolbza";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { PerformanceVintageType } from "../types";
import { api } from "../lib/api";
import { capitalizeWords } from "../utils/stringUtils";
import { formatNumber } from "../utils/formatNumber";
import { downloadDOMImage } from "../utils/downloadImage";

// Mock vintage data
const vintageData = {
  baseSplit: 75, // Triggered (< 90%)
  currentAge: "0 months",
  cumulativeCash: "0.0%",
  cumulativeCashAmount: "$0",
  displayTarget: "21.1% / 15.1% / 14.3%",
  deltaVsTarget: "-2.4%",
  activePhase: "Pre-Hurdle",
  phaseDetail: "Need $210,452 to cross",
  currentSplit: "75% Flobase",
};

const splitAdjustmentHistory = [
  {
    id: "1",
    date: "11-7-2025",
    phase: "Pre-Hurdle",
    adjustment: "+5%",
    newSplit: "80%",
    reason: "Performance Guarantee Triggered - adjustment increased",
  },
];

export function VintagePerformance() {
  const { partnerId, vintageId } = useParams<{
    partnerId: string;
    vintageId: string;
  }>();
  const navigate = useNavigate();
  const [performanceData, setPerformanceData] =
    useState<PerformanceVintageType | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const partner = partnersData.find((p) => p.id === partnerId);

  const data = [
    { month: "M1", value: 10 },
    { month: "M3", value: 30 },
    { month: "M6", value: 25 },
    { month: "M8", value: 50 },
    { month: "M12", value: 80 },
  ];

  useEffect(() => {
    async function fetchVintagePeromance() {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getVintagePerformance(partnerId, vintageId);
        setPerformanceData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (partnerId && vintageId) {
      fetchVintagePeromance();
    }
  }, [location.pathname]);

  const isGuaranteeTriggered = vintageData.baseSplit < 90;

  const handleBackToPerformance = () => {
    navigate("/performance");
  };

  const handleBackToPartner = () => {
    navigate(`/performance/${partnerId}`);
  };

  const handleExportCharts = async () => {
  
    downloadDOMImage("cash_collections_chart", "Cash_Collections_Chart");
    setTimeout(() => {
      downloadDOMImage("settlements_chart", "Settlements_Chart");
      downloadDOMImage("cancellations_chart", "Cancellations_Chart");
    }, 10);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!performanceData) return <div>No Data found</div>;

  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start w-full max-w-[1400px] mx-auto">
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
          <button
            onClick={handleBackToPartner}
            className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic opacity-50 text-[#7d7d7d] text-[17px] hover:opacity-70 transition-opacity cursor-pointer"
          >
            {capitalizeWords(performanceData?.partnerName)}
          </button>
          <ChevronRight
            className="size-[24px] text-[#33363F]"
            strokeWidth={2}
          />
          <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[17px]">
            {capitalizeWords(performanceData?.vintageName)}
          </p>
        </div>
      </div>

      <div className="bg-white relative rounded-[8px] shrink-0 w-full">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] w-full">
            <div className="w-full">
              <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[18px]">
                {capitalizeWords(performanceData?.vintageName)}
              </p>
              <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px]">
                {capitalizeWords(performanceData?.partnerName)} | Purchased{" "}
                {performanceData?.date}
              </p>
            </div>

            <div className="gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] w-full">
              <div className="bg-white relative rounded-[8px] self-start">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                />
                <div className="size-full">
                  <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        PURCHASE PRICE
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold text-nowrap whitespace-pre">
                          ${formatNumber(performanceData?.purchasePrice)}
                        </p>
                      </div>
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[12px] w-full">
                        {performanceData?.advancePercentage}% advance
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white relative rounded-[8px] self-start">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                />
                <div className="size-full">
                  <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        ENROLLED DEBT
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold text-nowrap whitespace-pre">
                          ${formatNumber(performanceData?.enrolledDebt)}
                        </p>
                      </div>
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[12px] w-full">
                        {performanceData?.totalAccounts} accounts
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[rgba(255,241,209,1)] relative rounded-[8px] self-start">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                />
                <div className="size-full">
                  <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        PRE-HURDLE
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold text-nowrap whitespace-pre">
                          {performanceData?.preHurdleCurrentSplitPercentage}%
                        </p>
                      </div>
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[12px] w-full">
                        ${formatNumber(performanceData?.preHurdle)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white relative rounded-[8px] self-start">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]"
                />
                <div className="size-full">
                  <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        CURRENT SPLIT
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold text-nowrap whitespace-pre">
                          {performanceData?.currentSplit}% Flobase
                        </p>
                      </div>
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[12px] w-full">
                        Pre-Hurdle ( {performanceData?.preHurdlePercentage})
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Guarantee Status */}
      <div
        className={`bg-white relative rounded-[8px] shrink-0 w-full ${isGuaranteeTriggered ? "border border-[#f35858]" : ""}`}
      >
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] w-full">
            <div className="content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] items-start leading-[normal] not-italic w-full">
              <p className="text-[#262d33] text-[18px]">
                Performance Guarantee Status
              </p>
              {isGuaranteeTriggered ? (
                <p className="text-[#f35858] text-[14px]">
                  Below 90% threshold - Split adjustment triggered
                </p>
              ) : (
                <p className="text-[#636363] text-[14px]">
                  Before first measurement period
                </p>
              )}
            </div>

            {isGuaranteeTriggered ? (
              /* Triggered State - Below 90% */
              <>
                <div className="content-stretch flex gap-[16px] items-start w-full">
                  <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic">
                    <p className="text-[#7d7d7d] text-[14px]">Current Age</p>
                    <p className="text-[#262d33] text-[17px]">
                      {vintageData.currentAge}
                    </p>
                  </div>
                  <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center min-h-px min-w-px not-italic">
                    <p className="leading-[normal] text-[#7d7d7d] text-[14px]">
                      Cumulative Cash
                    </p>
                    <p className="leading-[normal] text-[#262d33] text-[17px]">
                      <span>{vintageData.cumulativeCash} </span>
                      <span className="text-[#7d7d7d]">
                        {vintageData.cumulativeCashAmount}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="content-stretch flex gap-[16px] items-start w-full">
                  <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic">
                    <p className="text-[#7d7d7d] text-[14px]">
                      Target / Min /Reset
                    </p>
                    <p className="text-[#262d33] text-[17px]">
                      {vintageData.displayTarget}
                    </p>
                  </div>
                  <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic">
                    <p className="text-[#7d7d7d] text-[14px]">
                      Delta vs Target
                    </p>
                    <p className="text-[#f35858] text-[17px]">
                      {vintageData.deltaVsTarget}
                    </p>
                  </div>
                </div>

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
                        strokeDasharray="2 2"
                        x2="1474"
                        y1="0.5"
                        y2="0.5"
                      />
                    </svg>
                  </div>
                </div>

                <div className="content-stretch flex gap-[16px] items-start w-full">
                  <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px">
                    <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#7d7d7d] text-[14px]">
                      Active Phase
                    </p>
                    <div className="content-stretch flex font-['Poppins:Regular',sans-serif] gap-[4px] items-start leading-[normal] not-italic text-[17px]">
                      <p className="text-[#1384ed]">
                        {vintageData.activePhase}
                      </p>
                      <p className="text-[#7d7d7d]">
                        {vintageData.phaseDetail}
                      </p>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic">
                    <p className="text-[#7d7d7d] text-[14px]">Base Split</p>
                    <p className="text-[#262d33] text-[17px]">
                      {vintageData.baseSplit}% Flobase
                    </p>
                  </div>
                  <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic">
                    <p className="text-[#7d7d7d] text-[14px]">Current Split</p>
                    <p className="text-[#262d33] text-[17px]">
                      {vintageData.currentSplit}
                    </p>
                  </div>
                </div>

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
                        strokeDasharray="2 2"
                        x2="1474"
                        y1="0.5"
                        y2="0.5"
                      />
                    </svg>
                  </div>
                </div>

                <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
                  <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[17px] w-full">
                    Adjust Split (Current Phase:{" "}
                    {vintageData.activePhase.toLowerCase()})
                  </p>
                  <div className="content-stretch flex gap-[16px] items-start w-full">
                    <button className="bg-[rgba(243,88,88,0.1)] content-stretch flex flex-col items-center justify-center px-[24px] py-[12px] rounded-[4px] hover:bg-[rgba(243,88,88,0.15)] transition-colors cursor-pointer">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#f35858] text-[17px]">
                        -5% Split (Penalty)
                      </p>
                    </button>
                    <button className="bg-[rgba(33,151,86,0.1)] content-stretch flex flex-col items-center justify-center px-[24px] py-[12px] rounded-[4px] hover:bg-[rgba(33,151,86,0.15)] transition-colors cursor-pointer">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#219756] text-[17px]">
                        +5% Split (Increase)
                      </p>
                    </button>
                    <button className="bg-[#e6e6e6] content-stretch flex flex-col items-center justify-center px-[24px] py-[12px] rounded-[4px] hover:bg-[#d6d6d6] transition-colors cursor-pointer">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[17px]">
                        Reset to Base
                      </p>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Normal State - Above or equal to 90% */
              <div className="w-full bg-gray-100 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-['Poppins:Regular',sans-serif] text-[#636363] text-[14px]">
                      Current Age
                    </p>
                    <p className="font-['Poppins:Bold',sans-serif] text-[#333333] text-[20px]">
                      {
                        performanceData?.performanceGuranteeStatusResponseDto
                          ?.currentAge
                      }{" "}
                      months
                    </p>
                  </div>
                  <div>
                    <p className="font-['Poppins:Regular',sans-serif] text-[#636363] text-[14px]">
                      Cumulative Cash
                    </p>
                    <p className="font-['Poppins:Bold',sans-serif] text-[#333333] text-[20px]">
                      0.0% $
                      {
                        performanceData?.performanceGuranteeStatusResponseDto
                          ?.cumulativeCash
                      }
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <p className="font-['Poppins:Regular',sans-serif] text-[#636363] text-[14px] mb-1">
                      Active Phase
                    </p>
                    <p className="font-['Poppins:Regular',sans-serif] text-[#6e55fb] text-[16px]">
                      Pre-Hurdle Need $
                      {formatNumber(
                        performanceData?.performanceGuranteeStatusResponseDto
                          ?.activePhase
                      )}{" "}
                      to cross
                    </p>
                  </div>
                  <div>
                    <p className="font-['Poppins:Regular',sans-serif] text-[#636363] text-[14px] mb-1">
                      Base Split
                    </p>
                    <p className="font-['Poppins:Regular',sans-serif] text-[#333333] text-[16px]">
                      {
                        performanceData?.performanceGuranteeStatusResponseDto
                          ?.baseSplit
                      }
                      % Flobase
                    </p>
                  </div>
                  <div>
                    <p className="font-['Poppins:Regular',sans-serif] text-[#636363] text-[14px] mb-1">
                      Current Split
                    </p>
                    <p className="font-['Poppins:Regular',sans-serif] text-[#333333] text-[16px]">
                      {
                        performanceData?.performanceGuranteeStatusResponseDto
                          ?.currentSplit
                      }
                      % Flobase
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Split Adjustment History - Only shown when guarantee is triggered */}
      {isGuaranteeTriggered && (
        <div className="bg-white relative rounded-[8px] shrink-0 w-full">
          <div className="overflow-x-clip overflow-y-auto size-full">
            <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] w-full">
              <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[17px] w-full">
                Split Adjustment History
              </p>

              <div className="content-stretch flex items-start w-full overflow-x-auto">
                <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px">
                  <div className="bg-[#f3f2f6] relative w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[8px] w-full">
                        <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[14px]">
                          Date
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start w-full">
                    {splitAdjustmentHistory.map((record) => (
                      <div key={record.id} className="relative w-full">
                        <div
                          aria-hidden="true"
                          className="absolute border-[#f3f2f6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none"
                        />
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="content-stretch flex items-center justify-center px-[8px] py-[16px] w-full">
                            <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[17px]">
                              {record.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="content-stretch flex flex-col items-start w-[271px]">
                  <div className="bg-[#f3f2f6] relative w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[8px] w-full">
                        <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[14px]">
                          Phase
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start w-full">
                    {splitAdjustmentHistory.map((record) => (
                      <div key={record.id} className="relative w-full">
                        <div
                          aria-hidden="true"
                          className="absolute border-[#f3f2f6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none"
                        />
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="content-stretch flex items-center justify-center px-[8px] py-[16px] w-full">
                            <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[17px]">
                              {record.phase}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px">
                  <div className="bg-[#f3f2f6] relative w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[8px] w-full">
                        <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[14px]">
                          Adjustment
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start w-full">
                    {splitAdjustmentHistory.map((record) => (
                      <div key={record.id} className="relative w-full">
                        <div
                          aria-hidden="true"
                          className="absolute border-[#f3f2f6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none"
                        />
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="content-stretch flex items-center justify-center px-[8px] py-[16px] w-full">
                            <p
                              className={`basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[17px] ${
                                record.adjustment.startsWith("+")
                                  ? "text-[#219756]"
                                  : "text-[#f35858]"
                              }`}
                            >
                              {record.adjustment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px">
                  <div className="bg-[#f3f2f6] relative w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[8px] w-full">
                        <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[14px]">
                          New Split
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start w-full">
                    {splitAdjustmentHistory.map((record) => (
                      <div key={record.id} className="relative w-full">
                        <div
                          aria-hidden="true"
                          className="absolute border-[#f3f2f6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none"
                        />
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="content-stretch flex items-center justify-center px-[8px] py-[16px] w-full">
                            <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[17px]">
                              {record.newSplit}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="content-stretch flex flex-col items-start w-[531px]">
                  <div className="bg-[#f3f2f6] relative w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[8px] w-full">
                        <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[14px]">
                          Reason
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start w-full">
                    {splitAdjustmentHistory.map((record) => (
                      <div key={record.id} className="relative w-full">
                        <div
                          aria-hidden="true"
                          className="absolute border-[#f3f2f6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none"
                        />
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="content-stretch flex items-center justify-center px-[8px] py-[16px] w-full">
                            <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#7d7d7d] text-[17px]">
                              {record.reason}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white relative rounded-[8px] shrink-0 w-full">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] w-full">
            <div className="content-stretch flex items-start justify-between w-full">
              <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[17px] text-nowrap whitespace-pre">
                Performance Curves
              </p>
              <div className="bg-[#f3f2f6] box-border content-stretch flex gap-[8px] h-[42px] items-center px-[16px] py-[8px] rounded-[8px] shrink-0 cursor-pointer hover:bg-[#e8e7f0] transition-colors">
                <div className="relative shrink-0 size-[24px]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 24 24"
                  >
                    <path d={svgPaths.p13da3600} fill="#262D33" />
                    <path
                      d={svgPaths.p1aa5b200}
                      stroke="#262D33"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <button onClick={handleExportCharts} className="cursor-pointer">
                  Export Charts
                </button>
              </div>
            </div>

            <div
              id="cash_collections_chart"
              style={{ backgroundColor: "white" }}
              className="bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip rounded-[8px] shrink-0 w-full"
            >
              <div className="content-stretch flex font-['Poppins:Regular',sans-serif] gap-[16px] items-center justify-center not-italic text-[#262d33] text-[16px] w-full">
                <p className="basis-0 grow leading-[normal] min-h-px min-w-px">
                  Cash Collections (% of Purchase Price)
                </p>
                <p className="basis-0 grow leading-[normal] min-h-px min-w-px text-right">
                  <span>Latest : </span>
                  <span className="text-[#1384ed]">80%</span>
                </p>
              </div>

              {/* chart by anamika */}

              <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                  <LineChart data={performanceData?.performanceCurveList}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="monthNumber" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#1384ED"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="relative h-[1px] w-full">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1474 1"
              >
                <line
                  opacity="0.2"
                  stroke="#7D7D7D"
                  strokeDasharray="2 2"
                  x2="1474"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>

            <div
              id="settlements_chart"
              className="bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip rounded-[8px] shrink-0 w-full"
            >
              <div className="content-stretch flex font-['Poppins:Regular',sans-serif] gap-[16px] items-center justify-center not-italic text-[#262d33] text-[16px] w-full">
                <p className="basis-0 grow leading-[normal] min-h-px min-w-px">
                  Settlements (% of Enrolled Debt)
                </p>
                <p className="basis-0 grow leading-[normal] min-h-px min-w-px text-right">
                  <span>Latest : </span>
                  <span className="text-[#219756]">62%</span>
                </p>
              </div>

              <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                  <LineChart data={performanceData?.settlementList}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="monthNumber" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#219756"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="relative h-[1px] w-full">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1474 1"
              >
                <line
                  opacity="0.2"
                  stroke="#7D7D7D"
                  strokeDasharray="2 2"
                  x2="1474"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>

            <div
              id="cancellations_chart"
              className="bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip rounded-[8px] shrink-0 w-full"
            >
              <div className="content-stretch flex font-['Poppins:Regular',sans-serif] gap-[16px] items-center justify-center not-italic text-[#262d33] text-[16px] w-full">
                <p className="basis-0 grow leading-[normal] min-h-px min-w-px">
                  Cancellations (% of Enrolled Debt)
                </p>
                <p className="basis-0 grow leading-[normal] min-h-px min-w-px text-right">
                  <span>Latest : </span>
                  <span className="text-[#f35858]">20%</span>
                </p>
              </div>

              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={performanceData?.cancellationList}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="monthNumber" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#F35858"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
