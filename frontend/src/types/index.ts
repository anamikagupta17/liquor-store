// Core types for the application

export type Partner = {
  id: string;
  name: string;
  hurdle: string;
  split: string;
  advanceRate: string;
  createdAt: string;
  status: "active" | "inactive" | "pending";
};


export type CreateUserForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: ("user" | "admin")[];
};


export type User = {
  userId: number;
  name: string;
  email: string;
  createdDate: string;
  roleList: ("admin" | "user")[];
};

export type UsersApiResponse = {
  totalUsers: number;
  noOfAdmin: number;
  noOfUsers: number;
  userList: User[];
};



export type MenuItem = {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

export type SortConfig = {
  field: keyof Partner;
  direction: "asc" | "desc";
};

export type FilterConfig = {
  search: string;
  status?: Partner["status"];
};

export type ApiResponse<T> = {
  data: T;
  error?: string;
  loading: boolean;
};

export type ToastType = "success" | "error" | "info" | "warning";




export type PartnerIdType = {
  id: string;
  partnerName: string;
  termsHurdle: string;
  split: string;
  advancePercentage: string;
  totalVintageCount: string;
  totalEnrolledDebt: string;
  totalDeployed: string;
};


export type VintageIdType = {
  date: string;
  partnerName: string;
  totalAccounts: string;
  split: string;
  totalEnrolled: string;
  totalPurchase: string;
  rate: string;
  termsHurdle: string;
  status: string;
};


export type PurchaseUploadDataType = {
  eligibleList: {
    clientId: string;
    account: string;
    fico: string;
    enrolledDebt: string;
    epf: string;
    firstPay: boolean;
  }[];
  inEligibleList: {
    clientId: string;
    account: string;
    fico: string;
    enrolledDebt: string;
    epf: string;
    firstPay: boolean;
  }[];
  vintageName: string;
  totalAccounts: number;
  purchasePrice: string;
  chargeBackReduction: string;
  effectivePurchasePrice: string;
  totalEnrolledDebt: number;
  purchasePricePercentage: string;
};

export type PerformanceIdType = {
  totalCapitalDeployed: string;
  totalVintage: number;
  totalAccounts: number;
  totalEnrolledDebt: string;
  totalCancelledDebt: string;
  cancelledPercent: number;
  avgAdvanceRate: string;
  totalActiveDebt: string;
  totalCashCollected: string;
  dscPerformanceResponseDtos:[];
};

export type VintageMonitorResponseDto = {
  vintageName: string;
  totalCapitalDeployed: string;
  totalCashCollected: string;
}

export type performanceMonitorDataType ={
  totalCapitalDeployed: string;
  totalActiveDebt: string;
  totalCashCollected: string;
  moic: string;
  vintageMonitorResponseDtos: VintageMonitorResponseDto[];
}

export interface PerformanceGuaranteeStatus {
  currentAge: string;
  activePhase: string;
  baseSplit: string;
  currentSplit: string;
  cumulativeCash: string;
}

export interface MonthValue {
  monthNumber: string; // e.g., "M0", "M1", ...
  value: string;       // all values are strings in your data
}

export type PerformanceVintageType={
  partnerName: string;
  vintageName: string;
  date: string;
  enrolledDebt: string;
  totalAccounts: number;
  preHurdle: string;
  preHurdlePercentage: string;
  currentSplit: string;
  preHurdleCurrentSplitPercentage: string;
  purchasePrice: string;
  advancePercentage: string;

  performanceGuranteeStatusResponseDto: PerformanceGuaranteeStatus;

  performanceCurveList: MonthValue[];
  settlementList: MonthValue[];
  cancellationList: MonthValue[];
}

