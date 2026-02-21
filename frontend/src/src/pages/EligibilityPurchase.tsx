import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "../components/molecules/Breadcrumb";
import { PageHeader } from "../components/organisms/PageHeader";
import { PartnerGrid } from "../components/organisms/PartnerGrid";
import { AddPartnerModal } from "../components/modals/AddPartnerModal";
import { usePartners } from "../hooks/usePartners";
import { useDebounce } from "../hooks/useDebounce";
import { Partner } from "../types";
import svgPaths from "../../imports/svg-lh3rb6afa7";

export interface EligibilityPurchaseProps {
  /**
   * Search value from parent
   */
  searchValue?: string;
}

/**
 * EligibilityPurchase page - main partner management view
 * @param searchValue - Search value from AppLayout
 */
export function EligibilityPurchase({
  searchValue = "",
}: EligibilityPurchaseProps) {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10);
  const { partners, loading, error, createPartner, refetch, totalRecords } =
    usePartners(pageNo, pageSize);
  const debouncedSearch = useDebounce(searchValue, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Filter partners based on search
  const filteredPartners = useMemo(() => {
    if (!debouncedSearch) return partners;

    const searchLower = debouncedSearch.toLowerCase();
    return partners.filter(
      (partner: Partner) =>
        partner.partnerName.toLowerCase().includes(searchLower) ||
        partner.termsHurdle.toLowerCase().includes(searchLower) ||
        partner.split.toLowerCase().includes(searchLower) ||
        partner.advancePercentage.toLowerCase().includes(searchLower)
    );
  }, [partners, debouncedSearch]);

  const handlePartnerClick = (id: string) => {
    navigate(`/partner/${id}`);
  };

  const handleNewPartner = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (partner: any) => {
    await createPartner(partner);
    await refetch();
  };

  const handlePageChange = (newPage: number) => {
    setPageNo(newPage);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-red-600 text-[17px] mb-2">
          Error loading partners
        </div>
        <p className="text-[#7d7d7d] text-[14px]">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[32px] w-full max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb
        icon={
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 24 24"
          >
            <g>
              <path
                d={svgPaths.p239ed480}
                stroke="var(--stroke-0, #222222)"
                strokeWidth="1.5"
              />
              <path
                d={svgPaths.p32bbe280}
                stroke="var(--stroke-0, #222222)"
                strokeWidth="1.5"
              />
            </g>
          </svg>
        }
        label="Eligibility Purchase"
      />

      {/* Main Body */}
      <div className="bg-white p-[16px] rounded-[8px] flex flex-col gap-[32px]">
        {/* Page Header */}
        <PageHeader
          icon={
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
          }
          title={`${filteredPartners.length} Partners`}
          actionText="New Partner"
          onAction={handleNewPartner}
          searchValue={searchValue}
          onSearchChange={searchValue}
          searchPlaceholder="Search partners..."
        />

        {/* Partner Grid */}
        <PartnerGrid
          partners={filteredPartners}
          loading={loading}
          onPartnerClick={handlePartnerClick}
          columns={2}
        />

        {/* Pagination: only show if needed */}
        {totalRecords > pageSize && (
          <div className="flex items-center justify-end gap-4 mt-4">
            {/* Prev Button */}
            <button
              className={`px-8 p-4 border rounded ${pageNo === 0 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
              disabled={pageNo === 0}
              onClick={() => handlePageChange(pageNo - 1)}
            >
              Prev
            </button>

            {/* Page indicator */}
            <span className="text-sm">
              Page {pageNo + 1} of {Math.ceil(totalRecords / pageSize)}
            </span>

            {/* Next Button */}
            <button
              className={`px-8 p-4 border rounded ${pageNo === +1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
              disabled={(pageNo + 1) * pageSize >= totalRecords}
              onClick={() => handlePageChange(pageNo + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Add Partner Modal */}
      <AddPartnerModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
