import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Undo2 } from "lucide-react";
import { capitalizeWords } from "../utils/stringUtils";
import { VintageIdType, PartnerIdType } from "../types";
import { api } from "../lib/api";

// const vintagesData = [
//   {
//     id: '1',
//     name: 'CLG-NOV-2025',
//     date: '11-07-2025',
//     accounts: 112,
//     enrolled: '$3,524,754',
//     purchase: '$241,000',
//     rate: '6.7%',
//     hurdle: '125%',
//     split: '75%-50%',
//     isNew: true,
//   },
//   {
//     id: '2',
//     name: 'CLG-NOV-2025',
//     date: '11-07-2025',
//     accounts: 112,
//     enrolled: '$3,524,754',
//     purchase: '$241,000',
//     rate: '6.7%',
//     hurdle: '125%',
//     split: '75%-50%',
//     isNew: false,
//   },
//   {
//     id: '3',
//     name: 'CLG-NOV-2025',
//     date: '11-07-2025',
//     accounts: 112,
//     enrolled: '$3,524,754',
//     purchase: '$241,000',
//     rate: '6.7%',
//     hurdle: '125%',
//     split: '75%-50%',
//     isNew: false,
//   },
//   {
//     id: '4',
//     name: 'CLG-NOV-2025',
//     date: '11-07-2025',
//     accounts: 112,
//     enrolled: '$3,524,754',
//     purchase: '$241,000',
//     rate: '6.7%',
//     hurdle: '125%',
//     split: '75%-50%',
//     isNew: false,
//   },
// ];

export function Vintages() {
  const { partnerId } = useParams<{ partnerId: string }>();
  const navigate = useNavigate();
  const [partner, setPartner] = useState<PartnerIdType | null>(null);
  const [vintagesData, setVintagesData] = useState<VintageIdType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPartner() {
      if (!partnerId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await api.getVintageById(partnerId);
        const data2 = await api.getPartnerById(partnerId);
        setVintagesData(data);
        setPartner(data2);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPartner();
  }, [partnerId]);

  const handleBackToPartner = () => {
    navigate(`/partner/${partnerId}`);
  };

  const handleBackToEligibility = () => {
    navigate("/eligibility-purchase");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!vintagesData) return <div>No Vintage found</div>;

  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start w-full max-w-[1400px] mx-auto">
      <div className="content-stretch flex gap-[24px] items-center justify-end w-full">
        <div className="basis-0 box-border content-stretch flex gap-[8px] grow items-center min-h-px min-w-px px-0 py-[8px]">
          <button
            onClick={handleBackToEligibility}
            className="relative shrink-0 size-[24px] cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Go back to Eligibility Purchase"
          >
            <Undo2 className="size-[24px] text-[#33363F]" strokeWidth={2} />
          </button>
          <button
            onClick={handleBackToEligibility}
            className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic opacity-50 text-[#7d7d7d] text-[17px] hover:opacity-70 transition-opacity cursor-pointer"
          >
            Eligibility Purchase
          </button>
          <ChevronRight
            className="size-[24px] text-[#33363F]"
            strokeWidth={2}
          />
          <button
            onClick={handleBackToPartner}
            className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic opacity-50 text-[#7d7d7d] text-[17px] hover:opacity-70 transition-opacity cursor-pointer"
          >
            {capitalizeWords(partner?.partnerName)}
          </button>
          <ChevronRight
            className="size-[24px] text-[#33363F]"
            strokeWidth={2}
          />
          <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[17px]">
            Vintages
          </p>
        </div>
      </div>

      <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-full">
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="box-border content-stretch flex gap-[16px] items-center justify-center p-[16px] relative w-full">
              <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[17px] text-black">
                {partner.totalVintageCount} Vintages
              </p>
            </div>
          </div>
        </div>

        <div className="relative shrink-0 w-full">
          <div className="size-full">
            <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] relative w-full">
              {vintagesData.map((vintage, index) => (
                <div
                  key={vintage.id}
                  className="bg-white relative rounded-[8px] shrink-0 w-full cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div
                    aria-hidden="true"
                    className={`absolute border ${
                      index === 0 && vintage.status == "New"
                        ? "border-[rgba(33,151,86,0.1)]"
                        : "border-[#e6e6e6]"
                    } border-solid inset-0 pointer-events-none rounded-[8px]`}
                  />
                  <div className="flex flex-col justify-center size-full">
                    <div className="box-border content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative w-full">
                      <div className="content-stretch flex items-start relative shrink-0 w-full">
                        <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0">
                          <p className="font-['Poppins:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#333333] text-[17px] text-nowrap whitespace-pre">
                            {capitalizeWords(vintage.partnerName)}
                          </p>
                          <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic opacity-80 relative shrink-0 text-[#636363] text-[17px]">
                            {capitalizeWords(partner?.partnerName)}
                          </p>
                          {vintage.isNew && (
                            <div className="bg-[rgba(33,151,86,0.1)] box-border content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[2px] relative rounded-[30px] shrink-0">
                              <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#219756] text-[14px] text-nowrap whitespace-pre">
                                New
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="content-stretch flex items-start relative shrink-0 w-full">
                        <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-nowrap whitespace-pre">
                          <p className="opacity-60 relative shrink-0 text-[#636363] text-[14px]">
                            Date
                          </p>
                          <p className="relative shrink-0 text-[#333333] text-[17px]">
                            {vintage.date}
                          </p>
                        </div>

                        <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-nowrap whitespace-pre">
                          <p className="opacity-60 relative shrink-0 text-[#636363] text-[14px]">
                            Accounts
                          </p>
                          <p className="relative shrink-0 text-[#333333] text-[17px]">
                            {vintage.totalAccounts}
                          </p>
                        </div>

                        <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-nowrap whitespace-pre">
                          <p className="opacity-60 relative shrink-0 text-[#636363] text-[14px]">
                            Enrolled
                          </p>
                          <p className="relative shrink-0 text-[#333333] text-[17px]">
                            {vintage.totalEnrolled}
                          </p>
                        </div>

                        <div className="basis-0 content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[4px] grow items-start justify-center leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-nowrap whitespace-pre">
                          <p className="opacity-60 relative shrink-0 text-[#636363] text-[14px]">
                            Purchase
                          </p>
                          <p className="relative shrink-0 text-[#219756] text-[17px]">
                            {vintage.totalPurchase}
                          </p>
                        </div>
                      </div>

                      <div className="h-0 relative shrink-0 w-full">
                        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                          <svg
                            className="block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 1426 1"
                          >
                            <line
                              opacity="0.2"
                              stroke="#636363"
                              strokeDasharray="2 2"
                              x2="1426"
                              y1="0.5"
                              y2="0.5"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="content-stretch flex font-['Poppins:Regular',sans-serif] items-start justify-between leading-[normal] not-italic relative shrink-0 text-[#636363] text-[17px] w-full">
                        <p className="opacity-80 relative shrink-0">
                          Rate: {vintage.rate}
                        </p>
                        <p className="opacity-80 relative shrink-0">
                          Hurdle: {vintage.termsHurdle}
                        </p>
                        <p className="opacity-80 relative shrink-0">
                          Split: {vintage.split}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
