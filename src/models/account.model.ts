import {
  AccountInquiryBankDetailResponse,
  AccountInquiryCVUrlResponse,
  AccountInquiryClientReviewResponse,
  AccountInquiryDescriptionResponse,
  AccountInquiryEducationHistoryResponse,
  AccountInquiryMyProfileResponse,
  AccountInquiryOtherProfileResponse,
  AccountInquiryOwnedServiceResponse,
  AccountInquiryOwnedTaskResponse,
  AccountInquiryPortfolioUrlResponse,
  AccountInquiryReviewHistoryResponse,
  AccountInquirySkillResponse,
} from 'services/schemas';
import { formatCurrency } from 'utils';

export interface AccountInquiryOtherProfileOutput {
  id: string;
  profileImageUrl?: string;
  name: string;
  username: string;
  isFreelancer: boolean;
}

export function transformToAccountInquiryOtherProfileOutput(
  response: AccountInquiryOtherProfileResponse,
): AccountInquiryOtherProfileOutput {
  const result: AccountInquiryOtherProfileOutput = {
    id: response.id,
    profileImageUrl: response.profile_image_url,
    name: response.name,
    username: response.username,
    isFreelancer: response.is_freelancer,
  };

  return result;
}

export interface AccountInquiryOwnedTaskOutput {
  tasks?: {
    id: string;
    name: string;
    description: string;
    tags: string[];
    dueDate: string;
    difficulty: string;
    price: string;
  }[];
}

export function transformToAccountInquiryOwnedTaskOutput(
  response: AccountInquiryOwnedTaskResponse,
): AccountInquiryOwnedTaskOutput {
  const result: AccountInquiryOwnedTaskOutput = {
    tasks: response.tasks?.map((t) => {
      return {
        id: t.id,
        name: t.name,
        description: t.description,
        tags: t.tags,
        dueDate: t.due_date,
        difficulty: t.difficulty,
        price: formatCurrency(t.price),
      };
    }),
  };

  return result;
}

export interface AccountInquiryClientReviewOutput {
  averageRating: number;
  ratingAmount: number;
  reviewList?: {
    name: string;
    star: number;
    description: string;
    timestamp: string;
  }[];
}

export function transformToAccountInquiryClientReviewOutput(
  response: AccountInquiryClientReviewResponse,
): AccountInquiryClientReviewOutput {
  const result: AccountInquiryClientReviewOutput = {
    averageRating: response.average_rating,
    ratingAmount: response.rating_amount,
    reviewList: response.review_list?.map((t) => {
      return {
        name: t.name,
        star: t.star,
        description: t.description,
        timestamp: t.timestamp,
      };
    }),
  };

  return result;
}

export interface AccountInquiryDescriptionOutput {
  description: string;
}

export function transformToAccountInquiryDescriptionOutput(
  response: AccountInquiryDescriptionResponse,
): AccountInquiryDescriptionOutput {
  const result: AccountInquiryDescriptionOutput = {
    description: response.description,
  };

  return result;
}

export interface AccountInquiryEducationHistoryOutput {
  educationHistory?: {
    degree: string;
    major: string;
    university: string;
    country: string;
    graduationYear: string;
  }[];
}

export function transformToAccountInquiryEducationHistoryOutput(
  response: AccountInquiryEducationHistoryResponse,
): AccountInquiryEducationHistoryOutput {
  const result: AccountInquiryEducationHistoryOutput = {
    educationHistory: response.education_history?.map((t) => {
      return {
        degree: t.degree,
        major: t.major,
        university: t.university,
        country: t.country,
        graduationYear: t.graduation_year,
      };
    }),
  };

  return result;
}

export interface AccountInquirySkillOutput {
  skills?: string[];
}

export function transformToAccountInquirySkillOutput(
  response: AccountInquirySkillResponse,
): AccountInquirySkillOutput {
  const result: AccountInquirySkillOutput = {
    skills: response.skills,
  };

  return result;
}

export interface AccountInquiryCVUrlOutput {
  cvUrl?: string;
}

export function transformToAccountInquiryCVUrlOutput(
  response: AccountInquiryCVUrlResponse,
): AccountInquiryCVUrlOutput {
  const result: AccountInquiryCVUrlOutput = {
    cvUrl: response.cv_url,
  };

  return result;
}

export interface AccountInquiryPortfolioUrlOutput {
  portfolioUrl?: string;
}

export function transformToAccountInquiryPortfolioUrlOutput(
  response: AccountInquiryPortfolioUrlResponse,
): AccountInquiryPortfolioUrlOutput {
  const result: AccountInquiryPortfolioUrlOutput = {
    portfolioUrl: response.portfolio_url,
  };

  return result;
}

export interface AccountInquiryOwnedServiceOutput {
  services?: {
    id: string;
    imageUrl: string;
    name: string;
    freelancer: {
      profileImageUrl?: string;
      name: string;
    };
    averageRating: number;
    ratingAmount: number;
    tags: string[];
    price: string;
    workingTime: number;
  }[];
}

export function transformToAccountInquiryOwnedServiceOutput(
  response: AccountInquiryOwnedServiceResponse,
): AccountInquiryOwnedServiceOutput {
  const result: AccountInquiryOwnedServiceOutput = {
    services: response.services?.map((t) => {
      return {
        id: t.id,
        imageUrl: t.image_url,
        name: t.name,
        freelancer: {
          profileImageUrl: t.freelancer.profile_image_url,
          name: t.freelancer.name,
        },
        averageRating: t.average_rating,
        ratingAmount: t.rating_amount,
        tags: t.tags,
        price: formatCurrency(t.price),
        workingTime: t.working_time,
      };
    }),
  };

  return result;
}

export interface AccountInquiryMyProfileOutput {
  id: string;
  profileImageUrl?: string;
  email: string;
  name: string;
  username: string;
  phoneNumber: string;
}

export function transformToAccountInquiryMyProfileOutput(
  response: AccountInquiryMyProfileResponse,
): AccountInquiryMyProfileOutput {
  const result: AccountInquiryMyProfileOutput = {
    id: response.id,
    profileImageUrl: response.profile_image_url,
    email: response.email,
    name: response.name,
    username: response.username,
    phoneNumber: response.phone_number,
  };

  return result;
}

export interface AccountInquiryBankDetailOutput {
  bankDetail?: {
    bankName: string;
    beneficiaryName: string;
    accountNumber: string;
  };
}

export function transformToAccountInquiryBankDetailOutput(
  response: AccountInquiryBankDetailResponse,
): AccountInquiryBankDetailOutput {
  let result: AccountInquiryBankDetailOutput;
  if (response.bank_detail) {
    result = {
      bankDetail: {
        bankName: response.bank_detail.bank_name,
        beneficiaryName: response.bank_detail.beneficiary_name,
        accountNumber: response.bank_detail.account_number,
      },
    };
  } else {
    result = {};
  }

  return result;
}

export interface AccountEditProfileInput {
  profileImage?: File;
  email: string;
  username: string;
  name: string;
  phoneNumber: string;
}

export interface AccountEditBankDetailInput {
  bankName: string;
  beneficiaryName: string;
  accountNumber: string;
}

export interface AccountInquiryReviewHistoryOutput {
  averageRating: number;
  projectAmount: number;
  projectList?: {
    projectName: string;
    star?: number;
    description?: string;
    timestamp: string;
  }[];
}

export function transformToAccountInquiryReviewHistoryOutput(
  response: AccountInquiryReviewHistoryResponse,
): AccountInquiryReviewHistoryOutput {
  const result: AccountInquiryReviewHistoryOutput = {
    averageRating: response.average_rating,
    projectAmount: response.project_amount,
    projectList: response.project_list?.map((t) => {
      return {
        projectName: t.project_name,
        star: t.star,
        description: t.description,
        timestamp: t.timestamp,
      };
    }),
  };

  return result;
}

export interface AccountEditSkillInput {
  skills: string[];
}

export interface AccountEditDescInput {
  description: string;
}

export interface AccountEditEducationInput {
  educationHistory: {
    degree: string;
    major: string;
    university: string;
    country: string;
    graduationYear: string;
  }[];
}

export interface AccountEditCVInput {
  cv: File;
}

export interface AccountEditPortfolioInput {
  portfolio: File;
}
