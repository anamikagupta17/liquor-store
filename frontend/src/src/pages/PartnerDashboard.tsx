import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  ChevronLeft,
  ChevronRight,
  ChartPie,
  CircleDot,
  Plus,
  Undo2
} from "lucide-react";

import { NewPurchaseModal } from "../components/modals/NewPurchaseModal";
import svgPaths from "../../imports/svg-lh3rb6afa7";
import { PartnerIdType, PurchaseUploadDataType } from "../types";
import { api } from "../lib/api";
import { capitalizeWords } from "../utils/stringUtils";
/**
 * PartnerDashboard - displays detailed information about a specific partner
 * Shows breadcrumb navigation, partner metrics, and statistics
 */
export function PartnerDashboard() {
  const { partnerId } = useParams<{ partnerId: string }>();
  const navigate = useNavigate();
  const [isNewPurchaseModalOpen, setIsNewPurchaseModalOpen] = useState(false);

  const [partner, setPartner] = useState<PartnerIdType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const raw = localStorage.getItem("userData");
  const userData = JSON.parse(raw !== null ? raw : "null");

  const [purchaseUploadData, setPurchaseUploadData] =
    useState<PurchaseUploadDataType | null>();

  async function fetchPartner() {
    if (!partnerId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.getPartnerById(partnerId);
      setPartner(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPartner();
  }, [partnerId]);

  const handleBackClick = () => {
    navigate("/eligibility-purchase");
  };

  const handleViewPerformance = () => {
    // Navigate to performance page with partner context
    navigate(`/partner/${partnerId}/performance`);
  };

  const handleNewPurchase = () => {
    setIsNewPurchaseModalOpen(true);
  };

  const handleViewVintages = () => {
    navigate(`/partner/${partnerId}/vintages`);
  };

  const handleCloseNewPurchaseModal = () => {
    setIsNewPurchaseModalOpen(false);
  };

  const handleSubmitNewPurchase = async (data: any) => {
    // TODO: Handle purchase submission
    let fileData = data;
    setError(null);
    fileData.id = partnerId;
    try {
      let response;
      if (data.currentStep == "criteria") {
        // response = await api.postUploadPurchase(fileData);
        response = await uploadAndFetchData(fileData, partnerId);
        if (!response) return;
      } else if (data.currentStep == "execute") {
        // response = await api.postUploadPurchaseExecute(fileData);

        const executePromise = api.postUploadPurchaseExecute(fileData);

        const executeResponse = await Promise.race([
          executePromise,
          new Promise((resolve) => setTimeout(() => resolve(null), 25000))
        ]);

        //  If execute finishes within 25 sec
        if (executeResponse) {
          response = executeResponse;
        }
        //  If not finished → fallback
        else {
          await fetchPartner();
          return; // stop further execution
        }
      }

      setPurchaseUploadData(response);
      if (data.currentStep == "execute") {
        fetchPartner();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const uploadAndFetchData = async (fileData: any, partnerId: any) => {
    const uploadAPICallCount = 5;
    const retryInterval = 5000; // 5 sec
    const initialDelay = 25000; // 25 sec

    try {
      //  Call both APIs together
      const responseGenerate = await api.postUploadPurchaseGenerate(fileData);
      const uploadId = responseGenerate;
      const response =  api.postUploadPurchase(fileData, uploadId);
      //  Wait for response OR 25 seconds (whichever happens first)
      const response1 = await Promise.race([
        response,
        new Promise((resolve) => setTimeout(() => resolve(null), initialDelay))
      ]);

      //  If response1 comes within 25 sec
      if (response1) {
        return response1;
      }

      //  logic
      let attempt = 0;
      let uploadIdData = null;

      while (attempt < uploadAPICallCount) {
        try {
          uploadIdData = await api.getUploadedGenerateData(partnerId, uploadId);
          //  If response received, stop calling
          if (uploadIdData ) {
            return uploadIdData;
          }
        } catch (err) {
          console.log(`Attempt ${attempt + 1} failed`);
        }

        attempt++;

        //  Wait 5 seconds before next attempt
        if (attempt < uploadAPICallCount) {
          await new Promise((resolve) => setTimeout(resolve, retryInterval));
        }
      }

      // If all retries fail
      toast.error("Unable to fetch upload data. Please contact admin.");
      navigate(`/partner/${partnerId}`);
      return null;
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!partner) return <div>No partner found</div>;

  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start w-full max-w-[1400px] mx-auto">
      {/* Breadcrumbs */}
      <div className="content-stretch flex gap-[24px] items-center justify-end w-full">
        <div className="basis-0 box-border content-stretch flex gap-[8px] grow items-center min-h-px min-w-px px-0 py-[8px]">
          <button
            onClick={handleBackClick}
            className="relative shrink-0 size-[24px] cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Go back"
          >
            <Undo2 className="size-[24px] text-[#33363F]" strokeWidth={2} />
          </button>
          <button
            onClick={handleBackClick}
            className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic opacity-50 text-[#7d7d7d] text-[17px] hover:opacity-70 transition-opacity cursor-pointer"
          >
            Eligibility Purchase
          </button>
          <ChevronRight
            className="size-[24px] text-[#33363F]"
            strokeWidth={2}
          />
          <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[17px]">
            {capitalizeWords(partner.partnerName)}
          </p>
        </div>
      </div>

      {/* Partner Card */}
      <div className="bg-white relative rounded-[8px] shrink-0 w-full">
        <div className="size-full">
          <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] relative w-full">
            {/* Header */}
            <div className="content-stretch flex gap-[8px] items-center justify-center w-full">
              <div className="relative shrink-0 size-[32px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 32 32"
                >
                  <g>
                    <path
                      d={svgPaths.p10467700}
                      stroke="var(--stroke-0, #222222)"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d={svgPaths.p38b3ec00}
                      stroke="var(--stroke-0, #222222)"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d={svgPaths.p11fe2400}
                      stroke="var(--stroke-0, #222222)"
                      strokeWidth="1.5"
                    />
                    <path
                      d={svgPaths.p6302a00}
                      stroke="var(--stroke-0, #222222)"
                      strokeWidth="1.5"
                    />
                  </g>
                </svg>
              </div>
              <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#333333] text-[17px]">
                {capitalizeWords(partner.partnerName)}
              </p>

              {/* Action Buttons */}
              <button
                onClick={handleViewPerformance}
                className="cursor-pointer box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[8px] rounded-[8px] hover:bg-[#f3f2f6] transition-colors"
              >
                <ChartPie className="size-[24px] text-[#262d33]" />
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-[#262d33] text-[16px]">
                  View Performance
                </p>
              </button>
              {userData?.role.includes("admin") && (
                <button
                  onClick={handleNewPurchase}
                  className="cursor-pointer bg-[#6e55fb] box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[8px] rounded-[8px] hover:bg-[#5d45ea] transition-colors"
                >
                  <Plus className="size-[24px] text-[#f3f2f6]" />
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-[#f3f2f6] text-[16px]">
                    New Purchase
                  </p>
                </button>
              )}
            </div>

            {/* Partner Metrics */}
            <div className="bg-white relative rounded-[8px] shrink-0 w-full">
              <div className="overflow-clip rounded-[inherit] size-full">
                <div className="box-border content-stretch flex gap-[16px] items-start px-[16px] py-0 relative w-full">
                  {/* Hurdle */}
                  <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic">
                    <p className="opacity-60 text-[#636363] text-[14px]">
                      Hurdle
                    </p>
                    <p className="text-[#333333] text-[17px]">
                      {partner.termsHurdle}
                    </p>
                  </div>

                  {/* Split */}
                  <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic">
                    <p className="opacity-60 text-[#636363] text-[14px]">
                      Split
                    </p>
                    <p className="text-[#333333] text-[17px]">
                      {partner.split}
                    </p>
                  </div>

                  {/* Advance Rate */}
                  <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic">
                    <p className="opacity-60 text-[#636363] text-[14px]">
                      Advance Rate
                    </p>
                    <p className="text-[#333333] text-[17px]">
                      {partner.advancePercentage}
                    </p>
                  </div>
                </div>
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
                    stroke="#636363"
                    x2="1474"
                    y1="0.5"
                    y2="0.5"
                  />
                </svg>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="content-stretch flex gap-[24px] items-center w-full partner-dashboard-mobile">
              {/* Vintages */}
              <button
                onClick={handleViewVintages}
                className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0 border border-[#e6e6e6] hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="size-full">
                  <div className="group box-border content-stretch flex gap-[8px] items-start px-[16px] py-[24px] relative w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <div className="flex justify-between size-full">
                        <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px]">
                          VINTAGES
                        </p>

                        <div className="relative shrink-0 size-[24px] opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight
                            className="size-full text-[#333333]"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold">
                          {partner.totalVintageCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Total Enrolled Debt */}
              <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0 border border-[#e6e6e6]">
                <div className="size-full">
                  <div className="box-border content-stretch flex gap-[8px] items-start px-[16px] py-[24px] relative w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        TOTAL ENROLLED DEBT
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold">
                          $ {partner.totalEnrolledDebt}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Deployed */}
              <div className="basis-0 bg-[rgba(19,132,237,0.1)] grow min-h-px min-w-px relative rounded-[8px] shrink-0 border border-[#e6e6e6]">
                <div className="size-full">
                  <div className="box-border content-stretch flex gap-[8px] items-start px-[16px] py-[24px] relative w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                        TOTAL DEPLOYED
                      </p>
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-center px-0 py-[6px] w-full">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold">
                          $ {partner.totalDeployed}
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

      {/* New Purchase Modal */}
      <NewPurchaseModal
        isOpen={isNewPurchaseModalOpen}
        partnerName={partner.partnerName}
        partnerId={partnerId}
        onClose={handleCloseNewPurchaseModal}
        onSubmit={handleSubmitNewPurchase}
        resultResponse={purchaseUploadData}
      />
    </div>
  );
}
