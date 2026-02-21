import { useEffect, useState } from "react";
import { X } from "lucide-react";

export interface MappingDataType {
  mappingName: string;
  toBeMappedName: string;
}

export interface ColumnMappingModalProps {
  isOpen: boolean;
  mappingData: MappingDataType[];
  onClose: () => void;
  onSave?: (data: MappingDataType[]) => void;
}

/**
 * ColumnMappingModal - Modal for configuring CSV column mappings
 */
export function ColumnMappingModal({
  isOpen,
  mappingData,
  onClose,
  onSave
}: ColumnMappingModalProps) {
  const [localMappingData, setLocalMappingData] = useState<MappingDataType[]>(
    []
  );

  useEffect(() => {
    if (isOpen) {
      setLocalMappingData(mappingData);
    }
  }, [isOpen, mappingData]);

  const handleChange = (mappingName: string, value: string) => {
    setLocalMappingData((prev) =>
      prev.map((item) =>
        item.mappingName === mappingName
          ? { ...item, toBeMappedName: value }
          : item
      )
    );
  };

  const handleSave = () => {
    onSave?.(localMappingData);
    onClose();
  };

  return (
    <>
      {!isOpen ? null : (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="relative bg-[#f3f2f6] w-full max-w-[640px] rounded-[8px] shadow-xl">
            <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[16px] relative w-full">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full flex-row md:flex-col">
                <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[17px] text-black">
                  Column Mappings
                </p>
                <button
                  onClick={onClose}
                  className="relative shrink-0 size-[24px] cursor-pointer hover:opacity-70 transition-opacity close-btn"
                  aria-label="Close modal"
                >
                  <X className="size-full text-[#33363F]" strokeWidth={2} />
                </button>
              </div>

              {/* Divider */}
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-1px_0_0_0]">
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
              </div>

              {/* Description */}
              <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#7d7d7d] text-[14px]">
                Configure CSV column mapping for eligibility criteria
              </p>

              {/* Mapping Table */}
              <div className="bg-white relative rounded-[4px] shrink-0 w-full">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[16px] items-center p-[8px] relative w-full">
                    {/* Left Column - Field Names */}
                    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
                      {localMappingData?.map((item) => (
                        <div
                          key={item.mappingName}
                          className="relative rounded-[4px] shrink-0 w-full"
                        >
                          <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
                            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#7d7d7d] text-[14px]">
                              {item.mappingName}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Column - CSV Column Names */}
                    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0">
                      {localMappingData?.map((item, index) => (
                        <div
                          key={item.mappingName}
                          className="bg-[#f3f2f6] relative rounded-[4px] shrink-0 w-full"
                        >
                          <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
                            <input
                              type="text"
                              value={item.toBeMappedName}
                              onChange={(e) =>
                                handleChange(item.mappingName, e.target.value)
                              }
                              className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#262d33] text-[14px] bg-transparent border-none outline-none focus:outline-none w-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-1px_0_0_0]">
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
              </div>

              {/* Save Button */}
              <div className="content-stretch flex items-center justify-end relative shrink-0 w-full">
                <button
                  onClick={handleSave}
                  className="bg-[#007aff] content-stretch flex flex-col items-center justify-center px-[24px] py-[10px] relative rounded-[6px] shrink-0 hover:bg-[#0066dd] transition-colors"
                >
                  <p className="font-['Poppins:Medium',sans-serif] leading-[20px] text-[15px] text-center text-white">
                    Save
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
