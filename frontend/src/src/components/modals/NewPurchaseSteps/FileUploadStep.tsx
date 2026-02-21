import { useRef, useState, useEffect } from "react";
import { Settings, ChevronRight, CheckCircle2, FileText } from "lucide-react";
import svgPaths from "../../../../imports/svg-ifwunc5yex";
import { UploadedFile } from "../NewPurchaseModal";
import { ColumnMappingModal } from "../ColumnMappingModal";
import { api } from "../../../lib/api";
import { toast } from "react-toastify";

export interface FileUploadStepProps {
  partnerName: string;
  uploadedFile: UploadedFile | null;
  onFileUpload: (file: File) => void;
  onContinue: () => void;
  onCancel: () => void;
}

export function FileUploadStep({
  partnerName,
  uploadedFile,
  onFileUpload,
  onContinue,
  onCancel
}: FileUploadStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isColumnMappingOpen, setIsColumnMappingOpen] = useState(false);
  const [columnMappingData, setSolumnMappingData] = useState();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFile(file)) {
      onFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && isValidFile(file)) {
      onFileUpload(file);
    }
  };

  const isValidFile = (file: File) => {
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
    return (
      validTypes.includes(file.type) ||
      file.name.endsWith(".csv") ||
      file.name.endsWith(".xlsx")
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  async function fetchColumnMappingData() {
    try {
      const data = await api.fetchColumnMappingData();
      setSolumnMappingData(data);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchColumnMappingData();
  }, []);

  const handleSaveColumnMaving = async (data: any) => {
    try {
      const dataCreated = await api.saveColumnMapping(data);
      if (dataCreated) {
        fetchColumnMappingData();
      }
    } catch (err: any) {
      toast.error(err.message || "Error");
    }
  };

  return (
    <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[48px] w-full h-full">
      {/* Header */}
      <div className="content-stretch flex gap-[8px] items-start w-full new-vintage-title">
        <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[17px]">
          Upload Portfolio File for {partnerName}
        </p>

        {/* Action Buttons */}
        <div className="content-stretch flex gap-[32px] items-center justify-end shrink-0">
          <button
            onClick={onCancel}
            className="cursor-pointer bg-[#f3f2f6] box-border content-stretch flex flex-col items-center justify-center px-[24px] py-[16px] rounded-[6px] shrink-0 hover:bg-[#e7e6ee] transition-colors"
          >
            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px]">
              Cancel
            </p>
          </button>

          <button
            onClick={onContinue}
            disabled={!uploadedFile}
            className="cursor-pointer bg-[#007aff] box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[16px] rounded-[6px] shrink-0 hover:bg-[#0066dd] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[14px] text-white">
              Continue
            </p>
            <ChevronRight className="size-[20px] text-white" />
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsColumnMappingOpen(true)}
        className="bg-[rgba(19,132,237,0.1)] box-border cursor-pointer content-stretch flex gap-[10px] items-center justify-center px-[24px] py-[16px] rounded-[6px] shrink-0 hover:bg-[rgba(19,132,237,0.15)] transition-colors"
      >
        <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#1384ed] text-[14px]">
          Column Mappings
        </p>
        <Settings className="size-[20px] text-[#1384ed]" />
      </button>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`bg-white h-[422px] relative rounded-[16px] w-full cursor-pointer transition-all ${
          isDragging ? "border-[#6e55fb] border-[2px] bg-[#f8f7ff]" : ""
        }`}
        onClick={!uploadedFile ? handleBrowseClick : undefined}
      >
        <div
          aria-hidden="true"
          className="absolute border border-[#6e55fb] border-dashed inset-[-1px] pointer-events-none rounded-[17px]"
        />
        <div className="flex flex-col items-center justify-center size-full">
          {!uploadedFile ? (
            <div className="box-border content-stretch flex flex-col gap-[8px] h-[422px] items-center justify-center px-[8px] py-[24px] w-full">
              {/* Upload Icon */}
              <div className="relative shrink-0 size-[120px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 120 120"
                >
                  <g>
                    <path d={svgPaths.p150f3300} fill="#6E55FB" />
                    <path
                      d={svgPaths.p1767f900}
                      stroke="#6E55FB"
                      strokeWidth="2"
                    />
                  </g>
                </svg>
              </div>

              <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#7d7d7d] text-[16px]">
                <span>Drag and Drop or </span>
                <span className="font-['Poppins:Medium',sans-serif] text-black">
                  Browse
                </span>
                <span> your files</span>
              </p>

              <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic opacity-60 text-[#7d7d7d] text-[14px]">
                Supported Formats: CSV, XLSX
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-[16px] px-[24px]">
              {/* Success Icon */}
              <CheckCircle2 className="size-[80px] text-[#34C759]" />

              {/* File Info */}
              <div className="flex items-center gap-[12px] bg-[#f3f2f6] rounded-[8px] px-[24px] py-[16px]">
                <FileText className="size-[24px] text-[#6e55fb]" />
                <div className="flex flex-col gap-[4px]">
                  <p className="font-['Poppins:Medium',sans-serif] text-[#262d33] text-[16px]">
                    {uploadedFile.name}
                  </p>
                  <p className="font-['Poppins:Regular',sans-serif] text-[#7d7d7d] text-[14px]">
                    {formatFileSize(uploadedFile.size)}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBrowseClick();
                }}
                className="text-[#007aff] text-[14px] font-['Poppins:Medium',sans-serif] hover:underline mt-2"
              >
                Upload a different file
              </button>
            </div>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx"
        onChange={handleFileChange}
        className="hidden"
      />

      <ColumnMappingModal
        isOpen={isColumnMappingOpen}
        mappingData={columnMappingData || []}
        onClose={() => setIsColumnMappingOpen(false)}
        onSave={handleSaveColumnMaving}
      />
    </div>
  );
}
