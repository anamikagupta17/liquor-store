import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileUploadStep } from "../components/modals/NewPurchaseSteps/FileUploadStep";
import { EligibilityCriteriaStep } from "../components/modals/NewPurchaseSteps/EligibilityCriteriaStep";
import { ReviewResultsStep } from "../components/modals/NewPurchaseSteps/ReviewResultsStep";
import { ExecutePurchaseStep } from "../components/modals/NewPurchaseSteps/ExecutePurchaseStep";
import { partnersData } from "../data/partners";

export type PurchaseStep = "upload" | "criteria" | "review" | "execute";

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export interface EligibilityCriteria {
  fico: number;
  enrolledDebt: number;
  epf: number;
  columnName: string;
}

export function NewPurchase() {
  const navigate = useNavigate();
  const { partnerId } = useParams<{ partnerId: string }>();
  const [currentStep, setCurrentStep] = useState<PurchaseStep>("upload");
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [criteria, setCriteria] = useState<EligibilityCriteria>({
    fico: 0,
    enrolledDebt: 0,
    epf: 0,
    columnName: "FIRST_PAYMENT_CLEARED_DATE",
  });

  const partner = partnersData.find((p) => p.id === partnerId);

  if (!partner) {
    navigate("/eligibility-purchase");
    return null;
  }

  const partnerName = partner.name;

  const handleFileUpload = (file: File) => {
    setUploadedFile({
      name: file.name,
      size: file.size,
      type: file.type,
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
  };

  const handleContinueToPurchase = () => {
    setCurrentStep("execute");
  };

  const handleExecutePurchase = () => {
    navigate(`/partner/${partnerId}/vintages`);
  };

  const handleCancel = () => {
    navigate(`/partner/${partnerId}`);
  };

  return (
    <div className="bg-[#f3f2f6] w-full h-full overflow-y-auto">
      <div className="w-full h-full">
        {currentStep === "upload" && (
          <FileUploadStep
            partnerName={partnerName}
            uploadedFile={uploadedFile}
            onFileUpload={handleFileUpload}
            onContinue={handleContinueFromUpload}
            onCancel={handleCancel}
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
          />
        )}

        {currentStep === "execute" && (
          <ExecutePurchaseStep
            partnerName={partnerName}
            onBack={handleBackToReview}
            onExecute={handleExecutePurchase}
          />
        )}
      </div>
    </div>
  );
}
