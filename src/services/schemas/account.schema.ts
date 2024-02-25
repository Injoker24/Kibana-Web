import {
  AccountEditBankDetailInput,
  AccountEditCVInput,
  AccountEditDescInput,
  AccountEditEducationInput,
  AccountEditPortfolioInput,
  AccountEditProfileInput,
  AccountEditSkillInput,
} from 'models';

export interface AccountInquiryOtherProfileResponse {
  id: string;
  profile_image_url: string;
  name: string;
  username: string;
  is_freelancer: boolean;
}

export interface AccountInquiryOwnedTaskResponse {
  tasks?: {
    id: string;
    name: string;
    description: string;
    tags: string[];
    due_date: string;
    difficulty: string;
    price: number;
  }[];
}

export interface AccountInquiryClientReviewResponse {
  average_rating: number;
  rating_amount: number;
  review_list?: {
    name: string;
    star: number;
    description: string;
    timestamp: string;
  }[];
}

export interface AccountInquiryDescriptionResponse {
  description: string;
}

export interface AccountInquiryEducationHistoryResponse {
  education_history?: {
    degree: string;
    major: string;
    university: string;
    country: string;
    graduation_year: string;
  }[];
}

export interface AccountInquirySkillResponse {
  skills?: string[];
}

export interface AccountInquiryCVUrlResponse {
  cv_url?: string;
}

export interface AccountInquiryPortfolioUrlResponse {
  portfolio_url?: string;
}

export interface AccountInquiryOwnedServiceResponse {
  services?: {
    id: string;
    image_url: string;
    name: string;
    freelancer: {
      profile_image_url: string;
      name: string;
    };
    average_rating: number;
    rating_amount: number;
    tags: string[];
    price: number;
    working_time: number;
  }[];
}

export interface AccountInquiryMyProfileResponse {
  id: string;
  profile_image_url?: string;
  email: string;
  name: string;
  username: string;
  phone_number: string;
}

export interface AccountInquiryBankDetailResponse {
  bank_detail?: {
    bank_name: string;
    beneficiary_name: string;
    account_number: string;
  };
}

export interface AccountEditProfileRequest {
  profile_image?: File;
  email: string;
  name: string;
  username: string;
  phone_number: string;
}

export function transformToAccountEditProfileRequest(
  input: AccountEditProfileInput,
): AccountEditProfileRequest {
  const result: AccountEditProfileRequest = {
    profile_image: input.profileImage,
    email: input.email,
    name: input.name,
    username: input.username,
    phone_number: input.phoneNumber,
  };

  return result;
}

export interface AccountEditBankDetailRequest {
  bank_name: string;
  beneficiary_name: string;
  account_number: string;
}

export function transformToAccountEditBankDetailRequest(
  input: AccountEditBankDetailInput,
): AccountEditBankDetailRequest {
  const result: AccountEditBankDetailRequest = {
    bank_name: input.bankName,
    beneficiary_name: input.beneficiaryName,
    account_number: input.accountNumber,
  };

  return result;
}

export interface AccountInquiryReviewHistoryResponse {
  average_rating: number;
  project_amount: number;
  project_list?: {
    project_name: string;
    star?: number;
    description?: string;
    timestamp: string;
  }[];
}

export interface AccountEditSkillRequest {
  skills: string[];
}

export function transformToAccountEditSkillRequest(
  input: AccountEditSkillInput,
): AccountEditSkillRequest {
  const result: AccountEditSkillRequest = {
    skills: input.skills,
  };

  return result;
}

export interface AccountEditDescRequest {
  description: string;
}

export function transformToAccountEditDescRequest(
  input: AccountEditDescInput,
): AccountEditDescRequest {
  const result: AccountEditDescRequest = {
    description: input.description,
  };

  return result;
}

export interface AccountEditEducationRequest {
  education_history: {
    degree: string;
    major: string;
    university: string;
    country: string;
    graduation_year: string;
  }[];
}

export function transformToAccountEditEducationRequest(
  input: AccountEditEducationInput,
): AccountEditEducationRequest {
  const result: AccountEditEducationRequest = {
    education_history: input.educationHistory.map((t) => {
      return {
        degree: t.degree,
        major: t.major,
        university: t.university,
        country: t.country,
        graduation_year: t.graduationYear,
      };
    }),
  };

  return result;
}

export interface AccountEditCVRequest {
  cv: File;
}

export function transformToAccountEditCVRequest(input: AccountEditCVInput): AccountEditCVRequest {
  const result: AccountEditCVRequest = {
    cv: input.cv,
  };

  return result;
}

export interface AccountEditPortfolioRequest {
  portfolio: File;
}

export function transformToAccountEditPortfolioRequest(
  input: AccountEditPortfolioInput,
): AccountEditPortfolioRequest {
  const result: AccountEditPortfolioRequest = {
    portfolio: input.portfolio,
  };

  return result;
}
