import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { FileUploadStep } from "./NewPurchaseSteps/FileUploadStep";
import { EligibilityCriteriaStep } from "./NewPurchaseSteps/EligibilityCriteriaStep";
import { ReviewResultsStep } from "./NewPurchaseSteps/ReviewResultsStep";
import { ExecutePurchaseStep } from "./NewPurchaseSteps/ExecutePurchaseStep";

export interface NewPurchaseModalProps {
  isOpen: boolean;
  partnerName: string;
  partnerId: string;
  onClose: () => void;
  onSubmit?: (data: any) => void;
  resultResponse: any;
}

export type PurchaseStep = "upload" | "criteria" | "review" | "execute";

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  file: any;
}

export interface EligibilityCriteria {
  fico: number | string;
  enrolledDebt: number | string;
  epf: number | string;
  columnName: string;
}

/**
 * NewPurchaseModal - Multi-step modal for creating a new purchase
 */
export function NewPurchaseModal({
  isOpen,
  partnerName,
  partnerId,
  onClose,
  onSubmit,
  resultResponse,
}: NewPurchaseModalProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<PurchaseStep>("upload");
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [criteria, setCriteria] = useState<EligibilityCriteria>({
    fico: 0,
    enrolledDebt: 0,
    epf: 0,
    columnName: "FIRST_PAYMENT_CLEARED_DATE",
  });

  if (!isOpen) return null;
 
  const handleFileUpload = (file: File) => {
    setUploadedFile({
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    });
  };

  const handleContinueFromUpload = () => {
    if (uploadedFile) {
      setCurrentStep("criteria");
    }
   
  };

  const handleBackToCriteria = () => {
    setCurrentStep("criteria");
  };

  const handleBackToUpload = () => {
    setCurrentStep("upload");
  };

  const handleBackToReview = () => {
    setCurrentStep("review");
  };

  const handleRunEligibilityCheck = () => {
    setCurrentStep("review");
    onSubmit?.({
      file: uploadedFile,
      criteria,
      currentStep,
    });
  };

  const handleContinueToPurchase = () => {
    setCurrentStep("execute");
  };

  const handleExecutePurchase = () => {
    onSubmit?.({
      file: uploadedFile,
      criteria,
      currentStep,
    });
    handleClose();
    // Navigate to vintages page
    navigate(`/partner/${partnerId}`);
  };

  const handleClose = () => {
    // Reset state
    setCurrentStep("upload");
    setUploadedFile(null);
    setCriteria({
      fico: 0,
      enrolledDebt: 0,
      epf: 0,
      columnName: "FIRST_PAYMENT_CLEARED_DATE",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal - Fixed height */}
      <div className="relative bg-white w-full max-w-[1520px] h-[700px] rounded-[12px] shadow-xl flex flex-col overflow-hidden">
        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto">
          {currentStep === "upload" && (
            <FileUploadStep
              partnerName={partnerName}
              uploadedFile={uploadedFile}
              onFileUpload={handleFileUpload}
              onContinue={handleContinueFromUpload}
              onCancel={handleClose}
            />
          )}

          {currentStep === "criteria" && (
            <EligibilityCriteriaStep
              criteria={criteria}
              onCriteriaChange={setCriteria}
              onBack={handleBackToUpload}
              onContinue={handleRunEligibilityCheck}
            />
          )}

          {currentStep === "review" && (
            <ReviewResultsStep
              onBack={handleBackToCriteria}
              onContinue={handleContinueToPurchase}
              resultData={resultResponse}
            />
          )}

          {currentStep === "execute" && (
            <ExecutePurchaseStep
              partnerName={partnerName}
              onBack={handleBackToReview}
              onExecute={handleExecutePurchase}
              resultData={resultResponse}
            />
          )}
        </div>
      </div>
    </div>
  );
}
